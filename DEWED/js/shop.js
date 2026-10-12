const U=new URLSearchParams(location.search);const F={cat:new Set(U.get("cat")?[U.get("cat")]:[]),type:new Set(),fin:new Set()};
const uniq=k=>[...new Set(PRODUCTS.map(p=>p[k]))];
const chk=(id,arr,set,name)=>{$(id).innerHTML=arr.map(v=>`<label><input type="checkbox" data-s="${name}" value="${v}" ${set.has(v)?"checked":""}> ${v}</label>`).join("")};
function draw(){const cat=F.cat.size?[...F.cat]:uniq("category");chk("#fCat",uniq("category"),F.cat,"cat");
 chk("#fType",[...new Set(PRODUCTS.filter(p=>cat.includes(p.category)).map(p=>p.type))],F.type,"type");chk("#fFin",uniq("finish"),F.fin,"fin")}
function run(){const q=(U.get("q")||"").toLowerCase(),mp=+$("#fPrice").value,sh=+$('[name=sh]:checked').value,stock=$("#fStock").checked,badge=U.get("badge"),wl=U.get("wishlist");$("#pv").textContent=inr(mp);
 let r=PRODUCTS.filter(p=>(!F.cat.size||F.cat.has(p.category))&&(!F.type.size||F.type.has(p.type))&&(!F.fin.size||F.fin.has(p.finish))&&p.price<=mp&&p.shades>=sh&&(!stock||p.stock!=="out")&&(!q||(p.name+p.type+p.category+p.finish).toLowerCase().includes(q))&&(!badge||p.badge===badge)&&(!wl||wish.has(p.id)));
 const s=$("#sort").value;r.sort({feat:(a,b)=>a.id-b.id,best:(a,b)=>b.reviews-a.reviews,new:(a,b)=>(b.badge==="NEW")-(a.badge==="NEW")||b.id-a.id,lo:(a,b)=>a.price-b.price,hi:(a,b)=>b.price-a.price}[s]);
 $("#res").innerHTML=r.map(card).join("")||`<div class="none" style="grid-column:1/-1"><h3>${wl?"Your wishlist is empty":"No products found"}</h3><p style="margin:10px 0 20px">${wl?"Tap the heart on any product to save it.":"Try a different search or clear your filters."}</p><a class="btn dark" href="shop.html">Shop all</a></div>`;
 $("#cnt").textContent=r.length+" products";$("#ttl").textContent=wl?"Wishlist":q?`“${U.get("q")}”`:badge==="NEW"?"New in":badge==="BESTSELLER"?"Bestsellers":F.cat.size===1?[...F.cat][0]:"Shop all"}
document.addEventListener("change",e=>{const t=e.target;if(t.dataset.s){t.checked?F[t.dataset.s].add(t.value):F[t.dataset.s].delete(t.value);if(t.dataset.s==="cat")draw()}run()});
$("#reset").onclick=()=>setTimeout(()=>{F.cat.clear();F.type.clear();F.fin.clear();draw();run()});$("#fPrice").oninput=run;$("#fb").onclick=()=>$("#flt").classList.toggle("open");draw();run();
