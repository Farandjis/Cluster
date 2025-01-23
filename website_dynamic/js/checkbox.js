function setupCheckboxLogic() {
    const sections = document.querySelectorAll('.checkbox-section');

    sections.forEach(section => {
        const checkbox1 = section.querySelector('.checkbox1');
        const checkbox2 = section.querySelector('.checkbox2');

        // Empêcher de cocher la deuxième checkbox si la première n'est pas cochée
        checkbox1.addEventListener('change', function() {
            if (!checkbox1.checked) {
                checkbox2.checked = false; // Décoche la deuxième si la première est décochée
                checkbox2.disabled = true; // Désactive la deuxième checkbox
            } else {
                checkbox2.disabled = false; // Active la deuxième checkbox
            }
        });

        // Désactiver la deuxième checkbox par défaut si la première n'est pas cochée
        if (!checkbox1.checked) {
            checkbox2.disabled = true;
        }
    });
}

// Appel de la fonction lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', setupCheckboxLogic);


function updateCheckboxes(checkbox1State, checkbox2State) {
    const sections = document.querySelectorAll('.checkbox-section');

    sections.forEach(section => {
        const checkbox1 = section.querySelector('.checkbox1');
        const checkbox2 = section.querySelector('.checkbox2');

        // Met à jour l'état du premier checkbox
        checkbox1.checked = checkbox1State;

        // Si le premier checkbox est décoché, force le deuxième à être décoché également
        if (!checkbox1State) {
            checkbox2.checked = false;
            checkbox2.disabled = true; // Désactive la deuxième checkbox
        } else {
            // Met à jour l'état du deuxième checkbox si le premier est coché
            checkbox2.checked = checkbox2State;
            checkbox2.disabled = false; // Active la deuxième checkbox
        }
    });
}