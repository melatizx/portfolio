let allProjects = [];
let allSkillsForSelect = [];

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("projectForm");
  const formCard = document.getElementById("formCard");
  const formTitle = document.getElementById("formTitle");

  document.getElementById("btnNew").addEventListener("click", () => openForm());
  document.getElementById("btnCancel").addEventListener("click", () => closeForm());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("projectId").value;
    const skillIds = Array.from(document.getElementById("skillIds").selectedOptions).map(o => Number(o.value));

    const payload = {
      name: document.getElementById("name").value.trim(),
      description: document.getElementById("description").value.trim(),
      githubUrl: document.getElementById("githubUrl").value.trim() || null,
      liveUrl: document.getElementById("liveUrl").value.trim() || null,
      skillIds
    };

    try {
      if (id) {
        await AdminApi.put(`/api/projects/${id}`, payload);
        showToast("Projeto atualizado.");
      } else {
        await AdminApi.post("/api/projects", payload);
        showToast("Projeto criado.");
      }
      closeForm();
      loadProjects();
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  function openForm(project) {
    form.reset();
    document.getElementById("projectId").value = project ? project.id : "";
    formTitle.textContent = project ? `Editar: ${project.name}` : "Novo projeto";

    if (project) {
      document.getElementById("name").value = project.name;
      document.getElementById("description").value = project.description;
      document.getElementById("githubUrl").value = project.githubUrl || "";
      document.getElementById("liveUrl").value = project.liveUrl || "";

      const ids = new Set((project.skills || []).map(s => s.id));
      Array.from(document.getElementById("skillIds").options).forEach(opt => {
        opt.selected = ids.has(Number(opt.value));
      });
    }

    formCard.hidden = false;
    document.getElementById("name").focus();
  }

  function closeForm() {
    formCard.hidden = true;
    form.reset();
  }

  window.editProject = (id) => {
    const project = allProjects.find(p => p.id === id);
    if (project) openForm(project);
  };

  window.deleteProject = async (id, name) => {
    if (!confirmDelete(name)) return;
    try {
      await AdminApi.del(`/api/projects/${id}`);
      showToast("Projeto removido.");
      loadProjects();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  await loadSkillOptions();
  loadProjects();
});

async function loadSkillOptions() {
  const select = document.getElementById("skillIds");
  try {
    allSkillsForSelect = await AdminApi.get("/api/skills");
    select.innerHTML = allSkillsForSelect
      .map(s => `<option value="${s.id}">${escapeHtml(s.name)} — ${escapeHtml(s.category)}</option>`)
      .join("");
  } catch (err) {
    console.error(err);
  }
}

async function loadProjects() {
  const tbody = document.getElementById("tableBody");
  try {
    allProjects = await AdminApi.get("/api/projects");

    if (!allProjects.length) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Nenhum projeto cadastrado.</td></tr>`;
      return;
    }

    tbody.innerHTML = allProjects.map(project => `
      <tr>
        <td class="is-primary">${escapeHtml(project.name)}</td>
        <td>${escapeHtml(project.description)}</td>
        <td>${(project.skills || []).map(s => `<span class="badge">${escapeHtml(s.name)}</span>`).join("") || "—"}</td>
        <td class="actions">
          <button class="btn btn--ghost" onclick="editProject(${project.id})">Editar</button>
          <button class="btn btn--ghost" onclick="deleteProject(${project.id}, '${escapeHtml(project.name)}')">Excluir</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Erro ao carregar: ${escapeHtml(err.message)}</td></tr>`;
  }
}
