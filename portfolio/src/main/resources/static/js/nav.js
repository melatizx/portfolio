/* ============================================================
   NAVEGAÇÃO: sombra ao rolar, hambúrguer mobile e link ativo
   por página (endereçamento real: index.html, skills.html, ...)
   ============================================================ */
(function () {

  function currentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function initNavbarScrollState() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initActiveLink() {
    const page = currentPage();
    document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === page);
    });
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
    initActiveLink();
    initMobileMenu();

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
