// Admin & Min
const ADMIN_PHONE='7989301401';
const MIN_UGADI=500;

// Items setup
let items=[];
const images={Ugadi:'https://www.vegrecipesofindia.com/wp-content/uploads/2018/03/ugadi-pachadi-recipe.jpg',
Sweets:'https://i0.wp.com/vismaifood.com/storage/app/uploads/public/0f0/05a/dfb/thumb__700_0_0_0_auto.jpg',
Snacks:'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/Andhra_Chekkalu.jpg',
Podis:'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/idli-podi-recipe.jpg',
Papads:'https://www.vegrecipesofindia.com/wp-content/uploads/2012/05/papad-recipe-1.jpg',
Pickles:'https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/avakaya-pickle.jpg'};

const names={
Ugadi:['Ugadi Pachadi','Neem Flower Pachadi','Raw Mango Pachadi','Ugadi Special Sweet Box'],
Sweets:['Pootharekulu','Kakinada Kaja','Sunnundalu','Ariselu','Bellam Gavvalu'],
Snacks:['Chekkalu','Murukulu','Mixture','Janthikalu','Banana Chips'],
Podis:['Kandi Podi','Idli Karam','Kobbari Karam','Karivepaku Podi'],
Papads:['Minapa Papad','Pepper Papad','Garlic Papad'],
Pickles:['Avakaya','Gongura Pachadi','Lemon Pickle','Usiri Avakaya']
};
Object.keys(names).forEach(c=>names[c].forEach(n=>{
  for(let i=1;i<=4;i++)items.push({name:n+' – Style '+i,cat:c,base:120+i*30,img:images[c],desc:'Traditional Konaseema homemade '+n+' prepared fresh using age-old recipes.'})
}));

// State
let cat='All',activeItem=null,weight=500,quantity=1,cart={},count=0,total=0,search='';

// DOM
const pDiv=document.getElementById('products');
const cartItems=document.getElementById('cartItems');
const cartDiv=document.getElementById('cart');
const totalEl=document.getElementById('total');
const minWarn=document.getElementById('minWarn');
const modal=document.getElementById('modal');
const mName=document.getElementById('mName');
const mImg=document.getElementById('mImg');
const mDesc=document.getElementById('mDesc');
const mPrice=document.getElementById('mPrice');
const mQty=document.getElementById('mQty');

// Render
function render(){
  pDiv.innerHTML='';
  const filtered=items.filter(i=>(cat==='All'||i.cat===cat)&&i.name.toLowerCase().includes(search));
  if(filtered.length===0){pDiv.innerHTML='<p style="text-align:center;color:#c0392b;">Sorry, no items found!</p>'; return;}
  filtered.forEach((i,idx)=>{
    const div=document.createElement('div');
    div.className='product';
    div.innerHTML=`<img src="${i.img}" loading="lazy"><div class="info"><strong>${i.name}</strong><p>From ₹${i.base}</p></div>`;
    div.onclick=()=>openModal(idx);
    pDiv.appendChild(div);
  });
}

// Modal functions
function openModal(i){
  activeItem=items[i];
  weight=500; quantity=1; mQty.innerText=quantity;
  modal.classList.add('active');
  mName.innerText=activeItem.name;
  mDesc.innerText=activeItem.desc;
  mImg.src=activeItem.img;
  updatePrice();
}
function closeModal(){modal.classList.remove('active');}
function setWeight(w,e){weight=w;document.querySelectorAll('.weight-boxes span').forEach(s=>s.classList.remove('active'));e.classList.add('active');updatePrice();}
function setQuantity(d){quantity+=d;if(quantity<1)quantity=1;mQty.innerText=quantity;}
function updatePrice(){mPrice.innerText=Math.round(activeItem.base*(weight/500));}

// Cart
function addToCart(){
  const key=`${activeItem.name} (${weight}g)`;
  const price=parseInt(mPrice.innerText);
  if(!cart[key])cart[key]={qty:0,price,cat:activeItem.cat};
  cart[key].qty += quantity;
  count += quantity;
  total += price * quantity;
  updateCart();
  quantity = 1; mQty.innerText = quantity;

  // Flying animation
  const img = document.createElement('img');
  img.src = activeItem.img;
  img.className = 'flying-item';
  document.body.appendChild(img);
  const modalRect = modal.getBoundingClientRect();
  img.style.left = modalRect.left + modalRect.width/2 - 25 + 'px';
  img.style.top = modalRect.top + modalRect.height/2 - 25 + 'px';
  const cartBtn = document.getElementById('cartBtn');
  const cartRect = cartBtn.getBoundingClientRect();
  setTimeout(()=>{
    img.style.transform = `translate(${cartRect.left - modalRect.left}px, ${cartRect.top - modalRect.top}px) scale(0.2)`;
    img.style.opacity = '0';
  },10);
  setTimeout(()=>document.body.removeChild(img),800);

  closeModal();

  // Cart shake
  document.getElementById('cartBtn').classList.add('cart-shake');
  setTimeout(()=>document.getElementById('cartBtn').classList.remove('cart-shake'),400);
}

function updateCart(){
  document.getElementById('count').innerText=count;
  cartItems.innerHTML='';
  for(let k in cart)cartItems.innerHTML+=`<div class="cart-item">${k} x${cart[k].qty}<span><button onclick=change('${k}',-1)>-</button><button onclick=change('${k}',1)>+</button></span></div>`;
  totalEl.innerText=total;
  totalEl.classList.add('total-pop'); setTimeout(()=>totalEl.classList.remove('total-pop'),500);
  const ugadiTotal=Object.values(cart).filter(i=>i.cat==='Ugadi').reduce((s,i)=>s+i.price*i.qty,0);
  minWarn.innerText=ugadiTotal>0&&ugadiTotal<MIN_UGADI?'Minimum Ugadi order ₹500':'';
}

function change(k,d){cart[k].qty+=d;count+=d;total+=cart[k].price*d;if(cart[k].qty<=0)delete cart[k];updateCart();}

// Cart panel
function toggleCart(){cartDiv.classList.toggle('open');}

// WhatsApp Checkout
function checkout(){
  const name=document.getElementById('custName').value;
  const phone=document.getElementById('custPhone').value;
  const loc=document.getElementById('custLoc').value;
  if(!name||!phone||!loc){alert('Enter name, phone, and location'); return;}
  let msg=`Hello Konaseema Specials 🌸%0AName: ${name}%0APhone: ${phone}%0ALocation: ${loc}%0AOrder:%0A`;
  for(let k in cart){ msg+=`• ${k} x${cart[k].qty}%0A` }
  msg+=`Total: ₹${total}`;
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`,'_blank');
}

// Categories
function setCat(c,e){cat=c;document.querySelectorAll('.categories button').forEach(b=>b.classList.remove('active'));e.classList.add('active');render();}

// Search
function searchItems(v){search=v.toLowerCase();render();document.getElementById('clearSearch').style.display=v?'inline':'none';}
function clearSearch(){document.getElementById('searchInput').value='';search='';render();document.getElementById('clearSearch').style.display='none';}

// Dark Mode
function toggleDark(){document.body.classList.toggle('dark');}

// Scroll top
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}

// Initial render
render();
