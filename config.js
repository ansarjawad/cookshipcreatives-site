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

/* The 4 buying stages (keep the ids: T, Ex, Ev, P). "moment" describes the step in the funnel; "def" shows above the examples in the ad library. */
const PHASES = [
  { id:"T",  cls:"t",  name:"Trigger",     job:"Make them feel the problem",          line:"Show them something they care about.",        img:"assets/stages/trigger.webp",
    moment:"They notice a problem and start to feel they need a fix.",
    def:"When they notice a problem. A Trigger ad puts that feeling into a story they can't scroll past, so your brand is the first one they think of." },
  { id:"Ex", cls:"ex", name:"Exploration", job:"Show how you solve it", line:"Answer the questions on their mind.",   img:"assets/stages/exploration.webp",
    moment:"They go looking for ways to solve it, searching and scrolling online.",
    def:"When they go looking for a fix. An Exploration ad shows how your product solves it and answers their questions before they ask." },
  { id:"Ev", cls:"ev", name:"Evaluation",  job:"Prove you're better than the rest",          line:"Let proof speak louder than promises.", img:"assets/stages/evaluation.webp",
    moment:"They compare the options they found and ask, which one can I trust?",
    def:"When they compare their options. An Evaluation ad shows them how your product is better than your competitors (results, experience and outcomes)." },
  { id:"P",  cls:"p",  name:"Purchase",    job:"Give them a reason to buy today",     line:"Remove the last worry in the way.", img:"assets/stages/purchase.webp",
    moment:"They've made up their mind. Now they just need a reason to buy today.",
    def:"When they've made up their mind. A Purchase ad removes the last doubt and gives them a reason to buy today: an offer, a guarantee or a deadline." },
];

/* Customer awareness levels. "stage" links each level to the buying stage it sits in. */
const AWARENESS = [
  { name:"Unaware",        thinks:"“I'm fine, I don't have any problem.”", ad:"Start with what they want, not what you sell.",            stage:"T",  img:"assets/stages/aware-1.webp" },
  { name:"Problem aware",  thinks:"“Something's wrong with me. I should research online.”", ad:"Show them you understand the problem better than anyone.",   stage:"T",  img:"assets/stages/aware-2.webp" },
  { name:"Solution aware", thinks:"“What solutions are out there for my problem?”", ad:"Show them, simply, how it can be solved.",     stage:"Ex", img:"assets/stages/aware-3.webp" },
  { name:"Product aware",  thinks:"“Why is your product better than the others?”", ad:"Let happy customers do the talking.",   stage:"Ev", img:"assets/stages/aware-4.webp" },
  { name:"Most aware",     thinks:"“I want your product. Give me a reason to buy!”", ad:"Make it easy, and give them a reason today.",  stage:"P",  img:"assets/stages/aware-5.webp" },
];

/* Market sophistication stages. "angles" is what each ad (Trigger, Exploration, Evaluation, Purchase)
   should do in that market; it shows in the "Putting it together" section. */
const SOPHISTICATION = [
  { market:"First to market",
    angles:{ T:"Name the problem plainly. They've never seen a fix before.", Ex:"Explain simply what your product does and how.", Ev:"Show it working. Being first is proof enough.", P:"Tell them where to get it, and make the first order easy." },
    about:"You're the only one selling this. Buyers just need to hear what it does.",     lead:"Say it simply",            example:"“Lose weight.”",                    img:"assets/stages/market-1.webp" },
  { market:"A few competitors",
    angles:{ T:"Make a bigger, bolder promise than the others.", Ex:"Show a faster or bigger result than anyone else.", Ev:"Put numbers on it: how much, how fast, how many.", P:"Beat the others on the offer: a bonus, a bundle or a better price." },
    about:"Others now sell the same thing, so buyers go with the boldest promise.",   lead:"Make a bolder promise",       example:"“Lose 10 kg in 30 days.”",         img:"assets/stages/market-2.webp" },
  { market:"Claims stop working",
    angles:{ T:"Lead with something new, not another big promise.", Ex:"Explain the new way your product works.", Ev:"Prove the new way works with real results.", P:"Lower the risk with a guarantee or a free trial." },
    about:"Everyone makes big promises, so buyers stop believing any of them.", lead:"Show them something new",      example:"“The 2-minute morning reset.”",    img:"assets/stages/market-3.webp" },
  { market:"Copycat mechanisms",
    angles:{ T:"Show why the usual fixes keep failing them.", Ex:"Show what makes your way better than the copies.", Ev:"Compare side by side, and let customers say why you win.", P:"Give them a reason to choose you today, not later." },
    about:"Rivals copy how your product works too. Buyers can't tell you apart.",  lead:"Show them a better way", example:"“The reset, now with zero prep.”", img:"assets/stages/market-4.webp" },
  { market:"Buyers tune out",
    angles:{ T:"Speak to who they are, not what you sell.", Ex:"Show people like them already using it.", Ev:"Let your community do the talking.", P:"Invite them in to join people like them." },
    about:"Buyers have heard it all. They only listen to brands that feel like them.",     lead:"Speak to who they are",        example:"“For moms who never get a minute.”", img:"assets/stages/market-5.webp" },
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

/* Ad formats the library can be browsed by. Rename, add or remove freely. */
const FORMATS = [
  { name:"Story ads",       desc:"A short story with a beginning, a problem and a happy ending, where your product is the turning point." },
  { name:"Musical ads",     desc:"The whole story is sung, like a music video. The song carries the feeling, and the chorus sticks." },
  { name:"Explainer ads",   desc:"Shows how your product works, step by step, so nobody is left guessing." },
  { name:"Educational ads", desc:"Teaches them something useful first, so your brand becomes the one they trust." },
  { name:"Funny gag ads",   desc:"A quick joke or sketch that gets a laugh, gets shared, and gets remembered." },
  { name:"Testimonial ads", desc:"A happy customer, brought to life as a character, tells what changed for them." },
  { name:"Comparison ads",  desc:"Puts your product next to the usual way, and lets the difference speak." },
  { name:"Offer ads",       desc:"Built around a deal, a bundle or a deadline that makes today the day to buy." },
  { name:"Mascot ads",      desc:"Your product comes alive as a character with a voice, and becomes the hero people remember." },
];

/* Visual styles and industries the library can be browsed by.
   Only tags that at least one ad uses show up on the site. Rename, add or remove freely. */
const VISUALS = [
  { name:"3D animation",    desc:"Rounded, Pixar-style characters with real depth and lighting. Feels like a movie, so people stop and watch." },
  { name:"2D cartoon",      desc:"Flat, bold and fast. Simple shapes and bright colours that read in a second on a small screen." },
  { name:"Claymation",      desc:"Characters that look handmade from clay. The texture feels warm and real, and stands out in a feed full of polish." },
  { name:"Anime",           desc:"Big eyes, big emotion, big reactions. Made for audiences who grew up on anime and love a dramatic moment." },
  { name:"Motion graphics", desc:"Clean shapes, icons and type in motion. Best for explaining how something works in a few seconds." },
  { name:"Stop-motion",     desc:"Handmade puppets on tiny sets, moved frame by frame. Feels crafted and cosy, like a short film at a festival." },
  { name:"Toy & doll world", desc:"Characters look like posable dolls in a pastel dollhouse. Instantly nostalgic, and hard to scroll past." },
  { name:"Felt & knit",     desc:"A world made of wool, felt and yarn. Soft, warm and handmade, so even a hard story feels gentle." },
];
const INDUSTRIES = [
  { name:"Skincare & beauty", desc:"Brands selling skincare, makeup, hair and body care. Animation lets us show what happens under the skin, without a single before-and-after photo." },
  { name:"Oral care",         desc:"Whitening, toothpaste, mouthwash and dental care. Animation makes a smile the hero of the story, without close-ups of real teeth." },
  { name:"Food & drink",      desc:"Snacks, drinks, coffee, sauces and meal kits. Animation makes taste visible: the crunch, the fizz, the first sip." },
  { name:"Health & wellness", desc:"Supplements, fitness, sleep and personal care. Animation explains how it works simply, and keeps claims friendly and clear." },
  { name:"Fashion",           desc:"Clothing, shoes, jewellery and accessories. Characters wear the product in worlds a photoshoot can't reach." },
  { name:"Home & kitchen",    desc:"Cookware, cleaning, decor and gadgets. Animation shows the everyday problem and the product fixing it, in one scene." },
  { name:"Pets",              desc:"Food, toys and care for dogs, cats and more. A pet character tells the story the owner already feels." },
  { name:"Apps & tech",       desc:"Apps, software and devices. Animation turns an invisible product into a story people can see and remember." },
  { name:"Sleep",             desc:"Pillows, mattresses, snoring and sleep aids. Animation turns a bad night into a story everyone who shares a bed knows." },
  { name:"Garden & outdoors", desc:"Plants, garden tools and outdoor gear. Animation brings the outdoors to life, from a talking seedling to a mountain trail." },
];

/* The library. One line per ad:
   stage (T, Ex, Ev, P), format (must match a name in FORMATS),
   visual (must match a name in VISUALS), industry (must match a name in INDUSTRIES),
   video: a file in assets/ads/ (mp4 under 25 MB; a .webp with the same name is the poster),
   or youtube: a link or ID. If both are set, the file plays. A title and a credit line. vertical:true for 9:16. */
const ADS = [
  { stage:"T", format:"Musical ads", visual:"3D animation", industry:"Oral care", video:"assets/ads/glim-father-of-the-bride.mp4", youtube:"JPNsO9m1WeQ", title:"Father of the Bride Toast", credit:"GLIM · teeth whitening pen", vertical:true },
  { stage:"T", format:"Musical ads", visual:"3D animation", industry:"Health & wellness", video:"assets/ads/echo-grandpa-hears-it.mp4", title:"Grandpa Hears It", credit:"ECHO · hearing earbuds", vertical:true },
  { stage:"T", format:"Musical ads", visual:"3D animation", industry:"Skincare & beauty", video:"assets/ads/follo-petty-at-the-reunion.mp4", title:"Petty at the Reunion", credit:"FOLLO · overnight hair serum", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Sleep", video:"assets/ads/hushnest-the-bear-moved-in.mp4", title:"The Bear Moved In", credit:"HUSHNEST · anti-snore pillow", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Pets", video:"assets/ads/flufflift-meet-fur-boy.mp4", title:"Meet Fur Boy", credit:"FLUFFLIFT · reusable lint roller", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Apps & tech", video:"assets/ads/lastbar-dead-phone-abroad.mp4", title:"Dead Phone, Foreign City", credit:"LASTBAR · slim snap-on phone battery", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Apps & tech", video:"assets/ads/verdicam-a-different-frank.mp4", title:"A Different Frank", credit:"VERDICAM · dash cam", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Skincare & beauty", video:"assets/ads/rootwake-the-landing-pad.mp4", title:"The Landing Pad", credit:"ROOTWAKE · scalp micro-roller and serum", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Pets", video:"assets/ads/purrlingo-me-or-the-cat.mp4", title:"Me or the Cat", credit:"PURRLINGO · smart cat collar", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Health & wellness", video:"assets/ads/hearloom-grandpa-didnt-clap.mp4", title:"Grandpa Didn't Clap", credit:"HEARLOOM · discreet hearing earbuds", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"Stop-motion", industry:"Pets", video:"assets/ads/purrclock-the-4am-alarm.mp4", title:"The 4 A.M. Alarm", credit:"PURRCLOCK · timed cat feeder", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"Stop-motion", industry:"Sleep", video:"assets/ads/hush-strips-the-bathtub.mp4", title:"Moved Out to the Bathtub", credit:"HUSH STRIPS · anti-snore strips", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"Stop-motion", industry:"Garden & outdoors", video:"assets/ads/leaftalk-plant-funeral.mp4", title:"Plant Funeral No. 9", credit:"LEAFTALK · smart plant sensor", vertical:true },
  { stage:"T", format:"Story ads", visual:"Claymation", industry:"Sleep", video:"assets/ads/hushtilt-the-cat-moved-out.mp4", title:"The Cat Moved Out", credit:"HUSHTILT · smart anti-snore pillow", vertical:true },
  { stage:"T", format:"Mascot ads", visual:"3D animation", industry:"Skincare & beauty", video:"assets/ads/plushe-smile-june.mp4", title:"Smile, June", credit:"PLUSHE · tinted lip butter", vertical:true },
  { stage:"T", format:"Mascot ads", visual:"3D animation", industry:"Skincare & beauty", video:"assets/ads/zephi-frizzillas-back.mp4", title:"Frizzilla's Back", credit:"ZEPHI · hair dryer", vertical:true },
  { stage:"Ex", format:"Mascot ads", visual:"3D animation", industry:"Food & drink", video:"assets/ads/fizzlet-welcome-to-the-fridge.mp4", title:"Welcome to the Fridge", credit:"FIZZLET · sparkling juice", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"Toy & doll world", industry:"Food & drink", video:"assets/ads/crunchy-the-snack-thief.mp4", title:"The Snack Thief", credit:"CRUNCHY · peanut bar", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"Toy & doll world", industry:"Food & drink", video:"assets/ads/masa-crisp-how-rustic.mp4", title:"How Rustic", credit:"MASA CRISP · tortilla chips", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"Claymation", industry:"Food & drink", video:"assets/ads/flarewell-who-ate-my-lasagna.mp4", title:"Who Ate My Lasagna", credit:"FLAREWELL · ghost pepper hot sauce", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Sleep", video:"assets/ads/nubo-the-2009-wave.mp4", title:"The 2009 Wave", credit:"NUBO · memory foam cooling pillow", vertical:true },
  { stage:"T", format:"Funny gag ads", visual:"3D animation", industry:"Home & kitchen", video:"assets/ads/liddy-two-meters-from-the-table.mp4", title:"Two Meters From the Table", credit:"LIDDY · before-you-go toilet drops", vertical:true },
  { stage:"T", format:"Story ads", visual:"3D animation", industry:"Oral care", video:"assets/ads/swoop-he-flinched.mp4", title:"He Flinched", credit:"SWOOP · tongue scraper", vertical:true },
  { stage:"T", format:"Story ads", visual:"Felt & knit", industry:"Garden & outdoors", video:"assets/ads/icepaws-back-to-chess.mp4", title:"Back to Chess", credit:"ICEPAWS · slip-on ice cleats", vertical:true },
  { stage:"T", format:"Story ads", visual:"Felt & knit", industry:"Garden & outdoors", video:"assets/ads/stayfrost-ten-years-late.mp4", title:"Ten Years Late", credit:"STAYFROST · insulated water bottle", vertical:true },
  { stage:"T", format:"Story ads", visual:"Felt & knit", industry:"Fashion", video:"assets/ads/knitkeeper-nice-sweater-sheep.mp4", title:"Nice Sweater, Sheep", credit:"KNITKEEPER · fabric shaver", vertical:true },
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
