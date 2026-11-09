document.addEventListener("DOMContentLoaded", async () => {
  try {
    const profile = await Api.profile();
    document.getElementById("heroName").textContent = profile.fullName || "";
    document.getElementById("heroTagline").textContent = profile.tagline || "";
  } catch (err) {
    console.error(err);
  }

  startRoleTyper();
});

function startRoleTyper() {
  const ROLES = ["Data Center Infrastructure Analyst", "Back-End Developer"];
  const el = document.getElementById("heroTypedRole");
  if (!el) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = ROLES[0];
    return;
  }

  const TYPE_DELAY = 55;
  const DELETE_DELAY = 28;
  const HOLD_DELAY = 1600;
  const SWITCH_DELAY = 450;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      charIndex += 1;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_DELAY);
        return;
      }
      setTimeout(tick, TYPE_DELAY);
      return;
    }

    charIndex -= 1;
    el.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
      setTimeout(tick, SWITCH_DELAY);
      return;
    }
    setTimeout(tick, DELETE_DELAY);
  }

  tick();
}