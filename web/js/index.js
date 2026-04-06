(function () {
  "use strict";

  const contentEl = document.getElementById("content");
  const sectionListEl = document.getElementById("section-list");
  const searchInput = document.getElementById("search-input");
  const titleEl = document.getElementById("app-title");
  const descEl = document.getElementById("app-desc");
  const themeBtn = document.getElementById("theme-toggle");
  const tocOffcanvasEl = document.getElementById("tocOffcanvas");

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
    if (!text) return "<p class=\"text-secondary mb-0\">(Chưa có gợi ý)</p>";
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
        const haystack =
          (it.question || "") +
          " " +
          (it.suggestion || "") +
          " " +
          (it.answer || "");
        if (normalize(haystack).includes(nq)) return true;
      }
    }
    return false;
  }

  function renderSectionContent(sec, filter) {
    const fq = (filter || "").trim();
    const nfq = normalize(fq);
    let html = "";
    for (const g of sec.groups) {
      let block = "";
      for (const it of g.items) {
        const haystack =
          (it.question || "") +
          " " +
          (it.suggestion || "") +
          " " +
          (it.answer || "");
        if (fq && !normalize(haystack).includes(nfq)) continue;
        const openSearch =
          fq.length > 0 && normalize(haystack).includes(nfq);
        const openAttr = openSearch ? " open" : "";
        block +=
          '<details class="qa"' +
          openAttr +
          ">" +
          '<summary class="qa__summary">' +
          '<span class="qa__q">' +
          renderQuestion(it.question) +
          "</span></summary>" +
          '<div class="qa__a">' +
          '<div class="qa__tier qa__tier--suggestion">' +
          '<div class="qa__tier-label">Tầng 1 — Gợi ý</div>' +
          '<div class="qa__tier-body">' +
          renderAnswer(it.suggestion || it.answer) +
          "</div></div>" +
          '<div class="qa__tier qa__tier--answer mt-3">' +
          '<div class="qa__tier-label">Tầng 2 — Chi tiết</div>' +
          '<div class="qa__tier-body">' +
          renderAnswer(it.answer) +
          "</div></div>" +
          "</div></details>";
      }
      if (!block) continue;
      const gt = g.title;
      html +=
        '<section class="group">' +
        (gt
          ? '<h2 class="group__title h6 text-secondary">' + escapeHtml(gt) + "</h2>"
          : "") +
        block +
        "</section>";
    }
    if (!html) {
      html =
        '<p class="text-secondary fst-italic mb-0">Không có câu hỏi nào khớp bộ lọc. Thử từ khóa khác hoặc xóa ô tìm kiếm.</p>';
    }
    contentEl.innerHTML = html;
  }

  function updateNavCurrent() {
    sectionListEl.querySelectorAll(".nav__link").forEach((a) => {
      const id = a.getAttribute("data-section-id");
      if (id === activeId) {
        a.setAttribute("aria-current", "page");
        a.classList.add("active");
      } else {
        a.removeAttribute("aria-current");
        a.classList.remove("active");
      }
    });
  }

  function applySearchVisibility() {
    const q = searchInput.value.trim();
    sectionListEl.querySelectorAll(".nav__link").forEach((a) => {
      const id = a.getAttribute("data-section-id");
      const sec = data.sections.find((s) => s.id === id);
      if (!sec) return;
      const show = matchesSearch(sec, q);
      a.classList.toggle("d-none", !show);
    });
  }

  function closeTocIfMobile() {
    if (!window.matchMedia("(max-width: 991.98px)").matches) return;
    if (!tocOffcanvasEl || typeof bootstrap === "undefined" || !bootstrap.Offcanvas) return;
    const inst = bootstrap.Offcanvas.getInstance(tocOffcanvasEl);
    if (inst) inst.hide();
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
      const a = document.createElement("a");
      a.href = "#" + sec.id;
      a.className =
        "list-group-item list-group-item-action nav__link py-2 px-3 text-start text-break border-start-0 border-end-0";
      a.setAttribute("data-section-id", sec.id);
      a.textContent = sec.id + ". " + sec.title;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(sec.id, { skipHash: true });
        window.location.hash = sec.id;
        closeTocIfMobile();
      });
      sectionListEl.appendChild(a);
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

  /* Theme — sync custom accent + Bootstrap data-bs-theme */
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("interview-theme", theme);
  }

  const stored = localStorage.getItem("interview-theme");
  if (stored === "dark" || stored === "light") {
    setTheme(stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });

  fetch("data/modules/manifest.json")
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then((manifest) => {
      const modules = Array.isArray(manifest.modules) ? manifest.modules : [];
      return Promise.all(
        modules.map((m) =>
          fetch(m.file).then((r) => {
            if (!r.ok) throw new Error("HTTP " + r.status + " while loading " + m.file);
            return r.json();
          })
        )
      ).then((sections) => ({ meta: manifest.meta || {}, sections }));
    })
    .then((json) => {
      // Chuẩn hóa dữ liệu: mọi item đều có {question, suggestion, answer}
      data = json;
      if (Array.isArray(data.sections)) {
        data.sections.forEach((sec) => {
          if (!sec.groups) return;
          sec.groups.forEach((g) => {
            if (!Array.isArray(g.items)) return;
            g.items = g.items.map((raw) => {
              const question = raw.question || "";
              let suggestion = raw.suggestion;
              let answer = raw.answer || "";

              // Nếu đã có format Tầng 1/Tầng 2 trong answer, cố gắng tách
              if (!suggestion) {
                const m = answer.match(
                  /\*\*Tầng 1[^\n]*\*\*([\s\S]*?)\*\*Tầng 2[^\n]*\*\*([\s\S]*)/i
                );
                if (m) {
                  suggestion = m[1].trim();
                  answer = m[2].trim();
                }
              }

              // Nếu vẫn chưa có suggestion: lấy đoạn đầu làm gợi ý ngắn
              if (!suggestion) {
                const parts = answer.split(/\n{2,}/);
                suggestion = (parts[0] || answer).trim();
              }

              return { question, suggestion, answer };
            });
          });
        });
      }
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
        '<div class="alert alert-warning mb-0" role="alert">' +
        "<p class=\"mb-2\">Không tải được dữ liệu module trong <code>data/modules/</code>. Mở qua HTTP (ví dụ GitHub Pages) hoặc chạy server cục bộ.</p>" +
        "<p class=\"small text-secondary mb-0\">" +
        escapeHtml(String(err)) +
        "</p></div>";
    });
})();
