const LOGIN_KEY = "farmAddressLoggedIn";
const FARM_PROFILE_KEY = "farmAddressFarmProfile";
const FARMER_NAME_KEY = "farmAddressFarmerName";

if (localStorage.getItem(LOGIN_KEY) !== "true") {
  window.location.href = "login.html";
}

const settingsForm = document.getElementById("settingsForm");
const settingsMessage = document.getElementById("settingsMessage");
const logoutBtn = document.getElementById("logoutBtn");

const profile = JSON.parse(localStorage.getItem(FARM_PROFILE_KEY) || JSON.stringify({
  farmName: "مزرعة النخيل الخضراء",
  city: "الخرطوم",
  phone: "0500000000",
  description: "مزرعة تنتج منتجات طازجة مباشرة من الحقل.",
  logo: "🌿",
}));

function populateForm() {
  settingsForm.farmName.value = profile.farmName || "";
  settingsForm.city.value = profile.city || "";
  settingsForm.phone.value = profile.phone || "";
  settingsForm.logo.value = profile.logo || "🌿";
  settingsForm.description.value = profile.description || "";
}

function showMessage(text, type) {
  settingsMessage.textContent = text;
  settingsMessage.className = `settings-message ${type}`;
  settingsMessage.classList.remove("hidden");
}

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const updatedProfile = {
    farmName: settingsForm.farmName.value.trim(),
    city: settingsForm.city.value.trim(),
    phone: settingsForm.phone.value.trim(),
    logo: settingsForm.logo.value.trim() || "🌿",
    description: settingsForm.description.value.trim(),
  };

  localStorage.setItem(FARM_PROFILE_KEY, JSON.stringify(updatedProfile));
  localStorage.setItem(FARMER_NAME_KEY, updatedProfile.farmName);
  showMessage("تم حفظ إعدادات المزرعة بنجاح.", "success");
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(FARMER_NAME_KEY);
    window.location.href = "login.html";
  });
}

populateForm();
