const products = [
  { id: 1, name: "توت أحمر طازج", category: "فواكه", price: "50 جنيه", priceValue: 50, emoji: "🍓", farm: "مزرعة النخيل الخضراء", description: "توت أحمر طازج ومغذي، يتم حصاده يومياً ليصل إلى العميل طازجاً ومناسباً للأكل الطازج أو التحضير في الوصفات المختلفة." },
  { id: 2, name: "خيار عضوي", category: "خضار", price: "30 جنيه", priceValue: 30, emoji: "🥒", farm: "مزرعة الوادي الطازج", description: "خيار عضوي نضج بشكل مثالي، خفيف ومشبع، ويُعد خياراً ممتازاً للعناية بالصحة والوجبات اليومية." },
  { id: 3, name: "قمح مصقول", category: "حبوب", price: "70 جنيه", priceValue: 70, emoji: "🌾", farm: "حقول الذهب", description: "قمح عالي الجودة ومصقول بشكل جيد، مناسب للطهي ومعالجات المخابز اليومية وبمواصفات ممتازة." },
  { id: 4, name: "حليب طازج", category: "ألبان", price: "45 جنيه", priceValue: 45, emoji: "🥛", farm: "مزرعة النور الحيواني", description: "حليب طازج من مصادر موثوقة، يقدم طعماً غنياً ونكهة طبيعية مع تركيز كبير على النظافة وسلامة المنتج." },
  { id: 5, name: "موز ناضج", category: "فواكه", price: "35 جنيه", priceValue: 35, emoji: "🍌", farm: "مزرعة النخيل الخضراء", description: "موز ناضج ومليء بالعناصر الغذائية، مع طعم حلو وملمس طري، مناسب للوجبات السريعة والتمارين." },
  { id: 6, name: "طماطم عضوية", category: "خضار", price: "40 جنيه", priceValue: 40, emoji: "🍅", farm: "مزرعة الوادي الطازج", description: "طماطم عضوية طازجة، ذات لون غني ورائحة ممتازة، تستخدم في السلطات والوجبات اليومية بكفاءة عالية." },
  { id: 7, name: "شعير طازج", category: "حبوب", price: "60 جنيه", priceValue: 60, emoji: "🌾", farm: "حقول الذهب", description: "شعير طازج عالي الجودة ومناسب للطبخ أو إعداد المشروبات والوجبات المغذية والاقتصادية." },
  { id: 8, name: "جبن منزلي", category: "ألبان", price: "75 جنيه", priceValue: 75, emoji: "🧀", farm: "مزرعة النور الحيواني", description: "جبن منزلي بمذاق غني وقوام ممتاز، يتم إنتاجه بعناية مع الالتزام بالنظافة ومواصفات الجودة." },
];

const CART_KEY = "farmAddressCart";
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("product")) || 1;
const product = products.find((item) => item.id === productId) || products[0];

const productVisual = document.getElementById("productVisual");
const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productFarm = document.getElementById("productFarm");
const qtyInput = document.getElementById("qtyInput");
const cartMessage = document.getElementById("cartMessage");
const addToCartBtn = document.getElementById("addToCartBtn");
const cartCount = document.getElementById("cartCount");

function updateCartBadge() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const total = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    cartCount.textContent = total;
  } catch (error) {
    cartCount.textContent = "0";
  }
}

function renderProduct() {
  productVisual.textContent = product.emoji;
  productCategory.textContent = product.category;
  productName.textContent = product.name;
  productDescription.textContent = product.description;
  productPrice.textContent = product.price;
  productFarm.textContent = product.farm;
}

addToCartBtn.addEventListener("click", () => {
  const quantity = Math.max(1, Number(qtyInput.value) || 1);

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (error) {
    cart = [];
  }

  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.priceValue, quantity });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  cartMessage.classList.remove("hidden");
  cartMessage.textContent = `تمت إضافة ${quantity} قطعة من ${product.name} إلى السلة.`;
});

updateCartBadge();
renderProduct();
