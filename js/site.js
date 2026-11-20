(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("bfs-theme", theme); } catch (e) { }
    var meta = theme === "dark" ? "#101613" : "#e9f1ec";
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute("content", meta);
    });
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    var stored = null;
    try { stored = localStorage.getItem("bfs-theme"); } catch (err) { }
    if (!stored) applyTheme(e.matches ? "dark" : "light");
  });

  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(".preview-btn") : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var id = btn.getAttribute("data-preview");
    var row = document.getElementById(id);
    if (!row) return;
    var isOpen = !row.hasAttribute("hidden");
    if (isOpen) {
      row.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-open");
    } else {
      row.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
      btn.classList.add("is-open");
    }
  });
})();
