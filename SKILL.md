---
name: "daily-ad-posting"
description: "Post one ad from the Cookshipcreatives ad library to all 7 social pages (Instagram, Facebook, Threads, TikTok, YouTube Shorts, X, LinkedIn) with platform overlays, via the user's Chrome, without duplicates, always in full 1080p quality, fully automatic with no permission questions."
---

# Daily ad posting (Cookshipcreatives)

One run = ONE ad posted once to each of the 7 Cookshipcreatives pages. There are THREE runs a day (three scheduled tasks, 5 hours apart: 17:13, 22:13 and 03:13 Pakistan time), so three new ads go out daily: an ad already posted earlier today is never a reason to skip a run; always post the next ad not in posted.json. Never post anything twice.

## Two standing rules from the user (Nov 25 2026)
1. **Fully automatic, no questions.** Run the whole workflow end to end (pick, render, split, queue, captions, duplicate check, post on all 7 platforms, log, push, report) without asking the user for permission or confirmation at any step. Don't stop to ask "should I post?", "which ad?", "small file or not?" etc.: decide by this skill and carry on. If a platform can't be done (wrong account, login page, captcha, upload failure), skip that platform, log `blocked: <reason>`, continue with the rest, and mention it in the report. Report afterwards in Roman Urdu. Deleting existing posts is not part of this workflow: if a fix would need a delete, report it instead.
2. **Highest quality, always.** Every video goes up as the full 1080p render (no size cap). Never upload a -small or re-compressed file, on any platform, for any reason.

## Fixed places
- Site repo: GitHub `ansarjawad/cookshipcreatives-site` (public). `main` = website (`config.js` ADS list, videos in `assets/ads/<slug>.mp4`). Clone with `--depth 1`.
- Kit branch `social-kit` (same repo): `render.js`, `overlay.html`, fonts, `cookie.webp`, `posted.json` (the posting log). Clone it into a separate folder.
- Queue branch `social-queue`: today's rendered videos, force-pushed each run (raw URL works with CORS, used for LinkedIn).
- Commit as the author of the latest commit on main (`git log -1 --format='%an'` / `%ae`), push with `git -c push.negotiate=true push`.

## Overlay (decided with the user, Nov 26 2026, don't change without asking)
Minimal: ONE element only, the tomato "Get ads like this" pill (Cookie + cookshipcreatives.com), placed TOP-LEFT. No "Ad we love: BRAND" badge, no product pill, no Format/Industry/tag pills, no other text. The pill stays still (only a soft fade-in at the start); the only ongoing motion is Cookie turning slowly clockwise (one turn per 8 s, seamless loop). Ad footage plays straight, no hook.
Layouts (top-left offsets): `reels` (Instagram, Facebook, Threads) l56 t236, `tiktok` l48 t200, `shorts` (YouTube) l56 t230, `feed` (X, LinkedIn) l56 t80.
The brand name still goes in captions/titles ("Ad we love: BRAND, product"), just not in the video.

## Steps
1. **Pick the ad.** Load ADS from config.js and posted.json. Pick the first ad (in ADS order) whose slug is not in posted.json. Avoid the same industry as the last posted ad when another choice exists. If every ad is posted, stop and tell the user the library is used up.
2. **Render.** `cd <site> && nohup node <kit>/render.js . <slug> <out> &` (Playwright + ffmpeg are preinstalled). It takes 10-12 minutes, longer than the 10-minute Bash limit, so run it in the background and poll the log (a foreground run gets killed halfway). Outputs `<BRAND>-reels/tiktok/shorts/feed.mp4` at full 1080p quality (no size cap: the user's choice), plus ad.json (no -small files are made any more). Every posted video carries the overlay.
   **ALWAYS upload the full-quality file. NEVER post a -small file** (user's rule, Nov 25 2026: the -small files are ~500 kbps and look very bad). The Chrome file_upload tool takes at most ~10 MB per call, so the full file goes up in chunks (step 6a). If the full file can't be uploaded on a platform, skip that platform and log `blocked: full-quality upload failed`; do not fall back to -small.
2b. **Split for upload, one fresh set per platform.** Note each full file's `sha1sum`, then: `for p in instagram:reels facebook:reels threads:reels tiktok:tiktok youtube:shorts x:feed linkedin:feed; do n=${p%%:*}; l=${p##*:}; mkdir -p /mnt/user-data/outputs/$n && split -b 9500000 -d -a 1 <out>/<BRAND>-$l.mp4 /mnt/user-data/outputs/$n/$n.part; done`. Files must be under `/mnt/user-data/outputs/` (file_upload rejects `/home/claude/...`). **Each set of parts can be used for ONE upload only**: after a part file has been uploaded once, the next upload of the same file arrives changed (part0 grows by a few KB) and the SHA-1 check fails. For every platform, split a fresh copy into a new folder with new names (e.g. `/mnt/user-data/outputs/<platform>/<platform>.part0...`).
3. **Queue.** Force-push the four videos to the `social-queue` branch (orphan, replace contents).
4. **Captions.** Write from ad.json, same voice every time:
   **No website link or URL in any caption, title or description, on any platform** (the user's rule: posts with links get less reach and look spammy). Don't write cookshipcreatives.com either. The CTA points to the profile instead; the overlay in the video already shows the site.
   - Instagram / Facebook: `Ad we love: BRAND, product <emoji>` + one-line story hook from the ad + `Want animated ads like this for your brand? Link in bio.` + 4-5 hashtags (#animatedads, style tag, #dtcbrands, #adcreative, format tag).
   - TikTok: same, one paragraph.
   - YouTube: title `Ad we love: BRAND <emoji> <hook>` (under 100 chars, no #); description: 1-2 lines + `Want animated ads like this for your brand? Check our channel page.` + `#shorts` + hashtags. Not made for kids. Public.
   - X: short, no hashtags, ends `Want animated ads like this? Link in our profile.`
   - LinkedIn: 2-3 short lines on why the ad works + `Want animated ads like this for your brand? Visit our page.`
   - Threads: one paragraph, ends `Want animated ads like this? Link in bio.`
   Never claim Cookshipcreatives made the ad.
5. **Duplicate check (every platform, before uploading).** Open the page's recent posts; if a post with this BRAND from the last 7 days is there, skip that platform and log it as `already`. Also skip any platform posted.json already marks `ok` for this slug.
6. **Post with Claude in Chrome** (load the chrome-browser skill first; open your own tab; close it at the end). Accounts must be Cookshipcreatives on every site: check the name in the composer before posting. If a site shows another account (e.g. The Cooper Family), a login page or a captcha, do not post there: log `blocked: <reason>` and move on.
   **6a. Full-quality upload (chunk method, works on every site, tested Nov 25 2026).** On the page (after it loads, before opening the composer if the composer would close on click):
   1. javascript: `window.__parts=[]; const h=document.createElement('input'); h.type='file'; h.id='cc-holder'; h.style.cssText='position:fixed;top:0;left:0;width:10px;height:10px;opacity:0.01;z-index:99999'; h.addEventListener('change',()=>window.__parts.push(h.files[0])); document.body.appendChild(h);`
   2. `find` the cc-holder file input, then call file_upload once PER part (`<BRAND>-<layout>.part0`, `part1`, ...), each as its own tool call (not inside one browser_batch: the 10 MB cap counts the whole batch, and a failed batch can drop part0 silently).
   3. javascript: sort `__parts` by name, `window.__ccfile=new File([new Blob(sorted)],'<BRAND>-<layout>.mp4',{type:'video/mp4'})`, compute SHA-1 with `crypto.subtle.digest` and compare with the sha1sum from step 2b. Mismatch or missing part → re-upload the missing part, never post a broken file.
   4. Put the file into the site's real input: `const dt=new DataTransfer(); dt.items.add(window.__ccfile); input.files=dt.files; input.dispatchEvent(new Event('change',{bubbles:true}))`. Fetching from the social-queue raw URL does NOT work on Meta sites (CSP blocks it), so use chunks.
   - **Instagram:** instagram.com → Create → Post → find the dialog file input → inject `__ccfile` (6a) → crop icon → **Original** → Next → Next → caption → Share. Wait for "Your reel has been shared" (a 55 MB file takes 1-2 min on "Sharing").
   - **Facebook Page:** facebook.com/reels/create/ (must show "What's on your mind, Cookshipcreatives?") → inject `__ccfile` into its video file input → description → Escape hashtag popup → wait until the timeline shows frames (upload done) → Next → Post → "Not now" on the WhatsApp prompt. Check facebook.com/cookshipcreatives/reels/ a few minutes later.
   - **Emoji:** typing an emoji with the type action can wipe the text before it (seen on Facebook and Threads). Type captions there without the emoji, and always read the caption back before posting.
   - **Threads:** threads.com/@cookshipcreatives → "What's new?" composer (header must say cookshipcreatives) → inject `__ccfile` into the dialog's file input → text → Post. Don't type emoji with the type action here (it wiped the text before it once); check the text with javascript before posting. Verify on threads.com/@cookshipcreatives.
   - **TikTok:** tiktok.com/tiktokstudio/upload → inject `__ccfile` (tiktok layout) into the upload input → dismiss the "Preview" tip → replace the description (ctrl+a, Delete, type, Escape) → Post → "Post now" on the check dialog.
   - **YouTube:** studio.youtube.com → Upload videos → inject `__ccfile` (shorts layout) into the dialog's file input. Set title and description with javascript (`#textbox[contenteditable]` boxes in `ytcp-uploads-dialog`, execCommand selectAll + insertText): typing goes into the wrong box. Not made for kids (`tp-yt-paper-radio-button[name=VIDEO_MADE_FOR_KIDS_NOT_MFK]`) → Next ×3 → Public → Publish → "Publish anyway". Log the Shorts URL (from Content → Shorts).
   - **X:** x.com/home → inject `__ccfile` (feed layout) into `input[data-testid=fileInput]` → type text in the "Post text" box → wait until the attachment says "Ready" → Post.
   - **LinkedIn Page:** linkedin.com/company/144711048/admin/page-posts/published/?share=true. LinkedIn has no reachable file input: build `__ccfile` (feed layout) via 6a, then patch `HTMLInputElement.prototype.click` so LinkedIn's own file input gets that file via DataTransfer and a change event (restore the original click after), then click Add media → Next → text → Post. Click Post ONCE, then check Page posts after a minute (big files take a while to appear); never retry blindly (this created a duplicate once).
7. **Log.** Append `{slug, brand, date, platforms:{instagram, facebook, threads, tiktok, youtube, x, linkedin}}` to posted.json with `ok`, `already`, a URL, or `blocked: <reason>`; commit and push `social-kit`. A platform that failed is retried only in the next run, only for that platform, after the duplicate check.
8. **Report** (Roman Urdu, short): ad posted, table of platforms with status, anything the user must fix (logins, captcha), and a reminder to share the Instagram reel to story and the "Ads" highlight from the phone (web can't post stories).

## Don'ts
- Never post an ad twice on a platform, never click a publish button twice.
- Never type passwords, solve captchas, or switch accounts by logging in.
- Never upload a -small or re-compressed video: full 1080p quality only.
- Never stop mid-run to ask the user for permission or a choice: follow this skill, skip what can't be done, and report at the end.
- Don't change overlay design, CTA wording or captions style without the user.