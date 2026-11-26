# Caption spec (approved by the user, Nov 26 2026)

Every post on every platform gets a caption in this exact structure and voice. Do not shorten it, do not freestyle a different format. The gold standard is `captions-example-echo.txt` (the ECHO ad, all 8 texts). Read it first, then write the new ad's captions to match it section for section.

## Data: ONLY what is on the website
Source of truth = `breakdowns.js` on `main` of ansarjawad/cookshipcreatives-site, entry `"assets/ads/<slug>.mp4"` (the "Dig deeper" panel), plus brand/product/title from config.js. Fields used: who, moment, feeling, intensity, felt, desire, desire2, message, hook, hookLayers (visual / text / spoken), hookWhy, awareness, journey, structure.
NEVER put internal Ad Vault / forensic / recipe data in a caption: no cut counts, shot counts, durations/pace stats, cast or character descriptions, set/world descriptions, music/sound details, prompts, tools, or anything that teaches people how the ad was made. We show why the ad works, not how to build it.
If an ad has no breakdowns.js entry, stop for that ad: pick the next one and log `no breakdown`.

## Voice
Write as if the author of "Breakthrough Advertising" (Eugene Schwartz) wrote it: long, steady, declarative sentences; mass desire; the ad does not create desire, it channels desire already in the market; awareness stage; the price of the problem shown rather than explained; the moment of private pain; the obstacle named plainly. Concrete details from the ad, never generic.
Avoid anything that reads as AI writing: no "Not X. Y." / "It's not about X, it's about Y" contrasts (at most one per post), no rhythmic fragment strings ("No A. No B. Just C."), no three-item punchy lists used as a trick, no em dashes, no "game-changer / unlock / dive in / here's the thing", no emoji except the single one allowed in the first line on Instagram/YouTube. Plain words, no hype.
Never claim Cookshipcreatives made the ad. Frame is "Ad we love: BRAND". No link or URL, and don't write cookshipcreatives.com, anywhere.

## Structure (Instagram, Facebook, LinkedIn: long posts)
1. `Ad we love: BRAND, product <emoji>` (Instagram only gets the emoji; Facebook/Threads/LinkedIn none)
2. the sung/spoken hook line in quotes (hookLayers.spoken; if none, the on-screen text)
3. Opening paragraph: before the product appears, the ad has already told you who it is for; one concrete picture from the hook (hookLayers.visual) and who recognises it
4. `AD BREAKDOWN`
5. Labelled paragraphs, in this order, each a full-sentence paragraph (skip one only if the data truly has nothing for it):
   - `The market:` from who
   - `The desire:` from desire + desire2, and the line that the ad channels a desire already present
   - `The awareness:` from awareness (what stage, and what the ad therefore shows or skips)
   - `The moment:` from moment + feeling + felt + intensity
   - `The turn:` the obstacle and what moves him past it (from structure: Discovery)
   - `The proof:` from structure: Transformation
   - `The payoff:` from structure: Payoff
   - `The product:` when it arrives (structure: Product) and what it answers
   - `The promise:` from message
6. CTA `Want animated ads like this for your brand? Link in bio.` (LinkedIn: `Visit our page.`)
7. Hashtags: `#animatedads #3danimation #dtcbrands #adcreative` + one format/style tag (#musicalads for sung ads).

## Per platform (limits for free accounts; use close to the max the data allows, never exceed)
- Instagram: 2,200 chars. Sections as above. Aim 2,100-2,200 (the first ~125 chars show before "more", so the hook line must sit in them).
- Facebook: same text as Instagram without the emoji (limit 63,206, we mirror Instagram).
- TikTok: 4,000. Same content as ONE flow of paragraphs (no label lines), plus `The hook has three layers.` (visual, spoken, `Why the hook stops the scroll:` from hookWhy), the journey stage line, `The ending` (structure: Resolution), and `The pattern worth studying:` a one-sentence takeaway. CTA + hashtags in the last paragraph.
- YouTube: title `Ad we love: BRAND <emoji> <hook phrase> | Ad Breakdown` (under 100 chars, no #). Description (5,000): the long structure above, the three hook layers, journey stage, then `STRUCTURE` with the website's timeline (`0:00 Hook: ...` one line per stage, text from breakdowns.js structure), the pattern line, `Want animated ads like this for your brand? Check our channel page.`, then `#shorts` + hashtags. Not made for kids.
- LinkedIn: 3,000. Long structure, journey stage, `The ending`, `The pattern worth studying`, `Visit our page.`, no hashtags needed.
- X: 280. `Ad we love: BRAND`, the hook quote, one sentence of breakdown (awareness + the obstacle), `Want ads like this? Link in our profile.` No hashtags.
- Threads: 500. Line 1 `Ad we love: BRAND, product.`, the hook quote plus one recognition sentence, an `AD BREAKDOWN.` paragraph (desire, awareness, obstacle in plain sentences), `Want animated ads like this? Link in bio.`

## Checks before posting
Count characters of every caption and confirm each is under its limit. Reread each for forbidden vault data, links, "we made", and AI-sounding patterns. Fix and recount.
