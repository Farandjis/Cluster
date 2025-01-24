function genererFormulaire(nombreInputs) {
    // Vérification que l'argument est un nombre valide
    if (isNaN(nombreInputs) || nombreInputs <= 0) {
        console.error("Veuillez fournir un nombre valide d'inputs (> 0).");
        return;
    }

    // Création de l'élément formulaire
    const formulaire = document.createElement("form");
    formulaire.id = "form_import";
    formulaire.className = "module";

    // Boucle pour ajouter le nombre d'inputs spécifié
    for (let i = 1; i <= nombreInputs; i++) {
        const label = document.createElement("label");
        label.textContent = `Input ${i}: `;
        label.setAttribute("for", `input-${i}`);

        const input = document.createElement("input");
        input.type = "text";
        input.id = `input-${i}`;
        input.name = `input-${i}`;

        // Ajout des éléments au formulaire
        formulaire.appendChild(label);
        formulaire.appendChild(input);
        formulaire.appendChild(document.createElement("br"));
    }

    // Ajout d'un bouton de soumission
    const bouton = document.createElement("button");
    bouton.type = "submit";
    bouton.textContent = "Soumettre";
    formulaire.appendChild(bouton);

    // Insertion du formulaire dans le document
    const container = document.getElementById("section_form_import");
    if (container) {
        container.innerHTML = ""; // Efface le contenu précédent
        container.appendChild(formulaire);
    } else {
        console.error("Aucun élément avec l'id 'section_form' trouvé.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("generate-button");
    if (button) {
        button.addEventListener("click", () => {
            const nombreInputs = parseInt(prompt("Combien d'inputs voulez-vous ?"), 10);
            genererFormulaire(nombreInputs);
        });
    }
});