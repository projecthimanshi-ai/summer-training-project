const P=byId(new URLSearchParams(location.search).get("id"));
if(!P){$("#pd").innerHTML='<div class="none" style="padding-top:200px"><h2>Product not found</h2><a class="btn dark" href="shop.html" style="margin-top:20px">Shop all</a></div>'}else{
document.title=P.name+" — DEWED";let shade="",qty=1;
const names=P.shades>1?Array.from({length:P.shades},(_,i)=>`${SHADE_NAMES[i%16]} ${Math.floor(i/16)*100+10+i*10}`):[];
const rv=[["Anika","Sits beautifully and wears comfortably all day.",5],["Meera","Lovely finish, easy to blend. I reach for it often.",5],["Sana","Good colour payoff. Would love a few more shades.",4]];
const sw=i=>`hsl(${20+(i%6)*3},${35+(i*7)%25}%,${78-(i*53%50)*.9}%)`;
$("#pd").innerHTML=`<div class="pd"><div class="gal">${(P.imgs.length?P.imgs:[0]).map((_,i)=>art(P,i)).join("")}</div><div><p class="sm">${P.category} · ${P.type}</p><h1>${P.name}</h1>
<p><span class="star">${stars(P.rating)}</span> ${P.rating} · ${P.reviews} reviews (sample)</p><p style="font-size:22px;margin:14px 0">${inr(P.price)}${P.mrp>P.price?` <s class="meta">${inr(P.mrp)}</s> <span class="sm" style="color:var(--wine)">${Math.round((1-P.price/P.mrp)*100)}% off</span>`:""}</p>
<p style="color:#6f5a52;max-width:460px">${P.description}</p>${P.shades>1?`<p class="sm" style="margin-top:24px">Shade: <b id="sn">Select a shade</b></p><div class="shades">${names.map((n,i)=>`<button aria-label="${n}" aria-pressed="false" data-n="${n}" style="background:${sw(i)}"></button>`).join("")}</div>`:""}
<div style="display:flex;align-items:center;gap:16px;margin-top:20px"><span class="sm">Qty</span><div class="qty"><button id="qm" aria-label="Decrease">−</button><span id="qv">1</span><button id="qp" aria-label="Increase">+</button></div><span class="meta">${P.stock==="out"?"Sold out":P.stock==="low"?"Only a few left":"In stock"}</span></div>
<div class="acts"><button class="btn dark" id="add" ${P.stock==="out"?"disabled":""}>Add to bag</button><button class="btn" id="buy" ${P.stock==="out"?"disabled":""}>Buy now</button><button class="btn wl on-p" data-wl="${P.id}" style="position:static;opacity:1;width:auto;height:auto;padding:15px 22px" aria-label="Wishlist">${ico.h}</button></div>
<details open><summary>Why you'll love it</summary><p>${P.description}</p></details><details><summary>How to use</summary><p>${P.how}</p></details><details><summary>Ingredients</summary><p>${P.ingredients}</p></details>
<details><summary>Shades</summary><p>${P.shades>1?names.join(", "):"Single shade."}</p></details>
<details><summary>Reviews</summary><p class="meta">Sample reviews for demonstration only. Not genuine customer feedback.</p>${rv.map(r=>`<div class="rv"><span class="star">${stars(r[2])}</span> <b>${r[0]}</b><p>${r[1]}</p></div>`).join("")}</details></div></div>
<section class="sec"><div class="head"><h2>You may also like</h2></div><div class="grid">${PRODUCTS.filter(p=>p.category===P.category&&p.id!==P.id).slice(0,4).map(card).join("")}</div></section>`;
$("#pd").addEventListener("click",e=>{const b=e.target.closest("[data-n]");if(b){shade=b.dataset.n;$$("[data-n]").forEach(x=>x.setAttribute("aria-pressed",x===b));$("#sn").textContent=shade}});
const ok=()=>P.shades<=1||shade||(toast("Please select a shade"),false);
$("#qm").onclick=()=>$("#qv").textContent=qty=Math.max(1,qty-1);$("#qp").onclick=()=>$("#qv").textContent=qty=Math.min(10,qty+1);
$("#add").onclick=()=>ok()&&cart.add(P.id,qty,shade);$("#buy").onclick=()=>{if(ok()){cart.add(P.id,qty,shade);location.href="checkout.html"}}}
