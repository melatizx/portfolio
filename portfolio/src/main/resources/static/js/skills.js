/* ============================================================
   SKILLS: busca /api/skills e renderiza como uma saída de log
   de servidor dentro de uma janela de terminal.
   ============================================================ */
document.addEventListener("DOMContentLoaded", async () => {
  const body = document.getElementById("terminalBody");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const skills = await Api.skills();

    if (!skills.length) {
      body.innerHTML = `<div class="terminal__line terminal__info">Nenhuma skill cadastrada ainda.</div>`;
      return;
    }

    const lines = buildLogLines(skills);
    body.innerHTML = "";

    if (reduceMotion) {
      lines.forEach(line => body.appendChild(line));
      appendCursor(body);
      return;
    }

    let i = 0;
    const step = () => {
      if (i >= lines.length) {
        appendCursor(body);
        return;
      }
      body.appendChild(lines[i]);
      body.scrollTop = body.scrollHeight;
      i += 1;
      setTimeout(step, lines[i - 1].dataset.delay || 45);
    };
    step();
  } catch (err) {
    console.error(err);
    body.innerHTML = `<div class="terminal__line terminal__info">[ERROR] falha ao carregar /api/skills</div>`;
  }
});

function buildLogLines(skills) {
  const lines = [];

  lines.push(makeLine(
    `<span class="terminal__prompt">root@melati</span><span class="terminal__path">:~$</span> <span class="terminal__command">./skills --list</span>`,
    120
  ));
  lines.push(makeLine(`<span class="terminal__info">[INFO] conectando ao registro de skills...</span>`, 250));

  // agrupa mantendo a ordem em que cada categoria aparece pela primeira vez
  const categories = [];
  const byCategory = new Map();

  skills.forEach(skill => {
    if (!byCategory.has(skill.category)) {
      byCategory.set(skill.category, []);
      categories.push(skill.category);
    }
    byCategory.get(skill.category).push(skill);
  });

  lines.push(makeLine(`<span class="terminal__ok">[OK]</span> categorias carregadas: ${categories.length} <span class="terminal__badge">${skills.length} skills</span>`, 220));

  categories.forEach(category => {
    lines.push(makeLine(`<span class="terminal__category">## ${escapeHtml(category)}</span>`, 90));

    byCategory.get(category).forEach(skill => {
      const name = `<span class="terminal__item-name">&gt; ${escapeHtml(skill.name)}</span>`;
      const note = skill.note
        ? `<span class="terminal__item-note">${escapeHtml(skill.note)}</span>`
        : "";
      lines.push(makeLine(`<div class="terminal__item">${name}${note}</div>`, 35, true));
    });
  });

  lines.push(makeLine(`<span class="terminal__ok">[OK]</span> processo finalizado.`, 40));

  return lines;
}

function makeLine(html, delay, isDiv) {
  const el = document.createElement(isDiv ? "div" : "div");
  el.className = "terminal__line";
  el.dataset.delay = delay;
  el.innerHTML = html;
  return el;
}

function appendCursor(container) {
  const line = document.createElement("div");
  line.className = "terminal__line";
  line.innerHTML = `<span class="terminal__prompt">root@melati</span><span class="terminal__path">:~$</span> <span class="terminal__cursor"></span>`;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
