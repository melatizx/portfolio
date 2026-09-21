let allEducations = [];

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
      institution: document.getElementById("institution").value.trim(),
      course: document.getElementById("course").value.trim(),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value || null
    };

    try {
      if (id) {
        await AdminApi.put(`/api/educations/${id}`, payload);
        showToast("Formação atualizada.");
      } else {
        await AdminApi.post("/api/educations", payload);
        showToast("Formação criada.");
      }
      closeForm();
      loadEducations();
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  function openForm(item) {
    form.reset();
    document.getElementById("itemId").value = item ? item.id : "";
    formTitle.textContent = item ? `Editar: ${item.course}` : "Nova formação";

    if (item) {
      document.getElementById("institution").value = item.institution;
      document.getElementById("course").value = item.course;
      document.getElementById("startDate").value = item.startDate || "";
      document.getElementById("endDate").value = item.endDate || "";
    }

    formCard.hidden = false;
    document.getElementById("institution").focus();
  }

  function closeForm() {
    formCard.hidden = true;
    form.reset();
  }

  window.editEducation = (id) => {
    const item = allEducations.find(e => e.id === id);
    if (item) openForm(item);
  };

  window.deleteEducation = async (id, label) => {
    if (!confirmDelete(label)) return;
    try {
      await AdminApi.del(`/api/educations/${id}`);
      showToast("Formação removida.");
      loadEducations();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  loadEducations();
});

async function loadEducations() {
  const tbody = document.getElementById("tableBody");
  try {
    allEducations = await AdminApi.get("/api/educations");

    if (!allEducations.length) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Nenhuma formação cadastrada.</td></tr>`;
      return;
    }

    tbody.innerHTML = allEducations.map(item => `
      <tr>
        <td class="is-primary">${escapeHtml(item.course)}</td>
        <td>${escapeHtml(item.institution)}</td>
        <td>${item.startDate || "—"} &rarr; ${item.endDate || "Atual"}</td>
        <td class="actions">
          <button class="btn btn--ghost" onclick="editEducation(${item.id})">Editar</button>
          <button class="btn btn--ghost" onclick="deleteEducation(${item.id}, '${escapeHtml(item.course)}')">Excluir</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Erro ao carregar: ${escapeHtml(err.message)}</td></tr>`;
  }
}
