const evidenceItems = [
  { id: 1, image: "image/1.png", title: "Fundo da caixa preso", detail: "No original, o fundo da caixa é preso e não sai com facilidade.", category: "caixa", featured: true },
  { id: 2, image: "image/2.png", title: "Peso dos dois fones", detail: "O peso do conjunto ajuda a perceber construção e materiais fora do padrão.", category: "acabamento", featured: true },
  { id: 3, image: "image/3.png", title: "Tampa frágil", detail: "Se a tampa parecer frágil demais, o conjunto tende a indicar réplica.", category: "caixa", featured: true },
  { id: 4, image: "image/4.png", title: "USB preta na réplica", detail: "Nas réplicas, a porta USB interna costuma ser preta.", category: "porta", featured: true },
  { id: 5, image: "image/5.png", title: "USB branca no original", detail: "No original, o interior mostrado nessa comparação aparece branco.", category: "porta", featured: true },
  { id: 6, image: "image/6.png", title: "Comparação lado a lado", detail: "A foto compara original e falso no mesmo enquadramento para destacar diferenças.", category: "comparacao" },
  { id: 7, image: "image/7.png", title: "Som de carregamento sutil", detail: "No original, o som de carregamento é baixo e discreto.", category: "audio", featured: true },
  { id: 8, image: "image/8.png", title: "Design traseiro torto", detail: "Na réplica, o desenho ou gravação traseira pode ficar torto.", category: "acabamento", featured: true },
  { id: 9, image: "image/9.png", title: "Mais opções de configuração", detail: "O original mostra mais modos e opções de configuração que o falso.", category: "software", featured: true },
  { id: 10, image: "image/10.png", title: "Serial não bate", detail: "Na réplica, o número serial pode ser diferente entre caixa e telefone.", category: "serial", featured: true },
  { id: 11, image: "image/11.png", title: "Plástico com separador", detail: "O plástico que protege a caixinha original tem separador visível.", category: "embalagem" },
  { id: 12, image: "image/12.png", title: "Proteção da embalagem", detail: "A embalagem ajuda a confirmar o tipo de acabamento do original.", category: "embalagem" },
  { id: 13, image: "image/13.png", title: "Detalhe do invólucro", detail: "Observe o plástico protetor e como ele é dividido na caixa original.", category: "embalagem" },
  { id: 14, image: "image/14.png", title: "Separação do plástico", detail: "Outro ângulo do separador do plástico da embalagem original.", category: "embalagem" },
  { id: 15, image: "image/15.png", title: "Direita é original", detail: "Nesta comparação, a unidade da direita é a original.", category: "comparacao" },
  { id: 16, image: "image/16.png", title: "Borrachinhas firmes", detail: "No original, os protetores de ouvido não caem com facilidade.", category: "encaixe", featured: true },
  { id: 17, image: "image/17.png", title: "Borrachinha cai no falso", detail: "No falso, a borrachinha solta com mais facilidade.", category: "encaixe", featured: true },
  { id: 18, image: "image/18.png", title: "Fixação ruim da ponta", detail: "Outra imagem mostrando o problema de fixação no fone falso.", category: "encaixe" },
  { id: 19, image: "image/19.png", title: "Original fica preso", detail: "No original, as borrachinhas permanecem presas com mais segurança.", category: "encaixe" },
  { id: 20, image: "image/20.png", title: "Encaixe consistente", detail: "Mais uma comparação de firmeza nas pontas do original.", category: "encaixe" },
  { id: 21, image: "image/21.png", title: "Cancelamento fora da orelha", detail: "No falso, o cancelamento de ruído pode mudar mesmo fora da orelha.", category: "software", featured: true },
  { id: 22, image: "image/22.png", title: "Ruído com comportamento estranho", detail: "A troca de modo fora do uso real é um indício importante.", category: "software" },
  { id: 23, image: "image/23.png", title: "Controles inconsistentes", detail: "Mais um exemplo do comportamento irregular do cancelamento no fake.", category: "software" },
  { id: 24, image: "image/24.png", title: "Caixa com MagSafe", detail: "A caixa à direita seria original por apresentar MagSafe.", category: "magsafe", featured: true },
  { id: 25, image: "image/25.png", title: "Referência de MagSafe", detail: "Compare a estrutura da caixa com e sem MagSafe.", category: "magsafe" },
  { id: 26, image: "image/26.png", title: "Borda redonda no original", detail: "A borda mais redonda, à direita, seria a original nessa comparação.", category: "acabamento" },
  { id: 27, image: "image/27.png", title: "Caminha de plástico", detail: "No falso, a cama interna costuma ser de plástico; no original, de papel.", category: "embalagem", featured: true },
  { id: 28, image: "image/28.png", title: "Parte traseira mais clara", detail: "No original, a área traseira de contato para carga é mais clara.", category: "acabamento", featured: true },
  { id: 29, image: "image/29.png", title: "Diferença no tom do carregamento", detail: "Outro ângulo do contraste entre original e fake na parte traseira.", category: "acabamento" },
  { id: 30, image: "image/30.png", title: "Made in Vietnam", detail: "Na traseira deve estar escrito Made in Vietnam.", category: "fabricacao", featured: true },
  { id: 31, image: "image/31.png", title: "Caixa de papel", detail: "A caixa do fone original é de papel.", category: "embalagem", featured: true },
  { id: 32, image: "image/32.png", title: "Atualizações beta", detail: "As atualizações beta aparecem apenas no original, segundo o arquivo informativo.", category: "software", featured: true }
];

const notificationsSeed = [
  { id: 1, title: "Serial precisa bater", time: "Revisão essencial", unread: true },
  { id: 2, title: "MagSafe ajuda a validar a caixa", time: "Sinal físico", unread: true },
  { id: 3, title: "USB preta indica suspeita", time: "Acabamento", unread: true },
  { id: 4, title: "Borrachinha frouxa merece alerta", time: "Encaixe", unread: true }
];

const featuredSignals = evidenceItems.filter((item) => item.featured).slice(0, 6);
const testimonialItems = [
  evidenceItems.find((item) => item.id === 10),
  evidenceItems.find((item) => item.id === 24),
  evidenceItems.find((item) => item.id === 16),
  evidenceItems.find((item) => item.id === 30),
  evidenceItems.find((item) => item.id === 4)
].filter(Boolean);

const arcItems = evidenceItems.slice(0, 10);
const aiFeatureGroups = [
  {
    title: "Serial e software",
    options: [
      { feature: "serial_mismatch_box_phone", label: "Serial da caixa não bate com o telefone", detail: "Sinal crítico pró-falso." },
      { feature: "serial_match_box_phone", label: "Serial bate entre caixa e telefone", detail: "Sinal forte pró-original." },
      { feature: "more_settings_modes", label: "Existem mais modos/opções de configuração", detail: "Comportamento esperado do original." },
      { feature: "beta_updates_available", label: "Atualizações beta aparecem corretamente", detail: "Indício pró-original." },
      { feature: "noise_control_outside_ear", label: "Cancelamento muda fora da orelha", detail: "Sinal crítico de inconsistência." }
    ]
  },
  {
    title: "Caixa, materiais e porta",
    options: [
      { feature: "fragile_lid", label: "Tampa parece frágil", detail: "Indício físico comum em réplica." },
      { feature: "usb_port_black", label: "USB/porta interna é preta", detail: "Sinal suspeito." },
      { feature: "usb_port_white", label: "USB/porta interna parece branca", detail: "Mais compatível com original." },
      { feature: "magsafe_present_expected", label: "MagSafe está presente e faz sentido", detail: "Sinal complementar." },
      { feature: "paper_packaging_expected", label: "Embalagem interna parece papel", detail: "Mais compatível com original." },
      { feature: "plastic_inner_bed", label: "Cama interna parece plástico", detail: "Indício pró-falso." }
    ]
  },
  {
    title: "Acabamento e uso real",
    options: [
      { feature: "rear_text_misaligned", label: "Escrita ou design traseiro torto", detail: "Erro comum de acabamento." },
      { feature: "ear_tips_fall_easily", label: "Borrachinhas caem fácil", detail: "Sinal forte pró-falso." },
      { feature: "ear_tips_secure", label: "Borrachinhas ficam firmes", detail: "Sinal forte pró-original." },
      { feature: "made_in_vietnam_present", label: "Está escrito Made in Vietnam", detail: "Sinal complementar de fabricação." },
      { feature: "charging_sound_subtle", label: "Som de carregamento é sutil", detail: "Compatível com original." },
      { feature: "auto_switching_apple_ecosystem", label: "Troca automática entre dispositivos Apple funciona", detail: "Sinal forte pró-original." }
    ]
  }
];

function qs(id) {
  return document.getElementById(id);
}

function setTheme(theme, originEvent) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("airproof-theme", theme);

  const transition = qs("themeTransition");
  if (transition) {
    const x = originEvent?.clientX ?? window.innerWidth / 2;
    const y = originEvent?.clientY ?? 84;
    transition.style.setProperty("--x", `${x}px`);
    transition.style.setProperty("--y", `${y}px`);
    transition.classList.remove("is-active");
    window.requestAnimationFrame(() => transition.classList.add("is-active"));
  }

  document.querySelectorAll(".theme-option").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeValue === theme);
  });

  const thumb = document.querySelector(".theme-thumb");
  if (thumb) {
    const index = ["light", "dark", "dim"].indexOf(theme);
    thumb.style.transform = `translateX(${index * 100}%)`;
  }
}

function initThemeSwitcher() {
  const savedTheme = localStorage.getItem("airproof-theme") || "light";
  setTheme(savedTheme);

  document.querySelectorAll(".theme-switcher").forEach((switcher) => {
    switcher.querySelectorAll(".theme-option").forEach((button) => {
      button.addEventListener("click", (event) => setTheme(button.dataset.themeValue, event));
    });
  });
}

function initFirstVisitLoader() {
  const loader = qs("firstVisitLoader");
  if (!loader) return;

  const visited = localStorage.getItem("airproof-loader-seen");
  if (visited) {
    loader.classList.add("is-hidden");
    return;
  }

  document.body.classList.add("overlay-open");
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    document.body.classList.remove("overlay-open");
    localStorage.setItem("airproof-loader-seen", "1");
  }, 4200);
}

function renderSignals() {
  const grid = qs("signalGrid");
  if (!grid) return;

  grid.innerHTML = featuredSignals
    .map(
      (item) => `
        <article class="signal-card">
          <img class="signal-media" src="${item.image}" alt="${item.title}" />
          <span class="signal-card-tag">${item.category}</span>
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function initTestimonials() {
  const visuals = qs("testimonialVisuals");
  const title = qs("testimonialTitle");
  const caption = qs("testimonialCaption");
  const quote = qs("testimonialQuote");
  if (!visuals || !title || !caption || !quote) return;

  let activeIndex = 0;
  let intervalId;

  function paint() {
    const total = testimonialItems.length;
    visuals.innerHTML = testimonialItems
      .map((item, index) => {
        let pos = "hidden";
        if (index === activeIndex) pos = "center";
        else if (index === (activeIndex - 1 + total) % total) pos = "left";
        else if (index === (activeIndex + 1) % total) pos = "right";

        return `<figure class="testimonial-image-frame" data-pos="${pos}">
          <img src="${item.image}" alt="${item.title}" />
        </figure>`;
      })
      .join("");

    const item = testimonialItems[activeIndex];
    title.textContent = item.title;
    caption.textContent = `Categoria: ${item.category}`;
    quote.innerHTML = item.detail
      .split(" ")
      .map((word, index) => `<span class="word" style="animation-delay:${index * 28}ms">${word}&nbsp;</span>`)
      .join("");
  }

  function next(step = 1) {
    activeIndex = (activeIndex + step + testimonialItems.length) % testimonialItems.length;
    paint();
  }

  qs("prevTestimonial")?.addEventListener("click", () => next(-1));
  qs("nextTestimonial")?.addEventListener("click", () => next(1));

  paint();
  intervalId = window.setInterval(() => next(1), 5200);
  [qs("prevTestimonial"), qs("nextTestimonial"), visuals].forEach((element) => {
    element?.addEventListener("mouseenter", () => clearInterval(intervalId));
  });
}

function initArcGallery() {
  const stage = qs("arcStage");
  if (!stage) return;

  const radiusForWidth = () => {
    if (window.innerWidth < 640) return { radius: 160, size: 84 };
    if (window.innerWidth < 1024) return { radius: 220, size: 96 };
    return { radius: 300, size: 116 };
  };

  function renderArc() {
    const { radius, size } = radiusForWidth();
    const start = 22;
    const end = 158;
    const step = (end - start) / Math.max(arcItems.length - 1, 1);

    stage.innerHTML = arcItems
      .map((item, index) => {
        const angle = start + step * index;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return `
          <div class="arc-item" style="left:calc(50% + ${x}px); bottom:${y}px; width:${size}px; height:${size}px; animation-delay:${index * 80}ms">
            <img src="${item.image}" alt="${item.title}" />
          </div>
        `;
      })
      .join("");
  }

  renderArc();
  window.addEventListener("resize", renderArc);
}

function initNotifications() {
  const trigger = qs("notificationTrigger");
  const popover = qs("notificationPopover");
  const list = qs("notificationList");
  const counter = qs("notificationCount");
  const markRead = qs("markRead");
  if (!trigger || !popover || !list || !counter) return;

  let notifications = [...notificationsSeed];

  function render() {
    const unread = notifications.filter((item) => item.unread).length;
    counter.textContent = String(unread);
    counter.style.display = unread ? "inline-flex" : "none";

    list.innerHTML = notifications
      .map(
        (item) => `
          <article class="notification-item ${item.unread ? "is-unread" : ""}" data-id="${item.id}">
            <div class="notification-copy">
              <strong>${item.title}</strong>
              <small>${item.time}</small>
            </div>
            ${item.unread ? '<span class="notification-dot"></span>' : ""}
          </article>
        `
      )
      .join("");

    list.querySelectorAll(".notification-item").forEach((node) => {
      node.addEventListener("click", () => {
        notifications = notifications.map((item) =>
          item.id === Number(node.dataset.id) ? { ...item, unread: false } : item
        );
        render();
      });
    });
  }

  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!open));
    popover.hidden = open;
  });

  markRead?.addEventListener("click", () => {
    notifications = notifications.map((item) => ({ ...item, unread: false }));
    render();
  });

  document.addEventListener("click", (event) => {
    if (!popover.hidden && !popover.contains(event.target) && !trigger.contains(event.target)) {
      popover.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  render();
}

function initInactivityOverlay() {
  const overlay = qs("activityOverlay");
  const canvas = qs("activityWarpCanvas");
  if (!overlay || !canvas) return;

  const ctx = canvas.getContext("2d");
  let rafId = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let timer;
  const timeout = 2 * 60 * 1000;
  const palette = [
    [56, 182, 255],
    [153, 118, 255],
    [62, 255, 191],
    [126, 78, 255]
  ];

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function mixColor(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t)
    ];
  }

  function toCss(rgb, alpha = 1) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }

  function renderWarp(now) {
    const t = now * 0.001;
    const cell = Math.max(20, Math.min(width, height) * 0.1);
    const cols = Math.ceil(width / cell) + 3;
    const rows = Math.ceil(height / cell) + 3;
    const cx = width * 0.5;
    const cy = height * 0.5;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(4, 7, 14, 0.12)";
    ctx.fillRect(0, 0, width, height);

    for (let row = -1; row < rows; row += 1) {
      for (let col = -1; col < cols; col += 1) {
        const baseX = col * cell;
        const baseY = row * cell;
        const centerX = baseX + cell * 0.5;
        const centerY = baseY + cell * 0.5;
        const dx = centerX - cx;
        const dy = centerY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const swirl = 0.8;
        const distortion = 0.25;
        const angle = Math.atan2(dy, dx) + swirl * Math.sin(dist * 0.01 - t * 0.9);
        const drift = distortion * cell * Math.sin(dx * 0.01 + dy * 0.008 + t);
        const warpX = centerX + Math.cos(angle) * drift;
        const warpY = centerY + Math.sin(angle) * drift;
        const check = (row + col) % 2 === 0 ? 0 : 1;
        const wave = 0.5 + 0.5 * Math.sin(t + row * 0.45 + col * 0.33);
        const c1 = palette[(row + cols + col) % palette.length];
        const c2 = palette[(row + cols + col + 1) % palette.length];
        const rgb = mixColor(c1, c2, wave);

        ctx.save();
        ctx.translate(warpX, warpY);
        ctx.rotate(Math.sin(t * 0.5 + row * 0.17 + col * 0.21) * 0.22);
        ctx.scale(1 + Math.sin(t + col * 0.4) * 0.08, 1 + Math.cos(t + row * 0.4) * 0.08);
        ctx.fillStyle = toCss(rgb, check ? 0.88 : 0.72);
        ctx.fillRect(-cell * 0.52, -cell * 0.52, cell * 1.04, cell * 1.04);
        ctx.restore();
      }
    }

    const glowA = ctx.createRadialGradient(width * 0.24, height * 0.3, 0, width * 0.24, height * 0.3, width * 0.35);
    glowA.addColorStop(0, "rgba(62, 164, 255, 0.32)");
    glowA.addColorStop(1, "rgba(62, 164, 255, 0)");
    ctx.fillStyle = glowA;
    ctx.fillRect(0, 0, width, height);

    const glowB = ctx.createRadialGradient(width * 0.72, height * 0.34, 0, width * 0.72, height * 0.34, width * 0.32);
    glowB.addColorStop(0, "rgba(143, 103, 255, 0.3)");
    glowB.addColorStop(1, "rgba(143, 103, 255, 0)");
    ctx.fillStyle = glowB;
    ctx.fillRect(0, 0, width, height);

    const glowC = ctx.createRadialGradient(width * 0.5, height * 0.82, 0, width * 0.5, height * 0.82, width * 0.38);
    glowC.addColorStop(0, "rgba(62, 255, 191, 0.24)");
    glowC.addColorStop(1, "rgba(62, 255, 191, 0)");
    ctx.fillStyle = glowC;
    ctx.fillRect(0, 0, width, height);

    rafId = window.requestAnimationFrame(renderWarp);
  }

  resizeCanvas();
  rafId = window.requestAnimationFrame(renderWarp);
  window.addEventListener("resize", resizeCanvas);

  function openOverlay() {
    overlay.classList.add("is-active");
  }

  function resetTimer() {
    overlay.classList.remove("is-active");
    clearTimeout(timer);
    timer = window.setTimeout(openOverlay, timeout);
  }

  ["mousemove", "mousedown", "keydown", "touchstart", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, resetTimer, { passive: true });
  });

  resetTimer();
}

function initGallery() {
  const filtersRoot = qs("galleryFilters");
  const galleryRoot = qs("fullGallery");
  if (!filtersRoot || !galleryRoot) return;

  const categories = ["todos", ...new Set(evidenceItems.map((item) => item.category))];
  let activeFilter = "todos";

  function renderFilters() {
    filtersRoot.innerHTML = categories
      .map(
        (category) => `
          <button type="button" class="gallery-filter ${category === activeFilter ? "is-active" : ""}" data-filter="${category}">
            ${category}
          </button>
        `
      )
      .join("");

    filtersRoot.querySelectorAll(".gallery-filter").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        renderFilters();
        renderGallery();
      });
    });
  }

  function renderGallery() {
    const items = activeFilter === "todos"
      ? evidenceItems
      : evidenceItems.filter((item) => item.category === activeFilter);

    galleryRoot.innerHTML = items
      .map(
        (item) => `
          <article class="gallery-card">
            <img src="${item.image}" alt="${item.title}" />
            <div class="gallery-card-copy">
              <div class="gallery-meta">
                <span>Foto ${item.id}</span>
                <span>${item.category}</span>
              </div>
              <h3>${item.title}</h3>
              <p>${item.detail}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  renderFilters();
  renderGallery();
}

function initRevealEffects() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
    observer.observe(item);
  });
}

function renderAiFeatureGroups() {
  const root = qs("aiFeatureGroups");
  if (!root) return;

  root.innerHTML = aiFeatureGroups
    .map(
      (group) => `
        <section class="ai-group">
          <h3>${group.title}</h3>
          <div class="ai-option-grid">
            ${group.options
              .map(
                (option) => `
                  <label class="ai-option">
                    <input type="checkbox" name="aiFeature" value="${option.feature}" />
                    <span>
                      <strong>${option.label}</strong>
                      <small>${option.detail}</small>
                    </span>
                  </label>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function formatPercent(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

async function parseApiJsonResponse(response) {
  const raw = await response.text();
  if (!raw || !raw.trim()) {
    throw new Error(`A rota ${response.url || "/api/ai-detect"} respondeu sem corpo. Verifique a função serverless e as variáveis da OpenRouter.`);
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    if (raw.trim().startsWith("<")) {
      throw new Error("A rota de IA não retornou JSON. Isso geralmente indica erro de deploy, rota ausente ou falha da função serverless.");
    }
    throw new Error(`A rota de IA retornou um corpo inválido: ${raw.slice(0, 220)}`);
  }
}

function renderList(root, items, emptyText) {
  root.innerHTML = (items && items.length ? items : [emptyText])
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function initAiAnalysis() {
  const form = qs("aiAnalysisForm");
  if (!form) return;

  renderAiFeatureGroups();

  const submitButton = qs("aiSubmitButton");
  const presetButton = qs("aiPresetButton");
  const emptyState = qs("aiEmptyState");
  const resultBody = qs("aiResultBody");

  presetButton?.addEventListener("click", () => {
    const preset = [
      "serial_mismatch_box_phone",
      "usb_port_black",
      "fragile_lid",
      "noise_control_outside_ear",
      "ear_tips_fall_easily"
    ];
    form.querySelectorAll('input[name="aiFeature"]').forEach((input) => {
      input.checked = preset.includes(input.value);
    });
    form.elements.notes.value =
      "O vendedor afirma que é original, mas a tampa parece frágil, a porta interna é preta e o iPhone mostra comportamento estranho no cancelamento.";
    form.elements.claimedVersion.value = "2nd generation";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selected = [...form.querySelectorAll('input[name="aiFeature"]:checked')].map((input) => input.value);
    const quality = Number(form.elements.globalQuality.value || 0.9);
    const payload = {
      deviceFamily: form.elements.deviceFamily.value,
      claimedVersion: form.elements.claimedVersion.value,
      context: {
        notes: form.elements.notes.value.trim()
      },
      observations: selected.map((feature) => ({
        feature,
        quality,
        source: "user_selection",
        notes: form.elements.notes.value.trim()
      }))
    };

    submitButton.disabled = true;
    submitButton.textContent = "Analisando...";

    try {
      const response = await fetch("/api/ai-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await parseApiJsonResponse(response);
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Falha ao executar análise com IA.");
      }

      emptyState.hidden = true;
      resultBody.hidden = false;

      qs("aiClassification").textContent = data.result.classification;
      qs("aiStatusBadge").textContent = data.llm_status === "ok" ? "OpenRouter ativo" : "Fallback parcial";
      qs("aiFakeProbability").textContent = formatPercent(data.result.fake_probability);
      qs("aiConfidence").textContent = formatPercent(data.result.confidence);
      qs("aiFakeBar").style.width = formatPercent(data.result.fake_probability);
      qs("aiConfidenceBar").style.width = formatPercent(data.result.confidence);
      qs("aiSummary").textContent =
        data.llm_report?.summary ||
        `Classificação ${data.result.classification} com base no cruzamento entre regras e evidências fornecidas.`;

      renderList(qs("aiFindings"), data.llm_report?.key_findings || data.result.top_findings, "Nenhum achado principal listado.");
      renderList(qs("aiNextChecks"), data.llm_report?.recommended_next_checks || data.result.recommended_next_checks, "Nenhum próximo passo sugerido.");
      renderList(qs("aiContradictions"), data.llm_report?.contradictions || data.result.contradictions, "Nenhuma contradição relevante detectada.");
      renderList(qs("aiWarnings"), data.warnings, "Sem avisos adicionais.");
    } catch (error) {
      emptyState.hidden = true;
      resultBody.hidden = false;
      qs("aiClassification").textContent = "erro";
      qs("aiStatusBadge").textContent = "Falha";
      qs("aiFakeProbability").textContent = "--";
      qs("aiConfidence").textContent = "--";
      qs("aiFakeBar").style.width = "0%";
      qs("aiConfidenceBar").style.width = "0%";
      qs("aiSummary").textContent = error.message || "Não foi possível completar a análise.";
      renderList(qs("aiFindings"), [], "Nenhum resultado disponível.");
      renderList(qs("aiNextChecks"), [], "Tente novamente após revisar o servidor.");
      renderList(qs("aiContradictions"), [], "Sem dados.");
      renderList(qs("aiWarnings"), [error.message || "Erro inesperado."], "Erro.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Analisar com IA";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initFirstVisitLoader();
  renderSignals();
  initTestimonials();
  initArcGallery();
  initNotifications();
  initInactivityOverlay();
  initGallery();
  initRevealEffects();
  initAiAnalysis();
});
