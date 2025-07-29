// ✅ Déclaration globale unique
window.deferredPrompt = window.deferredPrompt || null;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (!installBtn) {
    console.warn("⚠️ Bouton #installBtn non trouvé.");
    return;
  }

  // ✅ Toujours visible
  installBtn.style.display = 'block';

  // ✅ Gestion de l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log("📦 beforeinstallprompt capturé");

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
      } else {
        alert("⚠️ Installation non disponible pour ce navigateur.");
      }
    });
  });

  // ✅ Fallback pour iOS, PC
  installBtn.addEventListener('click', () => {
    if (!window.deferredPrompt) {
      alert("ℹ️ Pour installer l'app, utilisez le menu du navigateur (ou option 'Ajouter à l'écran d'accueil').");
    }
  });
});

// ✅ Enregistrement du service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then((reg) => console.log("✅ Service Worker enregistré", reg))
    .catch((err) => console.warn("❌ Échec Service Worker", err));
}
