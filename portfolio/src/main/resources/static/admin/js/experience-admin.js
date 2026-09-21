let allExperiences = [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("itemForm");
  const formCard = document.getElementById("formCard");
  const formTitle = document.getElementById("formTitle");

  document.getElementById("btnNew").addEventListener("click", () => openForm());
  document.getElementById("btnCancel").addEventListener("click", () => closeForm());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("itemId").value;
    const payload = {
      company: document.getElementById("company").value.trim(),
      position: document.getElementById("position").value.trim(),
      description: document.getElementById("description").value.trim(),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value || null
    };

    try {
      if (id) {
        await AdminApi.put(`/api/experiences/${id}`, payload);
        showToast("Experiência atualizada.");
      } else {
        await AdminApi.post("/api/experiences", payload);
        showToast("Experiência criada.");
      }
      closeForm();
      loadExperiences();
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  function openForm(item) {
    form.reset();
    document.getElementById("itemId").value = item ? item.id : "";
    formTitle.textContent = item ? `Editar: ${item.position}` : "Nova experiência";

    if (item) {
      document.getElementById("company").value = item.company;
      document.getElementById("position").value = item.position;
      document.getElementById("description").value = item.description;
      document.getElementById("startDate").value = item.startDate || "";
      document.getElementById("endDate").value = item.endDate || "";
    }

    formCard.hidden = false;
    document.getElementById("company").focus();
  }

  function closeForm() {
    formCard.hidden = true;
    form.reset();
  }

  window.editExperience = (id) => {
    const item = allExperiences.find(e => e.id === id);
    if (item) openForm(item);
  };

  window.deleteExperience = async (id, label) => {
    if (!confirmDelete(label)) return;
    try {
      await AdminApi.del(`/api/experiences/${id}`);
      showToast("Experiência removida.");
      loadExperiences();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  loadExperiences();
});

async function loadExperiences() {
  const tbody = document.getElementById("tableBody");
  try {
    allExperiences = await AdminApi.get("/api/experiences");

    if (!allExperiences.length) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Nenhuma experiência cadastrada.</td></tr>`;
      return;
    }

    tbody.innerHTML = allExperiences.map(item => `
      <tr>
        <td class="is-primary">${escapeHtml(item.position)}</td>
        <td>${escapeHtml(item.company)}</td>
        <td>${item.startDate || "—"} &rarr; ${item.endDate || "Atual"}</td>
        <td class="actions">
          <button class="btn btn--ghost" onclick="editExperience(${item.id})">Editar</button>
          <button class="btn btn--ghost" onclick="deleteExperience(${item.id}, '${escapeHtml(item.position)}')">Excluir</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Erro ao carregar: ${escapeHtml(err.message)}</td></tr>`;
  }
}
