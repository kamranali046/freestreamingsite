# Static site (HTML/CSS/JS)

This folder is a static copy of the site. No backend, no admin panel.

## Folder
- `data/` -> everything: `data.json` (all data) AND `data/images/` (favicons + thumbs). Mirrors the .NET `wwwroot/data` folder exactly.

## Updating data from the .NET version
1. Run the .NET site (rebuilt), use the admin panel to fetch/edit data.
2. Copy the whole .NET `wwwroot/data` folder and replace this folder's `data/` folder with it.
   (The folder now contains `data.json`, `data.js` and `images/`.)
3. Open `index.html` - it auto-loads the fresh data via `data/data.js` (works on file://).
   (Optional) Run `node update.js` to also refresh baked HTML/SEO counts.
4. Push.

The pages read JSON at runtime (`js/data.js`), so replacing the `data` folder updates the site automatically when served over HTTP. Baked HTML remains as fallback/offline content.

Theme changes are edited directly in `css/site.css` / HTML and pushed manually.