document.addEventListener("DOMContentLoaded", () => {
  const installButton = document.getElementById('install-button');

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installButton.style.display = 'block';
    window.deferredPrompt = event;
  });

  installButton.addEventListener('click', () => {
    const deferredPrompt = window.deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the installation prompt');
          installButton.style.display = 'none';
        }
        window.deferredPrompt = null;
      });
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          if (registration.active) {
            console.log('Service Worker already registered');
            return;
          }
        }

        navigator.serviceWorker.register('/worker.js', {
          scope: "/"
        })
          .then(registration => {
            console.log('Service Worker registration successful with scope:', registration.scope);
          })
          .catch(error => {
            console.log('Service Worker registration failed:', error);
          });
      });
    })
  }
})
