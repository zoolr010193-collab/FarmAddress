const CART_KEY = "farmAddressCart";
const cartItemsContainer = document.getElementById("cartItems");
const itemsTotal = document.getElementById("itemsTotal");
const grandTotal = document.getElementById("grandTotal");

const productMap = {
  1: { name: "توت أحمر طازج", emoji: "🍓", price: 50 },
  2: { name: "خيار عضوي", emoji: "🥒", price: 30 },
  3: { name: "قمح مصقول", emoji: "🌾", price: 70 },
  4: { name: "حليب طازج", emoji: "🥛", price: 45 },
  5: { name: "موز ناضج", emoji: "🍌", price: 35 },
  6: { name: "طماطم عضوية", emoji: "🍅", price: 40 },
  7: { name: "شعير طازج", emoji: "🌾", price: 60 },
  8: { name: "جبن منزلي", emoji: "🧀", price: 75 },
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  itemsTotal.textContent = `${subtotal} جنيه`;
  grandTotal.textContent = `${subtotal} جنيه`;
}

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">السلة فارغة حالياً، أضف بعض المنتجات للاستمرار.</div>';
    itemsTotal.textContent = "0 جنيه";
    grandTotal.textContent = "0 جنيه";
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => {
        const product = productMap[item.id] || { name: "منتج", emoji: "🛒", price: 0 };
        const itemTotal = item.price * item.quantity;

        return `
          <article class="cart-item">
            <div class="cart-item-emoji">${product.emoji}</div>
            <div>
              <h3>${product.name}</h3>
              <div class="item-meta">${item.quantity} قطعة</div>
              <div class="item-controls">
                <button type="button" data-action="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase" data-id="${item.id}">+</button>
              </div>
            </div>
            <div class="price-box">
              <strong>${itemTotal} جنيه</strong>
              <button class="button secondary" type="button" data-action="remove" data-id="${item.id}">حذف</button>
            </div>
          </article>
        `;
      }
    )
    .join("");

  updateTotals(cart);

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const id = Number(button.getAttribute("data-id"));
      const cart = getCart();
      const target = cart.find((item) => item.id === id);

      if (!target) return;

      if (action === "increase") target.quantity += 1;
      if (action === "decrease") target.quantity = Math.max(0, target.quantity - 1);
      if (action === "remove") {
        const index = cart.findIndex((item) => item.id === id);
        if (index >= 0) cart.splice(index, 1);
      }

      const filtered = cart.filter((item) => item.quantity > 0);
      saveCart(filtered);
      renderCart();
    });
  });
}

renderCart();
