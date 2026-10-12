const STATES=["Andhra Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal"];
const DAYS={std:[4,6],exp:[2,3]};
const fmt=(d)=>d.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"});
const eta=(m,base=new Date())=>{const a=new Date(base),b=new Date(base);a.setDate(a.getDate()+DAYS[m][0]);b.setDate(b.getDate()+DAYS[m][1]);return fmt(a)+" – "+fmt(b)};
function calc(){const s=cart.sub(),m=$("[name=ship]:checked").value,pay=$("[name=pay]:checked").value;
 const ship=m==="exp"?199:(s>=FREE_SHIP?0:SHIP_FEE),cod=pay==="cod"?49:0;return{sub:s,ship,cod,total:s+ship+cod,m,pay}}
function initCheckout(){
 if(!cart.items.length){$("#co").hidden=true;$("#empty").hidden=false;return}
 $("#state").innerHTML+=STATES.map(s=>`<option>${s}</option>`).join("");
 $("#lines").innerHTML=cart.items.map(i=>{const p=byId(i.id);return `<div class="ci">${art(p)}<div><div>${p.name}</div><div class="meta">${i.shade||p.type} · Qty ${i.qty}</div><div>${inr(p.price*i.qty)}</div></div></div>`}).join("");
 const draw=()=>{const c=calc();$("#pStd").textContent=c.sub>=FREE_SHIP?"Free":inr(SHIP_FEE);
  $("#tot").innerHTML=`<div class="rw"><span>Subtotal</span><span>${inr(c.sub)}</span></div><div class="rw"><span>Shipping</span><span>${c.ship?inr(c.ship):"Free"}</span></div>${c.cod?`<div class="rw"><span>Cash on delivery fee</span><span>${inr(c.cod)}</span></div>`:""}<div class="rw t"><span>Total</span><span>${inr(c.total)}</span></div><p class="meta">Estimated delivery: ${eta(c.m)}</p>`;
  $$(".payf").forEach(e=>e.classList.toggle("show",e.id==="p_"+c.pay));$("#place").textContent=c.pay==="cod"?"Place order":`Place order · ${inr(c.total)}`};
 $$("[name=ship],[name=pay]").forEach(r=>r.onchange=draw);draw();
 $("#cnum").oninput=e=>e.target.value=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
 $("#cexp").oninput=e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);e.target.value=v.length>2?v.slice(0,2)+"/"+v.slice(2):v};
 $("#phone").oninput=$("#pin").oninput=e=>e.target.value=e.target.value.replace(/\D/g,"");
 $("#f").addEventListener("submit",e=>{e.preventDefault();const c=calc(),v=id=>$("#"+id).value.trim();let bad=null;
  const chk=(id,ok,msg)=>{const f=$("#"+id).closest(".fld");f.classList.toggle("bad",!ok);$("#e_"+id).textContent=ok?"":msg;if(!ok&&!bad)bad=id};
  chk("fname",v("fname").length>=2,"Enter your full name");chk("phone",/^[6-9]\d{9}$/.test(v("phone")),"Enter a valid 10-digit mobile number");
  chk("email",/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("email")),"Enter a valid email address");chk("a1",v("a1").length>=5,"Enter your street address");
  chk("city",v("city").length>=2,"Enter your city");chk("state",!!v("state"),"Select your state");chk("pin",/^\d{6}$/.test(v("pin")),"Enter a 6-digit PIN code");
  if(c.pay==="upi")chk("upi",/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(v("upi")),"Enter a valid UPI ID, e.g. name@bank");
  if(c.pay==="card"){chk("cname",v("cname").length>=2,"Enter the name on the card");chk("cnum",/^\d{16}$/.test(v("cnum").replace(/\s/g,"")),"Enter a 16-digit card number");
   const m=v("cexp").match(/^(\d\d)\/(\d\d)$/),now=new Date(),okE=m&&+m[1]>=1&&+m[1]<=12&&new Date(2000+ +m[2],+m[1])>now;chk("cexp",!!okE,"Enter a valid future expiry");chk("ccvv",/^\d{3,4}$/.test(v("ccvv")),"Enter the 3 or 4 digit CVV")}
  if(c.pay==="nb")chk("bank",!!v("bank"),"Select your bank");
  if(bad){$("#"+bad).focus();return}
  const o={id:"DWD"+Date.now().toString(36).toUpperCase().slice(-7),placed:new Date().toISOString(),ship:c.m,pay:c.pay,
   items:cart.items.map(i=>({id:i.id,name:byId(i.id).name,shade:i.shade,qty:i.qty,price:byId(i.id).price})),sub:c.sub,shipFee:c.ship,cod:c.cod,total:c.total,
   name:v("fname"),email:v("email"),phone:v("phone"),addr:[v("a1"),v("a2"),v("city"),v("state"),v("pin")].filter(Boolean).join(", ")};
  const all=store.get("dewed_orders",[]);all.push(o);store.set("dewed_orders",all);store.set("dewed_last_order",o);cart.items=[];store.set("dewed_cart",[]);location.href="order-confirmation.html"})}
function showOrder(){const o=store.get("dewed_last_order",null),el=$("#done");
 if(!o){el.innerHTML='<h2>No recent order</h2><p style="margin:14px 0 24px">Place an order to see its confirmation here.</p><a class="btn dark" href="shop.html">Shop now</a>';return}
 const PAY={upi:"UPI",card:"Card",nb:"Net banking",cod:"Cash on delivery"},days=DAYS[o.ship];
 el.innerHTML=`<div class="tick" aria-hidden="true">✓</div><h1 style="font-size:clamp(2.4rem,6vw,4.4rem)">Your order has been placed</h1>
 <p style="margin-top:16px">Thank you, ${o.name.split(" ")[0]}. It will be delivered in ${days[0]}–${days[1]} days, between <b>${eta(o.ship,new Date(o.placed))}</b>.</p>
 <p class="meta" style="margin-top:6px">Order ${o.id} · ${PAY[o.pay]} · Confirmation for ${o.email}</p>
 <div class="box"><p class="sm">Delivering to</p><p style="margin:6px 0 18px">${o.name}, ${o.addr}<br>${o.phone}</p><p class="sm">Items</p>${o.items.map(i=>`<div class="rw"><span>${i.name} × ${i.qty}${i.shade?` (${i.shade})`:""}</span><span>${inr(i.price*i.qty)}</span></div>`).join("")}
 <div class="rw"><span>Shipping</span><span>${o.shipFee?inr(o.shipFee):"Free"}</span></div>${o.cod?`<div class="rw"><span>COD fee</span><span>${inr(o.cod)}</span></div>`:""}<div class="rw t"><span>${o.pay==="cod"?"To pay on delivery":"Total"}</span><span>${inr(o.total)}</span></div></div>
 <p class="note">Demo storefront: this order is saved only in this browser. No payment was taken and no email was sent.</p><a class="btn dark" href="shop.html" style="margin-top:24px">Continue shopping</a>`}
