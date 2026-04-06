(function () {
  "use strict";

  const contentEl = document.getElementById("content");
  const sectionListEl = document.getElementById("section-list");
  const searchInput = document.getElementById("search-input");
  const titleEl = document.getElementById("app-title");
  const descEl = document.getElementById("app-desc");
  const themeBtn = document.getElementById("theme-toggle");

  const md = typeof marked !== "undefined" ? marked : null;
  if (md && md.setOptions) {
    md.setOptions({ breaks: true, gfm: true });
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderAnswer(text) {
    if (!text) return "<p class=\"muted\">(Chưa có gợi ý)</p>";
    if (md) {
      const parse = typeof md.parse === "function" ? md.parse.bind(md) : md;
      return parse(text);
    }
    return "<p>" + escapeHtml(text).replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>") + "</p>";
  }

  function renderQuestion(q) {
    const safe = escapeHtml(q).replace(/`([^`]+)`/g, "<code>$1</code>");
    return safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  let data = null;
  let activeId = null;

  function getHashId() {
    const h = window.location.hash.replace(/^#/, "");
    return h || null;
  }

  function setHashId(id) {
    if (id) window.location.hash = id;
    else window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function matchesSearch(sec, q) {
    if (!q) return true;
    const nq = normalize(q);
    for (const g of sec.groups) {
      for (const it of g.items) {
        if (normalize(it.question).includes(nq) || normalize(it.answer).includes(nq)) return true;
      }
    }
    return false;
  }

  function renderSectionContent(sec, filter) {
    const fq = (filter || "").trim();
    let html = "";
    for (const g of sec.groups) {
      let block = "";
      for (const it of g.items) {
        if (fq && !normalize(it.question + it.answer).includes(normalize(fq))) continue;
        block +=
          '<div class="qa">' +
          '<h3 class="qa__q">' +
          renderQuestion(it.question) +
          "</h3>" +
          '<div class="qa__a">' +
          renderAnswer(it.answer) +
          "</div></div>";
      }
      if (!block) continue;
      const gt = g.title;
      html +=
        '<section class="group">' +
        (gt ? '<h2 class="group__title">' + escapeHtml(gt) + "</h2>" : "") +
        block +
        "</section>";
    }
    if (!html) {
      html =
        '<p class="no-results">Không có câu hỏi nào khớp bộ lọc. Thử từ khóa khác hoặc xóa ô tìm kiếm.</p>';
    }
    contentEl.innerHTML = html;
  }

  function updateNavCurrent() {
    sectionListEl.querySelectorAll(".nav__link").forEach((a) => {
      const id = a.getAttribute("data-section-id");
      if (id === activeId) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function applySearchVisibility() {
    const q = searchInput.value.trim();
    sectionListEl.querySelectorAll(".nav__item").forEach((li) => {
      const id = li.getAttribute("data-section-id");
      const sec = data.sections.find((s) => s.id === id);
      if (!sec) return;
      const show = matchesSearch(sec, q);
      li.classList.toggle("nav__item--hidden", !show);
    });
  }

  function showSection(id, opts) {
    const optsRef = opts || {};
    const sec = data.sections.find((s) => s.id === id);
    if (!sec) return;
    activeId = id;
    if (!optsRef.skipHash) setHashId(id);
    document.title = sec.title + " — " + (data.meta.title || "Phỏng vấn");
    updateNavCurrent();
    renderSectionContent(sec, optsRef.filterSearch ? searchInput.value : "");
  }

  function initNav() {
    sectionListEl.innerHTML = "";
    data.sections.forEach((sec) => {
      const li = document.createElement("li");
      li.className = "nav__item";
      li.setAttribute("data-section-id", sec.id);
      const a = document.createElement("a");
      a.href = "#" + sec.id;
      a.className = "nav__link";
      a.setAttribute("data-section-id", sec.id);
      a.textContent = sec.id + ". " + sec.title;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(sec.id, { skipHash: true });
        window.location.hash = sec.id;
      });
      li.appendChild(a);
      sectionListEl.appendChild(li);
    });
  }

  function onHashChange() {
    const id = getHashId();
    if (id && data.sections.some((s) => s.id === id)) {
      showSection(id, { skipHash: true, filterSearch: true });
    }
  }

  searchInput.addEventListener("input", () => {
    applySearchVisibility();
    if (activeId) showSection(activeId, { skipHash: true, filterSearch: true });
  });

  window.addEventListener("hashchange", onHashChange);

  /* Theme */
  const stored = localStorage.getItem("interview-theme");
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("interview-theme", next);
  });

  fetch("data/questions.json")
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then((json) => {
      data = json;
      if (data.meta.title) titleEl.textContent = data.meta.title;
      if (data.meta.description && descEl) {
        descEl.innerHTML = data.meta.description
          .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
          .replace(/`([^`]+)`/g, "<code>$1</code>");
      }
      initNav();
      const first = data.sections[0];
      const fromHash = getHashId();
      const start =
        fromHash && data.sections.some((s) => s.id === fromHash) ? fromHash : first.id;
      showSection(start, { skipHash: true, filterSearch: true });
      applySearchVisibility();
    })
    .catch((err) => {
      contentEl.innerHTML =
        "<p>Không tải được <code>data/questions.json</code>. Mở qua HTTP (ví dụ GitHub Pages) hoặc chạy server cục bộ.</p><p><small>" +
        escapeHtml(String(err)) +
        "</small></p>";
    });
})();
