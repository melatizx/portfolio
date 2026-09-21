document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("profileForm");

  try {
    const profile = await AdminApi.get("/api/profile");
    document.getElementById("fullName").value = profile.fullName || "";
    document.getElementById("role").value = profile.role || "";
    document.getElementById("tagline").value = profile.tagline || "";
    document.getElementById("about").value = profile.about || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("linkedin").value = profile.linkedin || "";
    document.getElementById("github").value = profile.github || "";
    document.getElementById("location").value = profile.location || "";
  } catch (err) {
    showToast(err.message, "error");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      fullName: document.getElementById("fullName").value.trim(),
      role: document.getElementById("role").value.trim(),
      tagline: document.getElementById("tagline").value.trim(),
      about: document.getElementById("about").value,
      email: document.getElementById("email").value.trim(),
      linkedin: document.getElementById("linkedin").value.trim(),
      github: document.getElementById("github").value.trim(),
      location: document.getElementById("location").value.trim()
    };

    try {
      await AdminApi.put("/api/profile", payload);
      showToast("Perfil atualizado.");
    } catch (err) {
      showToast(err.message, "error");
    }
  });
});
