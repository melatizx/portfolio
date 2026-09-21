const AdminApi = {
  async request(path, options = {}) {
    const res = await fetch(path, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", Accept: "application/json", ...(options.headers || {}) },
      ...options
    });

    if (res.status === 401 || res.status === 403) {
      window.location.href = "/admin/login.html";
      throw new Error("Não autenticado");
    }

    if (res.status === 204) {
      return null;
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error((body && body.message) || `Erro HTTP ${res.status}`);
    }

    return res.json();
  },

  get: (path) => AdminApi.request(path),
  post: (path, data) => AdminApi.request(path, { method: "POST", body: JSON.stringify(data) }),
  put: (path, data) => AdminApi.request(path, { method: "PUT", body: JSON.stringify(data) }),
  del: (path) => AdminApi.request(path, { method: "DELETE" })
};

function showToast(message, type = "success") {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    document.body.appendChild(toast);
  }
  toast.className = `toast is-${type}`;
  toast.textContent = message;

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function confirmDelete(label) {
  return window.confirm(`Excluir "${label}"? Essa ação não pode ser desfeita.`);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  // Link ativo no menu lateral
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".admin-nav__link").forEach(link => {
    link.classList.toggle("is-active", link.getAttribute("href").endsWith(page));
  });

  // Logout (form POST simples para /logout — sem CSRF nesta config)
  const logoutBtn = document.getElementById("btnLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/logout";
      document.body.appendChild(form);
      form.submit();
    });
  }
});
