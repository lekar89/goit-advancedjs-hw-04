import{a as w,S as L,i as n}from"./assets/vendor-Qob_5Ba8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const S="https://pixabay.com/api/",v="46506725-7d59e0c0fb37faa107be781d3";async function g(s,t,i){try{const o=await w.get(`${S}`,{params:{key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:i}});if(o.status!==200)throw new Error(o.status);return o.data}catch(o){throw console.error("Error fetching images:",o),o}}function y(s){return s.map(t=>{const{webformatURL:i,largeImageURL:o,tags:e,likes:r,views:a,comments:h,downloads:b}=t;return`
            <li class="gallery-item">
                <a class="gallery-link" href="${o}">
                    <img class="gallery-image" src="${i}" data-source="${o}" alt="${e}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${r}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${a}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${h}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${b}
                    </p>
                </div>
            </li>
            `}).join("")}const f=new L(".gallery a",{captionsData:"alt",captionDelay:250});let d="",u=1;const m=15,P=document.querySelector(".search-form"),l=document.querySelector(".gallery"),p=document.querySelector(".loader"),c=document.querySelector(".load-more");c.style.display="none";P.addEventListener("submit",async s=>{if(s.preventDefault(),d=document.querySelector("#search-box").value.trim(),u=1,d===""){n.error({message:"Please enter a search query!",position:"topRight",timeout:3e3});return}p.style.display="block",c.style.display="none";try{const t=await g(d,u,m);if(l.innerHTML="",t.hits.length===0){n.error({message:"Sorry, no images found. Please try again!",position:"topRight",timeout:3e3});return}l.innerHTML=y(t.hits),f.refresh(),t.hits.length===m&&(c.style.display="block")}catch{n.error({message:"Sorry, something went wrong. Please try again!",position:"topRight",timeout:3e3})}finally{p.style.display="none"}});c.addEventListener("click",async()=>{u+=1;try{const s=await g(d,u,m);l.insertAdjacentHTML("beforeend",y(s.hits)),f.refresh(),(s.hits.length<m||l.children.length>=s.totalHits)&&(c.style.display="none",n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}));const{height:t}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{n.error({message:"Sorry, something went wrong. Please try again!",position:"topRight",timeout:3e3})}});
//# sourceMappingURL=index.js.map
