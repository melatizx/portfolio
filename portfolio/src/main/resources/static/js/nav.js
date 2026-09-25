/* ============================================================
   NAVEGAÇÃO (loadpage): sombra ao rolar, hambúrguer mobile e
   link ativo por seção visível (scroll-spy via IntersectionObserver).
   ============================================================ */
(function () {

  function initNavbarScrollState() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll("main .section[id]");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-link");
    if (!sections.length) return;

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
  }

  function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!hamburger || !mobileMenu) return;

    const closeMenu = () => {
      hamburger.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    const openMenu = () => {
      hamburger.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavbarScrollState();
    initScrollSpy();
    initMobileMenu();

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
