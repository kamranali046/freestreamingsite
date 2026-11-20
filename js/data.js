(function () {
  "use strict";

  function toRel(u) { return String(u == null ? "" : u).replace(/^\/+/, ""); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  var catMap = {
    "movies.html": "Movies",
    "tv-shows.html": "TV Shows",
    "anime.html": "Anime",
    "sports.html": "Sports",
    "torrent.html": "Torrent",
    "indexes.html": "Indexes",
    "books.html": "Books"
  };

  function loadData() {
    if (window.__BFS_DATA__) {
      return Promise.resolve(window.__BFS_DATA__);
    }
    return fetch("data/data.json", { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function adPill(site) {
    return '<span class="adscore-pill ' + esc(site.AdScoreCssClass) + '" title="' + esc(site.AdScoreLabel) + '"><span class="face"></span></span>';
  }

  function homeRow(site) {
    var pid = "preview-" + site.Rank;
    var hasThumb = !!site.Thumb;
    var html = '<tr class="site-row">' +
      '<td class="col-rank"><span class="rank-badge">' + esc(site.Rank) + '</span></td>' +
      '<td class="col-site"><a class="site-link" href="' + esc(site.Url) + '" target="_blank" rel="noopener">' +
      (site.Favicon ? '<img class="site-favicon" src="' + esc(toRel(site.Favicon)) + '" width="24" height="24" alt="" loading="lazy" />' : '') +
      '<span class="site-name">' + esc(site.Name) + '</span>' +
      (site.IsNew ? '<span class="new-badge">NEW</span>' : '') +
      '</a></td>' +
      '<td class="col-flag"><span class="check" aria-label="Available"></span></td>' +
      '<td class="col-flag"><span class="check" aria-label="Available"></span></td>' +
      '<td class="col-flag">' + adPill(site) + '</td>' +
      '<td class="col-preview">' +
      (hasThumb ? '<button type="button" class="preview-btn" data-preview="' + esc(pid) + '" aria-expanded="false" aria-controls="' + esc(pid) + '" title="Show preview of ' + esc(site.Name) + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m4 16 5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="1.6" fill="currentColor"/></svg>' +
        '</button>' : '') +
      '</td></tr>';
    if (hasThumb) {
      html += '<tr class="preview-row" id="' + esc(pid) + '" hidden>' +
        '<td colspan="6"><a href="' + esc(site.Url) + '" target="_blank" rel="noopener" class="preview-wrap" title="Visit ' + esc(site.Name) + ' (opens in new tab)">' +
        '<img src="' + esc(toRel(site.Thumb)) + '" loading="lazy" alt="Screenshot of ' + esc(site.Name) + '" />' +
        '</a></td></tr>';
    }
    return html;
  }

  function catRow(site, idx, categoryName) {
    var pid = "preview-" + idx + "-" + categoryName;
    var hasThumb = !!site.Thumb;
    var html = '<tr class="site-row">' +
      '<td class="col-rank"><span class="rank-badge">' + (idx + 1) + '</span></td>' +
      '<td class="col-site"><a class="site-link" href="' + esc(site.Url) + '" target="_blank" rel="noopener">' +
      (site.Favicon ? '<img class="site-favicon" src="' + esc(toRel(site.Favicon)) + '" width="24" height="24" alt="" loading="lazy" />' : '') +
      '<span class="site-name">' + esc(site.Name) + '</span>' +
      (site.IsNew ? '<span class="new-badge">NEW</span>' : '') +
      '</a></td>' +
      '<td class="col-flag"><span class="check" aria-label="Available"></span></td>' +
      '<td class="col-flag"><span class="check" aria-label="Available"></span></td>' +
      '<td class="col-flag">' + adPill(site) + '</td>' +
      '<td class="col-preview">' +
      (hasThumb ? '<button type="button" class="preview-btn" data-preview="' + esc(pid) + '" aria-expanded="false" aria-controls="' + esc(pid) + '" title="Show preview of ' + esc(site.Name) + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m4 16 5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="1.6" fill="currentColor"/></svg>' +
        '</button>' : '') +
      '</td></tr>';
    if (hasThumb) {
      html += '<tr class="preview-row" id="' + esc(pid) + '" hidden>' +
        '<td colspan="6"><a href="' + esc(site.Url) + '" target="_blank" rel="noopener" class="preview-wrap" title="Visit ' + esc(site.Name) + ' (opens in new tab)">' +
        '<img src="' + esc(toRel(site.Thumb)) + '" loading="lazy" alt="Screenshot of ' + esc(site.Name) + '" />' +
        '</a></td></tr>';
    }
    return html;
  }

  function updateCategoryLinks(catData) {
    document.querySelectorAll(".category-link").forEach(function (link) {
      var href = link.getAttribute("href");
      var cat = catMap[href];
      if (!cat) return;
      var list = (catData.Categories && catData.Categories[cat]) || [];
      var count = Array.isArray(list) ? list.length : 0;
      var span = link.querySelector(".category-link-count");
      if (span) span.textContent = count + " sites";
    });
  }

  function renderHome(sitesData, catData) {
    var sites = (sitesData && sitesData.Sites) || [];
    var good = sites.filter(function (s) { return s.AdScore === "smile"; }).length;
    var updated = (sitesData.Meta && sitesData.Meta.LastUpdated) || "";
    var badge = document.querySelector(".hero-badge");
    if (badge && updated) badge.textContent = "Updated " + updated;
    var stats = document.querySelectorAll(".hero-stats .stat-value");
    if (stats[0]) stats[0].textContent = sites.length;
    if (stats[1]) stats[1].textContent = good;
    var tbody = document.querySelector(".sites-table tbody");
    if (tbody) tbody.innerHTML = sites.map(homeRow).join("");
  }

  function renderCategory(catData, categoryName) {
    var list = (catData.Categories && catData.Categories[categoryName]) || [];
    var updated = (catData.Meta && catData.Meta.LastUpdated) || "";
    var badge = document.querySelector(".hero-badge");
    if (badge && updated) badge.textContent = "Updated " + updated;
    var tbody = document.querySelector(".sites-table tbody");
    if (tbody) tbody.innerHTML = list.map(function (s, i) { return catRow(s, i, categoryName); }).join("");
  }

  function init() {
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var isHome = (file === "" || file === "index.html");
    var isCategory = Object.prototype.hasOwnProperty.call(catMap, file);

    loadData()
      .then(function (data) {
        var sitesData = data;
        var catData = data;
        updateCategoryLinks(catData);
        if (isHome) renderHome(sitesData, catData);
        else if (isCategory) renderCategory(catData, catMap[file]);
      })
      .catch(function (err) {
        console.warn("data.js: could not load JSON, keeping baked content.", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();