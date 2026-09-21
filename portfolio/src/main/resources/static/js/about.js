document.addEventListener("DOMContentLoaded", async () => {
  const body = document.getElementById("aboutBody");

  try {
    const profile = await Api.profile();

    const paragraphs = (profile.about || "")
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(Boolean);

    body.innerHTML = paragraphs.length
      ? paragraphs.map(p => `<p>${p}</p>`).join("")
      : `<p class="empty-state">Nenhum texto de "About me" cadastrado ainda.</p>`;
  } catch (err) {
    console.error(err);
    body.innerHTML = `<p class="empty-state">Não foi possível carregar as informações agora.</p>`;
  }
});
