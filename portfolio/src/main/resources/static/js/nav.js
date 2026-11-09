/* ============================================================
   INTERFACE (somente apresentação — nenhum acesso a dados aqui):
   navbar ao rolar, menu mobile, scroll-spy e animações de entrada.
   Os dados continuam sendo buscados e renderizados por api.js/main.js.
   ============================================================ */
(function () {

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Navbar: blur/opacidade/sombra aumentam ao rolar ---------- */
  function initNavbarScrollState() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll-spy: link ativo pela seção visível ---------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll("main .section[id]");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-link");
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const setActive = (id) => {
      navLinks.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));

    // no topo da página (hero) nenhum link fica ativo
    const hero = document.getElementById("hero");
    if (hero) {
      new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActive(""); });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 }).observe(hero);
    }
  }

  /* ---------- Menu mobile em tela cheia ---------- */
  function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!hamburger || !mobileMenu) return;

    const closeMenu = () => {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Abrir menu");
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    const openMenu = () => {
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.setAttribute("aria-label", "Fechar menu");
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ---------- Reveal: entrada suave ao entrar na viewport ---------- */
  // Seletores dos blocos que o main.js cria dinamicamente depois do fetch.
  const DYNAMIC_REVEAL = [
    ".about__body p",
    ".skills-board__category",
    ".project",
    ".timeline__item",
    ".contact__link"
  ].join(",");

  function initReveal() {
    const root = document.documentElement;
    const supported = "IntersectionObserver" in window && !reducedMotion.matches;

    if (!supported) {
      // sem observer ou com movimento reduzido: tudo visível, sem transição
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
      root.classList.add("reveal-off");
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    const register = (el, index) => {
      if (el.dataset.revealBound) return;
      el.dataset.revealBound = "1";
      el.classList.add("reveal");
      // escalonamento curto entre irmãos, no máximo ~0.3s
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 0.06}s`);
      io.observe(el);
    };

    // elementos estáticos do template
    document.querySelectorAll(".reveal").forEach(el => {
      el.dataset.revealBound = "1";
      io.observe(el);
    });

    // elementos inseridos pelo main.js: observa os containers
    const containers = [
      "aboutBody", "skillsBoard", "projectsList",
      "experienceTimeline", "educationTimeline", "contactLinks"
    ].map(id => document.getElementById(id)).filter(Boolean);

    const scan = (container) => {
      container.querySelectorAll(DYNAMIC_REVEAL).forEach((el, i) => register(el, i));
    };

    const mo = new MutationObserver((mutations) => {
      const touched = new Set();
      mutations.forEach(m => touched.add(m.target));
      touched.forEach(target => {
        const container = containers.find(c => c === target || c.contains(target));
        if (container) scan(container);
      });
    });

    containers.forEach(container => {
      scan(container);
      mo.observe(container, { childList: true });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavbarScrollState();
    initScrollSpy();
    initMobileMenu();
    initReveal();

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
