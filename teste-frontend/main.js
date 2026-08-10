const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isOpen);
  });