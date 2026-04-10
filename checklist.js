const checklistQuestions = [
  {
    id: "device_known",
    title: "Você sabe qual versão do AirPods comprou?",
    detail: "Isso ajuda a julgar se recursos como MagSafe, USB-C e interface batem com o modelo alegado.",
    options: [
      { value: "yes", label: "Sim, sei a versão", description: "O checklist aprofunda com mais precisão." },
      { value: "no", label: "Não tenho certeza", description: "O sistema continua, mas com mais cautela." },
      { value: "unknown", label: "Prefiro não responder", description: "A análise segue com menor cobertura." }
    ]
  },
  {
    id: "serial_checked",
    title: "Você comparou o número serial da caixa com o número visto no iPhone?",
    detail: "Esse é um dos checkpoints mais valiosos do fluxo.",
    options: [
      { value: "yes", label: "Sim, comparei", description: "Segue para validação do resultado." },
      { value: "no", label: "Não comparei", description: "O laudo final vai recomendar esse teste." },
      { value: "unknown", label: "Não consigo verificar agora", description: "A análise perde um sinal crítico." }
    ]
  },
  {
    id: "serial_match",
    dependsOn: { id: "serial_checked", values: ["yes"] },
    title: "O serial bate exatamente entre caixa e telefone?",
    detail: "Inconsistência aqui é um sinal crítico de falsificação.",
    options: [
      { value: "yes", label: "Sim, bate", description: "Sinal forte pró-original.", observations: ["serial_match_box_phone"] },
      { value: "no", label: "Não bate", description: "Sinal crítico pró-falso.", observations: ["serial_mismatch_box_phone"] },
      { value: "unknown", label: "Ficou inconclusivo", description: "Continua o fluxo com cautela." }
    ]
  },
  {
    id: "usb_color",
    title: "Ao observar a caixa, a parte interna da porta parece preta ou branca?",
    detail: "No material-base do projeto, a porta preta aparece como um indício relevante de réplica.",
    options: [
      { value: "black", label: "Preta", description: "Sinal suspeito.", observations: ["usb_port_black"] },
      { value: "white", label: "Branca", description: "Mais compatível com original.", observations: ["usb_port_white"] },
      { value: "unknown", label: "Não consegui ver", description: "Siga para os próximos testes." }
    ]
  },
  {
    id: "lid_strength",
    title: "A tampa da caixa parece firme ou frágil demais?",
    detail: "A sensação de construção ainda é um filtro útil.",
    options: [
      { value: "fragile", label: "Parece frágil", description: "Indício físico pró-falso.", observations: ["fragile_lid"] },
      { value: "firm", label: "Parece firme", description: "Sem penalidade direta, mas seguimos checando." },
      { value: "unknown", label: "Não sei dizer", description: "O fluxo continua." }
    ]
  },
  {
    id: "rear_text",
    title: "A escrita ou o desenho traseiro parecem tortos ou mal alinhados?",
    detail: "Desalinhamento de acabamento aparece com frequência nas réplicas.",
    options: [
      { value: "yes", label: "Sim, parece torto", description: "Sinal de acabamento suspeito.", observations: ["rear_text_misaligned"] },
      { value: "no", label: "Não, está alinhado", description: "Bom sinal, mas não encerra o caso." },
      { value: "unknown", label: "Não consegui observar", description: "A análise segue." }
    ]
  },
  {
    id: "magsafe",
    title: "A caixa tem MagSafe de forma compatível com a versão alegada?",
    detail: "Use essa resposta apenas se você sabe qual versão está analisando.",
    options: [
      { value: "yes", label: "Sim", description: "Sinal complementar pró-original.", observations: ["magsafe_present_expected"] },
      { value: "no", label: "Não", description: "Sem penalidade automática sem contexto completo." },
      { value: "unknown", label: "Não sei", description: "Siga para os próximos checkpoints." }
    ]
  },
  {
    id: "packaging_paper",
    title: "A embalagem interna e a cama da caixa parecem papel bem-acabado?",
    detail: "No projeto-base, papel coerente ajuda e plástico interno suspeito pesa contra.",
    options: [
      { value: "paper", label: "Sim, parece papel", description: "Sinal pró-original.", observations: ["paper_packaging_expected"] },
      { value: "plastic", label: "Não, parece plástico", description: "Sinal pró-falso.", observations: ["plastic_inner_bed"] },
      { value: "unknown", label: "Não tenho essa evidência", description: "Continua o fluxo." }
    ]
  },
  {
    id: "tips_secure",
    title: "As borrachinhas ficam presas com firmeza quando você testa o encaixe?",
    detail: "Esse é um teste de uso real importante.",
    options: [
      { value: "secure", label: "Sim, ficam firmes", description: "Sinal forte pró-original.", observations: ["ear_tips_secure"] },
      { value: "fall", label: "Não, caem fácil", description: "Sinal forte pró-falso.", observations: ["ear_tips_fall_easily"] },
      { value: "unknown", label: "Não testei", description: "A cobertura fica menor." }
    ]
  },
  {
    id: "charging_sound",
    title: "O som de carregamento parece discreto e sutil?",
    detail: "Sozinho isso não decide, mas ajuda a compor o quadro.",
    options: [
      { value: "yes", label: "Sim", description: "Sinal complementar pró-original.", observations: ["charging_sound_subtle"] },
      { value: "no", label: "Não", description: "Continuamos com outros critérios mais fortes." },
      { value: "unknown", label: "Não percebi", description: "Sem impacto direto." }
    ]
  },
  {
    id: "ios_settings_seen",
    title: "Você abriu as configurações do AirPods em um iPhone compatível?",
    detail: "Sem isso, várias perguntas de software são puladas.",
    options: [
      { value: "yes", label: "Sim", description: "O checklist aprofunda software." },
      { value: "no", label: "Não", description: "O laudo final vai pedir esse teste." },
      { value: "unknown", label: "Não tenho iPhone agora", description: "A análise segue com menos cobertura." }
    ]
  },
  {
    id: "settings_modes",
    dependsOn: { id: "ios_settings_seen", values: ["yes"] },
    title: "As configurações mostram mais modos e opções coerentes com AirPods original?",
    detail: "No conteúdo-base, o original costuma expor mais controles.",
    options: [
      { value: "yes", label: "Sim, há várias opções", description: "Sinal forte pró-original.", observations: ["more_settings_modes"] },
      { value: "no", label: "Não, achei limitado", description: "Seguimos investigando o software." },
      { value: "unknown", label: "Não consegui interpretar", description: "Sem impacto direto." }
    ]
  },
  {
    id: "beta_updates",
    dependsOn: { id: "ios_settings_seen", values: ["yes"] },
    title: "Você percebeu presença coerente de atualizações beta ou comportamento compatível de firmware?",
    detail: "Sinal complementar avançado.",
    options: [
      { value: "yes", label: "Sim", description: "Sinal pró-original.", observations: ["beta_updates_available"] },
      { value: "no", label: "Não", description: "Sem conclusão isolada." },
      { value: "unknown", label: "Não sei verificar", description: "O checklist continua." }
    ]
  },
  {
    id: "noise_control_behavior",
    dependsOn: { id: "ios_settings_seen", values: ["yes"] },
    title: "O cancelamento de ruído muda mesmo quando o fone está fora da orelha?",
    detail: "Esse comportamento foi tratado como um sinal crítico no algoritmo.",
    options: [
      { value: "yes", label: "Sim, muda fora da orelha", description: "Sinal crítico pró-falso.", observations: ["noise_control_outside_ear"] },
      { value: "no", label: "Não, o comportamento parece normal", description: "Bom sinal de consistência." },
      { value: "unknown", label: "Não testei", description: "A análise segue." }
    ]
  },
  {
    id: "auto_switching",
    title: "A troca automática entre dispositivos Apple funciona de forma natural?",
    detail: "É um dos melhores sinais de integração real no ecossistema.",
    options: [
      { value: "yes", label: "Sim, funciona bem", description: "Sinal forte pró-original.", observations: ["auto_switching_apple_ecosystem"] },
      { value: "no", label: "Não, não funciona direito", description: "Sinal de suspeita importante, ainda que indireto." },
      { value: "unknown", label: "Não testei", description: "Sem impacto direto." }
    ]
  },
  {
    id: "made_in_vietnam",
    title: "Na traseira ou gravação, aparece “Made in Vietnam” de forma coerente?",
    detail: "Esse é um checkpoint complementar de fabricação.",
    options: [
      { value: "yes", label: "Sim", description: "Sinal complementar pró-original.", observations: ["made_in_vietnam_present"] },
      { value: "no", label: "Não", description: "Sem conclusão isolada; depende do restante do caso." },
      { value: "unknown", label: "Não consegui ver", description: "Seguimos." }
    ]
  },
  {
    id: "seller_price",
    title: "O preço e o contexto da compra pareceram muito abaixo do normal?",
    detail: "Não entra como prova técnica no algoritmo, mas ajuda a interpretar risco contextual.",
    options: [
      { value: "yes", label: "Sim, suspeitamente barato", description: "Aumenta o risco contextual." },
      { value: "no", label: "Não, parecia normal", description: "Sem impacto direto." },
      { value: "unknown", label: "Prefiro não responder", description: "Sem impacto direto." }
    ]
  }
];

const checklistState = {
  answers: {},
  activeIndex: 0
};

function checklistQs(id) {
  return document.getElementById(id);
}

function getVisibleQuestions() {
  return checklistQuestions.filter((question) => {
    if (!question.dependsOn) return true;
    const answered = checklistState.answers[question.dependsOn.id];
    return question.dependsOn.values.includes(answered);
  });
}

function getCurrentQuestion() {
  const visible = getVisibleQuestions();
  return visible[Math.min(checklistState.activeIndex, visible.length - 1)] || null;
}

function formatPercent(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

async function parseChecklistApiJsonResponse(response) {
  const raw = await response.text();
  if (!raw || !raw.trim()) {
    throw new Error(`A rota ${response.url || "/api/ai-detect"} respondeu sem corpo. Revise a função serverless na Vercel.`);
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    if (raw.trim().startsWith("<")) {
      throw new Error("A API de IA respondeu HTML em vez de JSON. Isso normalmente significa erro de deploy, rota ausente ou falha da função.");
    }
    throw new Error(`A API de IA retornou um corpo inválido: ${raw.slice(0, 220)}`);
  }
}

function collectObservations() {
  const observations = [];
  const liveFindings = [];
  let fakeCount = 0;
  let authenticCount = 0;

  checklistQuestions.forEach((question) => {
    const answer = checklistState.answers[question.id];
    const option = question.options.find((item) => item.value === answer);
    if (!option || !option.observations) return;

    option.observations.forEach((feature) => {
      observations.push({
        feature,
        quality: 0.92,
        source: "guided_checklist",
        notes: `${question.title} -> ${option.label}`
      });
      liveFindings.push(`${option.label}: ${question.title}`);
      if (feature.includes("mismatch") || feature.includes("black") || feature.includes("fragile") || feature.includes("misaligned") || feature.includes("fall") || feature.includes("plastic") || feature.includes("noise_control")) {
        fakeCount += 1;
      } else {
        authenticCount += 1;
      }
    });
  });

  return { observations, liveFindings, fakeCount, authenticCount };
}

function renderSidebar() {
  const visible = getVisibleQuestions();
  const answeredCount = Object.keys(checklistState.answers).filter((id) => visible.some((q) => q.id === id)).length;
  const progress = visible.length ? answeredCount / visible.length : 0;
  const { liveFindings, fakeCount, authenticCount } = collectObservations();

  checklistQs("checklistProgressBar").style.width = formatPercent(progress);
  checklistQs("checklistProgressLabel").textContent = formatPercent(progress);
  checklistQs("checklistStepLabel").textContent = `${answeredCount} respostas úteis`;
  checklistQs("checklistFakeCount").textContent = String(fakeCount);
  checklistQs("checklistAuthenticCount").textContent = String(authenticCount);
  checklistQs("checklistSidebarTitle").textContent =
    answeredCount < 4 ? "Ainda no começo." : answeredCount < 8 ? "Cobertura intermediária." : "Cobertura forte do caso.";
  checklistQs("checklistSidebarText").textContent =
    answeredCount < 4
      ? "O sistema ainda precisa de mais checkpoints antes de formar um laudo sólido."
      : answeredCount < 8
        ? "O caso já tem sinais suficientes para começar a diferenciar original e falso."
        : "O pacote de evidências já está robusto para uma consolidação com IA.";

  const findingsRoot = checklistQs("checklistLiveFindings");
  findingsRoot.innerHTML = (liveFindings.length ? liveFindings.slice(-6) : ["Nenhum achado relevante acumulado ainda."])
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderQuestion() {
  const visible = getVisibleQuestions();
  if (checklistState.activeIndex >= visible.length) {
    checklistState.activeIndex = Math.max(visible.length - 1, 0);
  }

  const question = getCurrentQuestion();
  if (!question) return;

  checklistQs("checklistCounter").textContent = `Pergunta ${checklistState.activeIndex + 1} de ${visible.length}`;
  checklistQs("checklistQuestionTitle").textContent = question.title;
  checklistQs("checklistQuestionDetail").textContent = question.detail;

  const selected = checklistState.answers[question.id];
  checklistQs("checklistOptions").innerHTML = question.options
    .map(
      (option) => `
        <label class="checklist-option ${selected === option.value ? "is-selected" : ""}">
          <input type="radio" name="checklistQuestion" value="${option.value}" ${selected === option.value ? "checked" : ""} />
          <span>
            <strong>${option.label}</strong>
            <small>${option.description}</small>
          </span>
        </label>
      `
    )
    .join("");

  checklistQs("checklistOptions").querySelectorAll('input[name="checklistQuestion"]').forEach((input) => {
    input.addEventListener("change", () => {
      checklistState.answers[question.id] = input.value;
      renderQuestion();
      renderSidebar();
    });
  });

  checklistQs("checklistBackButton").disabled = checklistState.activeIndex === 0;
}

function moveChecklist(step) {
  const visible = getVisibleQuestions();
  const current = getCurrentQuestion();
  if (!current) return;

  if (step > 0 && !checklistState.answers[current.id]) {
    return;
  }

  checklistState.activeIndex = Math.max(0, Math.min(checklistState.activeIndex + step, visible.length - 1));
  renderQuestion();
  renderSidebar();
}

function renderChecklistList(rootId, items, fallbackText) {
  checklistQs(rootId).innerHTML = (items && items.length ? items : [fallbackText])
    .map((item) => `<li>${item}</li>`)
    .join("");
}

async function analyzeChecklist() {
  const { observations } = collectObservations();
  const body = {
    deviceFamily: "AirPods Pro",
    claimedVersion: checklistState.answers.device_known === "yes" ? "known_by_user" : "unknown",
    context: {
      checklist_answers: checklistState.answers
    },
    observations
  };

  const button = checklistQs("checklistAnalyzeButton");
  button.disabled = true;
  button.textContent = "Gerando laudo...";

  try {
    const response = await fetch("/api/ai-detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await parseChecklistApiJsonResponse(response);
    if (!response.ok || !data.ok) throw new Error(data.error || "Falha ao gerar laudo.");

    checklistQs("checklistReportEmpty").hidden = true;
    checklistQs("checklistReportBody").hidden = false;
    checklistQs("checklistClassification").textContent = data.result.classification;
    checklistQs("checklistStatusBadge").textContent = data.llm_status === "ok" ? "Checklist + OpenRouter" : "Checklist + fallback parcial";
    checklistQs("checklistFakeProbability").textContent = formatPercent(data.result.fake_probability);
    checklistQs("checklistConfidence").textContent = formatPercent(data.result.confidence);
    checklistQs("checklistFakeBar").style.width = formatPercent(data.result.fake_probability);
    checklistQs("checklistConfidenceBar").style.width = formatPercent(data.result.confidence);
    checklistQs("checklistSummary").textContent =
      data.llm_report?.summary ||
      "Laudo consolidado com base no checklist adaptativo e no motor de detecção do AirProof.";

    renderChecklistList("checklistFindings", data.llm_report?.key_findings || data.result.top_findings, "Sem achados principais listados.");
    renderChecklistList("checklistNextChecks", data.llm_report?.recommended_next_checks || data.result.recommended_next_checks, "Sem próximos testes sugeridos.");
    renderChecklistList("checklistContradictions", data.llm_report?.contradictions || data.result.contradictions, "Nenhuma contradição relevante detectada.");
    renderChecklistList("checklistWarnings", data.warnings, "Sem avisos adicionais.");
  } catch (error) {
    checklistQs("checklistReportEmpty").hidden = true;
    checklistQs("checklistReportBody").hidden = false;
    checklistQs("checklistClassification").textContent = "erro";
    checklistQs("checklistStatusBadge").textContent = "Falha";
    checklistQs("checklistFakeProbability").textContent = "--";
    checklistQs("checklistConfidence").textContent = "--";
    checklistQs("checklistFakeBar").style.width = "0%";
    checklistQs("checklistConfidenceBar").style.width = "0%";
    checklistQs("checklistSummary").textContent = error.message || "Não foi possível gerar o laudo.";
    renderChecklistList("checklistFindings", [], "Nenhum resultado disponível.");
    renderChecklistList("checklistNextChecks", [], "Tente novamente após revisar a configuração.");
    renderChecklistList("checklistContradictions", [], "Sem dados.");
    renderChecklistList("checklistWarnings", [error.message || "Erro inesperado."], "Erro.");
  } finally {
    button.disabled = false;
    button.textContent = "Gerar laudo final";
  }
}

function resetChecklist() {
  checklistState.answers = {};
  checklistState.activeIndex = 0;
  checklistQs("checklistReportEmpty").hidden = false;
  checklistQs("checklistReportBody").hidden = true;
  renderQuestion();
  renderSidebar();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.body || document.body.dataset.page !== "checklist") return;

  checklistQs("checklistNextButton")?.addEventListener("click", () => moveChecklist(1));
  checklistQs("checklistBackButton")?.addEventListener("click", () => moveChecklist(-1));
  checklistQs("checklistAnalyzeButton")?.addEventListener("click", analyzeChecklist);
  checklistQs("checklistResetButton")?.addEventListener("click", resetChecklist);

  renderQuestion();
  renderSidebar();
});
