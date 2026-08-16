const farms = [
  {
    id: 1,
    name: "مزرعة النخيل الخضراء",
    city: "الخرطوم",
    distance: "4.2 كم",
    rating: 4.9,
    emoji: "🌴",
    summary: "مزرعة متخصصة في التمور والفواكه الموسمية، وتعمل على توفير منتجات طازجة مباشرة من الحقل إلى العميل.",
    tags: ["تمور", "مربى", "توصيل"],
    category: "fruit",
  },
  {
    id: 2,
    name: "مزرعة الوادي الطازج",
    city: "ودمدني",
    distance: "7.8 كم",
    rating: 4.8,
    emoji: "🌾",
    summary: "تؤمن منتجات خضار طازجة ومنتجات نباتية بأسعار مناسبة، مع ثقة عالية في الجودة والمصدر.",
    tags: ["خضار", "عضوي", "بيع مباشر"],
    category: "vegetable",
  },
  {
    id: 3,
    name: "مزرعة النور الحيواني",
    city: "الفاشر",
    distance: "10.1 كم",
    rating: 4.7,
    emoji: "🐄",
    summary: "تقدم منتجات ألبان وبيض موثقة، مع اهتمام كبير بالنظافة وسلامة الغذاء للمستهلك.",
    tags: ["ألبان", "بيض", "مباشر"],
    category: "dairy",
  },
  {
    id: 4,
    name: "حقول الذهب",
    city: "الجزيرة",
    distance: "6.5 كم",
    rating: 4.9,
    emoji: "🌽",
    summary: "متخصصة في الحبوب والمنتجات الأساسية، وتوفر كميات مناسبة للأسر والمطاعم والتجار.",
    tags: ["قمح", "ذرة", "حبوب"],
    category: "grain",
  },
];

const productsByFarm = {
  1: [
    { name: "تمور مجدولة", price: "220 جنيه", emoji: "🌴", category: "تمور" },
    { name: "موز طازج", price: "50 جنيه", emoji: "🍌", category: "فواكه" },
    { name: "مربى التين", price: "110 جنيه", emoji: "🍯", category: "مخبوزات" },
    { name: "عنب أحمر", price: "70 جنيه", emoji: "🍇", category: "فواكه" },
  ],
  2: [
    { name: "خيار عضوي", price: "30 جنيه", emoji: "🥒", category: "خضار" },
    { name: "طماطم طازجة", price: "40 جنيه", emoji: "🍅", category: "خضار" },
    { name: "ملفوف", price: "25 جنيه", emoji: "🥬", category: "خضار" },
    { name: "فلفل أخضر", price: "35 جنيه", emoji: "🫑", category: "خضار" },
  ],
  3: [
    { name: "حليب طازج", price: "45 جنيه", emoji: "🥛", category: "ألبان" },
    { name: "جبن منزلي", price: "75 جنيه", emoji: "🧀", category: "ألبان" },
    { name: "بيض حر", price: "55 جنيه", emoji: "🥚", category: "بيض" },
    { name: "زبادي", price: "40 جنيه", emoji: "🥣", category: "ألبان" },
  ],
  4: [
    { name: "قمح مصقول", price: "70 جنيه", emoji: "🌾", category: "حبوب" },
    { name: "ذرة", price: "65 جنيه", emoji: "🌽", category: "حبوب" },
    { name: "شعير", price: "60 جنيه", emoji: "🌾", category: "حبوب" },
    { name: "عدس", price: "80 جنيه", emoji: "🫘", category: "بقوليات" },
  ],
};

const params = new URLSearchParams(window.location.search);
const farmId = Number(params.get("farm")) || 1;
const selectedFarm = farms.find((farm) => farm.id === farmId) || farms[0];
const farmProducts = productsByFarm[selectedFarm.id] || productsByFarm[1];

const farmPreview = document.getElementById("farmPreview");
const farmBadge = document.getElementById("farmBadge");
const farmName = document.getElementById("farmName");
const farmSummary = document.getElementById("farmSummary");
const farmCity = document.getElementById("farmCity");
const farmDistance = document.getElementById("farmDistance");
const farmRating = document.getElementById("farmRating");
const farmTags = document.getElementById("farmTags");
const farmProductsContainer = document.getElementById("farmProducts");
const productSelect = document.getElementById("productSelect");
const orderForm = document.getElementById("orderForm");
const orderSuccess = document.getElementById("orderSuccess");
const profileLogo = document.getElementById("profileLogo");
const profileCity = document.getElementById("profileCity");
const profilePhone = document.getElementById("profilePhone");
const profileDescription = document.getElementById("profileDescription");

function getFarmProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem("farmAddressFarmProfile") || "null");
    if (!saved) {
      return {
        farmName: "مزرعة النخيل الخضراء",
        city: "الخرطوم",
        phone: "0500000000",
        description: "مزرعة تنتج منتجات طازجة مباشرة من الحقل.",
        logo: "🌿",
      };
    }
    return saved;
  } catch (error) {
    return {
      farmName: "مزرعة النخيل الخضراء",
      city: "الخرطوم",
      phone: "0500000000",
      description: "مزرعة تنتج منتجات طازجة مباشرة من الحقل.",
      logo: "🌿",
    };
  }
}

function renderFarmHeader() {
  const profile = getFarmProfile();
  farmPreview.textContent = selectedFarm.emoji;
  farmBadge.textContent = selectedFarm.category === "fruit" ? "مزرعة فواكه" : selectedFarm.category === "vegetable" ? "مزرعة خضار" : selectedFarm.category === "dairy" ? "مزرعة ألبان" : "حقول زراعية";
  farmName.textContent = profile.farmName || selectedFarm.name;
  farmSummary.textContent = profile.description || selectedFarm.summary;
  farmCity.textContent = profile.city || selectedFarm.city;
  farmDistance.textContent = selectedFarm.distance;
  farmRating.textContent = `★ ${selectedFarm.rating}`;
  farmTags.innerHTML = selectedFarm.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  profileLogo.textContent = profile.logo || "🌿";
  profileCity.textContent = profile.city || selectedFarm.city;
  profilePhone.textContent = profile.phone || "0500000000";
  profileDescription.textContent = profile.description || selectedFarm.summary;
}

function renderProducts() {
  farmProductsContainer.innerHTML = farmProducts
    .map(
      (product) => `
        <article class="product-row-card">
          <div class="product-top">
            <span class="emoji">${product.emoji}</span>
            <span class="tag">${product.category}</span>
          </div>
          <h3>${product.name}</h3>
          <p>متوفر الآن من ${selectedFarm.name}</p>
          <div class="price-row">
            <strong>${product.price}</strong>
            <button class="button secondary" type="button" data-product="${product.name}">اختيار</button>
          </div>
        </article>
      `
    )
    .join("");

  productSelect.innerHTML = '<option value="">اختر منتجاً</option>' +
    farmProducts.map((product) => `<option value="${product.name}">${product.name} - ${product.price}</option>`).join("");

  document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.getAttribute("data-product");
      productSelect.value = selected;
      productSelect.scrollIntoView({ behavior: "smooth", block: "center" });
      productSelect.focus();
    });
  });
}

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  orderSuccess.classList.remove("hidden");
  orderForm.reset();
  productSelect.value = "";
});

renderFarmHeader();
renderProducts();
