document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("projectsList");

  try {
    const projects = await Api.projects();

    if (!projects.length) {
      list.innerHTML = `<p class="empty-state">Nenhum projeto cadastrado ainda. Adicione um via POST /api/projects.</p>`;
      return;
    }

    list.innerHTML = projects.map(renderProject).join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="empty-state">Não foi possível carregar os projetos agora.</p>`;
  }
});

function renderProject(project) {
  const tags = (project.skills || [])
    .map(skill => `<span>${skill.name}</span>`)
    .join("");

  const links = [
    project.liveUrl ? `<a class="project__link" href="${project.liveUrl}" target="_blank" rel="noopener">Ver projeto</a>` : "",
    project.githubUrl ? `<a class="project__link" href="${project.githubUrl}" target="_blank" rel="noopener">Código-fonte</a>` : ""
  ].join("");

  return `
    <article class="project">
      <div class="project__media">
        <span class="project__media-placeholder">Imagem do projeto</span>
      </div>
      <div class="project__content">
        <h3 class="project__title">${project.name}</h3>
        <p class="project__description">${project.description}</p>
        <div class="project__tags">${tags}</div>
        <div class="project__links">${links}</div>
      </div>
    </article>
  `;
}
