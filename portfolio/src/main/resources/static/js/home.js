document.addEventListener("DOMContentLoaded", async () => {
  try {
    const profile = await Api.profile();
    document.getElementById("heroRole").textContent = profile.role || "";
    document.getElementById("heroName").textContent = profile.fullName || "";
    document.getElementById("heroTagline").textContent = profile.tagline || "";
  } catch (err) {
    console.error(err);
  }
});
