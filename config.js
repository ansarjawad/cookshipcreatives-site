/* =====================================================================
   config.js: the only file you need to edit.
   Paste YouTube links or IDs, Whop checkout links and your booking link,
   then commit. Cloudflare Pages redeploys the site on every push.
   Images: drop the files into assets/stages/ with the names below.
   ===================================================================== */
const SITE = {
  introVideo: "",                       // YouTube link or ID of your intro video
  calLink: "https://cal.com/cookshipcreatives/discovery-call",                          // cal.com booking link (Book a meeting)
  whatsapp: "923233874756",             // WhatsApp number, country code first, digits only
  email: "hello@cookshipcreatives.com",
  logo: "assets/logo.png",              // your logo with the background removed (falls back to Cookie)
};

/* The 4 buying stages (keep the ids: T, Ex, Ev, P). "def" shows above the examples in the ad library. */
const PHASES = [
  { id:"T",  cls:"t",  name:"Trigger",     job:"Catch their eye",          line:"Show them something they care about.",        img:"assets/stages/trigger.webp",
    def:"The first ad a customer sees. It stops the scroll and makes them care, before they even know they need you." },
  { id:"Ex", cls:"ex", name:"Exploration", job:"Help them see what's possible", line:"Answer the questions on their mind.",   img:"assets/stages/exploration.webp",
    def:"For people who are now curious. It shows what's possible and answers the questions on their mind." },
  { id:"Ev", cls:"ev", name:"Evaluation",  job:"Earn their trust",          line:"Let proof speak louder than promises.", img:"assets/stages/evaluation.webp",
    def:"For people comparing options. It earns their trust with proof: real results, reviews and demos." },
  { id:"P",  cls:"p",  name:"Purchase",    job:"Make saying yes easy",     line:"Remove the last worry in the way.", img:"assets/stages/purchase.webp",
    def:"For people ready to buy. It removes the last doubt and gives them a reason to say yes today." },
];

/* Customer awareness levels. "stage" links each level to the buying stage it sits in. */
const AWARENESS = [
  { name:"Unaware",        thinks:"“I'm fine.”", ad:"Start with what they want, not what you sell.",            stage:"T",  img:"assets/stages/aware-1.webp" },
  { name:"Problem aware",  thinks:"“Something's wrong.”", ad:"Show them you understand the problem better than anyone.",   stage:"T",  img:"assets/stages/aware-2.webp" },
  { name:"Solution aware", thinks:"“What fixes this?”", ad:"Show them, simply, how it can be solved.",     stage:"Ex", img:"assets/stages/aware-3.webp" },
  { name:"Product aware",  thinks:"“Is yours the best?”", ad:"Let happy customers do the talking.",   stage:"Ev", img:"assets/stages/aware-4.webp" },
  { name:"Most aware",     thinks:"“I want it. Give me a reason!”", ad:"Make it easy, and give them a reason today.",  stage:"P",  img:"assets/stages/aware-5.webp" },
];

/* Market sophistication stages, and what an ad should lead with at each */
const SOPHISTICATION = [
  { market:"First to market",     lead:"Say it simply",            example:"“Lose weight.”",                    img:"assets/stages/market-1.webp" },
  { market:"A few competitors",   lead:"Make a bolder promise",       example:"“Lose 10 kg in 30 days.”",         img:"assets/stages/market-2.webp" },
  { market:"Claims stop working", lead:"Show them something new",      example:"“The 2-minute morning reset.”",    img:"assets/stages/market-3.webp" },
  { market:"Copycat mechanisms",  lead:"Show them a better way", example:"“The reset, now with zero prep.”", img:"assets/stages/market-4.webp" },
  { market:"Buyers tune out",     lead:"Speak to who they are",        example:"“For moms who never get a minute.”", img:"assets/stages/market-5.webp" },
];

/* Footer links. Leave a url empty ("") to hide it. */
const COURSES = [
  { name:"Viral AI Animation course",              url:"https://whop.com/cookshipcreatives/viral-ai-animation-course-for-beginners/" },
  { name:"AI Storytelling & Screenwriting course", url:"https://whop.com/cookshipcreatives/ai-storytelling-screenwriting-course-for-beginners/" },
  { name:"Community (all courses included)",       url:"https://whop.com/cookshipcreatives/community-support-all-courses-included/" },
];
const SOCIAL = {
  studio: [
    { name:"Instagram", url:"https://www.instagram.com/cookshipcreatives/" },
    { name:"TikTok",    url:"https://www.tiktok.com/@cookshipcreatives" },
    { name:"YouTube",   url:"https://www.youtube.com/@cookshipcreatives" },
    { name:"Facebook",  url:"https://www.facebook.com/cookshipcreatives" },
    { name:"LinkedIn",  url:"https://www.linkedin.com/company/cookshipcreatives/" },
    { name:"Threads",   url:"https://www.threads.com/@cookshipcreatives" },
    { name:"X",         url:"https://x.com/getcookship" },
  ],
  coopers: [
    { name:"Instagram", url:"https://www.instagram.com/thecoopersfamily/" },
    { name:"TikTok",    url:"https://www.tiktok.com/@letsmeetcoopers" },
    { name:"YouTube",   url:"https://www.youtube.com/@letsmeetcoopers" },
    { name:"Facebook",  url:"https://www.facebook.com/letsmeetcoopers/" },
    { name:"LinkedIn",  url:"https://www.linkedin.com/showcase/the-coopers-family/" },
    { name:"Threads",   url:"https://www.threads.com/@thecoopersfamily" },
    { name:"X",         url:"https://x.com/letsmeetcoopers" },
  ],
};

/* Formats under each buying stage. Rename, add or remove freely. */
const FORMATS = {
  T:  [ {name:"Format name", desc:"One line on what this format does."} ],
  Ex: [ {name:"Format name", desc:"One line on what this format does."} ],
  Ev: [ {name:"Format name", desc:"One line on what this format does."} ],
  P:  [ {name:"Format name", desc:"One line on what this format does."} ],
};

/* Visual styles and industries the library can be browsed by.
   Only tags that at least one ad uses show up on the site. Rename, add or remove freely. */
const VISUALS = [
  { name:"3D animation",    desc:"Rounded, Pixar-style characters with real depth and lighting. Feels like a movie, so people stop and watch." },
  { name:"2D cartoon",      desc:"Flat, bold and fast. Simple shapes and bright colours that read in a second on a small screen." },
  { name:"Claymation",      desc:"Characters that look handmade from clay. The texture feels warm and real, and stands out in a feed full of polish." },
  { name:"Anime",           desc:"Big eyes, big emotion, big reactions. Made for audiences who grew up on anime and love a dramatic moment." },
  { name:"Motion graphics", desc:"Clean shapes, icons and type in motion. Best for explaining how something works in a few seconds." },
];
const INDUSTRIES = [
  { name:"Skincare & beauty", desc:"Brands selling skincare, makeup, hair and body care. Animation lets us show what happens under the skin, without a single before-and-after photo." },
  { name:"Food & drink",      desc:"Snacks, drinks, coffee, sauces and meal kits. Animation makes taste visible: the crunch, the fizz, the first sip." },
  { name:"Health & wellness", desc:"Supplements, fitness, sleep and personal care. Animation explains how it works simply, and keeps claims friendly and clear." },
  { name:"Fashion",           desc:"Clothing, shoes, jewellery and accessories. Characters wear the product in worlds a photoshoot can't reach." },
  { name:"Home & kitchen",    desc:"Cookware, cleaning, decor and gadgets. Animation shows the everyday problem and the product fixing it, in one scene." },
  { name:"Pets",              desc:"Food, toys and care for dogs, cats and more. A pet character tells the story the owner already feels." },
  { name:"Apps & tech",       desc:"Apps, software and devices. Animation turns an invisible product into a story people can see and remember." },
];

/* The library. One line per ad:
   stage (T, Ex, Ev, P), format (must match a name in FORMATS),
   visual (must match a name in VISUALS), industry (must match a name in INDUSTRIES),
   YouTube link or ID, a title, and a credit line. vertical:true for 9:16 Shorts. */
const ADS = [
  { stage:"T",  format:"Format name", visual:"3D animation", industry:"Skincare & beauty", youtube:"", title:"Ad title", credit:"Brand · creator", vertical:true },
  { stage:"Ex", format:"Format name", visual:"2D cartoon",   industry:"Food & drink",      youtube:"", title:"Ad title", credit:"Brand · creator", vertical:true },
  { stage:"Ev", format:"Format name", visual:"3D animation", industry:"Health & wellness", youtube:"", title:"Ad title", credit:"Brand · creator", vertical:true },
  { stage:"P",  format:"Format name", visual:"Claymation",   industry:"Skincare & beauty", youtube:"", title:"Ad title", credit:"Brand · creator", vertical:true },
];

/* Packages: ads per buying stage in "split" (Trigger, Exploration, Evaluation, Purchase) */
const PLANS = [
  { name:"Basic",   ads:4,  split:[1,1,1,1], price:2200, checkout:"https://whop.com/checkout/plan_PclwyBf7yhqez" },
  { name:"Premium", ads:8,  split:[2,2,2,2], price:4000, checkout:"https://whop.com/checkout/plan_4z5tGnP3Z1HNQ", featured:true },
  { name:"Ultra",   ads:20, split:[5,5,5,5], price:9000, checkout:"https://whop.com/checkout/plan_IFkXNRnojoSZe" },
];

/* Ad length. Package ads run from minSeconds up to includedSeconds.
   Single custom video: flat base price up to includedSeconds, then a rate per extra second. */
const SINGLE = { base:550, includedSeconds:120, extraPerSec:9, minSeconds:15, maxSeconds:600 };
/* ===================================================================== */
