/* Cookshipcreatives tracking: loads only the tools whose IDs are set in SITE.analytics,
   then sends the same events to all of them. */
(function(){
  const A = (typeof SITE !== "undefined" && SITE.analytics) || {};
  const load = (src, attrs) => { const s = document.createElement("script"); s.async = true; s.src = src; Object.assign(s, attrs || {}); document.head.appendChild(s); };

  if (A.ga4) {
    load("https://www.googletagmanager.com/gtag/js?id=" + A.ga4);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", A.ga4);
  }
  if (A.metaPixel) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", A.metaPixel); fbq("track", "PageView");
  }
  if (A.tiktokPixel) {
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load(A.tiktokPixel); ttq.page(); }(window,document,"ttq");
  }
  if (A.linkedin) {
    window._linkedin_partner_id = A.linkedin;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(A.linkedin);
    if (!window.lintrk) { window.lintrk = function(a,b){ window.lintrk.q.push([a,b]); }; window.lintrk.q = []; }
    load("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
  if (A.xPixel) {
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments)},s.version="1.1",s.queue=[],u=t.createElement(n),u.async=!0,u.src="https://static.ads-twitter.com/uwt.js",a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,"script");
    twq("config", A.xPixel);
  }

  // one event -> every tool. meta/tiktok: standard event name where one fits, else custom.
  const STD = {
    book_call:      { meta: "Lead",             tt: "Contact" },
    whatsapp_click: { meta: "Contact",          tt: "Contact" },
    email_click:    { meta: "Contact",          tt: "Contact" },
    begin_checkout: { meta: "InitiateCheckout", tt: "InitiateCheckout" },
    video_play:     { meta: "ViewContent",      tt: "ViewContent" },
  };
  window.csTrack = function(name, params){
    params = params || {};
    try { if (window.gtag) gtag("event", name, params); } catch(e){}
    const m = STD[name];
    try { if (window.fbq) m ? fbq("track", m.meta, params) : fbq("trackCustom", name, params); } catch(e){}
    try { if (window.ttq) ttq.track(m ? m.tt : "ClickButton", Object.assign({ content_name: name }, params)); } catch(e){}
  };

  const adTitle = el => { const c = el.closest(".ad"); const t = c && c.querySelector(".meta i.title"); return t ? t.textContent.replace(/^Title/, "").trim().slice(0, 100) : undefined; };
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
  const played = new WeakSet();
  document.addEventListener("play", e => {
    const v = e.target; if (!(v instanceof HTMLVideoElement) || played.has(v)) return; played.add(v);
    const intro = v.closest(".intro, .hero");
    csTrack("video_play", { video: intro ? "intro" : (adTitle(v) || v.currentSrc.split("/").pop()) });
  }, true);
})();
