const ADMIN_PHONE = "7989301401";

let category = "All";
let activeItem = null;
let qty = 1;
let cart = {};
let search = "";

/* ================== ITEMS ================== */
const items = [
  { name: "Pootharekulu (Dry Fruit)", cat: "Special", img: "https://www.godavarivantillu.com/cdn/shop/products/dry-fruit-pootharekulu-719_1200x1200.jpg?v=1760552286", desc:["Authentic Atreyapuram dry fruit pootharekulu","Paper sweet from Andhra Pradesh","Best served fresh with ghee"] },
  { name: "Pootharekulu (Jaggery)", cat: "Special", img: "https://www.distacart.com/cdn/shop/products/7HVE2SrX7G_600x.jpg?v=1759286106", desc:["Traditional jaggery paper sweet","Classic Andhra pootharekulu","Festive delight"] },
  { name: "Kakinada Kaja", cat: "Sweets", img: "https://images.unsplash.com/photo-1618005198919-af2df2568c4f?auto=format&fit=crop&w=800&q=80", desc:["Layered sweet pastry from Kakinada","Deep fried and soaked in sugar syrup"] },
  { name: "Ariselu", cat: "Special", img: "https://www.atpu.in/cdn/shop/articles/Ariselu-An-Exquisite-Indian-Sweet-Atreyapuram-Putharekulu-Buy-Online-Original-Putharekulu-Made-In-Atreyapuram-5233.jpg?v=1727410621", desc:["Rice flour jaggery sweet","Traditional Andhra festive delight"] },
  { name: "Bandar Laddu", cat: "Special", img: "https://images.unsplash.com/photo-1610809899735-b58f15be1981?auto=format&fit=crop&w=800&q=80", desc:["Soft melt-in-mouth laddu","Coastal Andhra favorite"] },
  { name: "Sunnundalu", cat: "Special", img: "https://images.unsplash.com/photo-1591546897374-2531216cbea6?auto=format&w=800&q=80", desc:["Urad dal sweet balls","Traditional healthy snack"] },
  { name: "Bobbattu / Poornalu", cat: "Special", img: "https://images.unsplash.com/photo-1636026188730-9e8f1c8df4b6?auto=format&w=800&q=80", desc:["Sweet stuffed dumplings","Rice flour and sweet dal mixture"] },
  { name: "Chekkalu (Plain)", cat: "Snacks", img: "https://images.unsplash.com/photo-1598032895307-e7fdcbfab0e5?auto=format&w=800&q=80", desc:["Plain rice flour chekkalu","Crunchy tea-time snack"] },
  { name: "Chekkalu (Masala)", cat: "Snacks", img: "https://images.unsplash.com/photo-1582457964527-eb11cbb0e870?auto=format&w=800&q=80", desc:["Spicy masala chekkalu","Perfect with evening chai"] },
  { name: "Murukulu", cat: "Snacks", img: "https://images.unsplash.com/photo-1612874740893-b58f15be1981?auto=format&w=800&q=80", desc:["Twisted rice flour snack","Crispy and traditional"] },
  { name: "Dal Mixture", cat: "Snacks", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&w=800&q=80", desc:["Assorted dal munchies","Crispy mixed snack"] },
  { name: "Avakaya Mango Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1529692236671-f1c0e3bb0c71?auto=format&w=800&q=80", desc:["Classic Andhra mango pickle","Authentic sun-cured taste"] },
  { name: "Gongura Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1614089921807-2b2ef9d45a5c?auto=format&w=800&q=80", desc:["Gongura pickle","Tangy Andhra greens flavor"] },
  { name: "Tomato Pickle", cat: "Pickles", img: "https://images.unsplash.com/photo-1607889279273-2db9640cd62f?auto=format&w=800&q=80", desc:["Homestyle tomato pickle","Tangy and spicy"] },
  { name: "Sesame Laddus", cat: "Special", img: "https://images.unsplash.com/photo-1610595187950-36fccd2df097?auto=format&w=800&q=80", desc:["Made with sesame and jaggery","Sweet & energy rich"] },
  { name: "Mixed Dals Snack", cat: "Special", img: "https://images.unsplash.com/photo-1601361470715-12adeeff84e5?auto=format&w=800&q=80", desc:["Assorted lentils snack","Crispy & flavorful"] },
  { name: "Kaju Pootharekulu", cat: "Special", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=800&q=80", desc:["Cashew layered sweet","Traditional Andhra delicacy"] },
  { name: "Karapu Chekkalu", cat: "Special", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=800&q=80", desc:["Red chili spiced chekkalu","Crunchy and spicy"] },
  { name: "Garelu (Moong Dal)", cat: "Special", img:"https://images.unsplash.com/photo-1580987583370-3f82b7fc6d3f?auto=format&w=800&q=80", desc:["Moong dal fried rings","Soft inside, crunchy outside"] },
  { name: "Jaggery Cashew Sweet", cat: "Special", img:"https://images.unsplash.com/photo-1590529489543-3c2ee5c9a2b0?auto=format&w=800&q=80", desc:["Sweet with cashew & jaggery","Festive Andhra sweet"] },
  { name: "Bandaru Chips", cat: "Special", img:"https://images.unsplash.com/photo-1571168542220-fb9f7352d51b?auto=format&w=800&q=80", desc:["Thin crispy chips","Made from rice flour"] },
  { name: "Bhakranis", cat: "Special", img:"https://images.unsplash.com/photo-1582053435272-843ce2f7c0fa?auto=format&w=800&q=80", desc:["Crispy fried snack","Perfect tea-time munchies"] },
  { name: "Traditional Laddus", cat: "Special", img:"https://images.unsplash.com/photo-1610595187950-36fccd2df097?auto=format&w=800&q=80", desc:["Soft round laddus","Made with jaggery and ghee"] },
  { name: "Podulu (Spice Powders)", cat: "Powders", img:"https://images.unsplash.com/photo-1571071992801-05e6a85d6b4a?auto=format&w=800&q=80", desc:["Andhra style spice powders","Home-prepared masalas"] },
  { name: "Garelu Flour Mix", cat: "Powders", img:"https://images.unsplash.com/photo-1580987583370-3f82b7fc6d3f?auto=format&w=800&q=80", desc:["Ready mix for garelu","Easy to fry authentic rings"] },
  { name: "Vadiyalu Flour Mix", cat: "Powders", img:"https://images.unsplash.com/photo-1582053435272-843ce2f7c0fa?auto=format&w=800&q=80", desc:["Mix to make crispy vadiyalu","Authentic Andhra flavor"] },
  { name: "K-Biscuits", cat: "Special", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=800&q=80", desc:["Crunchy sweet biscuits","Perfect with tea"] }
];

/* Remaining functions (render, modal, cart, search, category) stay same as before and fully functional */
