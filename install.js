window.deferredPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (!installBtn) return;

  // Masquer par défaut
  installBtn.style.display = 'none';

  // Détection installation déjà faite
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    console.log("✅ Déjà installé");
    installBtn.style.display = 'none';
    return;
  }

  // Capture de l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
          console.log("Résultat:", choiceResult.outcome);
          window.deferredPrompt = null;
        });
      }
    });
  });

  // Si déjà installé pendant session
  window.addEventListener('appinstalled', () => {
    console.log("📲 App installée avec succès");
    installBtn.style.display = 'none';
  });

  // Fallback : clique sur le bouton même sans prompt
  installBtn.addEventListener('click', () => {
    if (!window.deferredPrompt) {
      alert("ℹ️ Utilisez le menu du navigateur pour ajouter à l'écran d'accueil.");
    }
  });
});
