/* ============================================================
   MAIN: busca todos os dados da API e renderiza cada seção da
   loadpage (About, Skills, Projects, Experience, Contact).
   O hero (nome/tagline/terminal digitado) é tratado à parte,
   no início deste arquivo, para já aparecer assim que carregar.
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadHero();
  loadAbout();
  loadSkills();
  loadProjects();
  loadExperienceAndEducation();
  loadContact();
});

/* ---------------- Hero ---------------- */
async function loadHero() {
  try {
    const profile = await Api.profile();
    document.getElementById("heroName").textContent = profile.fullName || "";
    document.getElementById("heroTagline").textContent = profile.tagline || "";
  } catch (err) {
    console.error(err);
  }
  startRoleTyper();
}

function startRoleTyper() {
  const ROLES = ["Data Center Infrastructure Analyst", "Back-End Developer"];
  const el = document.getElementById("heroTypedRole");
  if (!el) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = ROLES[0];
    return;
  }

  const TYPE_DELAY = 55;
  const DELETE_DELAY = 28;
  const HOLD_DELAY = 1600;
  const SWITCH_DELAY = 450;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      charIndex += 1;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_DELAY);
        return;
      }
      setTimeout(tick, TYPE_DELAY);
      return;
    }

    charIndex -= 1;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
      setTimeout(tick, SWITCH_DELAY);
      return;
    }
    setTimeout(tick, DELETE_DELAY);
  }

  tick();
}

/* ---------------- About ---------------- */
async function loadAbout() {
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
}

/* ---------------- Skills ---------------- */
let allSkillsData = [];

async function loadSkills() {
  const board = document.getElementById("skillsBoard");
  const countEl = document.getElementById("skillsCount");
  const searchInput = document.getElementById("skillsSearch");

  try {
    allSkillsData = await Api.skills();

    if (!allSkillsData.length) {
      board.innerHTML = `<p class="empty-state">Nenhuma skill cadastrada ainda.</p>`;
      countEl.textContent = "";
      return;
    }

    renderSkillsBoard(allSkillsData);
    countEl.textContent = `${allSkillsData.length} skills`;

    searchInput.addEventListener("input", () => {
      applySkillsFilter(searchInput.value.trim().toLowerCase());
    });
  } catch (err) {
    console.error(err);
    board.innerHTML = `<p class="empty-state">Não foi possível carregar as skills agora.</p>`;
  }
}

function groupByCategory(skills) {
  const categories = [];
  const map = new Map();
  skills.forEach(skill => {
    if (!map.has(skill.category)) {
      map.set(skill.category, []);
      categories.push(skill.category);
    }
    map.get(skill.category).push(skill);
  });
  return categories.map(category => ({ category, items: map.get(category) }));
}

function renderSkillsBoard(skills) {
  const board = document.getElementById("skillsBoard");
  const groups = groupByCategory(skills);

  board.innerHTML = groups.map(group => `
    <div class="skills-board__category" data-category="${escapeHtml(group.category.toLowerCase())}">
      <div class="skills-board__category-head">
        <h3>${escapeHtml(group.category)}</h3>
        <span class="skills-board__category-count">${group.items.length}</span>
      </div>
      <div class="skills-board__chips">
        ${group.items.map(renderSkillChip).join("")}
      </div>
    </div>
  `).join("");
}

function renderSkillChip(skill) {
  const noted = skill.note ? " skill-chip--noted" : "";
  const title = skill.note ? ` title="${escapeHtml(skill.note)}"` : "";
  const name = skill.name.toLowerCase();
  return `<span class="skill-chip${noted}" data-name="${escapeHtml(name)}"${title}>${escapeHtml(skill.name)}</span>`;
}

function applySkillsFilter(query) {
  const board = document.getElementById("skillsBoard");
  const countEl = document.getElementById("skillsCount");

  if (!query) {
    board.querySelectorAll(".is-hidden").forEach(el => el.classList.remove("is-hidden"));
    countEl.textContent = `${allSkillsData.length} skills`;
    return;
  }

  let visibleCount = 0;

  board.querySelectorAll(".skills-board__category").forEach(categoryEl => {
    const categoryMatches = categoryEl.dataset.category.includes(query);
    let anyChipVisible = false;

    categoryEl.querySelectorAll(".skill-chip").forEach(chip => {
      const visible = categoryMatches || chip.dataset.name.includes(query);
      chip.classList.toggle("is-hidden", !visible);
      if (visible) { anyChipVisible = true; visibleCount += 1; }
    });

    categoryEl.classList.toggle("is-hidden", !anyChipVisible);
  });

  countEl.textContent = `${visibleCount} skill${visibleCount === 1 ? "" : "s"}`;
}

/* ---------------- Projects ---------------- */
async function loadProjects() {
  const list = document.getElementById("projectsList");
  try {
    const projects = await Api.projects();

    if (!projects.length) {
      list.innerHTML = `<p class="empty-state">Nenhum projeto cadastrado ainda.</p>`;
      return;
    }

    list.innerHTML = projects.map(renderProject).join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="empty-state">Não foi possível carregar os projetos agora.</p>`;
  }
}

function renderProject(project) {
  const tags = (project.skills || []).map(skill => `<span>${escapeHtml(skill.name)}</span>`).join("");
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
        <h3 class="project__title">${escapeHtml(project.name)}</h3>
        <p class="project__description">${escapeHtml(project.description)}</p>
        <div class="project__tags">${tags}</div>
        <div class="project__links">${links}</div>
      </div>
    </article>
  `;
}

/* ---------------- Experience & Education ---------------- */
async function loadExperienceAndEducation() {
  const expContainer = document.getElementById("experienceTimeline");
  const eduContainer = document.getElementById("educationTimeline");

  try {
    const experiences = await Api.experiences();
    expContainer.innerHTML = experiences.length
      ? experiences.map(renderExperienceItem).join("")
      : `<p class="empty-state">Nenhuma experiência cadastrada ainda.</p>`;
  } catch (err) {
    console.error(err);
    expContainer.innerHTML = `<p class="empty-state">Não foi possível carregar as experiências agora.</p>`;
  }

  try {
    const educations = await Api.educations();
    eduContainer.innerHTML = educations.length
      ? educations.map(renderEducationItem).join("")
      : `<p class="empty-state">Nenhuma formação cadastrada ainda.</p>`;
  } catch (err) {
    console.error(err);
    eduContainer.innerHTML = `<p class="empty-state">Não foi possível carregar a formação agora.</p>`;
  }
}

function renderExperienceItem(item, index) {
  const period = `${formatMonthYear(item.startDate)} — ${formatMonthYear(item.endDate)}`;
  return `
    <div class="timeline__item" data-index="${String(index + 1).padStart(2, "0")}">
      <p class="timeline__period">${period}</p>
      <h3 class="timeline__role">${escapeHtml(item.position)}</h3>
      <p class="timeline__company">${escapeHtml(item.company)}</p>
      <p class="timeline__description">${escapeHtml(item.description)}</p>
    </div>
  `;
}

function renderEducationItem(item, index) {
  const period = `${formatMonthYear(item.startDate)} — ${formatMonthYear(item.endDate)}`;
  return `
    <div class="timeline__item" data-index="${String(index + 1).padStart(2, "0")}">
      <p class="timeline__period">${period}</p>
      <h3 class="timeline__role">${escapeHtml(item.course)}</h3>
      <p class="timeline__company">${escapeHtml(item.institution)}</p>
    </div>
  `;
}

/* ---------------- Contact ---------------- */
async function loadContact() {
  const links = document.getElementById("contactLinks");
  try {
    const profile = await Api.profile();
    const items = [];

    if (profile.email) {
      items.push(`<a class="contact__link" href="mailto:${profile.email}">${Icons.email}${escapeHtml(profile.email)}</a>`);
    }
    if (profile.linkedin) {
      items.push(`<a class="contact__link" href="${profile.linkedin}" target="_blank" rel="noopener">${Icons.linkedin}LinkedIn</a>`);
    }
    if (profile.github) {
      items.push(`<a class="contact__link" href="${profile.github}" target="_blank" rel="noopener">${Icons.github}GitHub</a>`);
    }

    links.innerHTML = items.length ? items.join("") : `<p class="empty-state">Nenhum contato cadastrado ainda.</p>`;
  } catch (err) {
    console.error(err);
    links.innerHTML = `<p class="empty-state">Não foi possível carregar os contatos agora.</p>`;
  }
}

/* ---------------- Helpers ---------------- */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}
