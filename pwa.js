// PWA Initialization and Setup
// Handles service worker registration and installation prompts

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isAppInstalled = false;
    this.init();
  }

  init() {
    // Register service worker
    this.registerServiceWorker();
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => this.handleBeforeInstallPrompt(e));
    
    // Listen for app install
    window.addEventListener('appinstalled', () => this.handleAppInstalled());
    
    // Check if already installed
    this.checkIfInstalled();
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    
    console.log('[PWA] Manager initialized');
  }

  // Register service worker
  registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.warn('[PWA] Service Workers not supported');
      return;
    }

    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully', registration);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
        
        // Listen for new service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  }

  // Handle beforeinstallprompt event
  handleBeforeInstallPrompt(e) {
    console.log('[PWA] Install prompt available');
    
    // Prevent automatic browser UI
    e.preventDefault();
    
    // Store the event
    this.deferredPrompt = e;
    
    // Show custom install button if element exists
    const installBtn = document.getElementById('pwa-install-button');
    if (installBtn) {
      installBtn.style.display = 'block';
      installBtn.addEventListener('click', () => this.promptInstall());
    }
  }

  // Prompt user to install app
  promptInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted installation');
        this.isAppInstalled = true;
        localStorage.setItem('pwa_installed', 'true');
        this.hideInstallButton();
      } else {
        console.log('[PWA] User declined installation');
      }
      
      this.deferredPrompt = null;
    });
  }

  // Handle app installed
  handleAppInstalled() {
    console.log('[PWA] App installed');
    this.isAppInstalled = true;
    localStorage.setItem('pwa_installed', 'true');
    this.hideInstallButton();
    
    // Show success message
    this.showNotification('✅ App installed successfully!', 'success');
  }

  // Check if app is already installed
  checkIfInstalled() {
    // Check standalone mode (iOS)
    if (window.navigator.standalone === true) {
      this.isAppInstalled = true;
      localStorage.setItem('pwa_installed', 'true');
      console.log('[PWA] App running in standalone mode (iOS)');
    }
    
    // Check localStorage flag
    if (localStorage.getItem('pwa_installed') === 'true') {
      this.isAppInstalled = true;
    }
    
    // Hide install button if installed
    if (this.isAppInstalled) {
      this.hideInstallButton();
    }
  }

  // Hide install button
  hideInstallButton() {
    const installBtn = document.getElementById('pwa-install-button');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  }

  // Show notification for updates
  showUpdateNotification() {
    this.showNotification(
      '🔄 A new version is available! Refresh to update.',
      'info'
    );
  }

  // Show generic notification
  showNotification(message, type = 'info') {
    // Check if notification container exists
    let container = document.getElementById('pwa-notification');
    if (!container) {
      container = document.createElement('div');
      container.id = 'pwa-notification';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 15px 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: sans-serif;
        font-size: 14px;
        border-left: 4px solid;
      `;
      
      if (type === 'success') {
        container.style.borderLeftColor = '#4CAF50';
        container.style.backgroundColor = '#f1f8f4';
      } else if (type === 'info') {
        container.style.borderLeftColor = '#2196F3';
        container.style.backgroundColor = '#f1f5f9';
      }
      
      document.body.appendChild(container);
    }
    
    container.textContent = message;
    container.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      container.style.display = 'none';
    }, 5000);
  }

  // Handle visibility change (app resumed)
  handleVisibilityChange() {
    if (!document.hidden) {
      console.log('[PWA] App resumed');
      // Check if service worker has updates
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update();
        });
      }
    }
  }

  // Get PWA status
  getStatus() {
    return {
      installed: this.isAppInstalled,
      swRegistered: 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null,
      online: navigator.onLine,
      displayMode: this.getDisplayMode()
    };
  }

  // Get display mode (standalone, fullscreen, minimal-ui, browser)
  getDisplayMode() {
    if (window.navigator.standalone === true) return 'standalone (iOS)';
    if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone';
    if (window.matchMedia('(display-mode: fullscreen)').matches) return 'fullscreen';
    if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui';
    return 'browser';
  }

  // Force update check
  checkForUpdates() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
}

// Initialize PWA manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
  });
} else {
  window.pwaManager = new PWAManager();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PWAManager;
}
