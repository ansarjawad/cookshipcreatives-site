/* Cookshipcreatives tracking: loads only the tools whose IDs are set in SITE.analytics,
   then sends the same events to all of them.
   Internal traffic: open the site once with ?cs_internal=1 on your own devices (undo with ?cs_internal=0).
   Your visits are then tagged internal in GA4 (filtered out) and ad pixels don't load at all. */
(function(){
  const A = (typeof SITE !== "undefined" && SITE.analytics) || {};
  const load = (src, attrs) => { const s = document.createElement("script"); s.async = true; s.src = src; Object.assign(s, attrs || {}); document.head.appendChild(s); };

  let internal = false;
  try {
    const q = new URLSearchParams(location.search).get("cs_internal");
    if (q === "1") localStorage.setItem("cs_internal", "1");
    if (q === "0") localStorage.removeItem("cs_internal");
    internal = localStorage.getItem("cs_internal") === "1";
  } catch(e){}

  if (A.ga4) {
    load("https://www.googletagmanager.com/gtag/js?id=" + A.ga4);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", A.ga4, internal ? { traffic_type: "internal" } : {});
  }
  if (!internal && A.metaPixel) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", A.metaPixel); fbq("track", "PageView");
  }
  if (!internal && A.tiktokPixel) {
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load(A.tiktokPixel); ttq.page(); }(window,document,"ttq");
  }
  if (!internal && A.linkedin) {
    window._linkedin_partner_id = A.linkedin;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(A.linkedin);
    if (!window.lintrk) { window.lintrk = function(a,b){ window.lintrk.q.push([a,b]); }; window.lintrk.q = []; }
    load("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
  if (!internal && A.xPixel) {
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments)},s.version="1.1",s.queue=[],u=t.createElement(n),u.async=!0,u.src="https://static.ads-twitter.com/uwt.js",a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,"script");
    twq("config", A.xPixel);
  }

  // Event map. Ad pixels only get events that matter for ads; GA4 gets everything.
  const LEADS = /^(book_call|whatsapp_click|email_click)$/;
  const STD = {
    booking_completed: { meta: "Schedule",         tt: "SubmitForm" },
    book_call:         { meta: "Lead",             tt: "Contact" },
    whatsapp_click:    { meta: "Contact",          tt: "Contact" },
    email_click:       { meta: "Contact",          tt: "Contact" },
    begin_checkout:    { meta: "InitiateCheckout", tt: "InitiateCheckout" },
    video_play:        { meta: "ViewContent",      tt: "ViewContent" },
  };
  const PIXEL_CUSTOM = /^(get_ads_like_this|contact_open)$/; // custom events worth sending to ad pixels
  window.csTrack = function(name, params){
    params = params || {};
    try { if (window.gtag) { gtag("event", name, params); if (LEADS.test(name)) gtag("event", "generate_lead", Object.assign({ method: name }, params)); } } catch(e){}
    const m = STD[name];
    if (!m && !PIXEL_CUSTOM.test(name)) return;
    try { if (window.fbq) m ? fbq("track", m.meta, params) : fbq("trackCustom", name, params); } catch(e){}
    try { const X = A.xEvents || {}; if (window.twq) { if (X.lead && (LEADS.test(name) || name === "booking_completed")) twq("event", X.lead, {}); if (X.checkout && name === "begin_checkout") twq("event", X.checkout, {}); } } catch(e){}
    try { if (window.ttq) ttq.track(m ? m.tt : "ClickButton", Object.assign({ content_name: name }, params)); } catch(e){}
  };

  const adTitle = el => { const c = el.closest(".ad"); const t = c && c.querySelector(".meta i.title"); return t ? t.textContent.replace(/^Title/, "").trim().slice(0, 100) : undefined; };
  const videoName = v => v.closest(".intro, .hero") ? "intro" : (adTitle(v) || (v.currentSrc || "").split("/").pop());

  // clicks
  document.addEventListener("click", e => {
    const el = e.target.closest("a,button"); if (!el) return;
    const href = el.getAttribute("href") || "";
    if (el.id === "optCal") return csTrack("book_call");
    if (el.id === "optWa") return csTrack("whatsapp_click");
    if (el.id === "optMail" || href.startsWith("mailto:")) return csTrack("email_click");
    if (/whop\.com/.test(href)) { const card = el.closest(".plan, article, li"); return csTrack("begin_checkout", { plan: (el.textContent || "").replace(/^Start with\s*/i, "").trim(), section: card ? "packages" : "other" }); }
    if (el.classList.contains("like")) return csTrack("get_ads_like_this", { ad: adTitle(el) });
    if (el.id === "bookCustom" || el.id === "orderOne" || el.id === "f-book" || el.closest("#float")) return csTrack("contact_open", { from: el.id || "float" });
    if (el.matches(".jump, .nx, .sw, #modes button, .tab")) return csTrack("library_browse", { to: (el.dataset.v || el.dataset.m || el.textContent || "").trim().slice(0, 60) });
    if (/cal\.com/.test(href)) return csTrack("book_call", { from: "link" });
    if (/^https?:/.test(href) && !href.includes(location.hostname)) return csTrack("outbound_click", { url: href.slice(0, 200) });
  }, true);

  // video: start + 25/50/75/100 %
  const played = new WeakSet(), marks = new WeakMap();
  document.addEventListener("play", e => {
    const v = e.target; if (!(v instanceof HTMLVideoElement) || played.has(v)) return; played.add(v);
    csTrack("video_play", { video: videoName(v) });
  }, true);
  const progress = (v, p) => { const s = marks.get(v) || new Set(); if (s.has(p)) return; s.add(p); marks.set(v, s); csTrack("video_progress", { video: videoName(v), percent: p }); };
  document.addEventListener("timeupdate", e => {
    const v = e.target; if (!(v instanceof HTMLVideoElement) || !v.duration) return;
    const r = v.currentTime / v.duration * 100;
    [25, 50, 75].forEach(p => { if (r >= p) progress(v, p); });
    if (r >= 97) progress(v, 100);
  }, true);
  document.addEventListener("ended", e => { const v = e.target; if (v instanceof HTMLVideoElement) progress(v, 100); }, true);

  // sections seen (once each) and scroll depth
  const SECTIONS = { library: "#library", packages: "#packages", journey: "#path", awareness: "#awareness", sophistication: "#sophistication", how_we_build: "#funnel-all", footer: "footer" };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { csTrack("section_view", { section: en.target.dataset.csSec }); io.unobserve(en.target); } }), { threshold: 0.35 });
    Object.entries(SECTIONS).forEach(([k, sel]) => { const el = document.querySelector(sel); if (el) { el.dataset.csSec = k; io.observe(el); } });
  }
  const depths = new Set();
  addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight; if (h <= 0) return;
    const r = scrollY / h * 100;
    [25, 50, 75, 90].forEach(p => { if (r >= p && !depths.has(p)) { depths.add(p); csTrack("scroll_depth", { percent: p }); } });
  }, { passive: true });

  // Cal.com booking pops up on the site, so a finished booking can be measured
  const calLink = (typeof SITE !== "undefined" && SITE.calLink || "").replace(/^https?:\/\/cal\.com\//, "");
  if (calLink) {
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "cs", { origin: "https://cal.com" });
    let booked = false;
    const done = () => { if (booked) return; booked = true; csTrack("booking_completed", { method: "cal" }); };
    Cal.ns.cs("on", { action: "bookingSuccessfulV2", callback: done });
    Cal.ns.cs("on", { action: "bookingSuccessful", callback: done });
    document.addEventListener("click", e => {
      const el = e.target.closest("#optCal, a[href*='cal.com/']"); if (!el || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      try { const s = document.getElementById("contact"); if (s && !s.hidden) { s.hidden = true; document.body.style.overflow = ""; } } catch(err){}
      Cal.ns.cs("modal", { calLink, config: { layout: "month_view" } });
    });
  }
})();
