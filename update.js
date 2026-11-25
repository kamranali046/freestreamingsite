const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

const _combined = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "data.json"), "utf8"));
const sitesData = _combined;
const catData = _combined;

const navOrder = (catData.CategoryOrder && catData.CategoryOrder.length)
  ? catData.CategoryOrder : Object.keys(catData.Categories);

const catFile = {
  "Movies": "movies.html", "TV Shows": "tv-shows.html", "Anime": "anime.html",
  "Sports": "sports.html", "Torrent": "torrent.html", "Indexes": "indexes.html", "Books": "books.html"
};

function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
const seoBase = () => "https://www.freebeststreaming.com";
function toRel(u){ return String(u==null?"":u).replace(/^\/+/,""); }

// SEO content (ported)
const homeSeo = {
  lead: "freebeststreaming.com is a hand-checked directory of the best free streaming site alternatives for movies, " +
    "TV shows, anime, sports, torrents and books. If your usual site shut down or got blocked, find working " +
    "replacements here - every platform is tested for speed, quality, ads and whether it works without an account, " +
    "so you spend your time watching, not troubleshooting.",
  sections: [
    { heading:"Find alternatives to dead or blocked streaming sites", paragraphs:[
      "Streaming sites shut down or get blocked all the time - from movie sites to sports hubs like Score808, " +
      "Buffstreams and Streamed.pk. freebeststreaming.com keeps a working list of alternatives for every " +
      "category, so you always have a fallback when your usual platform disappears.",
      "Browse the sections below or jump straight to the category you need: movies, TV shows, anime, sports, " +
      "torrents, indexes and books. Each page is curated and ranked the same way as this main list."
    ], bullets:["Best free movie streaming site alternatives","Best free TV show streaming site alternatives","Best free anime streaming site alternatives","Best free sports streaming site alternatives (Score808, Buffstreams, Streamed.pk and more)","Best free torrent streaming site alternatives","Best free streaming index alternatives","Best free book and eBook site alternatives"]},
    { heading:"How we rank free streaming websites", paragraphs:[
      "We update this list regularly and drop any site the moment it stops working, gets buried in pop-ups, " +
      "or starts hiding its library behind a paywall. Our ranking is based on real, repeatable criteria rather " +
      "than paid placement.",
      "Sites that score well stay near the top because they combine a large, current library with a clean, " +
      "ad-light viewing experience that works on desktop and mobile."
    ], bullets:["100% free with no account or credit card required","720p or 1080p streaming quality with fast load times","Works with common ad-blockers instead of fighting them","No region-locking for the content we test","Mobile-friendly player and an English interface","New and old movies plus current TV seasons available"]},
    { heading:"How to stay safe when streaming free", paragraphs:[
      "Free streaming sites are only as safe as the habits you bring to them. Always use an ad-blocker such as " +
      "uBlock Origin, keep your browser updated, and never enter personal or payment details on a streaming page " +
      "that asks for them. If a site nags you to disable your ad-blocker, treat that as a warning sign and move on.",
      "The ad-score column above tells you how aggressive each platform's ads are: a green smile means no pop-ups " +
      "were detected, a yellow face means ads are mostly blocked, and a red frown means redirects or intrusive ads " +
      "were seen during testing."
    ], bullets:[]},
    { heading:"Browse streaming sites by category", paragraphs:[
      "Not sure where to start? Jump straight to the category that matches what you want to watch. Each section is " +
      "curated and ranked the same way as the main list."
    ], bullets:["Best free movie streaming sites for full-length films","Best free TV show streaming sites for series and current seasons","Best free anime streaming sites for subbed and dubbed episodes","Best free sports streaming sites for live events and replays","Best free torrent streaming sites for P2P playback","Best free streaming indexes for searchable link libraries"]}
  ],
  faqs:[
    {q:"What are the best alternatives to dead streaming sites?", a:"freebeststreaming.com lists working alternatives for movies, TV shows, anime, sports, torrents and books. Start on the homepage for the top picks, or open a category page for a focused list."},
    {q:"What is the best free streaming site in 2026?", a:"The best site depends on what you watch, but the platforms ranked at the top of this page currently offer the strongest mix of a large library, 1080p playback, and light ads. We re-check and re-order the list often."},
    {q:"Are free streaming sites legal?", a:"Streaming sites exist in a legal grey area in many countries. We do not host any content; we only link to third-party platforms. Always check the laws where you live before using them."},
    {q:"Do I need a VPN to stream for free?", a:"A VPN is not required, but it can reduce ISP throttling, hide your activity, and help if a site is blocked in your region. Many viewers use one for privacy."},
    {q:"Do I need an ad-blocker?", a:"Yes. Even the cleanest free streaming sites can show pop-ups. An ad-blocker such as uBlock Origin keeps pages readable and protects you from malicious redirects."}
  ]
};
const categorySeo = {
  movies:{lead:"Looking for the best free movie streaming sites? This curated, regularly updated list covers the most reliable places to watch new releases, classics and everything in between in HD - without paying for a subscription.",
    sections:[{heading:"Where to watch movies online for free",paragraphs:["Each free movie site here is tested for library size, playback quality and how badly ads interrupt a film. You will find platforms with huge back-catalogues alongside smaller sites that specialise in fresh releases.","For the smoothest experience, sort by our ad-score: green-smile sites let you watch with minimal interruption, while red-frown sites may redirect you mid-film unless you run an ad-blocker."],bullets:[]},
      {heading:"Tips for streaming movies without the hassle",paragraphs:[],bullets:["Install uBlock Origin before you start watching","Use a 1080p source when it is available and drop to 720p if buffering","Pick mirror domains when a known site is blocked in your region","Keep a VPN handy for privacy and to avoid ISP throttling"]}],
    faqs:[{q:"What is the best free movie streaming site?",a:"The top-ranked site on this page balances a large movie library with 1080p playback and light ads. Rankings change as sites do, so check back often."},
      {q:"Can I watch new movies for free?",a:"Yes - several listed platforms add recent releases quickly. Availability varies by title and region."},
      {q:"Do I need to sign up?",a:"No. Every site on this list works without an account, which is one of our core ranking requirements."}]},
  tvshows:{lead:"These are the best free TV show streaming sites for binge-watching series, current seasons and complete box sets - ranked by reliability, video quality and how intrusive their ads are.",
    sections:[{heading:"Stream TV series and current seasons for free",paragraphs:["Finding a site that keeps up with the latest episodes is the hard part. The platforms below are checked for freshly aired seasons as well as deep archives of older shows, with episode navigation that actually works.","Use the preview thumbnails to judge a site's look and feel before committing to it as your go-to for a series."],bullets:[]},
      {heading:"What makes a good free TV streaming site",paragraphs:[],bullets:["Up-to-date episodes shortly after they air","Easy season and episode selection (S02E03 in a couple of clicks)","Reliable subtitles and multiple audio tracks","A player that remembers your position"]}],
    faqs:[{q:"Which free site has the newest TV episodes?",a:"The top-ranked sites on this page update their TV libraries fastest. We verify new-season availability during testing."},
      {q:"Can I watch TV shows free without ads?",a:"No site is completely ad-free, but green-smile sites in our ad-score column show the fewest interruptions."},
      {q:"Do free TV sites work on mobile?",a:"Yes. We favour mobile-friendly players, so most sites here work in a phone browser without an app."}]},
  anime:{lead:"A ranked list of the best free anime streaming sites for subbed and dubbed episodes, simulcasts and classic series - all checked for quality and ad behaviour.",
    sections:[{heading:"Watch anime free online - sub and dub",paragraphs:["The best anime sites keep a wide catalogue of both subtitled and dubbed episodes and update quickly when new episodes air. This list highlights platforms that get the details right: episode order, filler markers and reliable subs.","As with any free streaming site, run an ad-blocker and prefer the higher-resolution sources where available."],bullets:[]},
      {heading:"What to look for in a free anime site",paragraphs:[],bullets:["Both subbed and dubbed versions","Simulcast episodes close to release","Correct episode ordering and season structure","1080p sources with reasonable load times"]}],
    faqs:[{q:"What is the best free anime site?",a:"The top anime site here balances a large sub/dub catalogue with fast updates and light ads."},
      {q:"Can I watch anime with English subtitles for free?",a:"Yes - most listed sites offer English subs, and many include English dubs as well."},
      {q:"Are anime simulcasts available free?",a:"Several platforms post new episodes within days of their Japanese broadcast. Availability varies by series."}]},
  sports:{lead:"Looking for working alternatives to Score808, Buffstreams, Streamed.pk, SportSurge, CricHD and other dead sports streaming sites? This curated, regularly updated list covers the best free sports streaming sites for live football, basketball, cricket, motorsport, boxing, UFC and more - ranked by reliability, stream quality and ad behaviour. If your usual site stopped working, start here.",
    sections:[
      {heading:"Best alternatives to dead sports streaming sites",paragraphs:["Popular platforms like Score808, Buffstreams, Streamed.pk, SportSurge, FirstRowSports, VIPBox, BatmanStream, HesGoal, SoccerStreams, Streameast, CrackStreams and MethStreams shut down or get blocked regularly. When that happens, finding a working replacement fast matters. The sports streaming sites below are hand-checked and stay online, so you can keep watching live events without hunting through dead links.","Whether you need a Score808 alternative, a Buffstreams replacement or a Streamed.pk mirror that actually works, compare the ranked options on this page and pick the one with the best ad-score for your device."],
        bullets:["Score808 alternative - live football and soccer streams","Buffstreams alternative - NFL, NBA, NHL, MLB and UFC","Streamed.pk alternative - multi-sport live events","SportSurge alternative - clean, ad-light sports streams","CricHD alternative - cricket live streams and highlights","VIPBox / FirstRowSports alternative - working live sports links","Streameast / CrackStreams / MethStreams alternative - boxing and MMA","HesGoal / SoccerStreams alternative - football live streams"]},
      {heading:"Stream live sports for free",paragraphs:["Live events are the toughest test for any streaming site, so reliability matters most. The platforms below are chosen for stable streams, working schedules and multiple quality options during big matches.","Always line up a backup link before kick-off, and keep an ad-blocker running to avoid pop-ups during play."],bullets:[]},
      {heading:"Get the best live sports experience",paragraphs:[],bullets:["Check the schedule early and test the stream before the event","Have a second source ready as a fallback","Lower the resolution if you hit buffering","Mute chat overlays on busy pages to save bandwidth","Use a VPN if your usual sports site is geo-blocked"]}],
    faqs:[
      {q:"What are the best alternatives to Score808?",a:"The top-ranked sports sites on this page are reliable Score808 alternatives for live football and soccer, with working schedules and multiple quality options."},
      {q:"Is Buffstreams still working?",a:"Buffstreams and similar sites go down often. The Buffstreams alternatives listed here are checked regularly and stay online for NFL, NBA, NHL, MLB and UFC."},
      {q:"What is the best Streamed.pk alternative?",a:"The Streamed.pk alternatives on this page cover multi-sport live events with stable streams and light ads."},
      {q:"What is the best Streameast alternative?",a:"The Streameast alternatives on this page stream live sports, boxing and MMA with working links and light ads."},
      {q:"Where can I watch live sports for free?",a:"The top-ranked sports sites on this page stream live events with working schedules and multiple quality options."},
      {q:"Why do free sports streams buffer?",a:"Live events attract huge traffic, so lower the resolution or switch to a backup link when a stream struggles."},
      {q:"Can I watch replays for free?",a:"Many listed sites keep match replays and highlights alongside their live coverage."}]},
  torrent:{lead:"The best free torrent streaming sites for streaming torrents directly in your browser with no full download - ranked for speed, safety and ad cleanliness.",
    sections:[{heading:"Stream torrents without waiting for a download",paragraphs:["Torrent streaming sites let you watch while the data arrives, which is ideal for trying before you commit to a full download. The platforms here are tested for reliable peer connections and playable buffering.","Because P2P exposes your IP address, consider a reputable VPN when using these sites."],bullets:[]},
      {heading:"Stay safer with torrent streaming",paragraphs:[],bullets:["Use a VPN to protect your IP address on P2P networks","Prefer sites with healthy seed counts for smoother playback","Keep your ad-blocker on - torrent pages are ad-heavy","Check local laws before streaming or downloading copyrighted content"]}],
    faqs:[{q:"What is torrent streaming?",a:"It plays a torrent's video in your browser as it downloads, so you can watch immediately instead of waiting for the file to finish."},
      {q:"Do I need a VPN for torrent streaming?",a:"A VPN is strongly recommended because P2P torrenting shares your IP address with others in the swarm."},
      {q:"Is torrent streaming safe?",a:"Torrent sites are ad-heavy. Use an ad-blocker, avoid downloading unknown files, and follow the laws where you live."}]},
  indexes:{lead:"The best free streaming indexes - searchable link libraries that let you find sources for almost any movie or show in one place.",
    sections:[{heading:"Use streaming indexes to find any title",paragraphs:["An index is a directory of links rather than a streaming site itself. Indexes are invaluable when a specific title is missing from your usual platform, because they gather sources across many sites in one search box.","Because indexes link outward, quality and safety depend on the source you pick - stick to well-reviewed entries and keep your ad-blocker on."],bullets:[]},
      {heading:"Getting the most out of an index",paragraphs:[],bullets:["Search the exact title plus the year for the best matches","Prefer entries with recent comments or healthy ratings","Cross-check a source against our main list before trusting it","Keep anti-malware protection active when following external links"]}],
    faqs:[{q:"What is a streaming index?",a:"A searchable directory that links to many streaming sources for a title, rather than hosting content itself."},
      {q:"Are streaming indexes safe?",a:"They link to third-party sites, so safety varies. Use an ad-blocker, prefer popular entries, and keep malware protection on."},
      {q:"When should I use an index?",a:"Use one when a specific movie or show is not available on your preferred streaming site and you want to compare sources quickly."}]},
  books:{lead:"The best free books and reading sites - from public-domain libraries to free eBook downloads and audiobooks you can read or listen to online.",
    sections:[{heading:"Read and download books for free",paragraphs:["Free book sites range from vast public-domain libraries to platforms offering modern eBooks and audiobooks. This list focuses on legitimate, high-quality sources with large catalogues and readable formats.","For classic literature, public-domain archives are unbeatable value; for newer titles, check each site's terms and formatting options such as EPUB, PDF and MOBI."],bullets:[]},
      {heading:"What to look for in a free book site",paragraphs:[],bullets:["A large, well-organised catalogue you can search","Multiple formats (EPUB, PDF, MOBI) and audiobook support","No forced sign-up to read or download","Clean, ad-light readers and reliable downloads"]}],
    faqs:[{q:"Where can I read books for free?",a:"Public-domain libraries offer millions of classic titles for free, while some platforms add modern eBooks and audiobooks."},
      {q:"Can I download free eBooks in EPUB or PDF?",a:"Yes - the best book sites offer EPUB, PDF and Kindle-friendly formats for offline reading."},
      {q:"Are free book sites legal?",a:"Public-domain and author-approved sources are fully legal. Always check a site's terms before downloading newer titles."}]},
  generic:(category)=>{const c=category.toLowerCase();return{lead:"A curated, regularly updated selection of the best free "+c+" streaming sites, ranked by reliability, quality and how intrusive their ads are.",
    sections:[{heading:"About the best free "+c+" sites",paragraphs:["Every platform in this list is checked for availability, playback quality and ad behaviour, then ordered so the most reliable options sit at the top. Dead or ad-choked sites are removed quickly.","As always, use an ad-blocker, keep a VPN handy for privacy, and check the laws where you live before streaming."],bullets:[]}],
    faqs:[{q:"What is the best free "+c+" site?",a:"The top-ranked site on this page balances a strong catalogue with reliable playback and light ads."},
      {q:"Are these sites free?",a:"Yes - every site listed works without payment or an account, which is one of our core ranking requirements."},
      {q:"Do I need an ad-blocker?",a:"Yes. An ad-blocker keeps pages readable and protects you from malicious redirects."}]}}
};
function seoForCategory(name){const key=name.toLowerCase().replace(/[^a-z0-9]/g,"");const map={movies:"movies",tvshows:"tvshows",anime:"anime",sports:"sports",torrent:"torrent",indexes:"indexes",books:"books"};if(map[key]&&categorySeo[map[key]])return categorySeo[map[key]];return categorySeo.generic(name);}

function seoBlockHtml(seo){
  let html=""; if(seo.lead) html+=`<p class="seo-lead">${esc(seo.lead)}</p>`;
  for(const blk of seo.sections){ if(blk.heading) html+=`<h2 class="section-title">${esc(blk.heading)}</h2>`; for(const p of blk.paragraphs) html+=`<p>${esc(p)}</p>`; if(blk.bullets&&blk.bullets.length){ html+=`<ul class="seo-list">`; for(const b of blk.bullets) html+=`<li>${esc(b)}</li>`; html+=`</ul>`; } }
  if(seo.faqs&&seo.faqs.length){ html+=`<h2 class="section-title" id="faq">Frequently asked questions</h2><div class="faq">`; for(const f of seo.faqs) html+=`<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`; html+=`</div>`; }
  return html;
}
function categoryLinksHtml(){
  let html=`<section class="panel category-links-panel"><h2 class="section-title">Browse free streaming sites by category</h2><div class="category-links">`;
  for(const cat of navOrder){ const dict=catData.Categories[cat]||[]; const count=Array.isArray(dict)?dict.length:0; const label=cat.toLowerCase(); const href=catFile[cat]||"#"; html+=`<a class="category-link" href="${href}"><span class="category-link-title">Best free ${esc(label)} streaming sites</span><span class="category-link-count">${count} sites</span></a>`; }
  html+=`</div></section>`; return html;
}
function adPill(site){ return `<span class="adscore-pill ${esc(site.AdScoreCssClass)}" title="${esc(site.AdScoreLabel)}"><span class="face"></span></span>`; }

function layout(opts){
  const{title,desc,keys,canonical,robots,bodyHtml,scriptsHtml}=opts;
  const navLinks=navOrder.map(c=>`<a href="${catFile[c]}">${esc(c)}</a>`).join("\n");
  const footerLinks=navOrder.map(c=>`<a href="${catFile[c]}">${esc(c)}</a>`).join("\n");
  const seoImage=seoBase()+"/img/og-default.png";
  const siteLd=JSON.stringify({"@context":"https://schema.org","@graph":[
    {"@type":"WebSite","@id":seoBase()+"/#website",url:seoBase(),name:"freebeststreaming.com",description:"Hand-checked directory of the best free streaming sites for movies, TV shows, anime, sports, torrents and books.",inLanguage:"en",potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:seoBase()+"/Home/Category?key={search_term_string}"},"query-input":"required name=search_term_string"}},
    {"@type":"Organization","@id":seoBase()+"/#organization",name:"freebeststreaming.com",url:seoBase(),logo:{"@type":"ImageObject",url:seoImage}}
  ]});
  const ldOpen='<script type="application/ld+json">'; const ldClose='</scr'+'ipt>';
  const essentials=`<a href="about.html">About Us</a>\n      <a href="contact.html">Contact Us</a>\n      <a href="privacy.html">Privacy Policy</a>\n      <a href="cookie-policy.html">Cookie Policy</a>`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
${keys?`<meta name="keywords" content="${esc(keys)}" />`:""}
${robots&&robots.includes("noindex")?"":`<link rel="canonical" href="${esc(canonical)}" />`}
<meta name="theme-color" content="#e9f1ec" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#101613" media="(prefers-color-scheme: dark)" />
<meta name="robots" content="${esc(robots||"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")}" />
<meta name="googlebot" content="${esc(robots||"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="freebeststreaming.com" />
<meta property="og:locale" content="en_US" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:image" content="${esc(seoImage)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="freebeststreaming.com - best free streaming sites 2026" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${esc(seoImage)}" />
<link rel="icon" href="favicon.ico" />
<link rel="preconnect" href="https://www.freebeststreaming.com" />
<link rel="stylesheet" href="css/site.css" />
${ldOpen}${siteLd}${ldClose}
<script>
(function () { try { var stored = localStorage.getItem("bfs-theme"); var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; document.documentElement.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light")); } catch (e) { } })();
</script>
</head>
<body>
<div class="bg-blobs" aria-hidden="true"></div>
<header class="site-header">
  <div class="container">
    <a href="index.html" class="logo-brand">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
        <defs><linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0" stop-color="#4fae8b" /><stop offset="1" stop-color="#f0a56c" /></linearGradient></defs>
        <circle fill="url(#grad1)" cx="8" cy="8" r="8" />
        <path fill="#101613" d="m10.3 7.5c0.3 0.2 0.3 0.8 0 1l-3.4 2.4c-0.4 0.3-0.9 0-0.9-0.5v-4.8c0-0.5 0.5-0.8 0.9-0.5z" />
      </svg>
      <span>BestFreeStreaming</span>
    </a>
    <div class="header-actions">
      <button type="button" class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" title="Toggle dark mode">
        <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html">Home</a>
        ${navLinks}
      </nav>
    </div>
  </div>
</header>
<main class="container">
${bodyHtml}
</main>
<footer class="site-footer">
  <div class="container footer-inner">
    <div>
      <span class="footer-brand">BestFreeStreaming</span>
      <p class="footer-note">A curated, constantly updated selection of the internet's most reliable free streaming platforms.</p>
    </div>
    <div class="footer-links">
      <a href="index.html">Home</a>
      ${footerLinks}
    </div>
  </div>
  <div class="container footer-essentials">
    ${essentials}
  </div>
  <div class="container footer-copy">
    <span>&copy; 2026 freebeststreaming.com &middot; replica for demonstration.</span>
  </div>
</footer>
<script src="js/site.js"></script>
<script src="data/data.js"></script>
<script src="js/data.js"></script>
${scriptsHtml||""}
</body>
</html>`;
}

// Home
const sites = sitesData.Sites || [];
const good = sites.filter(s=>s.AdScore==="smile").length;
const updated = sitesData.Meta.LastUpdated || "";
let homeBody = "";
homeBody += `<section class="hero" id="top"><span class="hero-badge">Updated ${esc(updated)}</span><h1>Best free streaming sites <span class="accent">(2026)</span></h1><div class="hero-stats"><div class="stat"><span class="stat-value">${sites.length}</span><span class="stat-label">Curated sites</span></div><div class="stat"><span class="stat-value">${good}</span><span class="stat-label">Ad-free picks</span></div><div class="stat"><span class="stat-value">2026</span><span class="stat-label">Updated for</span></div></div></section>`;
homeBody += `<section class="panel" id="requirements"><h2 class="section-title">Minimum requirements for best free streaming</h2><ul class="check-list"><li>100% Free</li><li>1080p or 720p</li><li>NO account required</li><li>NO geoblocking</li><li>Mobile friendly</li><li>Works with ad-blocker</li><li>English website</li><li>Easy to start watching</li><li>Easy to find S02E03</li><li>New movies/tv shows</li><li>Old movies/tv shows</li><li>Not hosted on free subdomain</li><li>I would personally use it daily</li></ul></section>`;
homeBody += `<section class="panel" id="adscore"><h2 class="section-title">Ad-score explained</h2><ul class="adscore-list"><li><span class="adscore-pill adscore-good"><span class="face"></span></span> Pop ads are not detected. Always use an ad-blocker anyway.</li><li><span class="adscore-pill adscore-ok"><span class="face"></span></span> Pop ads are mostly blocked. May have captcha. Ad-blocker may interfere.</li><li><span class="adscore-pill adscore-bad"><span class="face"></span></span> Pop ads may redirect from the current page. Ad-blocker may interfere. Intrusive ads.</li></ul><p class="adscore-note">How ads are implemented may change over time, so <strong>always use an ad-blocker</strong> when visiting these websites.</p></section>`;
homeBody += `<section class="panel table-panel" id="top-sites"><h2 class="section-title">The best sites to watch free movies and tv shows (2026)</h2><div class="table-scroll"><table class="sites-table"><thead><tr><th class="col-rank">Rank</th><th class="col-site">Site</th><th class="col-flag">Movies</th><th class="col-flag">TV Shows</th><th class="col-flag">Ad-Score</th><th class="col-preview">Preview</th></tr></thead><tbody>`;
for(const site of sites){
  const pid="preview-"+site.Rank; const hasThumb=!!site.Thumb;
  homeBody += `<tr class="site-row"><td class="col-rank"><span class="rank-badge">${esc(site.Rank)}</span></td><td class="col-site"><a class="site-link" href="${esc(site.Url)}" target="_blank" rel="noopener">${site.Favicon?`<img class="site-favicon" src="${esc(toRel(site.Favicon))}" width="24" height="24" alt="" loading="lazy" />`:""}<span class="site-name">${esc(site.Name)}</span>${site.IsNew?`<span class="new-badge">NEW</span>`:""}</a></td><td class="col-flag"><span class="check" aria-label="Available"></span></td><td class="col-flag"><span class="check" aria-label="Available"></span></td><td class="col-flag">${adPill(site)}</td><td class="col-preview">${hasThumb?`<button type="button" class="preview-btn" data-preview="${esc(pid)}" aria-expanded="false" aria-controls="${esc(pid)}" title="Show preview of ${esc(site.Name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m4 16 5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="1.6" fill="currentColor"/></svg></button>`:""}</td></tr>`;
  if(hasThumb) homeBody += `<tr class="preview-row" id="${esc(pid)}" hidden><td colspan="6"><a href="${esc(site.Url)}" target="_blank" rel="noopener" class="preview-wrap" title="Visit ${esc(site.Name)} (opens in new tab)"><img src="${esc(toRel(site.Thumb))}" loading="lazy" alt="Screenshot of ${esc(site.Name)}" /></a></td></tr>`;
}
homeBody += `</tbody></table></div></section>`;
homeBody += `<section class="panel" id="about"><p class="hero-lead">Finding free streaming sites that aren't worthless can feel like a daunting task. The landscape is constantly changing, popular sites vanish overnight, and most of what's out there is low-quality garbage riddled with intrusive ads. We cut through the noise with a meticulously curated, constantly updated selection of the internet's most reliable platforms for movies and TV shows.</p></section>`;
homeBody += `<section class="panel seo-content">${seoBlockHtml(homeSeo)}</section>`;
homeBody += categoryLinksHtml();

const homeJsonLd = JSON.stringify({"@context":"https://schema.org","@type":"ItemList",name:sitesData.Meta.Title,description:sitesData.Meta.Description,numberOfItems:sites.length,itemListOrder:"https://schema.org/ItemListOrderDescending",itemListElement:sites.map(s=>({"@type":"ListItem",position:s.Rank,name:s.Name,url:s.Url}))});
const homeFaqLd = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:homeSeo.faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))});
const homeScripts = `<script type="application/ld+json">${homeJsonLd}</scr`+`ipt>\n<script type="application/ld+json">${homeFaqLd}</scr`+`ipt>`;

fs.writeFileSync(path.join(ROOT,"index.html"), layout({title:"Best Free Streaming Sites (2026) - Movies, TV & Sports Free",desc:"Discover the best free streaming site alternatives for movies, TV, anime, sports and books. Score808, Buffstreams & Streamed.pk alternatives. Updated for 2026.",keys:"best free streaming sites, free streaming site alternatives, free streaming sites 2026, watch movies free, score808 alternative, buffstreams alternative, streamed.pk alternative, free sports streaming",canonical:seoBase()+"/",robots:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",bodyHtml:homeBody,scriptsHtml:homeScripts}), "utf8");
console.log("wrote index.html");

// Categories
const catMeta = {
  "Movies":{title:"Best Free Movie Streaming Sites (2026) - Watch Movies Online Free",desc:"The best free movie streaming sites of 2026, hand-checked and ad-scored. Watch new releases and classics online free in HD - no account required.",keys:"free movie streaming sites, watch movies online free, free movies, best free movie sites, stream movies free 2026"},
  "TV Shows":{title:"Best Free TV Show Streaming Sites (2026) - Watch Series Online Free",desc:"The best free TV show streaming sites for 2026. Stream current seasons, complete series and box sets online free - reviewed and ad-scored.",keys:"free tv show streaming sites, watch tv shows online free, free series streaming, best free tv sites 2026"},
  "Anime":{title:"Best Free Anime Streaming Sites (2026) - Watch Anime Online Free",desc:"The best free anime streaming sites for 2026. Watch subbed and dubbed anime online free, including simulcasts - ranked and ad-scored.",keys:"free anime streaming sites, watch anime online free, anime sub dub free, best free anime sites 2026"},
  "Sports":{title:"Best Free Sports Streaming Sites (2026) - Score808, Buffstreams & Streamed.pk Alternatives",desc:"Working alternatives to Score808, Buffstreams, Streamed.pk, SportSurge and Streameast. The best free sports streaming sites for 2026 - live football, basketball, cricket, boxing, UFC and more, ranked and ad-scored.",keys:"free sports streaming sites, score808 alternative, buffstreams alternative, streamed.pk alternative, streameast alternative, sport surge alternative, free live sports 2026, watch sports online free"},
  "Torrent":{title:"Best Free Torrent Streaming Sites (2026) - Stream Torrents Online",desc:"The best free torrent streaming sites for 2026. Stream torrents in your browser without downloading - ranked for speed, safety and ads.",keys:"free torrent streaming sites, stream torrents online, torrent streaming, best torrent sites 2026"},
  "Indexes":{title:"Best Free Streaming Indexes (2026) - Search Free Streaming Links",desc:"The best free streaming indexes for 2026. Searchable link libraries that help you find any movie or show across many sources.",keys:"free streaming indexes, streaming link index, search streaming sites, best streaming index 2026"},
  "Books":{title:"Best Free Book Streaming Sites (2026) - Read eBooks Online Free",desc:"The best free book and eBook streaming sites for 2026. Read and download classic and modern books, plus audiobooks, online free.",keys:"free book streaming sites, read books online free, free ebook download, free audiobooks 2026"}
};
for(const key of navOrder){
  const list=(catData.Categories[key]||[]);
  const meta=catMeta[key]||{title:"Best Free "+key+" Streaming Sites (2026) - freebeststreaming.com",desc:"The best free "+key+" streaming sites for 2026, hand-checked and updated.",keys:""};
  const canon=seoBase()+"/"+(catFile[key]||"");
  const seo=seoForCategory(key);
  const updatedCat=catData.Meta.LastUpdated||"";
  let body="";
  body+=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${esc(key)}</span></nav>`;
  body+=`<section class="hero"><span class="hero-badge">Updated ${esc(updatedCat)}</span><h1>Best free ${esc(key.toLowerCase())} streaming sites <span class="accent">(2026)</span></h1><p class="hero-lead">${esc(seo.lead)}</p></section>`;
  body+=`<section class="panel table-panel"><h2 class="section-title">Best ${esc(key.toLowerCase())} sites</h2>`;
  if(list.length===0){ body+=`<p class="adscore-note">No sites currently listed for this category. Check back soon.</p>`; }
  else {
    body+=`<div class="table-scroll"><table class="sites-table"><thead><tr><th class="col-rank">Rank</th><th class="col-site">Site</th><th class="col-flag">Movies</th><th class="col-flag">TV Shows</th><th class="col-flag">Ad-Score</th><th class="col-preview">Preview</th></tr></thead><tbody>`;
    list.forEach((site,idx)=>{
      const pid=`preview-${idx}-${key}`; const hasThumb=!!site.Thumb;
      body+=`<tr class="site-row"><td class="col-rank"><span class="rank-badge">${idx+1}</span></td><td class="col-site"><a class="site-link" href="${esc(site.Url)}" target="_blank" rel="noopener">${site.Favicon?`<img class="site-favicon" src="${esc(toRel(site.Favicon))}" width="24" height="24" alt="" loading="lazy" />`:""}<span class="site-name">${esc(site.Name)}</span>${site.IsNew?`<span class="new-badge">NEW</span>`:""}</a></td><td class="col-flag"><span class="check" aria-label="Available"></span></td><td class="col-flag"><span class="check" aria-label="Available"></span></td><td class="col-flag">${adPill(site)}</td><td class="col-preview">${hasThumb?`<button type="button" class="preview-btn" data-preview="${esc(pid)}" aria-expanded="false" aria-controls="${esc(pid)}" title="Show preview of ${esc(site.Name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m4 16 5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="9" r="1.6" fill="currentColor"/></svg></button>`:""}</td></tr>`;
      if(hasThumb) body+=`<tr class="preview-row" id="${esc(pid)}" hidden><td colspan="6"><a href="${esc(site.Url)}" target="_blank" rel="noopener" class="preview-wrap" title="Visit ${esc(site.Name)} (opens in new tab)"><img src="${esc(toRel(site.Thumb))}" loading="lazy" alt="Screenshot of ${esc(site.Name)}" /></a></td></tr>`;
    });
    body+=`</tbody></table></div>`;
  }
  body+=`</section>`;
  body+=`<section class="panel seo-content">${seoBlockHtml(seo)}</section>`;
  body+=categoryLinksHtml();
  const catJsonLd=JSON.stringify({"@context":"https://schema.org","@type":"ItemList",name:meta.title,description:meta.desc,numberOfItems:list.length,itemListOrder:"https://schema.org/ItemListOrderDescending",itemListElement:list.map((s,i)=>({"@type":"ListItem",position:i+1,name:s.Name,url:s.Url}))});
  const catFaqLd=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:seo.faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))});
  const catBreadcrumbLd=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:seoBase()+"/"},{"@type":"ListItem",position:2,name:key+" streaming sites",item:canon}]});
  const catScripts=`<script type="application/ld+json">${catJsonLd}</scr`+`ipt>\n<script type="application/ld+json">${catFaqLd}</scr`+`ipt>\n<script type="application/ld+json">${catBreadcrumbLd}</scr`+`ipt>`;
  fs.writeFileSync(path.join(ROOT,catFile[key]), layout({title:meta.title,desc:meta.desc,keys:meta.keys,canonical:canon,robots:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",bodyHtml:body,scriptsHtml:catScripts}), "utf8");
  console.log("wrote",catFile[key]);
}

// Privacy
const privacyBody=`<section class="panel seo-content"><h1>Privacy Policy</h1><p>freebeststreaming.com is a directory that links to third-party streaming platforms. This page explains what limited information we handle and how those external links affect your privacy.</p><h2 class="section-title">Information we collect</h2><p>We do not require an account to browse the site and we do not sell personal data. Standard web-server logs may record anonymous technical details such as your browser type, the pages you visit and approximate location for security and performance monitoring.</p><h2 class="section-title">Cookies and local storage</h2><p>A small browser preference (your light or dark theme choice) is stored locally on your device. We do not use it to identify you, and clearing your browser storage removes it at any time.</p><h2 class="section-title">Third-party sites</h2><p>Links on this site lead to external platforms we do not control. Their privacy practices, ads and cookies are governed by their own policies. We recommend reviewing a site's terms and using an ad-blocker before browsing.</p><h2 class="section-title">Contact</h2><p>If you have questions about this policy, please reach out through the contact details on our homepage.</p></section>`;
fs.writeFileSync(path.join(ROOT,"privacy.html"), layout({title:"Privacy Policy - freebeststreaming.com",desc:"Read the freebeststreaming.com privacy policy to learn how we handle data, cookies and third-party links.",keys:"",canonical:seoBase()+"/privacy.html",robots:"noindex, follow",bodyHtml:privacyBody,scriptsHtml:""}), "utf8");
console.log("wrote privacy.html");

// 404
const notFoundBody=`<section class="hero"><span class="hero-badge">Error 404</span><h1>Page <span class="accent">not found</span></h1><p class="hero-lead">The page you were looking for doesn't exist or has moved. Don't worry - the best free streaming sites are one click away. Pick a category below or head back to the homepage.</p><p class="hero-actions"><a class="btn btn-primary" href="index.html">Back to homepage</a></p></section>${categoryLinksHtml()}<section class="panel seo-content"><h2 class="section-title">Popular destinations</h2><p>If a link brought you here, it may be out of date. These sections are the most useful places to continue:</p><ul class="seo-list"><li><a href="index.html">Best free streaming sites (2026) - the full ranked list</a></li><li><a href="movies.html">Best free movie streaming sites</a></li><li><a href="tv-shows.html">Best free TV show streaming sites</a></li><li><a href="anime.html">Best free anime streaming sites</a></li><li><a href="sports.html">Best free sports streaming sites</a></li></ul></section>`;
fs.writeFileSync(path.join(ROOT,"404.html"), layout({title:"Page not found (404) - freebeststreaming.com",desc:"The page you requested could not be found. Browse our hand-checked list of the best free streaming sites for movies, TV shows, anime and sports instead.",keys:"",canonical:seoBase()+"/404.html",robots:"noindex, follow",bodyHtml:notFoundBody,scriptsHtml:""}), "utf8");
console.log("wrote 404.html");

// Esssential pages
function simplePage(file,title,desc,body){
  fs.writeFileSync(path.join(ROOT,file), layout({title,desc,keys:"",canonical:seoBase()+"/"+file,robots:"noindex, follow",bodyHtml:body,scriptsHtml:""}), "utf8");
  console.log("wrote",file);
}
simplePage("about.html","About Us - freebeststreaming.com","Learn about freebeststreaming.com, a hand-checked directory of free streaming sites.",`<section class="panel seo-content"><h1>About Us</h1><p>freebeststreaming.com is a hand-checked, constantly updated directory of the best free streaming sites for movies, TV shows, anime, sports, torrents and books. We test every platform for speed, video quality, ad intrusiveness and whether it works without an account.</p><h2 class="section-title">Our mission</h2><p>We cut through the noise so you spend your time watching, not troubleshooting. Dead or ad-choked sites are removed quickly, and rankings reflect real, repeatable criteria rather than paid placement.</p><h2 class="section-title">Contact</h2><p>Questions or suggestions? Reach out via our <a href="contact.html">contact page</a>.</p></section>`);
simplePage("contact.html","Contact Us - freebeststreaming.com","Contact freebeststreaming.com with suggestions, broken links or feedback.",`<section class="panel seo-content"><h1>Contact Us</h1><p>Have a site to suggest, a broken link to report, or feedback? We would love to hear from you.</p><h2 class="section-title">Get in touch</h2><p>Email us at <a href="mailto:contact@freebeststreaming.com">contact@freebeststreaming.com</a> and we will get back to you as soon as possible.</p><p>You can also use the form below (coming soon) to submit a streaming site for review.</p></section>`);
simplePage("cookie-policy.html","Cookie Policy - freebeststreaming.com","Read the freebeststreaming.com cookie policy.",`<section class="panel seo-content"><h1>Cookie Policy</h1><p>This site uses minimal local storage to remember your light or dark theme preference. No tracking cookies are used to identify you.</p><h2 class="section-title">What we store</h2><p>A small browser preference (your theme choice) is stored locally on your device via <code>localStorage</code>. Clearing your browser storage removes it at any time.</p><h2 class="section-title">Third-party sites</h2><p>Links lead to external platforms we do not control. Their cookie practices are governed by their own policies. We recommend using an ad-blocker before browsing.</p></section>`);

// robots + sitemap
const robotsTxt="User-agent: *\nAllow: /\n\nSitemap: "+seoBase()+"/sitemap.xml\n";
fs.writeFileSync(path.join(ROOT,"robots.txt"), robotsTxt, "utf8");
const today=new Date().toISOString().slice(0,10);
let sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
sitemap+='  <url><loc>'+seoBase()+'/</loc><lastmod>'+today+'</lastmod><changefreq>daily</changefreq><priority>1.0</priority><image:image><image:loc>'+seoBase()+'/img/og-default.png</image:loc><image:title>Best free streaming sites (2026)</image:title></image:image></url>\n';
for(const cat of navOrder){ const loc=seoBase()+"/"+(catFile[cat]||""); const title="Best free "+cat.toLowerCase()+" streaming sites (2026)"; sitemap+='  <url><loc>'+loc+'</loc><lastmod>'+today+'</lastmod><changefreq>daily</changefreq><priority>0.8</priority><image:image><image:loc>'+seoBase()+'/img/og-default.png</image:loc><image:title>'+title+'</image:title></image:image></url>\n'; }
sitemap+='</urlset>\n';
fs.writeFileSync(path.join(ROOT,"sitemap.xml"), sitemap, "utf8");
console.log("updated robots.txt, sitemap.xml");
// Generate a JS wrapper so data auto-loads even when opened via file://
const _json = fs.readFileSync(path.join(ROOT, "data", "data.json"), "utf8");
fs.writeFileSync(path.join(ROOT, "data", "data.js"), "window.__BFS_DATA__ = " + _json + ";", "utf8");
console.log("wrote data/data.js");
console.log("DONE");