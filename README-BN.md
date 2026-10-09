# CineHub Movie Website — বাংলা সেটআপ গাইড

এই প্রজেক্টটি মোবাইল-ফ্রেন্ডলি Movie Discovery Website starter। এতে responsive UI, সার্চ, মুভি কার্ড, details modal, SEO meta, policy pages, API proxy, এবং বিজ্ঞাপন চালুর placeholder আছে।

## খুব গুরুত্বপূর্ণ: API লাইসেন্স ও আয়ের নিয়ম

TMDB-এর সাধারণ developer API ব্যবহারের শর্তে commercial use/advertising revenue-এর জন্য লিখিত commercial permission প্রয়োজন হতে পারে। তাই **TMDB-এর লিখিত commercial অনুমতি ছাড়া TMDB data ব্যবহার করে এই সাইটে বিজ্ঞাপন চালু করবে না**। নিয়ম বদলাতে পারে—প্রকাশের আগে official terms পড়বে: https://www.themoviedb.org/api-terms-of-use

বিকল্পভাবে এমন API/data provider বেছে নাও যার লিখিত লাইসেন্স তোমার commercial, poster/image, display এবং advertising use অনুমোদন করে। API key পেলেই commercial rights পাওয়া যায় না।

## ফাইলগুলো

- `index.html` — হোমপেজ
- `styles.css` — ডিজাইন
- `app.js` — সার্চ, মুভি কার্ড, details dialog, ad placeholder
- `api/movies.js` — Vercel serverless API proxy (secret token backend-এ রাখে)
- `about.html`, `privacy.html`, `terms.html`, `contact.html` — policy/owner pages (প্রকাশের আগে customize করবে)
- `robots.txt`, `sitemap.xml` — SEO starter files
- `vercel.json` — Vercel configuration

## মোবাইল দিয়ে অনলাইনে প্রকাশ

1. GitHub-এ সাইন আপ/লগইন করো: https://github.com/
2. নতুন repository তৈরি করে এই ZIP-এর ফাইলগুলো upload করো (ZIP-টিকে repository-তে শুধু ZIP হিসেবে রেখে দেবে না; আগে extract করে ফাইলগুলো upload করতে হবে)।
3. Vercel-এ লগইন করো: https://vercel.com/ এবং GitHub repository import করো।
4. Vercel Project → Settings → Environment Variables-এ গিয়ে `TMDB_ACCESS_TOKEN` নামে variable যোগ করো—**শুধু যদি TMDB-এর terms অনুযায়ী তোমার intended use অনুমোদিত হয়**। Token কখনো `app.js` বা public GitHub-এ লিখবে না।
5. Deploy করো। Vercel URL-এ হোমপেজ খুলে দেখো।
6. লাইসেন্স অনুমোদন না থাকলে API-কে production monetization-এ ব্যবহার না করে demo/sample mode রাখো অথবা যথাযথ licensed provider-এর জন্য `api/movies.js` পরিবর্তন করো।

### API endpoint
Frontend `/api/movies?path=trending%2Fmovie%2Fweek` কল করে। Proxy-তে বর্তমানে allowlist করা path:
- `trending/movie/week`
- `movie/popular`
- `search/movie?query=...`
- `movie/{numeric_id}`

## Ads/AdSense

`app.js`-এ `adsEnabled: false` ডিফল্ট। এটিকে true করা যথেষ্ট নয়। নিচের সব শর্ত পূরণ করতে হবে:
1. নিজের AdSense account তৈরি ও verify করা।
2. সাইট AdSense review-তে approved হওয়া।
3. valid publisher ID এবং ad slot ID বসানো।
4. ব্যবহৃত movie data/images-এর commercial license-এ বিজ্ঞাপন দিয়ে revenue অনুমোদিত থাকা।
5. সাইটে বাস্তব, মৌলিক রিভিউ/বিশ্লেষণ, সঠিক navigation, privacy/terms/contact এবং প্রযোজ্য consent ব্যবস্থা থাকা।

AdSense site approval বা income নিশ্চিত নয়। নিজের বিজ্ঞাপনে ক্লিক করবে না, কাউকে ক্লিক করতে বলবে না, bot/fake traffic কিনবে না।

Official eligibility: https://support.google.com/adsense/answer/9724
Site readiness: https://support.google.com/adsense/answer/7299563

## SEO launch checklist

- `index.html` এবং `sitemap.xml`-এর `https://example.com` নিজের deployed domain দিয়ে replace করো।
- নিজের brand name, real contact, policy text, About page আপডেট করো।
- API metadata-র বাইরে original movie reviews লিখো; শুধু auto-generated poster cards AdSense approval-এর জন্য যথেষ্ট নাও হতে পারে।
- Google Search Console-এ domain verify করে sitemap submit করো।
- API/image usage attribution ও licensing যাচাই করো।
- Broken links, mobile layout, page speed, privacy, and accessibility test করো।

## TMDB attribution

TMDB ব্যবহার করলে তাদের current logo/attribution rules অনুসরণ করো। TMDB notice `about.html`-এ রয়েছে; official requirements ও permitted logo: https://www.themoviedb.org/about/logos-attribution

## Local/demo mode

API configured না থাকলে site sample fictional titles দেখাবে। এগুলো শুধুই layout test-এর জন্য; বাস্তব movie facts হিসেবে publish করো না।
