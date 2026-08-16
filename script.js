const FARM_PROFILE_KEY = "farmAddressFarmProfile";

function getFarmProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(FARM_PROFILE_KEY) || "null");
    if (!saved) {
      return {
        farmName: "مزرعة النخيل الخضراء",
        city: "الخرطوم",
        logo: "🌿",
      };
    }

    return {
      farmName: saved.farmName || "مزرعة النخيل الخضراء",
      city: saved.city || "الخرطوم",
      logo: saved.logo || "🌿",
    };
  } catch (error) {
    return {
      farmName: "مزرعة النخيل الخضراء",
      city: "الخرطوم",
      logo: "🌿",
    };
  }
}

const profile = getFarmProfile();

const farms = [
  {
    id: 1,
    name: profile.farmName,
    city: profile.city,
    rating: 4.9,
    distance: "4.2 كم",
    specialty: ["تمور", "مربى"],
    emoji: profile.logo,
    price: "من 220 جنيه",
    category: "fruit",
  },
  {
    id: 2,
    name: "مزرعة الوادي الطازج",
    city: "ودمدني",
    rating: 4.8,
    distance: "7.8 كم",
    specialty: ["خضار", "بقوليات"],
    emoji: "🌾",
    price: "من 180 جنيه",
    category: "vegetable",
  },
  {
    id: 3,
    name: "مزرعة النور الحيواني",
    city: "الفاشر",
    rating: 4.7,
    distance: "10.1 كم",
    specialty: ["ألبان", "بيض"],
    emoji: "🐄",
    price: "من 260 جنيه",
    category: "dairy",
  },
  {
    id: 4,
    name: "حقول الذهب",
    city: "الجزيرة",
    rating: 4.9,
    distance: "6.5 كم",
    specialty: ["قمح", "ذرة"],
    emoji: "🌽",
    price: "من 150 جنيه",
    category: "grain",
  },
];

const products = [
  { id: 1, name: "توت أحمر طازج", category: "فواكه", price: "50 جنيه", priceValue: 50, emoji: "🍓", farm: "من مزرعة النخيل", type: "fruit" },
  { id: 2, name: "خيار عضوي", category: "خضار", price: "30 جنيه", priceValue: 30, emoji: "🥒", farm: "من مزرعة الوادي", type: "vegetable" },
  { id: 3, name: "قمح مصقول", category: "حبوب", price: "70 جنيه", priceValue: 70, emoji: "🌾", farm: "من حقول الذهب", type: "grain" },
  { id: 4, name: "حليب طازج", category: "ألبان", price: "45 جنيه", priceValue: 45, emoji: "🥛", farm: "من مزرعة النور", type: "dairy" },
  { id: 5, name: "موز ناضج", category: "فواكه", price: "35 جنيه", priceValue: 35, emoji: "🍌", farm: "من مزرعة النخيل", type: "fruit" },
  { id: 6, name: "طماطم عضوية", category: "خضار", price: "40 جنيه", priceValue: 40, emoji: "🍅", farm: "من مزرعة الوادي", type: "vegetable" },
  { id: 7, name: "شعير طازج", category: "حبوب", price: "60 جنيه", priceValue: 60, emoji: "🌾", farm: "من حقول الذهب", type: "grain" },
  { id: 8, name: "جبن منزلي", category: "ألبان", price: "75 جنيه", priceValue: 75, emoji: "🧀", farm: "من مزرعة النور", type: "dairy" },
];

const farmsContainer = document.getElementById("farmsContainer");
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-chip");
const cartCount = document.getElementById("cartCount");

const CART_KEY = "farmAddressCart";
let activeFilter = "all";

function updateCartCount() {
  if (!cartCount) return;
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    cartCount.textContent = totalItems;
  } catch (error) {
    cartCount.textContent = "0";
  }
}

function renderFarms() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredFarms = farms.filter((farm) => {
    const matchesFilter = activeFilter === "all" || farm.category === activeFilter;
    const matchesSearch =
      !query ||
      farm.name.toLowerCase().includes(query) ||
      farm.city.toLowerCase().includes(query) ||
      farm.specialty.some((item) => item.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  if (!filteredFarms.length) {
    farmsContainer.innerHTML = '<div class="card" style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--muted);">لا توجد مزارع تطابق البحث الحالي.</div>';
    return;
  }

  farmsContainer.innerHTML = filteredFarms
    .map(
      (farm) => `
        <article class="card farm-card">
          <div class="card-visual">${farm.emoji}</div>
          <div class="card-body">
            <div class="card-top">
              <h3>${farm.name}</h3>
              <span class="rating">★ ${farm.rating}</span>
            </div>

            <div class="meta">
              <span>${farm.city}</span>
              <span>${farm.distance}</span>
            </div>

            <div class="tags">
              ${farm.specialty.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>

            <div class="card-footer">
              <strong>${farm.price}</strong>
              <button type="button" data-farm-id="${farm.id}">تفاصيل</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-farm-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-farm-id");
      window.location.href = `detail.html?farm=${id}`;
    });
  });
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.type === activeFilter;
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.farm.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  if (!filteredProducts.length) {
    productsContainer.innerHTML = '<div class="card" style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--muted);">لا توجد منتجات متوفرة حالياً.</div>';
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="card product-card">
          <div class="product-icon">${product.emoji}</div>
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span>${product.farm}</span>
              <span>طازج</span>
            </div>
            <div class="price-row">
              <strong>${product.price}</strong>
              <button type="button" data-product-id="${product.id}">طلب</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-product-id");
      window.location.href = `product.html?product=${id}`;
    });
  });
}

function updateFilterState() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("active", isActive);
  });

  renderFarms();
  renderProducts();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilterState();
  });
});

searchInput.addEventListener("input", () => {
  renderFarms();
  renderProducts();
});

updateCartCount();
renderFarms();
renderProducts();
