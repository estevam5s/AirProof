"use strict";

const {
  FEATURE_CATALOG,
  buildEvidencePacket,
  buildLlmEvaluationPrompt,
  classifyAirpodsAuthenticity,
  mergeRuleScoreWithLlm,
  scoreObservations
} = require("../detector-llm.js");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
const SITE_URL = process.env.SITE_URL || "https://airproof.vercel.app";
const SITE_NAME = process.env.SITE_NAME || "AirProof";

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload, null, 2));
}

function extractJsonFromText(text) {
  if (!text || typeof text !== "string") return null;
  try {
    return JSON.parse(text);
  } catch (_error) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch (_error2) {
      return null;
    }
  }
}

function normalizeBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);
  return {};
}

function buildWarnings(packet, ruleReport, llm) {
  const warnings = [];
  if (packet.evidence_count < 3) warnings.push("Pouca evidência. O resultado deve ser tratado com cautela.");
  if (ruleReport.contradictions.length > 0) warnings.push("Foram detectadas evidências contraditórias.");
  if (llm.llmStatus !== "ok") warnings.push("A resposta do modelo não pôde ser usada integralmente; a fusão usou mais peso do motor de regras.");
  return warnings;
}

async function callOpenRouter(packet, ruleReport) {
  if (!OPENROUTER_API_KEY) {
    return { llmReport: null, llmStatus: "missing_api_key" };
  }

  const prompt = buildLlmEvaluationPrompt(packet);
  const featureKnowledge = Object.entries(FEATURE_CATALOG).map(([key, value]) => ({
    feature: key,
    direction: value.direction,
    criticality: value.criticality,
    description: value.description
  }));

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      temperature: 0.05,
      top_p: 0.9,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "Você é um perito em autenticação de dispositivos AirPods.",
            "Use raciocínio probabilístico.",
            "Não trate um único sinal como prova definitiva se a cobertura estiver baixa.",
            "Quando houver conflito entre evidências, reduza a confiança.",
            "Responda apenas JSON válido."
          ].join(" ")
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "text",
              text: `Conhecimento de features suportadas:\n${JSON.stringify(featureKnowledge, null, 2)}`
            },
            {
              type: "text",
              text: `Saída do motor de regras:\n${JSON.stringify(
                {
                  fakeProbability: ruleReport.fakeProbability,
                  authenticProbability: ruleReport.authenticProbability,
                  confidence: ruleReport.confidence,
                  contradictions: ruleReport.contradictions,
                  details: ruleReport.details
                },
                null,
                2
              )}`
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    return {
      llmReport: null,
      llmStatus: "http_error",
      llmError: await response.text()
    };
  }

  const data = await response.json();
  const rawContent = data?.choices?.[0]?.message?.content || "";
  const parsed = Array.isArray(rawContent)
    ? extractJsonFromText(rawContent.map((item) => item.text || "").join("\n"))
    : extractJsonFromText(rawContent);

  return {
    llmReport: parsed,
    llmStatus: parsed ? "ok" : "invalid_json",
    llmRaw: rawContent
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Método não suportado." });
    return;
  }

  try {
    const body = normalizeBody(req);
    const packet = buildEvidencePacket(body);
    const ruleReport = scoreObservations(packet.observations);
    const llm = await callOpenRouter(packet, ruleReport);
    const fused = mergeRuleScoreWithLlm(ruleReport, llm.llmReport);
    const localResult = classifyAirpodsAuthenticity({
      ...body,
      observations: body.observations || [],
      llmReport: llm.llmReport
    });

    sendJson(res, 200, {
      ok: true,
      provider: "openrouter",
      model: OPENROUTER_MODEL,
      llm_status: llm.llmStatus,
      packet,
      rule_report: ruleReport,
      fusion: fused,
      result: {
        ...localResult.result,
        classification: fused.classification,
        fake_probability: fused.fake_probability,
        authentic_probability: fused.authentic_probability,
        confidence: fused.confidence
      },
      llm_report: llm.llmReport,
      warnings: buildWarnings(packet, ruleReport, llm)
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : "Erro interno ao processar a análise."
    });
  }
};
