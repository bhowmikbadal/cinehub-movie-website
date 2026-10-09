/* CineHub demo. Configure a permitted commercial API provider before monetizing.
   Do not place secret API tokens in this client-side file. */
const CONFIG = {
  apiBase: "/api/movies",
  // Keep ads disabled until your publisher account/site is approved AND your API/data license permits commercial use.
  adsEnabled: false,
  adsenseClient: "", // e.g. ca-pub-XXXXXXXXXXXXXXXX (only after approval)
  adSlots: { top: "", mid: "" }
};
const demoMovies = [
 {id:101,title:"Midnight in Orbit",release_date:"2025-11-14",vote_average:8.1,overview:"A crew on a distant research station receives a signal that changes everything. This sample entry is fictional demo content.",poster_path:null,genre_ids:[878,18]},
 {id:102,title:"The Last Lantern",release_date:"2025-08-22",vote_average:7.7,overview:"A small coastal town uncovers a forgotten mystery when an old lighthouse begins shining again. This sample entry is fictional demo content.",poster_path:null,genre_ids:[18,9648]},
 {id:103,title:"Paper Kingdom",release_date:"2025-06-05",vote_average:7.4,overview:"An aspiring illustrator finds a hidden world inside a book inherited from a grandparent. This sample entry is fictional demo content.",poster_path:null,genre_ids:[14,12]},
 {id:104,title:"Echoes of Tomorrow",release_date:"2025-04-18",vote_average:8.0,overview:"Two strangers discover that their everyday choices are linked by an impossible time loop. This sample entry is fictional demo content.",poster_path:null,genre_ids:[878,53]},
 {id:105,title:"Wildwood Run",release_date:"2024-12-02",vote_average:7.2,overview:"A sibling duo races through a forest to deliver a message before a storm closes every road. This sample entry is fictional demo content.",poster_path:null,genre_ids:[12,10751]},
 {id:106,title:"Blue Hour",release_date:"2024-10-11",vote_average:7.8,overview:"A music journalist returns home and reconnects with the people who shaped their first song. This sample entry is fictional demo content.",poster_path:null,genre_ids:[10402,18]},
 {id:107,title:"Glass City",release_date:"2024-07-19",vote_average:7.6,overview:"In a city built on perfect predictions, one detective investigates a crime no model can explain. This sample entry is fictional demo content.",poster_path:null,genre_ids:[80,878]},
 {id:108,title:"Small Wonders",release_date:"2024-03-01",vote_average:7.1,overview:"A community garden becomes the meeting point for neighbours who thought they had nothing in common. This sample entry is fictional demo content.",poster_path:null,genre_ids:[35,18]},
 {id:109,title:"Red Planet Diary",release_date:"2023-12-08",vote_average:7.9,overview:"A botanist stationed on Mars records a discovery that could change the future of exploration. This sample entry is fictional demo content.",poster_path:null,genre_ids:[878,12]},
 {id:110,title:"The Quiet Detective",release_date:"2023-09-15",vote_average:7.3,overview:"A retired investigator takes one final case in a town where everyone remembers a different story. This sample entry is fictional demo content.",poster_path:null,genre_ids:[9648,80]}
];
const GENRES={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Sci-Fi",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};
const img = p => p ? `https://image.tmdb.org/t/p/w500${p}` : "";
const year = m => (m.release_date||"").slice(0,4) || "Year unknown";
const escapeHTML = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const state={page:1,lastQuery:"",current:[]};
function toast(msg){const el=document.querySelector("#toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function demoResults(path){if(path.includes("search")){const q=new URLSearchParams(path.split("?")[1]||"").get("query")||"";return demoMovies.filter(m=>m.title.toLowerCase().includes(q.toLowerCase()))}return demoMovies}
async function api(path){
  try{
    const response=await fetch(`${CONFIG.apiBase}?path=${encodeURIComponent(path)}`);
    if(!response.ok) throw new Error("API is not configured");
    const data=await response.json();
    if(!Array.isArray(data.results)) throw new Error("Unexpected API response");
    document.querySelector("#attribution").textContent="Movie metadata is supplied by the configured API provider. See Credits/About for attribution.";
    return data.results;
  }catch(e){
    document.querySelector("#attribution").textContent="Demo mode: fictional sample titles are shown. Configure a properly licensed API in the deployment settings.";
    return demoResults(path);
  }
}
function card(m){
 const poster=img(m.poster_path);
 const genre=(m.genre_ids||[]).map(g=>GENRES[g]).find(Boolean)||"Movie";
 return `<article class="movie-card" tabindex="0" role="button" aria-label="View details for ${escapeHTML(m.title)}" data-movie-id="${m.id}">
  <div class="poster-wrap">${poster?`<img loading="lazy" src="${poster}" alt="Poster for ${escapeHTML(m.title)}" onerror="this.remove()">`:`<div class="poster-fallback">${escapeHTML(m.title)}</div>`}<span class="rating">★ ${Number(m.vote_average||0).toFixed(1)}</span></div>
  <h3 class="movie-title">${escapeHTML(m.title)}</h3><div class="movie-meta"><span>${escapeHTML(year(m))}</span><span>${escapeHTML(genre)}</span></div>
 </article>`;
}
function renderGrid(id,movies){
 const el=document.getElementById(id);el.innerHTML=movies.map(card).join("");
 el.querySelectorAll(".movie-card").forEach(c=>{const open=()=>showMovie(movies.find(m=>String(m.id)===c.dataset.movieId));c.addEventListener("click",open);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}})});
}
async function loadHome(){
 const [trending,popular]=await Promise.all([api("trending/movie/week"),api(`movie/popular?page=${state.page}`)]);
 state.current=[...trending,...popular];
 renderGrid("trending-grid",trending);renderGrid("popular-grid",popular);
}
async function search(q){
 if(!q.trim())return;
 state.lastQuery=q.trim();
 const section=document.querySelector("#search-results");section.hidden=false;
 document.querySelector("#search-title").textContent=`Results for “${q.trim()}”`;
 const results=await api(`search/movie?query=${encodeURIComponent(q.trim())}`);
 state.current=[...state.current,...results];renderGrid("search-grid",results);
 section.scrollIntoView({behavior:"smooth",block:"start"});
 if(!results.length)document.querySelector("#search-grid").innerHTML="<p>No results found. Try another title.</p>";
}
async function showMovie(m){
 if(!m)return;
 let detail=m;
 if(!String(m.id).startsWith("1")){try{const r=await fetch(`${CONFIG.apiBase}?path=${encodeURIComponent(`movie/${m.id}`)}`);if(r.ok)detail=await r.json()}catch{}}
 const poster=img(detail.poster_path);
 const genres=(detail.genres||[]).map(g=>g.name).join(", ")||((detail.genre_ids||[]).map(g=>GENRES[g]).filter(Boolean).join(", "));
 const trailerQuery=encodeURIComponent(`${detail.title||detail.name} official trailer`);
 const dialog=document.querySelector("#movie-dialog");
 document.querySelector("#dialog-content").innerHTML=`<div class="dialog-layout">${poster?`<img class="dialog-poster" src="${poster}" alt="Poster for ${escapeHTML(detail.title)}">`:`<div class="poster-wrap"><div class="poster-fallback">${escapeHTML(detail.title)}</div></div>`}<div class="dialog-copy"><p class="eyebrow">${escapeHTML(genres||"MOVIE DETAILS")}</p><h2>${escapeHTML(detail.title||detail.name)}</h2><p>★ ${Number(detail.vote_average||0).toFixed(1)} · ${escapeHTML(year(detail))} · ${detail.runtime?`${detail.runtime} min`:"Runtime varies"}</p><p>${escapeHTML(detail.overview||"No synopsis has been provided yet. Add an original review or verified details before publishing.")}</p><div class="dialog-actions"><a href="https://www.youtube.com/results?search_query=${trailerQuery}" target="_blank" rel="noopener noreferrer">Find official trailer ↗</a><a href="https://www.themoviedb.org/movie/${encodeURIComponent(detail.id)}" target="_blank" rel="noopener noreferrer">Provider details ↗</a></div></div></div>`;
 dialog.showModal();
}
document.querySelector("#search-form").addEventListener("submit",e=>{e.preventDefault();search(document.querySelector("#search-input").value)});
document.querySelector("#load-more").addEventListener("click",async()=>{state.page++;const results=await api(`movie/popular?page=${state.page}`);state.current.push(...results);const el=document.querySelector("#popular-grid");el.insertAdjacentHTML("beforeend",results.map(card).join(""));el.querySelectorAll(".movie-card").forEach(c=>{if(c.dataset.bound)return;c.dataset.bound="1";const m=state.current.find(x=>String(x.id)===c.dataset.movieId);c.addEventListener("click",()=>showMovie(m));c.addEventListener("keydown",e=>{if(e.key==="Enter")showMovie(m)})})});
document.querySelector("#dialog-close").addEventListener("click",()=>document.querySelector("#movie-dialog").close());
document.querySelector("#movie-dialog").addEventListener("click",e=>{if(e.target.id==="movie-dialog")e.target.close()});
document.querySelector("#theme-toggle").addEventListener("click",()=>document.body.classList.toggle("light"));
document.querySelector("#year").textContent=new Date().getFullYear();
function setupAds(){
 if(!CONFIG.adsEnabled||!/^ca-pub-\d+$/.test(CONFIG.adsenseClient))return;
 const script=document.createElement("script");script.async=true;script.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.adsenseClient}`;script.crossOrigin="anonymous";document.head.appendChild(script);
 document.querySelectorAll(".ad-slot").forEach(el=>{const slot=CONFIG.adSlots[el.dataset.adSlot];if(!/^\d+$/.test(slot||""))return;el.innerHTML=`<ins class="adsbygoogle" style="display:block" data-ad-client="${CONFIG.adsenseClient}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});
}
setupAds();loadHome();
