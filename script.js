const ADMIN_PHONE = "7989301401";

let category = "All";
let activeItem = null;
let qty = 1;
let cart = {};
let search = "";

const items = [
  {
    name: "Pootharekulu",
    cat: "Sweets",
    img: "https://i0.wp.com/vismaifood.com/storage/app/uploads/public/0f0/05a/dfb/thumb__700_0_0_0_auto.jpg",
    desc: [
      "Made with rice starch sheets",
      "Filled with jaggery & ghee",
      "Traditional Andhra sweet",
      "Very light and crispy",
      "Prepared fresh on order"
    ]
  },
  {
    name: "Kakinada Kaja",
    cat: "Sweets",
    img: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/Kakinada_Kaja.jpg",
    desc: [
      "Deep fried layered sweet",
      "Soaked in sugar syrup",
      "Crispy outside, soft inside",
      "Famous from Kakinada",
      "Perfect festive sweet"
    ]
  },
  {
    name: "Chekkalu",
    cat: "Snacks",
    img: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/Andhra_Chekkalu.jpg",
    desc: [
      "Rice flour based snack",
      "Flavored with cumin & chilli",
      "Very crunchy texture",
      "Tea-time favorite",
      "Homemade style"
    ]
  },
  {
    name: "Avakaya Pickle",
    cat: "Pickles",
    img: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/avakaya-pickle.jpg",
    desc: [
      "Raw mango based pickle",
      "Stone-ground mustard",
      "Authentic Konaseema taste",
      "No preservatives",
      "Sun-cured preparation"
    ]
  }
];

/* RENDER */
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
        <div class="info">
          <strong>${i.name}</strong>
        </div>
      </div>`;
  });
}

render();

/* MODAL */
function openModal(i) {
  activeItem = items[i];
  qty = 1;
  document.getElementById("qty").innerText = qty;
  document.getElementById("mName").innerText = activeItem.name;
  document.getElementById("mImg").src = activeItem.img;

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
