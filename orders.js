const ORDERS_KEY = "farmAddressOrders";
const ordersList = document.getElementById("ordersList");

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function renderOrders() {
  const orders = getOrders();

  if (!orders.length) {
    ordersList.innerHTML = '<div class="empty-orders">لا توجد طلبات سابقة. أضف بعض المنتجات وقم بإتمام الطلب.</div>';
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card">
          <div class="order-top">
            <div>
              <strong>الطلب #${order.id}</strong>
              <div style="color: var(--muted); margin-top: 6px;">${order.date}</div>
            </div>
            <span class="order-status">${order.status}</span>
          </div>

          <ul class="order-items">
            ${order.items
              .map(
                (item) => `
                  <li>
                    <span>${item.name} × ${item.quantity}</span>
                    <span>${Number(item.price || 0) * Number(item.quantity || 0)} جنيه</span>
                  </li>
                `
              )
              .join("")}
          </ul>

          <div class="order-total">الإجمالي: ${order.total} جنيه</div>
        </article>
      `
    )
    .join("");
}

renderOrders();
