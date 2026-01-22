const ADMIN_PHONE = "7989301401";

let products = [
  {
    name: "Pootharekulu",
    cat: "Sweets",
    price: 450,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Pootharekulu.jpg",
    desc: "Famous paper-thin sweet from Atreyapuram made with rice starch and jaggery."
  },
  {
    name: "Kakinada Kaja",
    cat: "Sweets",
    price: 380,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Kakinada_Kaja.jpg",
    desc: "Crispy layered sweet soaked in sugar syrup."
  },
  {
    name: "Avakaya Pickle",
    cat: "Pickles",
    price: 320,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Avakaya_Pickle.jpg",
    desc: "Traditional Andhra mango pickle with mustard & garlic."
  }
];

let cart = {};
let activeProduct = null;
let weight = 500;
let qty = 1;
let currentCat = "All";

const grid = document.getElementById("productGrid");
const modal = document.getElementById("productModal");

function renderProducts() {
  grid.innerHTML = "";
  products.filter(p => currentCat === "All" || p.cat === currentCat)
    .forEach((p, i) => {
      grid.innerHTML += `
        <div class="product" onclick="openModal(${i})">
          <img src="${p.img}">
          <div class="info">
            <strong>${p.name}</strong><br>
            ₹${p.price}
          </div>
        </div>
      `;
    });
}
renderProducts();

function openModal(i) {
  activeProduct = products[i];
  qty = 1;
  document.getElementById("modalImg").src = activeProduct.img;
  document.getElementById("modalName").innerText = activeProduct.name;
  document.getElementById("modalDesc").innerText = activeProduct.desc;
  document.getElementById("qtyVal").innerText = qty;
  modal.classList.add("show");
}
function closeModal() {
  modal.classList.remove("show");
}
function setWeight(w, el) {
  weight = w;
  document.querySelectorAll(".weights button").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
}
function changeQty(d) {
  qty = Math.max(1, qty + d);
  document.getElementById("qtyVal").innerText = qty;
}
function addToCart() {
  const key = activeProduct.name + " " + weight + "g";
  if (!cart[key]) cart[key] = { ...activeProduct, qty: 0 };
  cart[key].qty += qty;
  updateCartUI();
  closeModal();
}
function updateCartUI() {
  let count = 0, total = 0;
  for (let k in cart) {
    count += cart[k].qty;
    total += cart[k].qty * cart[k].price;
  }
  document.getElementById("cartCount").innerText = count;
  document.getElementById("mobileCount").innerText = count;
  document.getElementById("cartTotal").innerText = total;
  document.getElementById("mobileCart").style.display = count > 0 ? "block" : "none";
}
function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}
function checkout() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  let msg = `Hello Konaseema Specials 🌸%0AName: ${name}%0APhone: ${phone}%0A`;
  for (let k in cart) {
    msg += `${k} x${cart[k].qty}%0A`;
  }
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`);
}
function filterCat(c, btn) {
  currentCat = c;
  document.querySelectorAll(".categories button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
}
function searchItems(v) {
  const val = v.toLowerCase();
  grid.innerHTML = "";
  products.filter(p => p.name.toLowerCase().includes(val))
    .forEach((p, i) => openModal(i));
}
function clearSearch() {
  renderProducts();
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
