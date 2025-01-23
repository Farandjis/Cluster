// Fonction appelée lors du clic sur un bouton
async function handleButtonhistory(idUser, filename,module) {
    try {
        // Construire l'URL de l'API
        const apiURL = `/get-file/${idUser}/${filename}`;

        // Charger le fichier JSON via l'API
        const response = await fetch(apiURL);

        // Vérifier si le fichier a été chargé avec succès
        if (!response.ok) {
            throw new Error(`Impossible de charger le fichier : ${filename}`);
        }

        // Extraire les données JSON
        const data = await response.json();

        // Afficher les données dans la section dédiée
        displayData(data,module);
    } catch (error) {
        // Gérer les erreurs et afficher un message
        console.error('Erreur :', error);
        document.getElementById("jsonData").textContent = error.message;
    }
}


function getFilteredKeyValuePairs(data, excludeKeys = []) {
    const result = [];

    for (const [key, value] of Object.entries(data)) {
        if (excludeKeys.includes(key)) continue; // Exclure les clés spécifiées

        if (typeof value === "object" && value !== null) {
            // Si la valeur est un objet, appeler récursivement
            const nestedResult = getFilteredKeyValuePairs(value, excludeKeys);
            // Ajout des objets imbriqués sans virgules, mais avec une gestion propre de l'affichage
            result.push(`<p>${key}: { ${nestedResult.join("")} }</p>`);
        } else {
            // Ajouter les paires clé/valeur formatées avec <p>
            result.push(`<p>${key}: ${value}</p>`);
        }
    }

    return result;
}

// Fonction pour afficher les données dans les divs
function displayData(data,module){
    if (typeof data !== 'object') {
        console.error("Les données reçues ne sont pas un objet JSON.");
        return;
    }

    console.log(data);
    console.log(module);
    console.log(module === 'rainbow-text');

    // Appel de la fonction pour afficher une pop-up (si nécessaire)
    togglePopupFile();

    // Afficher le contenu de 'parameters' sous forme de texte
    const dataDisplay = document.getElementById("attribut_File");
    if (data.parameters) {
        const parametersText = getFilteredKeyValuePairs(data.parameters);
        // Joindre correctement les éléments sans virgules
        dataDisplay.innerHTML = `${parametersText.join("")}`;
    } else {
        dataDisplay.innerHTML = "<p>Aucune information dans 'parameters'.<p>";
    }

    // Liste des clés à exclure
    const excludeKeys = ["parameters", "massage"];
    const dataDisplay2 = document.getElementById("data_File");
    
    if (module === 'rainbow-text'){
        let result = '';
        for (let i = 0; i < data.full_text.length; i++) {
            let {class_number, part_text} = data.full_text[i];
            result += `<span class=raspn${class_number}>${part_text}</span>`;
        }

        const output_html2 = `
            <p>Number of Nodes: ${data.nodes}</p>
            <div class="distributed-text">
                ${result}
            </div>
        `;
        dataDisplay2.innerHTML = output_html2
    } else {
    const filteredText = getFilteredKeyValuePairs(data, excludeKeys);
    // Joindre correctement les éléments sans virgules
    dataDisplay2.innerHTML = filteredText.join(""); // Affichage formaté des clés et valeurs
    }
    
}

async function télechargementButton(idUser, filename) {
    const apiURL = `/get-file/${idUser}/${filename}`;

        // Charger le fichier JSON via l'API
    const response = await fetch(apiURL);

        // Vérifier si le fichier a été chargé avec succès
    if (!response.ok) {
        throw new Error(`Impossible de charger le fichier : ${filename}`);
    }

        // Extraire les données JSON
    const data = await response.json();

    // Convertir l'objet JavaScript en chaîne JSON
    const jsonData = JSON.stringify(data, null, 2); // `null, 2` pour bien formater le JSON

    // Créer un Blob à partir de la chaîne JSON
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Créer un URL pour le Blob
    const url = URL.createObjectURL(blob);

    // Créer un élément <a> pour permettre le téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json'; // Nom du fichier à télécharger

    // Simuler un clic sur le lien pour démarrer le téléchargement
    link.click();

    // Libérer l'URL du Blob
    URL.revokeObjectURL(url);
}

async function confirmDelete(filename,id_user) {
    // Afficher une boîte de confirmation
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer le fichier ?`);
    
    if (confirmation) {
        window.location.href = `/DeleteFile/"${id_user}"/"${filename}"`;
    }
}