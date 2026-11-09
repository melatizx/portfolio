/* ============================================================
   INFRAESTRUTURA ABSTRATA (camada visual global)
   ------------------------------------------------------------
   Monta, atrás do conteúdo, um data center abstrato em 3 camadas
   de profundidade (far / mid / near): racks, LEDs e linhas de
   barramento com pulsos de dados. A composição é gerada por
   perfil de viewport (desktop / tablet / mobile), não escalada
   como imagem.

   Este arquivo NÃO acessa API nem dados. Só decoração.
   Movimento: animações CSS + um único listener de scroll que,
   via requestAnimationFrame, aplica um parallax suavizado e
   limitado (só roda enquanto há movimento a assentar).
   ============================================================ */
(function () {
  "use strict";

  const root = document.getElementById("infra");
  if (!root) return;

  const stage = root.querySelector(".infra-stage");
  const layers = {
    far: root.querySelector(".infra-layer--far"),
    mid: root.querySelector(".infra-layer--mid"),
    near: root.querySelector(".infra-layer--near")
  };
  if (!stage || !layers.far || !layers.mid || !layers.near) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Perfis por viewport ----------
     racks: quantidade | w: largura [min,max] px | u: altura da unidade px
     leds: máx. de LEDs por rack | lines: linhas de barramento (com pulso) */
  const PROFILES = {
    desktop: {
      speed: 1, parallax: 1,
      far:  { racks: 9, w: [50, 76],   u: 12, leds: 3, lines: 3 },
      mid:  { racks: 5, w: [86, 120],  u: 18, leds: 6, lines: 3 },
      near: { racks: 3, w: [124, 172], u: 26, leds: 9, lines: 2 }
    },
    tablet: {
      speed: 1.25, parallax: 0.65,
      far:  { racks: 5, w: [42, 60],  u: 11, leds: 2, lines: 2 },
      mid:  { racks: 3, w: [70, 96],  u: 16, leds: 4, lines: 2 },
      near: { racks: 2, w: [96, 130], u: 22, leds: 6, lines: 1 }
    },
    mobile: {
      speed: 1.6, parallax: 0.3,
      far:  { racks: 3, w: [30, 42], u: 10, leds: 2, lines: 2 },
      mid:  { racks: 2, w: [48, 64], u: 14, leds: 3, lines: 1 },
      near: { racks: 0, w: [0, 0],   u: 20, leds: 0, lines: 0 }
    }
  };

  const LAYER_ORDER = ["far", "mid", "near"];
  const PULSE_LENGTH = { far: 60, mid: 90, near: 130 };

  const pickProfile = (vw) => (vw >= 1100 ? "desktop" : vw >= 600 ? "tablet" : "mobile");

  // PRNG determinístico: a composição é a mesma a cada carga e a cada rebuild
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const el = (cls, parent) => {
    const node = document.createElement("div");
    node.className = cls;
    if (parent) parent.appendChild(node);
    return node;
  };

  /* ---------- Montagem ---------- */
  let current = { profile: "", vw: 0, vh: 0 };

  function build() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const name = pickProfile(vw);
    const profile = PROFILES[name];
    const rnd = mulberry32(20260607);
    const layerH = vh * 1.24; // as camadas têm folga para o parallax

    root.dataset.profile = name;
    root.style.setProperty("--speed", String(profile.speed));
    root.style.setProperty("--travel", `${vw + 220}px`);

    LAYER_ORDER.forEach((depth) => {
      const host = layers[depth];
      const cfg = profile[depth];
      const frag = document.createDocumentFragment();

      /* barramentos: linhas finas que atravessam a camada, com um pulso lento */
      for (let i = 0; i < cfg.lines; i++) {
        const y = Math.round((0.1 + rnd() * 0.8) * layerH / cfg.u) * cfg.u;
        const bus = el("bus", frag);
        bus.style.top = `${y}px`;

        const pulse = el("pulse", bus);
        const dur = 26 + rnd() * 20;
        pulse.style.width = `${PULSE_LENGTH[depth]}px`;
        pulse.style.setProperty("--dur", `${dur.toFixed(1)}s`);
        pulse.style.setProperty("--delay", `${(-rnd() * dur).toFixed(1)}s`);
      }

      /* racks distribuídos em colunas, com variação de altura e posição */
      const n = cfg.racks;
      for (let i = 0; i < n; i++) {
        const slot = vw / n;
        const maxW = Math.min(cfg.w[1], slot * 0.8);
        const w = Math.round(Math.min(maxW, cfg.w[0] + rnd() * (cfg.w[1] - cfg.w[0])));
        const center = (i + 0.5) * slot + (rnd() - 0.5) * slot * 0.3;
        const x = Math.max(8, Math.min(vw - w - 8, center - w / 2));

        const units = Math.max(6, Math.floor((layerH * (0.5 + rnd() * 0.5)) / cfg.u));
        const h = units * cfg.u;
        const top = Math.round(rnd() * (layerH - h));

        const rack = el("rack", frag);
        rack.style.left = `${((x / vw) * 100).toFixed(2)}%`;
        rack.style.top = `${top}px`;
        rack.style.width = `${w}px`;
        rack.style.height = `${h}px`;
        rack.style.setProperty("--u", `${cfg.u}px`);

        /* LEDs: linhas distintas, intervalos e fases diferentes */
        const count = Math.min(cfg.leds, Math.floor(units / 3));
        const used = new Set();
        for (let k = 0; k < count; k++) {
          let row = Math.floor(rnd() * units);
          if (used.has(row)) continue;
          used.add(row);

          const led = el(rnd() < 0.18 ? "led led--accent" : "led", rack);
          led.style.top = `${row * cfg.u + cfg.u / 2 - 1}px`;
          led.style.left = `${(76 + rnd() * 16).toFixed(1)}%`;
          led.style.setProperty("--dur", `${(5 + rnd() * 10).toFixed(1)}s`);
          led.style.setProperty("--delay", `${(-rnd() * 14).toFixed(1)}s`);
          led.style.setProperty("--peak", (0.55 + rnd() * 0.45).toFixed(2));
          // posição estática para reduced-motion: apenas alguns LEDs acesos
          if (k % 3 === 0) led.classList.add("led--on");
        }
      }

      host.replaceChildren(frag);
    });

    current = { profile: name, vw, vh };
    root.classList.add("is-ready");
    syncScroll(true);
  }

  /* ---------- Scroll: um listener, rAF só enquanto há movimento ---------- */
  // deslocamento máximo (px) por camada; a camada próxima move mais
  const DEPTH_FACTOR = { far: 0.25, mid: 0.55, near: 1 };

  let target = 0;      // scrollY real
  let eased = 0;       // valor suavizado aplicado ao DOM
  let ticking = false;
  let lastFade = -1;

  function apply() {
    const p = PROFILES[current.profile] || PROFILES.desktop;
    // satura suavemente: o efeito é sutil e nunca ultrapassa a folga da camada
    const maxShift = Math.min(110 * p.parallax, window.innerHeight * 0.1);
    const s = Math.tanh(eased / 2400);

    LAYER_ORDER.forEach((depth) => {
      const dy = -(s * maxShift * DEPTH_FACTOR[depth]);
      layers[depth].style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0)`;
    });

    // infraestrutura mais visível no hero e mais discreta nas demais seções
    const t = Math.min(1, eased / (window.innerHeight * 0.9));
    const fade = 1 - 0.6 * t;
    if (Math.abs(fade - lastFade) > 0.004) {
      stage.style.opacity = fade.toFixed(3);
      lastFade = fade;
    }
  }

  function tick() {
    const diff = target - eased;
    if (Math.abs(diff) < 0.4) {
      eased = target;
      apply();
      ticking = false;
      return;
    }
    eased += diff * 0.1;
    apply();
    requestAnimationFrame(tick);
  }

  function syncScroll(immediate) {
    target = window.scrollY || 0;
    if (reduceMotion.matches || immediate) {
      eased = reduceMotion.matches ? 0 : target;
      if (reduceMotion.matches) {
        target = 0;
        // composição estática: sem parallax, hero em destaque total
        LAYER_ORDER.forEach((d) => { layers[d].style.transform = ""; });
        stage.style.opacity = "";
        return;
      }
      apply();
      return;
    }
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener("scroll", () => syncScroll(false), { passive: true });

  /* ---------- Resize: reconstrói só se o perfil ou a viewport mudaram de fato ---------- */
  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const profileChanged = pickProfile(vw) !== current.profile;
      // barras de endereço mobile mudam a altura em ~60-100px: ignorar
      if (profileChanged || Math.abs(vw - current.vw) > 40 || Math.abs(vh - current.vh) > 140) {
        build();
      }
    }, 200);
  }, { passive: true });

  /* ---------- Pausa as animações CSS quando a aba está oculta ---------- */
  document.addEventListener("visibilitychange", () => {
    root.classList.toggle("is-paused", document.hidden);
  });

  /* ---------- Reduced motion pode mudar em tempo de execução ---------- */
  const onMotionChange = () => {
    root.classList.toggle("is-static", reduceMotion.matches);
    syncScroll(true);
  };
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", onMotionChange);
  else if (reduceMotion.addListener) reduceMotion.addListener(onMotionChange);

  root.classList.toggle("is-static", reduceMotion.matches);
  build();
})();
