// ✅ Déclaration globale unique
window.deferredPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (!installBtn) {
    console.warn("⚠️ Bouton #installBtn non trouvé.");
    return;
  }

  // ✅ Cacher par défaut
  installBtn.style.display = 'none';

  // ✅ Gestion de l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log("📦 beforeinstallprompt capturé");

    // ✅ Afficher le bouton si installation possible
    installBtn.style.display = 'block';

    // ✅ Action lors du clic
    installBtn.addEventListener('click', () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log("✅ L'utilisateur a accepté l'installation");
          } else {
            console.log("❌ L'utilisateur a refusé");
          }
          window.deferredPrompt = null;
        });
      }
    });
  });

  // ✅ Fallback manuel pour iOS ou non supporté
  installBtn.addEventListener('click', () => {
    if (!window.deferredPrompt) {
      alert("ℹ️ Pour installer l'app, utilisez le menu du navigateur (Ajouter à l'écran d'accueil).");
    }
  });

  // ✅ Cacher le bouton si déjà installée
  window.addEventListener('appinstalled', () => {
    console.log("📲 App installée avec succès");
    installBtn.style.display = 'none';
  });
});

// ✅ Enregistrement du service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then((reg) => console.log("✅ Service Worker enregistré", reg))
    .catch((err) => console.warn("❌ Échec Service Worker", err));
}
