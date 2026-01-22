const ADMIN_PHONE="7989301401";

const productsData=[
 {name:"Pootharekulu",cat:"Sweets",price:180,img:"https://i0.wp.com/vismaifood.com/storage/app/uploads/public/0f0/05a/dfb/thumb__700_0_0_0_auto.jpg"},
 {name:"Kakinada Kaja",cat:"Sweets",price:200,img:"https://upload.wikimedia.org/wikipedia/commons/6/6f/Kakinada_Kaja.jpg"},
 {name:"Chekkalu",cat:"Snacks",price:150,img:"https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/Andhra_Chekkalu.jpg"},
 {name:"Avakaya Pickle",cat:"Pickles",price:220,img:"https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/avakaya-pickle.jpg"}
];

let cart={},count=0,total=0;
let activeItem=null,weight=500,qty=1;

const products=document.getElementById("products");
const categories=document.getElementById("categories");

["All","Sweets","Snacks","Pickles"].forEach(c=>{
  const b=document.createElement("button");
  b.innerText=c;b.onclick=()=>filterCat(c,b);
  categories.appendChild(b);
});
categories.children[0].classList.add("active");

function render(list){
  products.innerHTML="";
  if(!list.length){
    products.innerHTML="<p style='grid-column:1/-1'>Sorry, item not found</p>";
    return;
  }
  list.forEach(p=>{
    products.innerHTML+=`
      <div class="product" onclick='openModal(${JSON.stringify(p)})'>
        <img src="${p.img}">
        <div class="info">
          <strong>${p.name}</strong>
          <p>₹${p.price}</p>
        </div>
      </div>`;
  });
}
render(productsData);

function filterCat(c,btn){
  [...categories.children].forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  render(c==="All"?productsData:productsData.filter(p=>p.cat===c));
}

function openModal(p){
  activeItem=p;qty=1;weight=500;
  modal.classList.add("active");
  mName.innerText=p.name;
  mImg.src=p.img;
  mDesc.innerText="Traditional homemade Konaseema recipe.";
  updatePrice();
}
function closeModal(){modal.classList.remove("active")}
function setWeight(w,e){
  weight=w;
  document.querySelectorAll(".weight-boxes span").forEach(s=>s.classList.remove("active"));
  e.classList.add("active");updatePrice();
}
function setQty(d){qty=Math.max(1,qty+d);mQty.innerText=qty}
function updatePrice(){mPrice.innerText=activeItem.price*(weight/500)*qty}

function addToCart(){
  const key=`${activeItem.name} ${weight}g`;
  if(!cart[key])cart[key]={qty:0,price:parseInt(mPrice.innerText)};
  cart[key].qty+=qty;
  count+=qty;total+=cart[key].price;
  updateCart();closeModal();
}

function updateCart(){
  cartItems.innerHTML="";
  for(let k in cart){
    cartItems.innerHTML+=`<p>${k} x ${cart[k].qty}</p>`;
  }
  totalEl.innerText=total;
  countEl.innerText=count;
  mobileTotal.innerText=total;
  document.getElementById("mobileCartBar").classList.toggle("show",count>0);
}

function toggleCart(){cart.classList.toggle("open")}
function searchItems(v){
  document.getElementById("clearSearch").style.display=v?"block":"none";
  render(productsData.filter(p=>p.name.toLowerCase().includes(v.toLowerCase())));
}
function clearSearch(){searchInput.value="";render(productsData)}
function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}
function toggleDark(){document.body.classList.toggle("dark")}
function checkout(){
  let msg=`Hello Konaseema Specials\nName:${custName.value}\nPhone:${custPhone.value}\nLocation:${custLoc.value}\nOrder:\n`;
  for(let k in cart)msg+=`${k} x ${cart[k].qty}\n`;
  msg+=`Total ₹${total}`;
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(msg)}`);
}
