// Firebase Configuration (Mock for now - Ready for real credentials)
// Replace these values with your real Firebase project config when ready
// Get from: Firebase Console → Project Settings → firebaseConfig

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "farmaddress-mock.firebaseapp.com",
    projectId: "farmaddress-mock",
    storageBucket: "farmaddress-mock.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Database mode: 'local' (localStorage) or 'firebase' (real Firestore)
// Change to 'firebase' once you have real credentials
const DB_MODE = 'local';

// Export configuration
window.firebaseConfig = firebaseConfig;
window.DB_MODE = DB_MODE;
