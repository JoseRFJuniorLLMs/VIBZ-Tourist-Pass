import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics, isSupported, logEvent } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO7zD0Ngsq78G9SvmtluLWFUe7erfpcUs",
  authDomain: "vibz-tourist.firebaseapp.com",
  projectId: "vibz-tourist",
  storageBucket: "vibz-tourist.firebasestorage.app",
  messagingSenderId: "332359654983",
  appId: "1:332359654983:web:41fe6da6d3bc6ca3fe1b62",
  measurementId: "G-NCJ5PNEFGG"
};

let analytics = null;
try {
  const app = initializeApp(firebaseConfig);
  if (await isSupported()) analytics = getAnalytics(app);
} catch (error) {
  console.info("Firebase Analytics indisponível neste ambiente.", error);
}
function track(name, params) {
  if (!analytics) return;
  try { logEvent(analytics, name, params || {}); } catch (_) {}
}

const photos = {
  hotel: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=78')",
  coast: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=78')",
  food: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=78')",
  sunset: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=78')"
};

// Pesquisa local para a apresentação. Os estabelecimentos são reais,
// mas a presença no protótipo NÃO representa parceria comercial confirmada.
const partners = [
  {name:"Pousada João Fernandes",type:"hotel",label:"Hotel / Pousada",area:"João Fernandes",rating:"4,7",bg:photos.hotel},
  {name:"Hotel Ville La Plage & Beach Club",type:"hotel",label:"Hotel & Beach Club",area:"João Fernandes",rating:"4,7",bg:photos.coast},
  {name:"Búzios Beach Resort",type:"hotel",label:"Resort",area:"Tucuns",rating:"4,2",bg:photos.hotel},
  {name:"Pousada Praia João Fernandes",type:"hotel",label:"Pousada",area:"João Fernandes",rating:"4,6",bg:photos.coast},
  {name:"Madame Bardot Restaurante",type:"restaurant",label:"Restaurante",area:"Orla Bardot",rating:"4,7",bg:photos.food},
  {name:"Orlabella Búzios",type:"restaurant",label:"Restaurante",area:"Orla Bardot",rating:"4,8",bg:photos.food},
  {name:"Xerelete Búzios",type:"restaurant",label:"Restaurante",area:"Orla Bardot",rating:"4,9",bg:photos.sunset},
  {name:"La Bardot Restaurant",type:"restaurant",label:"Restaurante",area:"Centro",rating:"4,8",bg:photos.food},
  {name:"TAWA BEACH",type:"beach",label:"Beach Club",area:"Praia da Ferradura",rating:"4,6",bg:photos.sunset},
  {name:"Beach Club La Plage",type:"beach",label:"Beach Club",area:"João Fernandes",rating:"4,8",bg:photos.coast}
];

const grid = document.querySelector("#partnerGrid");
function renderPartners(filter) {
  const list = !filter || filter === "all" ? partners : partners.filter(function(p){ return p.type === filter; });
  grid.innerHTML = list.map(function(p){
    return '<article class="partner-card reveal visible" style="--partner-bg:'+p.bg+'">' +
      '<div class="partner-card-bg"></div><div class="partner-content">' +
      '<div class="partner-meta"><span class="partner-type">'+p.label+'</span><span class="partner-rating">★ '+p.rating+'</span></div>' +
      '<h3>'+p.name+'</h3><p>'+p.area+' • Búzios/RJ</p></div></article>';
  }).join("");
}
renderPartners("all");

document.querySelectorAll(".filter-chip").forEach(function(btn){
  btn.addEventListener("click", function(){
    document.querySelectorAll(".filter-chip").forEach(function(b){ b.classList.remove("active"); });
    btn.classList.add("active");
    renderPartners(btn.dataset.filter);
    track("partner_filter",{category:btn.dataset.filter});
  });
});

const bars=[30,42,28,54,48,64,73,51,43,61,58,38,75,83,59,49,68,45,55,77,63,86,48,70,79,51,72,65,43,57];
document.querySelector("#barChart").innerHTML=bars.map(function(v){
  return '<div class="bar-item" style="height:'+v+'%"><span>'+Math.round(v*.92)+' entradas</span></div>';
}).join("");

const rankingBase=[
  ["Pousada João Fernandes",142],
  ["Madame Bardot",118],
  ["Beach Club La Plage",101],
  ["TAWA BEACH",94],
  ["Orlabella Búzios",83]
];
const ranking=document.querySelector("#ranking");
function renderRanking(items){
  ranking.innerHTML=items.map(function(item,i){
    return '<li><span class="rank-no">'+(i+1)+'</span><span>'+item[0]+'<small>origem do passe</small></span><strong>'+item[1]+'</strong></li>';
  }).join("");
}
renderRanking(rankingBase);
document.querySelector("#shuffleRanking").addEventListener("click",function(){
  const simulated=rankingBase.map(function(item){
    return [item[0],Math.max(40,item[1]+Math.floor(Math.random()*31)-15)];
  }).sort(function(a,b){return b[1]-a[1];});
  renderRanking(simulated);
  track("dashboard_simulation");
});

let countersRan=false;
function runCounters(){
  if(countersRan)return;
  countersRan=true;
  document.querySelectorAll("[data-counter]").forEach(function(el){
    const target=Number(el.dataset.counter),start=performance.now(),duration=900;
    function tick(now){
      const p=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(target*eased).toLocaleString("pt-BR");
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const observer=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      if(entry.target.closest("#dashboard"))runCounters();
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(function(el){observer.observe(el);});

const toggle=document.querySelector(".mobile-toggle");
const nav=document.querySelector(".main-nav");
toggle.addEventListener("click",function(){
  const open=nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded",String(open));
});
nav.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click",function(){nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");});
});

const scanModal=document.querySelector("#scanModal");
const partnerModal=document.querySelector("#partnerModal");
function openModal(modal){
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeModal(modal){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  if(!document.querySelector(".modal.is-open"))document.body.classList.remove("modal-open");
}
document.querySelectorAll(".js-demo-scan").forEach(function(btn){
  btn.addEventListener("click",function(){openModal(scanModal);track("demo_scan_open");});
});
document.querySelectorAll(".js-open-partner").forEach(function(btn){
  btn.addEventListener("click",function(){openModal(partnerModal);track("partner_form_open");});
});
document.querySelectorAll("[data-close-modal]").forEach(function(el){
  el.addEventListener("click",function(){closeModal(el.closest(".modal"));});
});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape")document.querySelectorAll(".modal.is-open").forEach(closeModal);
});

const validate=document.querySelector("#validatePass");
validate.addEventListener("click",function(){
  const result=document.querySelector("#scanResult");
  validate.disabled=true;validate.textContent="Validando...";
  result.className="scan-result";
  result.innerHTML='<span>LENDO QR CODE</span><p>Consultando status, origem e utilização do passe...</p>';
  setTimeout(function(){
    result.className="scan-result valid";
    result.innerHTML='<span>✓ PASSE VÁLIDO</span><p>Entrada promocional autorizada. Vincule uma pulseira ao atendimento.</p>'+
      '<div class="scan-details"><div><small>Cartão</small><strong>#008721</strong></div>'+
      '<div><small>Origem</small><strong>Pousada João Fernandes</strong></div>'+
      '<div><small>Status</small><strong>Não utilizado</strong></div>'+
      '<div><small>Pulseira</small><strong>VIBZ-0387</strong></div></div>';
    validate.disabled=false;validate.textContent="Liberar entrada + pulseira 0387";
    validate.onclick=function(){
      result.innerHTML='<span>✓ ENTRADA REGISTRADA</span><p>Cartão #008721 marcado como utilizado e vinculado à pulseira VIBZ-0387.</p>';
      validate.textContent="Concluído";validate.disabled=true;
      track("demo_pass_redeemed",{origin:"pousada_joao_fernandes"});
    };
    track("demo_pass_validated",{origin:"pousada_joao_fernandes"});
  },850);
});

const form=document.querySelector("#partnerForm");
const success=document.querySelector("#formSuccess");
form.addEventListener("submit",function(event){
  event.preventDefault();
  const data=Object.fromEntries(new FormData(form).entries());
  const lead=Object.assign({},data,{createdAt:new Date().toISOString(),source:"vibz-tourist-pass-demo"});
  let previous=[];
  try{previous=JSON.parse(localStorage.getItem("vibz_partner_leads")||"[]");}catch(_){}
  previous.push(lead);
  localStorage.setItem("vibz_partner_leads",JSON.stringify(previous.slice(-25)));
  track("generate_lead",{category:data.category||"unknown"});
  form.hidden=true;success.hidden=false;
});

document.querySelector("#year").textContent=new Date().getFullYear();
track("page_view",{page_title:document.title,prototype:true});
