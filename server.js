"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const {
  buildEvidencePacket,
  buildLlmEvaluationPrompt,
  classifyAirpodsAuthenticity,
  mergeRuleScoreWithLlm,
  scoreObservations
} = require("./detector-llm.js");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const ENV = loadEnvFile(path.join(ROOT, ".env"));
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ENV.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || ENV.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
const SITE_URL = process.env.SITE_URL || ENV.SITE_URL || `http://${HOST}:${PORT}`;
const SITE_NAME = process.env.SITE_NAME || ENV.SITE_NAME || "AirProof";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".md": "text/markdown; charset=utf-8"
};

function loadEnvFile(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    env[key] = value;
  }
  return env;
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendJson(res, 404, { error: "Arquivo não encontrado." });
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const stream = fs.createReadStream(filePath);
  res.writeHead(200, { "Content-Type": contentType });
  stream.pipe(res);
}

function resolveStaticPath(urlPathname) {
  const clean = urlPathname === "/" ? "/index.html" : urlPathname;
  const filePath = path.normalize(path.join(ROOT, clean));
  if (!filePath.startsWith(ROOT)) return null;
  return filePath;
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

async function callOpenRouter(packet, ruleReport) {
  if (!OPENROUTER_API_KEY) {
    return {
      llmReport: null,
      llmStatus: "missing_api_key"
    };
  }

  const prompt = buildLlmEvaluationPrompt(packet);
  const system = [
    "Você é um analista especialista em autenticação de AirPods.",
    "Responda em JSON válido.",
    "Não invente evidências ausentes.",
    "Se houver pouca cobertura, reduza a confiança."
  ].join(" ");

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
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "text",
              text: `Resumo do motor de regras: ${JSON.stringify(
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
    const errorText = await response.text();
    return {
      llmReport: null,
      llmStatus: "http_error",
      llmError: errorText
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

async function handleAiDetect(req, res) {
  try {
    const body = await readJsonBody(req);
    const packet = buildEvidencePacket(body);
    const ruleReport = scoreObservations(packet.observations);
    const llm = await callOpenRouter(packet, ruleReport);
    const fused = mergeRuleScoreWithLlm(ruleReport, llm.llmReport);

    const result = classifyAirpodsAuthenticity({
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
        ...result.result,
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
}

function buildWarnings(packet, ruleReport, llm) {
  const warnings = [];
  if (packet.evidence_count < 3) warnings.push("Pouca evidência. O resultado deve ser tratado com cautela.");
  if (ruleReport.contradictions.length > 0) warnings.push("Foram detectadas evidências contraditórias.");
  if (llm.llmStatus !== "ok") warnings.push("A resposta do modelo não pôde ser usada integralmente; fusão pode ter usado mais peso das regras.");
  return warnings;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Payload muito grande."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (_error) {
        reject(new Error("JSON inválido no corpo da requisição."));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      model: OPENROUTER_MODEL,
      has_api_key: Boolean(OPENROUTER_API_KEY)
    });
    return;
  }

  if (req.method === "POST" && requestUrl.pathname === "/api/ai-detect") {
    await handleAiDetect(req, res);
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Método não suportado." });
    return;
  }

  const filePath = resolveStaticPath(requestUrl.pathname);
  if (!filePath) {
    sendJson(res, 403, { error: "Acesso negado." });
    return;
  }
  sendFile(res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`AirProof disponível em http://${HOST}:${PORT}`);
});
