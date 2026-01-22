const ADMIN_PHONE = "7989301401";

let category = "All";
let activeItem = null;
let qty = 1;
let cart = {};
let search = "";

/* ================== ITEMS ================== */
const items = [
  { name: "Pootharekulu (Dry Fruit)", cat: "Special", desc:["Authentic Atreyapuram dry fruit pootharekulu","Paper sweet from Andhra Pradesh"] },
  { name: "Pootharekulu (Jaggery)", cat: "Special", desc:["Traditional jaggery paper sweet","Classic Andhra pootharekulu"] },
  { name: "Kakinada Kaja", cat: "Sweets", desc:["Layered sweet pastry from Kakinada","Deep fried and soaked in sugar syrup"] },
  { name: "Ariselu", cat: "Special", desc:["Rice flour jaggery sweet","Traditional Andhra festive delight"] },
  { name: "Bandar Laddu", cat: "Special", desc:["Soft melt-in-mouth laddu","Coastal Andhra favorite"] },
  { name: "Sunnundalu", cat: "Special", desc:["Urad dal sweet balls","Traditional healthy snack"] },
  { name: "Chekkalu (Plain)", cat: "Snacks", desc:["Plain rice flour chekkalu","Crunchy tea-time snack"] },
  { name: "Chekkalu (Masala)", cat: "Snacks", desc:["Spicy masala chekkalu","Perfect with evening chai"] },
  { name: "Murukulu", cat: "Snacks", desc:["Twisted rice flour snack","Crispy and traditional"] },
  { name: "Dal Mixture", cat: "Snacks", desc:["Assorted dal munchies","Crispy mixed snack"] },
  { name: "Avakaya Mango Pickle", cat: "Pickles", desc:["Classic Andhra mango pickle","Authentic sun-cured taste"] },
  { name: "Gongura Pickle", cat: "Pickles", desc:["Gongura pickle","Tangy Andhra greens flavor"] },
  { name: "Tomato Pickle", cat: "Pickles", desc:["Homestyle tomato pickle","Tangy and spicy"] },
  { name: "Sesame Laddus", cat: "Special", desc:["Made with sesame and jaggery","Sweet & energy rich"] },
  { name: "Mixed Dals Snack", cat: "Special", desc:["Assorted lentils snack","Crispy & flavorful"] },
  { name: "Kaju Pootharekulu", cat: "Special", desc:["Cashew layered sweet","Traditional Andhra delicacy"] },
  { name: "Karapu Chekkalu", cat: "Special", desc:["Red chili spiced chekkalu","Crunchy and spicy"] },
  { name: "Garelu (Moong Dal)", cat: "Special", desc:["Moong dal fried rings","Soft inside, crunchy outside"] },
  { name: "Jaggery Cashew Sweet", cat: "Special", desc:["Sweet with cashew & jaggery","Festive Andhra sweet"] },
  { name: "Bandaru Chips", cat: "Special", desc:["Thin crispy chips","Made from rice flour"] },
  { name: "Bhakranis", cat: "Special", desc:["Crispy fried snack","Perfect tea-time munchies"] },
  { name: "Traditional Laddus", cat: "Special", desc:["Soft round laddus","Made with jaggery and ghee"] },
  { name: "Podulu (Spice Powders)", cat: "Powders", desc:["Andhra style spice powders","Home-prepared masalas"] },
  { name: "Garelu Flour Mix", cat: "Powders", desc:["Ready mix for garelu","Easy to fry authentic rings"] },
  { name: "Vadiyalu Flour Mix", cat: "Powders", desc:["Mix to make crispy vadiyalu","Authentic Andhra flavor"] },
  { name: "K-Biscuits", cat: "Special", desc:["Crunchy sweet biscuits","Perfect with tea"] }
  // Add more items to reach 100 as needed
];

/* ================== RENDER ================== */
function render() {
  const box = document.getElementById("products");
  box.innerHTML = "";
  const filtered = items.filter(i => 
    (category === "All" || i.cat === category) &&
    i.name.toLowerCase().includes(search)
  );
  if (filtered.length === 0) {
    document.getElementById("suggestions").innerText = "Sorry, item not found.";
    return;
  } else {
    document.getElementById("suggestions").innerText = "";
  }
  filtered.forEach((i, idx) => {
    box.innerHTML += `
      <div class="product" onclick="openModal(${idx})">
        <strong>${i.name}</strong>
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
  document.getElementById("cartCount").innerText = Object.values(cart).reduce((a,b)=>a+b,0);
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
