const ADMIN_PHONE = "7989301401";

let category = "All";
let activeItem = null;
let qty = 1;
let cart = {};
let search = "";

/* ================== ITEMS ================== */
const items = [
  { name: "Pootharekulu (Dry Fruit)", cat: "Special", img: "https://www.godavarivantillu.com/cdn/shop/products/dry-fruit-pootharekulu-719_1200x1200.jpg?v=1760552286", desc:["Authentic Atreyapuram dry fruit pootharekulu","Paper sweet from Andhra Pradesh"] },
  { name: "Pootharekulu (Jaggery)", cat: "Special", img: "https://www.distacart.com/cdn/shop/products/7HVE2SrX7G_600x.jpg?v=1759286106", desc:["Traditional jaggery paper sweet","Classic Andhra pootharekulu"] },
  { name: "Pootharekulu (Sugar)", cat: "Special", img: "https://cdn.shopify.com/s/files/1/0651/8895/4328/files/Sugar_Kaju_Badam_Pista_Putharekulu_2_1a60fb50-c984-4e87-9752-e4da94109dd1_480x480.png?v=1688530072", desc:["Sugar pootharekulu","Sweet wafer layers with ghee"] },
  { name: "Kakinada Kaja", cat: "Sweets", img: "https://images.unsplash.com/photo-1618005198919-af2df2568c4f?auto=format&fit=crop&w=800&q=80", desc:["Layered sweet pastry from Kakinada, Andhra Pradesh","Deep fried and soaked in sugar syrup"] },
  { name: "Ariselu", cat: "Special", img: "https://www.atpu.in/cdn/shop/articles/Ariselu-An-Exquisite-Indian-Sweet-Atreyapuram-Putharekulu-Buy-Online-Original-Putharekulu-Made-In-Atreyapuram-5233.jpg?v=1727410621", desc:["Rice flour jaggery sweet","Traditional Andhra festive delight"] },
  { name: "Bandar Laddu", cat: "Special", img: "https://images.unsplash.com/photo-1610809899735-b58f15be1981?auto=format&fit=crop&w=800&q=80", desc:["Soft melt-in-mouth laddu","Coastal Andhra favorite"] },
  { name: "Sunnundalu", cat: "Special", img: "https://images.unsplash.com/photo-1591546897374-2531216cbea6?auto=format&fit=crop&w=800&q=80", desc:["Urad dal sweet balls","Traditional healthy snack"] },
  { name: "Bobbattu / Poornalu", cat: "Special", img: "https://images.unsplash.com/photo-1636026188730-9e8f1c8df4b6?auto=format&fit=crop&w=800&q=80", desc:["Sweet stuffed dumplings","Rice flour and sweet dal mixture"] },
  { name: "Chekkalu (Plain)", cat: "Snacks", img: "https://images.unsplash.com/photo-1598032895307-e7fdcbfab0e5?auto=format&fit=crop&w=800&q=80", desc:["Plain rice flour chekkalu","Crunchy tea-time snack"] },
  { name: "Chekkalu (Masala)", cat: "Snacks", img: "https://images.unsplash.com/photo-1582457964527-eb11cbb0e870?auto=format&fit=crop&w=800&q=80", desc:["Spicy masala chekkalu","Perfect with evening chai"] },
  { name: "Murukulu", cat: "Snacks", img: "https://images.unsplash.com/photo-1612874740893-b58f15be1981?auto=format&fit=crop&w=800&q=80", desc:["Twisted rice flour snack","Crispy and traditional"] },
  { name: "Dal Mixture", cat: "Snacks", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", desc:["Assorted dal munchies","Crispy mixed snack"] },
  { name: "Palli Pakodi", cat: "Snacks", img: "https://images.unsplash.com/photo-1596787697294-c0cffad0e8c1?auto=format&fit=crop&w=800&q=80", desc:["Palli pakodi snack","Deep fried savory bites"] },
  { name: "Avakaya Mango Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1529692236671-f1c0e3bb0c71?auto=format&fit=crop&w=800&q=80", desc:["Classic Andhra mango pickle","Authentic sun-cured taste"] },
  { name: "Gongura Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1614089921807-2b2ef9d45a5c?auto=format&fit=crop&w=800&q=80", desc:["Gongura pickle","Tangy Andhra greens flavor"] },
  { name: "Tomato Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1607889279273-2db9640cd62f?auto=format&fit=crop&w=800&q=80", desc:["Homestyle tomato pickle","Tangy and spicy"] },
  { name: "Sesame Laddus", cat: "Special", img: "https://images.unsplash.com/photo-1610595187950-36fccd2df097?auto=format&fit=crop&w=800&q=80", desc:["Made with sesame and jaggery","Sweet & energy rich"] },
  { name: "Mixed Dals Snack", cat: "Special", img: "https://images.unsplash.com/photo-1601361470715-12adeeff84e5?auto=format&fit=crop&w=800&q=80", desc:["Assorted lentils snack","Crispy & flavorful"] },

  // Remaining 82 items (placeholders with realistic food stock images)
  ...Array.from({ length: 82 }, (_, i) => ({
    name: `Special Andhra Item ${i + 1}`,
    cat: "Special",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    desc: ["Authentic regional snack or sweet","Traditional homemade flavor"]
  }))
];

/* ================== RENDER FUNCTION ================== */
function render() {
  const box = document.getElementById("products");
  box.innerHTML = "";
  const filtered = items.filter(i => (category === "All" || i.cat === category) && i.name.toLowerCase().includes(search));
  document.getElementById("suggestions").innerText = filtered.length === 0 ? "Sorry, item not found. Try another." : "";
  filtered.forEach((i, idx) => {
    box.innerHTML += `<div class="product" onclick="openModal(${idx})">
      <img src="${i.img}">
      <div class="info"><strong>${i.name}</strong></div>
    </div>`;
  });
}

/* ================== MODAL ================== */
function openModal(i) {
  activeItem = items[i]; qty=1; document.getElementById("qty").innerText=qty;
  document.getElementById("mName").innerText=activeItem.name;
  document.getElementById("mImg").src=activeItem.img;
  const ul=document.getElementById("mDesc"); ul.innerHTML=""; activeItem.desc.forEach(d=>ul.innerHTML+=`<li>${d}</li>`);
  document.getElementById("modal").classList.add("active");
}
function closeModal(){ document.getElementById("modal").classList.remove("active"); }
function changeQty(v){ qty=Math.max(1,qty+v); document.getElementById("qty").innerText=qty; }

/* ================== CART ================== */
function addToCart() {
  cart[activeItem.name]=(cart[activeItem.name]||0)+qty;
  document.getElementById("cartCount").innerText=Object.values(cart).reduce((a,b)=>a+b,0);
  closeModal();
}
function toggleCart(){ document.getElementById("cart").classList.toggle("open"); }
function checkout() {
  const phone=document.getElementById("custPhone").value;
  if(!phone) return alert("Enter phone number");
  let msg="Hello Konaseema Specials%0AOrder:%0A";
  for(let k in cart) msg+=`• ${k} x${cart[k]}%0A`;
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`);
}

/* ================== SEARCH ================== */
document.getElementById("searchInput").oninput = e => { search=e.target.value.toLowerCase(); render(); };
document.getElementById("clearSearch").onclick = () => { search=""; document.getElementById("searchInput").value=""; render(); };

/* ================== CATEGORY FILTER ================== */
function setCategory(c,el){ category=c; document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active")); el.classList.add("active"); render(); }

/* ================== INITIAL RENDER ================== */
render();
