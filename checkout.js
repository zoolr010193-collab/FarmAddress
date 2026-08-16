const CART_KEY = "farmAddressCart";
const ORDERS_KEY = "farmAddressOrders";
const FARMER_ORDERS_KEY = "farmAddressFarmerOrders";

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function renderCheckout() {
  const cart = getCart();

  if (!cart.length) {
    checkoutItems.innerHTML = '<div class="empty-cart">السلة فارغة، أضف منتجات قبل إتمام الطلب.</div>';
    checkoutTotal.textContent = "0 جنيه";
    return;
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
        <div class="checkout-item">
          <span>${item.name} × ${item.quantity}</span>
          <strong>${Number(item.price || 0) * Number(item.quantity || 0)} جنيه</strong>
        </div>
      `
    )
    .join("");

  checkoutTotal.textContent = `${total} جنيه`;
}

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cart = getCart();
  if (!cart.length) return;

  const formData = new FormData(checkoutForm);
  const order = {
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    customer: formData.get("fullName"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    address: formData.get("address"),
    paymentMethod: formData.get("paymentMethod"),
    items: cart,
    total: cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    status: "قيد التنفيذ",
  };

  try {
    const history = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    history.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(history));
  } catch (error) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order]));
  }

  try {
    const farmerHistory = JSON.parse(localStorage.getItem(FARMER_ORDERS_KEY) || "[]");
    farmerHistory.unshift({
      id: order.id,
      customer: order.customer,
      phone: order.phone,
      city: order.city,
      address: order.address,
      paymentMethod: order.paymentMethod,
      items: order.items,
      total: order.total,
      status: "قيد التنفيذ",
      date: order.date,
    });
    localStorage.setItem(FARMER_ORDERS_KEY, JSON.stringify(farmerHistory));
  } catch (error) {
    localStorage.setItem(FARMER_ORDERS_KEY, JSON.stringify([
      {
        id: order.id,
        customer: order.customer,
        phone: order.phone,
        city: order.city,
        address: order.address,
        paymentMethod: order.paymentMethod,
        items: order.items,
        total: order.total,
        status: "قيد التنفيذ",
        date: order.date,
      },
    ]));
  }

  localStorage.removeItem(CART_KEY);
  checkoutForm.reset();
  renderCheckout();

  window.location.href = `orders.html?success=${order.id}`;
});

renderCheckout();
