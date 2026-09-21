let allSkills = [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("skillForm");
  const formCard = document.getElementById("formCard");
  const formTitle = document.getElementById("formTitle");

  document.getElementById("btnNew").addEventListener("click", () => openForm());
  document.getElementById("btnCancel").addEventListener("click", () => closeForm());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("skillId").value;
    const sortOrderRaw = document.getElementById("sortOrder").value;

    const payload = {
      name: document.getElementById("name").value.trim(),
      category: document.getElementById("category").value.trim(),
      note: document.getElementById("note").value.trim() || null,
      sortOrder: sortOrderRaw === "" ? null : Number(sortOrderRaw)
    };

    try {
      if (id) {
        await AdminApi.put(`/api/skills/${id}`, payload);
        showToast("Skill atualizada.");
      } else {
        await AdminApi.post("/api/skills", payload);
        showToast("Skill criada.");
      }
      closeForm();
      loadSkills();
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  function openForm(skill) {
    form.reset();
    document.getElementById("skillId").value = skill ? skill.id : "";
    formTitle.textContent = skill ? `Editar: ${skill.name}` : "Nova skill";

    if (skill) {
      document.getElementById("name").value = skill.name;
      document.getElementById("category").value = skill.category;
      document.getElementById("note").value = skill.note || "";
      document.getElementById("sortOrder").value = skill.sortOrder ?? "";
    }

    formCard.hidden = false;
    document.getElementById("name").focus();
  }

  function closeForm() {
    formCard.hidden = true;
    form.reset();
  }

  window.editSkill = (id) => {
    const skill = allSkills.find(s => s.id === id);
    if (skill) openForm(skill);
  };

  window.deleteSkill = async (id, name) => {
    if (!confirmDelete(name)) return;
    try {
      await AdminApi.del(`/api/skills/${id}`);
      showToast("Skill removida.");
      loadSkills();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  loadSkills();
});

async function loadSkills() {
  const tbody = document.getElementById("tableBody");
  try {
    allSkills = await AdminApi.get("/api/skills");

    const categories = [...new Set(allSkills.map(s => s.category))];
    document.getElementById("categoryList").innerHTML =
      categories.map(c => `<option value="${escapeHtml(c)}">`).join("");

    if (!allSkills.length) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="5">Nenhuma skill cadastrada.</td></tr>`;
      return;
    }

    tbody.innerHTML = allSkills.map(skill => `
      <tr>
        <td class="is-primary">${escapeHtml(skill.name)}</td>
        <td><span class="badge">${escapeHtml(skill.category)}</span></td>
        <td>${escapeHtml(skill.note) || "—"}</td>
        <td>${skill.sortOrder}</td>
        <td class="actions">
          <button class="btn btn--ghost" onclick="editSkill(${skill.id})">Editar</button>
          <button class="btn btn--ghost" onclick="deleteSkill(${skill.id}, '${escapeHtml(skill.name)}')">Excluir</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="5">Erro ao carregar: ${escapeHtml(err.message)}</td></tr>`;
  }
}
