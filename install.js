// Évite la redéclaration
window.deferredPrompt = window.deferredPrompt || null;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');

  // Toujours visible
  installBtn.style.display = 'block';

  // Écoute l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;

    installBtn.addEventListener('click', () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log("✅ L'utilisateur a installé l'app");
          } else {
            console.log("❌ L'utilisateur a refusé l'installation");
          }
          window.deferredPrompt = null;
        });
      } else {
        alert("⚠️ L'installation n'est pas disponible sur ce navigateur.");
      }
    });
  });

  // Optionnel : forcer action même sans beforeinstallprompt (iOS, Desktop...)
  installBtn.addEventListener('click', () => {
    if (!window.deferredPrompt) {
      alert("ℹ️ Si l'installation n'est pas proposée, utilisez le menu du navigateur pour 'Ajouter à l'écran d'accueil'.");
    }
  });
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log("✅ SW enregistré", reg))
      .catch(err => console.warn("❌ Erreur SW", err));
  }
