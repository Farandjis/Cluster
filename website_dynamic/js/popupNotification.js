let notificationCount = 0;

// Fonction pour ajouter une nouvelle notification
function addNotification(notif_title, notif_message, notif_aboutFiles) {
    // Créer un conteneur pour la notification
    const notification = document.createElement("div");
    notification.classList.add("notification-popup");

    // Ajouter un identifiant unique pour chaque notification
    notificationCount++;
    notification.id = `notification-${notificationCount}`;

    // Contenu HTML de la notification
    notification.innerHTML = `
        <div class="notification-header">
            <span>${notif_title}</span>
            <button class="close-btn" onclick="removeNotification('${notification.id}')">×</button>
        </div>
        <div class="notification-body">
            <div id="notification-body1"><p>${notif_message}</p></div>
            <hr>
            <div id="notification-body2"><p>${notif_aboutFiles}</p></div>
        </div>
    `;

    // Ajouter la notification au conteneur principal
    const container = document.getElementById("notificationContainer");
    container.prepend(notification); // Ajouter en haut

    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        removeNotification(notification.id);
    }, 5000); // 5 secondes
}

// Fonction pour supprimer une notification avec une animation
function removeNotification(id) {
    const notification = document.getElementById(id);
    if (notification) {
        // Ajouter une classe pour l'animation de sortie
        notification.style.animation = "slide-out 0.3s ease-out forwards";

        // Supprimer la notification après la fin de l'animation
        notification.addEventListener("animationend", () => {
            notification.remove();
        });
    }
}