"use strict";

const FEATURE_CATALOG = {
  serial_mismatch_box_phone: {
    direction: "fake",
    weight: 1.0,
    criticality: "critical",
    category: "serial",
    description: "Número serial da caixa diferente do número visto no telefone."
  },
  serial_match_box_phone: {
    direction: "authentic",
    weight: 0.82,
    criticality: "high",
    category: "serial",
    description: "Número serial consistente entre caixa e telefone."
  },
  usb_port_black: {
    direction: "fake",
    weight: 0.72,
    criticality: "high",
    category: "porta",
    description: "Porta interna/preenchimento preto onde o padrão esperado é branco."
  },
  usb_port_white: {
    direction: "authentic",
    weight: 0.54,
    criticality: "medium",
    category: "porta",
    description: "Porta interna compatível com o padrão esperado do original."
  },
  fragile_lid: {
    direction: "fake",
    weight: 0.68,
    criticality: "high",
    category: "caixa",
    description: "Tampa com sensação estrutural frágil."
  },
  rear_text_misaligned: {
    direction: "fake",
    weight: 0.77,
    criticality: "high",
    category: "acabamento",
    description: "Texto ou design traseiro torto."
  },
  more_settings_modes: {
    direction: "authentic",
    weight: 0.74,
    criticality: "high",
    category: "software",
    description: "Sistema exibe mais modos e controles compatíveis com original."
  },
  beta_updates_available: {
    direction: "authentic",
    weight: 0.8,
    criticality: "high",
    category: "software",
    description: "Atualizações beta aparecem de forma coerente."
  },
  noise_control_outside_ear: {
    direction: "fake",
    weight: 0.88,
    criticality: "critical",
    category: "software",
    description: "Cancelamento de ruído muda fora da orelha em padrão inconsistente."
  },
  ear_tips_fall_easily: {
    direction: "fake",
    weight: 0.79,
    criticality: "high",
    category: "encaixe",
    description: "Pontas/borrachinhas caem com facilidade."
  },
  ear_tips_secure: {
    direction: "authentic",
    weight: 0.71,
    criticality: "high",
    category: "encaixe",
    description: "Pontas ficam firmes e seguras."
  },
  magsafe_present_expected: {
    direction: "authentic",
    weight: 0.62,
    criticality: "medium",
    category: "magsafe",
    description: "Caixa com MagSafe compatível com a versão alegada."
  },
  paper_packaging_expected: {
    direction: "authentic",
    weight: 0.59,
    criticality: "medium",
    category: "embalagem",
    description: "Embalagem interna em papel compatível com original."
  },
  plastic_inner_bed: {
    direction: "fake",
    weight: 0.73,
    criticality: "high",
    category: "embalagem",
    description: "Cama interna de plástico onde seria esperado papel."
  },
  made_in_vietnam_present: {
    direction: "authentic",
    weight: 0.5,
    criticality: "medium",
    category: "fabricacao",
    description: "Inscrição de fabricação coerente com o padrão observado."
  },
  charging_sound_subtle: {
    direction: "authentic",
    weight: 0.47,
    criticality: "low",
    category: "audio",
    description: "Som de carregamento sutil."
  },
  auto_switching_apple_ecosystem: {
    direction: "authentic",
    weight: 0.83,
    criticality: "high",
    category: "conectividade",
    description: "Troca automática coerente entre dispositivos Apple."
  }
};

const CONTRADICTION_RULES = [
  ["serial_match_box_phone", "serial_mismatch_box_phone"],
  ["usb_port_white", "usb_port_black"],
  ["ear_tips_secure", "ear_tips_fall_easily"],
  ["more_settings_modes", "noise_control_outside_ear"],
  ["paper_packaging_expected", "plastic_inner_bed"]
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function normalizeObservation(observation) {
  if (!observation || typeof observation !== "object") {
    throw new TypeError("Cada observação deve ser um objeto.");
  }

  const feature = FEATURE_CATALOG[observation.feature];
  if (!feature) {
    throw new Error(`Feature não suportada: ${observation.feature}`);
  }

  return {
    feature: observation.feature,
    quality: clamp(Number(observation.quality ?? 1), 0, 1),
    source: observation.source || "manual",
    notes: observation.notes || "",
    metadata: observation.metadata || {}
  };
}

function buildEvidencePacket(input) {
  const observations = (input.observations || []).map(normalizeObservation);
  return {
    device_family: input.deviceFamily || "AirPods",
    claimed_version: input.claimedVersion || "unknown",
    elapsed_minutes: input.elapsedMinutes || 2,
    evidence_count: observations.length,
    observations,
    attachments: input.attachments || [],
    context: input.context || {}
  };
}

function detectContradictions(normalizedObservations) {
  const present = new Set(normalizedObservations.map((item) => item.feature));
  return CONTRADICTION_RULES
    .filter(([a, b]) => present.has(a) && present.has(b))
    .map(([a, b]) => ({
      features: [a, b],
      description: `As evidências ${a} e ${b} entram em conflito.`
    }));
}

function scoreObservations(observations) {
  const normalized = observations.map(normalizeObservation);
  let fakeScore = 0;
  let authenticScore = 0;

  const details = normalized.map((item) => {
    const feature = FEATURE_CATALOG[item.feature];
    const value = feature.weight * item.quality;

    if (feature.direction === "fake") fakeScore += value;
    if (feature.direction === "authentic") authenticScore += value;

    return {
      feature: item.feature,
      category: feature.category,
      direction: feature.direction,
      criticality: feature.criticality,
      contribution: Number(value.toFixed(4)),
      description: feature.description,
      quality: item.quality,
      source: item.source
    };
  });

  const contradictions = detectContradictions(normalized);
  const contradictionPenalty = contradictions.length * 0.35;
  const coverage = clamp(normalized.length / 8, 0, 1);
  const raw = fakeScore - authenticScore + contradictionPenalty;
  const fakeProbability = clamp(sigmoid(raw), 0, 1);
  const authenticProbability = clamp(1 - fakeProbability, 0, 1);
  const confidence = clamp(0.35 + coverage * 0.45 - contradictionPenalty * 0.08, 0.05, 0.98);

  return {
    fakeScore: Number(fakeScore.toFixed(4)),
    authenticScore: Number(authenticScore.toFixed(4)),
    contradictionPenalty: Number(contradictionPenalty.toFixed(4)),
    contradictions,
    coverage: Number(coverage.toFixed(4)),
    fakeProbability: Number(fakeProbability.toFixed(4)),
    authenticProbability: Number(authenticProbability.toFixed(4)),
    confidence: Number(confidence.toFixed(4)),
    details
  };
}

function classifyFromScores(report) {
  const p = report.fakeProbability;
  if (report.contradictions.length >= 2 && report.confidence < 0.7) return "mixed_evidence";
  if (p >= 0.8) return "likely_fake";
  if (p >= 0.6) return "leaning_fake";
  if (p <= 0.2) return "likely_authentic";
  if (p <= 0.4) return "leaning_authentic";
  return "inconclusive";
}

function buildLlmEvaluationPrompt(packet) {
  return `
Você é um especialista em autenticação de dispositivos AirPods.
Analise o pacote abaixo e responda SOMENTE em JSON estruturado.

Regras:
- não conclua baseado em um único detalhe
- se houver pouca evidência, reduza a confiança
- se houver contradições, liste-as explicitamente
- diferencie observação de inferência
- use as classes:
  likely_authentic, leaning_authentic, inconclusive, leaning_fake, likely_fake, mixed_evidence

Pacote:
${JSON.stringify(packet, null, 2)}

Campos obrigatórios:
classification
confidence
fake_probability
authentic_probability
summary
key_findings
contradictions
missing_evidence
recommended_next_checks
`.trim();
}

function mergeRuleScoreWithLlm(ruleReport, llmReport) {
  if (!llmReport) {
    return {
      classification: classifyFromScores(ruleReport),
      fake_probability: ruleReport.fakeProbability,
      authentic_probability: ruleReport.authenticProbability,
      confidence: ruleReport.confidence,
      fusion_strategy: "rules_only"
    };
  }

  const fakeProbability = clamp(
    ruleReport.fakeProbability * 0.55 + Number(llmReport.fake_probability || 0) * 0.45,
    0,
    1
  );
  const authenticProbability = clamp(1 - fakeProbability, 0, 1);
  const confidence = clamp(
    ruleReport.confidence * 0.6 + Number(llmReport.confidence || 0) * 0.4,
    0,
    1
  );

  return {
    classification: llmReport.classification || classifyFromScores({ ...ruleReport, fakeProbability }),
    fake_probability: Number(fakeProbability.toFixed(4)),
    authentic_probability: Number(authenticProbability.toFixed(4)),
    confidence: Number(confidence.toFixed(4)),
    fusion_strategy: "rules_plus_llm"
  };
}

function classifyAirpodsAuthenticity(input) {
  const packet = buildEvidencePacket(input);
  const ruleReport = scoreObservations(packet.observations);
  const fused = mergeRuleScoreWithLlm(ruleReport, input.llmReport);
  const topFindings = [...ruleReport.details]
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 5)
    .map((item) => `${item.feature}: ${item.description}`);

  return {
    packet,
    rule_report: ruleReport,
    llm_prompt: buildLlmEvaluationPrompt(packet),
    result: {
      classification: fused.classification,
      fake_probability: fused.fake_probability,
      authentic_probability: fused.authentic_probability,
      confidence: fused.confidence,
      top_findings: topFindings,
      contradictions: ruleReport.contradictions.map((item) => item.description),
      recommended_next_checks: [
        "validar serial entre caixa e telefone",
        "comparar recursos de software",
        "inspecionar MagSafe e porta",
        "testar encaixe das pontas",
        "verificar inscrição traseira de fabricação"
      ]
    }
  };
}

const exampleCase = classifyAirpodsAuthenticity({
  deviceFamily: "AirPods Pro",
  claimedVersion: "2nd generation",
  elapsedMinutes: 3,
  observations: [
    { feature: "serial_mismatch_box_phone", quality: 0.98, source: "ios_settings" },
    { feature: "usb_port_black", quality: 0.88, source: "macro_image" },
    { feature: "noise_control_outside_ear", quality: 0.91, source: "user_test" },
    { feature: "ear_tips_fall_easily", quality: 0.84, source: "manual_test" },
    { feature: "fragile_lid", quality: 0.7, source: "manual_test" }
  ]
});

module.exports = {
  FEATURE_CATALOG,
  buildEvidencePacket,
  buildLlmEvaluationPrompt,
  classifyAirpodsAuthenticity,
  classifyFromScores,
  detectContradictions,
  exampleCase,
  mergeRuleScoreWithLlm,
  normalizeObservation,
  scoreObservations
};
