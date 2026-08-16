const PRODUCT_KEY = "farmAddressFarmerProducts";
const FARMER_ORDERS_KEY = "farmAddressFarmerOrders";
const LOGIN_KEY = "farmAddressLoggedIn";
const FARMER_NAME_KEY = "farmAddressFarmerName";
const FARM_PROFILE_KEY = "farmAddressFarmProfile";

if (localStorage.getItem(LOGIN_KEY) !== "true") {
  window.location.href = "login.html";
}

const productForm = document.getElementById("productForm");
const farmerGreeting = document.getElementById("farmerGreeting");
const logoutBtn = document.getElementById("logoutBtn");

const defaultProfile = {
  farmName: localStorage.getItem(FARMER_NAME_KEY) || "مزرعة النخيل الخضراء",
  city: "الخرطوم",
  phone: "0500000000",
  description: "مزرعة تنتج منتجات طازجة مباشرة من الحقل.",
  logo: "🌿",
};

if (farmerGreeting) {
  const farmerName = localStorage.getItem(FARMER_NAME_KEY) || defaultProfile.farmName;
  farmerGreeting.textContent = `مرحباً ${farmerName}`;
}

if (!localStorage.getItem(FARM_PROFILE_KEY)) {
  localStorage.setItem(FARM_PROFILE_KEY, JSON.stringify(defaultProfile));
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(FARMER_NAME_KEY);
    window.location.href = "login.html";
  });
}
const farmerProducts = document.getElementById("farmerProducts");
const farmerOrders = document.getElementById("farmerOrders");
const productsCount = document.getElementById("productsCount");
const ordersCount = document.getElementById("ordersCount");
const todayRevenue = document.getElementById("todayRevenue");

function getStoredProducts() {
  try {
    return JSON.parse(localStorage.getItem(PRODUCT_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function getStoredOrders() {
  try {
    return JSON.parse(localStorage.getItem(FARMER_ORDERS_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function renderProducts() {
  const products = getStoredProducts();
  productsCount.textContent = products.length;

  if (!products.length) {
    farmerProducts.innerHTML = '<div class="empty-message">لا توجد منتجات مضافة حتى الآن.</div>';
    return;
  }

  farmerProducts.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>المنتج</th>
          <th>الفئة</th>
          <th>السعر</th>
          <th>الوصف</th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map(
            (product) => `
              <tr>
                <td>${product.emoji} ${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price} جنيه</td>
                <td>${product.description || "-"}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderOrders() {
  const orders = getStoredOrders();
  ordersCount.textContent = orders.length;

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  todayRevenue.textContent = `${revenue} جنيه`;

  if (!orders.length) {
    farmerOrders.innerHTML = '<div class="empty-message">لا توجد طلبات واردة حتى الآن.</div>';
    return;
  }

  farmerOrders.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>الطلب</th>
          <th>العميل</th>
          <th>المحتوى</th>
          <th>الإجمالي</th>
          <th>الحالة</th>
          <th>تحديث</th>
        </tr>
      </thead>
      <tbody>
        ${orders
          .map(
            (order) => `
              <tr>
                <td>#${order.id}</td>
                <td>${order.customer}<br><small>${order.phone}</small></td>
                <td>${order.items.map((item) => `${item.name} × ${item.quantity}`).join("<br>")}</td>
                <td>${order.total} جنيه</td>
                <td>
                  <span class="status-pill ${order.status === "تم التوصيل" ? "completed" : "pending"}">${order.status}</span>
                </td>
                <td>
                  <button class="small-btn" data-order-id="${order.id}" data-action="toggle-status">
                    ${order.status === "تم التوصيل" ? "إعادة تعيين" : "تأكيد الاستلام"}
                  </button>
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.querySelectorAll("[data-action='toggle-status']").forEach((button) => {
    button.addEventListener("click", () => {
      const orderId = Number(button.getAttribute("data-order-id"));
      const orders = getStoredOrders();
      const target = orders.find((order) => Number(order.id) === orderId);
      if (!target) return;
      target.status = target.status === "تم التوصيل" ? "قيد التنفيذ" : "تم التوصيل";
      localStorage.setItem(FARMER_ORDERS_KEY, JSON.stringify(orders));
      renderOrders();
    });
  });
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(productForm);
  const product = {
    id: Date.now(),
    name: formData.get("name").toString().trim(),
    category: formData.get("category").toString(),
    price: Number(formData.get("price") || 0),
    emoji: formData.get("emoji").toString().trim() || "🌿",
    description: formData.get("description").toString().trim(),
  };

  if (!product.name || !product.category || !product.price) {
    return;
  }

  const products = getStoredProducts();
  products.unshift(product);
  saveProducts(products);
  productForm.reset();
  renderProducts();
});

renderProducts();
renderOrders();
