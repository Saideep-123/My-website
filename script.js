const ADMIN_PHONE = "7989301401";
let category = "All", activeItem=null, qty=1, cart={}, search="";

/* ================== ITEMS (sample, extend to 100) ================== */
const items=[
  { name:"Pootharekulu (Dry Fruit)", cat:"Special", desc:["Authentic Atreyapuram dry fruit pootharekulu","Paper sweet from Andhra Pradesh"] },
  { name:"Kakinada Kaja", cat:"Sweets", desc:["Layered sweet pastry from Kakinada","Deep fried and soaked in sugar syrup"] },
  { name:"Chekkalu (Masala)", cat:"Snacks", desc:["Spicy masala chekkalu","Perfect with evening chai"] },
  { name:"Avakaya Mango Pickle", cat:"Pickles", desc:["Classic Andhra mango pickle","Authentic sun-cured taste"] },
  { name:"Podulu (Spice Powders)", cat:"Powders", desc:["Andhra style spice powders","Home-prepared masalas"] },
  { name:"Traditional Laddus", cat:"Special", desc:["Soft round laddus","Made with jaggery and ghee"] }
];

/* ================== RENDER ================== */
function render(){
  const box=document.getElementById("products");
  box.innerHTML="";
  const filtered=items.filter(i=>(category==="All"||i.cat===category)&&i.name.toLowerCase().includes(search));
  if(filtered.length===0){ document.getElementById("suggestions").innerText="Sorry, item not found."; return; }
  else{ document.getElementById("suggestions").innerText=""; }
  filtered.forEach((i,idx)=>{
    box.innerHTML+=`<div class="product" onclick="openModal(${idx})"><strong>${i.name}</strong></div>`;
  });
}
render();

/* MODAL */
function openModal(i){
  activeItem=items[i];
  qty=1;
  document.getElementById("qty").innerText=qty;
  document.getElementById("mName").innerText=activeItem.name;
  const ul=document.getElementById("mDesc");
  ul.innerHTML="";
  activeItem.desc.forEach(d=>ul.innerHTML+=`<li>${d}</li>`);
  document.querySelector('input[name="weight"][value="250g"]').checked=true;
  document.getElementById("modal").classList.add("active");
}
function closeModal(){ document.getElementById("modal").classList.remove("active"); }
function changeQty(v){ qty=Math.max(1,qty+v); document.getElementById("qty").innerText=qty; }

/* ADD TO CART */
function addToCart(){
  const weight=document.querySelector('input[name="weight"]:checked').value;
  const key=`${activeItem.name} (${weight})`;
  cart[key]=(cart[key]||0)+qty;
  document.getElementById("cartCount").innerText=Object.values(cart).reduce((a,b)=>a+b,0);
  updateCartItems();
  closeModal();
}

/* UPDATE CART DISPLAY */
function updateCartItems(){
  const cartBox=document.getElementById("cartItems");
  cartBox.innerHTML="";
  for(let k in cart){ cartBox.innerHTML+=`<div>${k} x${cart[k]}</div>`; }
}

/* CART TOGGLE */
function toggleCart(){ document.getElementById("cart").classList.toggle("open"); }

/* CHECKOUT */
function checkout(){
  const phone=document.getElementById("custPhone").value;
  if(!phone) return alert("Enter phone number");
  let msg="Hello Konaseema Specials%0AOrder:%0A";
  for(let k in cart) msg+=`• ${k} x${cart[k]}%0A`;
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`);
}

/* SEARCH */
document.getElementById("searchInput").oninput=e=>{ search=e.target.value.toLowerCase(); render(); };
document.getElementById("clearSearch").onclick=()=>{ search=""; document.getElementById("searchInput").value=""; render(); };

/* CATEGORY */
function setCategory(c,el){ category=c; document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active")); el.classList.add("active"); render(); }
