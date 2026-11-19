# cookshipcreatives.com

One-page site for Cookshipcreatives animated ads. Plain HTML, no build step.

## Edit content
Everything you change lives in **`config.js`**: intro video, booking link, course link,
TEEP formats, the ad library (one line per ad), packages and their Whop checkout links.
Edit it on GitHub, commit, and the site updates in about a minute.

## Files
- `index.html` – the page (layout, styles, logic)
- `config.js` – all content and links
- `assets/` – images
- `_headers` – caching rules for Cloudflare Pages

## Cloudflare Pages settings (first time only)
Workers & Pages → Create → Pages → Connect to Git → pick this repo, then:
- Framework preset: **None**
- Build command: *(leave empty)*
- Build output directory: **`/`**
Then Custom domains → add `cookshipcreatives.com` (and `www`).
