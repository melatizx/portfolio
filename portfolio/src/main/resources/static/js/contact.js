document.addEventListener("DOMContentLoaded", async () => {
  const links = document.getElementById("contactLinks");

  try {
    const profile = await Api.profile();
    const items = [];

    if (profile.email) {
      items.push(`<a class="contact__link" href="mailto:${profile.email}">${Icons.email}${profile.email}</a>`);
    }
    if (profile.linkedin) {
      items.push(`<a class="contact__link" href="${profile.linkedin}" target="_blank" rel="noopener">${Icons.linkedin}LinkedIn</a>`);
    }
    if (profile.github) {
      items.push(`<a class="contact__link" href="${profile.github}" target="_blank" rel="noopener">${Icons.github}GitHub</a>`);
    }

    links.innerHTML = items.length
      ? items.join("")
      : `<p class="empty-state">Nenhum contato cadastrado ainda.</p>`;
  } catch (err) {
    console.error(err);
    links.innerHTML = `<p class="empty-state">Não foi possível carregar os contatos agora.</p>`;
  }
});
