// Render one library ad with the 4 platform overlays.
// usage: node render.js <path-to-site-repo> <ad-slug> <out-dir>
//   ad-slug = file name of the ad video without .mp4 (assets/ads/<slug>.mp4)
// out: <out>/<BRAND>-{reels,tiktok,shorts,feed}.mp4 at full 1080p quality, plus ad.json
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const [site, slug, out] = process.argv.slice(2);
const HERE = __dirname;
// safe zones (px on 1080x1920): from memory of each app's UI, tuned by eye
const LAYOUT = { reels:{l:56,t:236}, tiktok:{l:48,t:200}, shorts:{l:56,t:230}, feed:{l:56,t:80} };
const cfg = fs.readFileSync(path.join(site, 'config.js'), 'utf8').replace(/\bconst\b/g, 'var');
const ADS = new Function('window', cfg + ';return ADS;')({});
const ad = ADS.find(a => (a.video || '').endsWith('/' + slug + '.mp4'));
if (!ad) throw new Error('ad not found: ' + slug);
const [brand, product = ''] = String(ad.credit || '').split(' · ');
const src = path.join(site, ad.video);
const dur = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${src}"`).toString());
fs.mkdirSync(out, { recursive: true });
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const base = fs.readFileSync(path.join(HERE, 'overlay.html'), 'utf8')
    .replace('__BRAND__', esc(brand)).replace('__PRODUCT__', esc(cap(product)));
  await p.goto('file://' + path.join(HERE, 'overlay.html'));
  const tmp = fs.mkdtempSync('/tmp/ovl-');
  for (const [lay, v] of Object.entries(LAYOUT)) {
    const html = base.replace('--l:56px;--t:236px', `--l:${v.l}px;--t:${v.t}px`);
    for (const [mode, n] of [['A', 45], ['L', 240]]) { // L = one 8 s Cookie turn, loops seamlessly
      const dir = `${tmp}/${lay}-${mode}`; fs.mkdirSync(dir);
      await p.evaluate(h => { document.open(); document.write(h); document.close(); }, html.replace('__MODE__', mode));
      await p.waitForTimeout(250);
      for (let i = 0; i < n; i++) {
        await p.evaluate(t => document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }), i * 1000 / 30);
        await p.screenshot({ path: `${dir}/${String(i).padStart(3, '0')}.png`, omitBackground: true });
      }
      execSync(`ffmpeg -v error -y -framerate 30 -i ${dir}/%03d.png -c:v qtrle ${dir}.mov`);
    }
    // X free accounts: max 140 s
    const d = lay === 'feed' ? Math.min(dur, 139) : dur;
    const name = `${out}/${brand.replace(/[^A-Za-z0-9]+/g, '')}-${lay}`;
    const ov = `-i "${src}" -i ${tmp}/${lay}-A.mov -stream_loop -1 -i ${tmp}/${lay}-L.mov -filter_complex "[0:v]scale=1080:1920,setsar=1,fps=30[v];[1:v][2:v]concat=n=2[o0];[v][o0]overlay=eof_action=pass[x]" -map "[x]" -map 0:a? -t ${d}`;
    // full quality, no size cap
    execSync(`ffmpeg -v error -y ${ov} -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 160k -movflags +faststart "${name}.mp4"`);
    console.log(name + '.mp4', (fs.statSync(name + '.mp4').size / 1048576).toFixed(1) + ' MB');
  }
  await b.close();
  fs.writeFileSync(`${out}/ad.json`, JSON.stringify({ slug, brand, product, ...ad, duration: dur }, null, 2));
})();
