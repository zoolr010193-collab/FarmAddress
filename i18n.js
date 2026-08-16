// Internationalization (i18n) System
// Supports Arabic (ar) and English (en)

const translations = {
    ar: {
        // Navigation & Header
        "nav.farms": "المزارع",
        "nav.products": "المنتجات",
        "nav.about": "من نحن",
        "nav.cart": "السلة",
        "nav.farmer_panel": "لوحة المزارع",
        "nav.settings": "الإعدادات",
        "nav.logout": "تسجيل الخروج",
        
        // Hero Section
        "hero.eyebrow": "من المزرعة إلى بابك",
        "hero.title": "اكتشف مزارعك المفضلة مباشرةً",
        "hero.description": "ابحث عن منتجك المفضل من المزارعين المحليين، استعرض الأسعار، واحجز الطلب بسهولة من خلال منصة موثوقة ومباشرة.",
        "hero.browse": "تصفح المزارع",
        "hero.products": "شاهد المنتجات",
        
        // Sections
        "section.farms": "استعرض المزارع",
        "section.products": "المنتجات الشهيرة",
        "section.about": "من نحن",
        
        // Farm & Product Cards
        "card.location": "الموقع",
        "card.price": "السعر",
        "card.view_details": "عرض التفاصيل",
        "card.add_to_cart": "أضف إلى السلة",
        "card.in_stock": "متوفر",
        "card.out_of_stock": "غير متوفر",
        
        // Cart Page
        "cart.title": "سلة المشتريات",
        "cart.empty": "سلتك فارغة",
        "cart.item": "عنصر",
        "cart.items": "عناصر",
        "cart.quantity": "الكمية",
        "cart.remove": "حذف",
        "cart.total": "الإجمالي",
        "cart.checkout": "إتمام الشراء",
        "cart.continue_shopping": "متابعة التسوق",
        
        // Checkout Page
        "checkout.title": "إتمام الطلب",
        "checkout.customer_info": "معلومات المشتري",
        "checkout.name": "الاسم",
        "checkout.email": "البريد الإلكتروني",
        "checkout.phone": "رقم الهاتف",
        "checkout.address": "العنوان",
        "checkout.order_summary": "ملخص الطلب",
        "checkout.place_order": "تأكيد الطلب",
        "checkout.success": "تم الطلب بنجاح!",
        
        // Orders Page
        "orders.title": "سجل الطلبات",
        "orders.no_orders": "لا توجد طلبات بعد",
        "orders.order_id": "رقم الطلب",
        "orders.date": "التاريخ",
        "orders.total": "الإجمالي",
        "orders.status": "الحالة",
        "orders.view": "عرض التفاصيل",
        
        // Farmer Panel
        "farmer.title": "لوحة المزارع",
        "farmer.welcome": "أهلاً بك",
        "farmer.add_product": "إضافة منتج",
        "farmer.my_products": "منتجاتي",
        "farmer.incoming_orders": "الطلبات الواردة",
        "farmer.product_name": "اسم المنتج",
        "farmer.product_price": "السعر",
        "farmer.product_description": "الوصف",
        "farmer.submit": "إضافة",
        "farmer.logout": "تسجيل الخروج",
        "farmer.no_products": "لم تضف منتجات بعد",
        "farmer.no_orders": "لا توجد طلبات بعد",
        "farmer.mark_completed": "تحديد كمنجز",
        
        // Login Page
        "login.title": "تسجيل دخول المزارع",
        "login.username": "اسم المستخدم",
        "login.password": "كلمة المرور",
        "login.login": "دخول",
        "login.demo": "تجربة: admin / farm123",
        "login.invalid": "بيانات دخول غير صحيحة",
        
        // Settings Page
        "settings.title": "إعدادات المزرعة",
        "settings.farm_name": "اسم المزرعة",
        "settings.city": "المدينة",
        "settings.phone": "رقم الهاتف",
        "settings.logo": "رابط الشعار",
        "settings.description": "وصف المزرعة",
        "settings.save": "حفظ التغييرات",
        "settings.success": "تم الحفظ بنجاح",
        
        // Detail Page
        "detail.farm_info": "معلومات المزرعة",
        "detail.phone": "الهاتف",
        "detail.city": "المدينة",
        "detail.description": "الوصف",
        "detail.products": "منتجات المزرعة",
        
        // Footer
        "footer.about": "من نحن",
        "footer.contact": "اتصل بنا",
        "footer.privacy": "سياسة الخصوصية",
        "footer.terms": "الشروط والأحكام",
        "footer.rights": "جميع الحقوق محفوظة",
        
        // Common
        "common.search": "بحث",
        "common.filter": "تصفية",
        "common.edit": "تعديل",
        "common.delete": "حذف",
        "common.save": "حفظ",
        "common.cancel": "إلغاء",
        "common.back": "رجوع",
        "common.next": "التالي",
        "common.language": "اللغة",
        "common.arabic": "العربية",
        "common.english": "English",
    },
    
    en: {
        // Navigation & Header
        "nav.farms": "Farms",
        "nav.products": "Products",
        "nav.about": "About",
        "nav.cart": "Cart",
        "nav.farmer_panel": "Farmer Panel",
        "nav.settings": "Settings",
        "nav.logout": "Logout",
        
        // Hero Section
        "hero.eyebrow": "From Farm to Your Door",
        "hero.title": "Discover Your Favorite Farms Directly",
        "hero.description": "Search for your favorite products from local farmers, browse prices, and place your order easily through a trusted and direct platform.",
        "hero.browse": "Browse Farms",
        "hero.products": "View Products",
        
        // Sections
        "section.farms": "Browse Farms",
        "section.products": "Popular Products",
        "section.about": "About Us",
        
        // Farm & Product Cards
        "card.location": "Location",
        "card.price": "Price",
        "card.view_details": "View Details",
        "card.add_to_cart": "Add to Cart",
        "card.in_stock": "In Stock",
        "card.out_of_stock": "Out of Stock",
        
        // Cart Page
        "cart.title": "Shopping Cart",
        "cart.empty": "Your cart is empty",
        "cart.item": "Item",
        "cart.items": "Items",
        "cart.quantity": "Quantity",
        "cart.remove": "Remove",
        "cart.total": "Total",
        "cart.checkout": "Proceed to Checkout",
        "cart.continue_shopping": "Continue Shopping",
        
        // Checkout Page
        "checkout.title": "Complete Order",
        "checkout.customer_info": "Customer Information",
        "checkout.name": "Name",
        "checkout.email": "Email",
        "checkout.phone": "Phone",
        "checkout.address": "Address",
        "checkout.order_summary": "Order Summary",
        "checkout.place_order": "Place Order",
        "checkout.success": "Order placed successfully!",
        
        // Orders Page
        "orders.title": "Order History",
        "orders.no_orders": "No orders yet",
        "orders.order_id": "Order ID",
        "orders.date": "Date",
        "orders.total": "Total",
        "orders.status": "Status",
        "orders.view": "View Details",
        
        // Farmer Panel
        "farmer.title": "Farmer Dashboard",
        "farmer.welcome": "Welcome",
        "farmer.add_product": "Add Product",
        "farmer.my_products": "My Products",
        "farmer.incoming_orders": "Incoming Orders",
        "farmer.product_name": "Product Name",
        "farmer.product_price": "Price",
        "farmer.product_description": "Description",
        "farmer.submit": "Add",
        "farmer.logout": "Logout",
        "farmer.no_products": "No products added yet",
        "farmer.no_orders": "No orders yet",
        "farmer.mark_completed": "Mark as Completed",
        
        // Login Page
        "login.title": "Farmer Login",
        "login.username": "Username",
        "login.password": "Password",
        "login.login": "Login",
        "login.demo": "Demo: admin / farm123",
        "login.invalid": "Invalid credentials",
        
        // Settings Page
        "settings.title": "Farm Settings",
        "settings.farm_name": "Farm Name",
        "settings.city": "City",
        "settings.phone": "Phone",
        "settings.logo": "Logo URL",
        "settings.description": "Farm Description",
        "settings.save": "Save Changes",
        "settings.success": "Saved successfully",
        
        // Detail Page
        "detail.farm_info": "Farm Information",
        "detail.phone": "Phone",
        "detail.city": "City",
        "detail.description": "Description",
        "detail.products": "Farm Products",
        
        // Footer
        "footer.about": "About",
        "footer.contact": "Contact Us",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms & Conditions",
        "footer.rights": "All rights reserved",
        
        // Common
        "common.search": "Search",
        "common.filter": "Filter",
        "common.edit": "Edit",
        "common.delete": "Delete",
        "common.save": "Save",
        "common.cancel": "Cancel",
        "common.back": "Back",
        "common.next": "Next",
        "common.language": "Language",
        "common.arabic": "العربية",
        "common.english": "English",
    }
};

// Language management
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('farmAddress_language') || 'ar';
        this.apply();
    }

    // Get translated string
    t(key, defaultText = key) {
        return translations[this.currentLanguage]?.[key] || translations['ar']?.[key] || defaultText;
    }

    // Set language
    setLanguage(lang) {
        if (lang === 'ar' || lang === 'en') {
            this.currentLanguage = lang;
            localStorage.setItem('farmAddress_language', lang);
            this.apply();
            this.updateDOM();
            return true;
        }
        return false;
    }

    // Get current language
    getLanguage() {
        return this.currentLanguage;
    }

    // Apply language direction and attributes
    apply() {
        const html = document.documentElement;
        const isArabic = this.currentLanguage === 'ar';
        
        html.lang = this.currentLanguage;
        html.dir = isArabic ? 'rtl' : 'ltr';
        html.setAttribute('data-lang', this.currentLanguage);
        
        // Add to body for CSS targeting
        document.body?.setAttribute('data-lang', this.currentLanguage);
    }

    // Update all text content in DOM
    updateDOM() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Update title
        if (document.querySelector('[data-i18n-title]')) {
            const key = document.querySelector('[data-i18n-title]').getAttribute('data-i18n-title');
            document.title = this.t(key) + ' | FarmAddress';
        }

        // Reapply direction
        this.apply();
    }

    // Toggle between Arabic and English
    toggleLanguage() {
        const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
        this.setLanguage(newLang);
        return newLang;
    }
}

// Create global i18n instance
window.i18n = new I18n();

// Helper function for use in scripts
function t(key, defaultText) {
    return window.i18n.t(key, defaultText);
}
