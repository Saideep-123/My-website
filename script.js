const ADMIN_PHONE = "7989301401";

let category = "All";
let activeItem = null;
let qty = 1;
let cart = {};
let search = "";

/* ================== ITEMS (40 sample, extend to 100) ================== */
const items = [
  { name: "Pootharekulu (Dry Fruit)", cat: "Special", img: "https://www.godavarivantillu.com/cdn/shop/products/dry-fruit-pootharekulu-719_400x400.jpg", desc:["Authentic Atreyapuram dry fruit pootharekulu","Paper sweet from Andhra Pradesh","Best served fresh with ghee"] },
  { name: "Pootharekulu (Jaggery)", cat: "Special", img: "https://www.distacart.com/cdn/shop/products/7HVE2SrX7G_400x400.jpg", desc:["Traditional jaggery paper sweet","Classic Andhra pootharekulu"] },
  { name: "Kakinada Kaja", cat: "Sweets", img: "https://images.unsplash.com/photo-1618005198919-af2df2568c4f?w=400&h=400&fit=crop", desc:["Layered sweet pastry from Kakinada","Deep fried and soaked in sugar syrup"] },
  { name: "Ariselu", cat: "Special", img: "https://www.atpu.in/cdn/shop/articles/Ariselu-An-Exquisite-Indian-Sweet-Atreyapuram-Putharekulu-Buy-Online-Original-Putharekulu-Made-In-Atreyapuram-400x400.jpg", desc:["Rice flour jaggery sweet","Traditional Andhra festive delight"] },
  { name: "Bandar Laddu", cat: "Special", img: "https://images.unsplash.com/photo-1610809899735-b58f15be1981?w=400&h=400&fit=crop", desc:["Soft melt-in-mouth laddu","Coastal Andhra favorite"] },
  { name: "Sunnundalu", cat: "Special", img: "https://images.unsplash.com/photo-1591546897374-2531216cbea6?w=400&h=400&fit=crop", desc:["Urad dal sweet balls","Traditional healthy snack"] },
  { name: "Bobbattu / Poornalu", cat: "Special", img: "https://images.unsplash.com/photo-1636026188730-9e8f1c8df4b6?w=400&h=400&fit=crop", desc:["Sweet stuffed dumplings","Rice flour and sweet dal mixture"] },
  { name: "Chekkalu (Plain)", cat: "Snacks", img: "https://images.unsplash.com/photo-1598032895307-e7fdcbfab0e5?w=400&h=400&fit=crop", desc:["Plain rice flour chekkalu","Crunchy tea-time snack"] },
  { name: "Chekkalu (Masala)", cat: "Snacks", img: "https://images.unsplash.com/photo-1582457964527-eb11cbb0e870?w=400&h=400&fit=crop", desc:["Spicy masala chekkalu","Perfect with evening chai"] },
  { name: "Murukulu", cat: "Snacks", img: "https://images.unsplash.com/photo-1612874740893-b58f15be1981?w=400&h=400&fit=crop", desc:["Twisted rice flour snack","Crispy and traditional"] },
  { name: "Dal Mixture", cat: "Snacks", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop", desc:["Assorted dal munchies","Crispy mixed snack"] },
  { name: "Avakaya Mango Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1529692236671-f1c0e3bb0c71?w=400&h=400&fit=crop", desc:["Classic Andhra mango pickle","Authentic sun-cured taste"] },
  { name: "Gongura Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1614089921807-2b2ef9d45a5c?w=400&h=400&fit=crop", desc:["Gongura pickle","Tangy Andhra greens flavor"] },
  { name: "Tomato Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1607889279273-2db9640cd62f?w=400&h=400&fit=crop", desc:["Homestyle tomato pickle","Tangy and spicy"] },
  { name: "Sesame Laddus", cat: "Special", img: "https://images.unsplash.com/photo-1610595187950-36fccd2df097?w=400&h=400&fit=crop", desc:["Made with sesame and jaggery","Sweet & energy rich"] },
  { name: "Mixed Dals Snack", cat: "Special", img: "https://images.unsplash.com/photo-1601361470715-12adeeff84e5?w=400&h=400&fit=crop", desc:["Assorted lentils snack","Crispy & flavorful"] },
  { name: "Kaju Pootharekulu", cat: "Special", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop", desc:["Cashew layered sweet","Traditional Andhra delicacy"] },
  { name: "Karapu Chekkalu", cat: "Special", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop", desc:["Red chili spiced chekkalu","Crunchy and spicy"] },
  { name: "Garelu (Moong Dal)", cat: "Special", img:"https://images.unsplash.com/photo-1580987583370-3f82b7fc6d3f?w=400&h=400&fit=crop", desc:["Moong dal fried rings","Soft inside, crunchy outside"] },
  { name: "Jaggery Cashew Sweet", cat: "Special", img:"https://images.unsplash.com/photo-1590529489543-3c2ee5c9a2b0?w=400&h=400&fit=crop", desc:["Sweet with cashew & jaggery","Festive Andhra sweet"] },
  { name: "Bandaru Chips", cat: "Special", img:"https://images.unsplash.com/photo-1571168542220-fb9f7352d51b?w=400&h=400&fit=crop", desc:["Thin crispy chips","Made from rice flour"] },
  { name: "Bhakranis", cat: "Special", img:"https://images.unsplash.com/photo-1582053435272-843ce2f7c0fa?w=400&h=400&fit=crop", desc:["Crispy fried snack","Perfect tea-time munchies"] },
  { name: "Traditional Laddus", cat: "Special", img:"https://images.unsplash.com/photo-1610595187950-36fccd2df097?w=400&h=400&fit=crop", desc:["Soft round laddus","Made with jaggery and ghee"] },
  { name: "Podulu (Spice Powders)", cat: "Powders", img:"https://images.unsplash.com/photo-1571071992801-05e6a85d6b4a?w=400&h=400&fit=crop", desc:["Andhra style spice powders","Home-prepared masalas"] },
  { name: "Garelu Flour Mix", cat: "Powders", img:"https://images.unsplash.com/photo-1580987583370-3f82b7fc6d3f?w=400&h=400&fit=crop", desc:["Ready mix for garelu","Easy to fry authentic rings"] },
  { name: "Vadiyalu Flour Mix", cat: "Powders", img:"https://images.unsplash.com/photo-1582053435272-843ce2f7c0fa?w=400&h=400&fit=crop", desc:["Mix to make crispy vadiyalu","Authentic Andhra flavor"] },
  { name: "K-Biscuits", cat: "Special", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop", desc:["Crunchy sweet biscuits","Perfect with tea"] }
];

/* ================== FUNCTIONS ================== */

/* RENDER, SEARCH, CATEGORY, MODAL, CART, CHECKOUT */
function render() {
  const box = document.getElementById("products");
  box.innerHTML = "";
  const filtered = items.filter(i => 
    (category === "All" || i.cat === category) &&
    i.name.toLowerCase().includes(search)
  );
  if (filtered.length === 0) {
    document.getElementById("suggestions").innerText =
      "Sorry, item not found. Try searching another item.";
    return;
  } else {
    document.getElementById("suggestions").innerText = "";
  }
  filtered.forEach((i, idx) => {
    box.innerHTML += `
      <div class="product" onclick="openModal(${idx})">
        <img src="${i.img}">
        <div class="info">${i.name}</div>
      </div>
    `;
  });
}

render();

/* MODAL */
function openModal(i) {
  activeItem = items[i];
  qty = 1;
  document.getElementById("qty").innerText = qty;

  const modalImg = document.getElementById("mImg");
  modalImg.src = activeItem.img;
  modalImg.style.width = "100%";
  modalImg.style.height = "auto";
  modalImg.style.maxHeight = "200px";
  modalImg.style.objectFit = "cover";
  modalImg.style.borderRadius = "12px";

  document.getElementById("mName").innerText = activeItem.name;

  const ul = document.getElementById("mDesc");
  ul.innerHTML = "";
  activeItem.desc.forEach(d => ul.innerHTML += `<li>${d}</li>`);

  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function changeQty(v) {
  qty = Math.max(1, qty + v);
  document.getElementById("qty").innerText = qty;
}

/* CART */
function addToCart() {
  cart[activeItem.name] = (cart[activeItem.name] || 0) + qty;
  document.getElementById("cartCount").innerText =
    Object.values(cart).reduce((a,b)=>a+b,0);
  closeModal();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}

function checkout() {
  const phone = document.getElementById("custPhone").value;
  if (!phone) return alert("Enter phone number");

  let msg = "Hello Konaseema Specials%0AOrder:%0A";
  for (let k in cart) msg += `• ${k} x${cart[k]}%0A`;

  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`);
}

/* SEARCH */
document.getElementById("searchInput").oninput = e => {
  search = e.target.value.toLowerCase();
  render();
};

document.getElementById("clearSearch").onclick = () => {
  search = "";
  document.getElementById("searchInput").value = "";
  render();
};

/* CATEGORY */
function setCategory(c, el) {
  category = c;
  document.querySelectorAll(".categories button").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  render();
}
