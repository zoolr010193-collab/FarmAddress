const FARMER_CREDENTIALS = {
  username: "admin",
  password: "farm123",
};

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

function showMessage(text, type) {
  loginMessage.textContent = text;
  loginMessage.className = `login-message ${type}`;
  loginMessage.classList.remove("hidden");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === FARMER_CREDENTIALS.username && password === FARMER_CREDENTIALS.password) {
    localStorage.setItem("farmAddressLoggedIn", "true");
    localStorage.setItem("farmAddressFarmerName", username);
    showMessage("تم تسجيل الدخول بنجاح. جاري تحويلك إلى لوحة المزارع...", "success");

    setTimeout(() => {
      window.location.href = "farmer.html";
    }, 700);
    return;
  }

  showMessage("اسم المستخدم أو كلمة المرور غير صحيحة.", "error");
});
