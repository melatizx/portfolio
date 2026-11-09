document.addEventListener("DOMContentLoaded", async () => {
  const expContainer = document.getElementById("experienceTimeline");
  const eduContainer = document.getElementById("educationTimeline");

  try {
    const experiences = await Api.experiences();
    expContainer.innerHTML = experiences.length
      ? experiences.map(renderExperience).join("")
      : `<p class="empty-state">Nenhuma experiência cadastrada ainda.</p>`;
  } catch (err) {
    console.error(err);
    expContainer.innerHTML = `<p class="empty-state">Não foi possível carregar as experiências agora.</p>`;
  }

  try {
    const educations = await Api.educations();
    eduContainer.innerHTML = educations.length
      ? educations.map(renderEducation).join("")
      : `<p class="empty-state">Nenhuma formação cadastrada ainda.</p>`;
  } catch (err) {
    console.error(err);
    eduContainer.innerHTML = `<p class="empty-state">Não foi possível carregar a formação agora.</p>`;
  }
});

function renderExperience(item, index) {
  const period = `${formatMonthYear(item.startDate)} — ${formatMonthYear(item.endDate)}`;

  return `
    <div class="timeline__item" data-index="${String(index + 1).padStart(2, "0")}">
      <p class="timeline__period">${period}</p>
      <h3 class="timeline__role">${item.position}</h3>
      <p class="timeline__company">${item.company}</p>
      <p class="timeline__description">${item.description}</p>
    </div>
  `;
}

function renderEducation(item, index) {
  const period = `${formatMonthYear(item.startDate)} — ${formatMonthYear(item.endDate)}`;

  return `
    <div class="timeline__item" data-index="${String(index + 1).padStart(2, "0")}">
      <p class="timeline__period">${period}</p>
      <h3 class="timeline__role">${item.course}</h3>
      <p class="timeline__company">${item.institution}</p>
    </div>
  `;
}
