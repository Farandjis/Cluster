#!/bin/bash

# Arrêt des conteneurs Docker
echo "Arrêt des conteneurs Docker en cours..."
sudo docker compose down
if [ $? -ne 0 ]; then
    echo "Échec de la commande 'docker compose down'."
    exit 1
fi

# Redémarrage des conteneurs Docker avec reconstruction
echo "Redémarrage des conteneurs Docker avec reconstruction..."
sudo docker compose -p "site" up --build -d
if [ $? -ne 0 ]; then
    echo "Échec de la commande 'docker compose up --build'."
    exit 1
fi

echo "Les conteneurs ont été redémarrés avec succès !"

# Attente d'une action utilisateur
while true; do
    echo "Appuyez sur 'l' pour afficher les logs du conteneur 'site' ou 'q' pour quitter."
    read -n 1 -s key
    if [ "$key" = "l" ]; then
        echo -e "\nAffichage des logs du conteneur 'site' (Ctrl+C pour arrêter)..."
        sudo docker logs site-nodejs-1
    elif [ "$key" = "q" ]; then
        echo -e "\nProgramme terminé."
        break
    else
        echo -e "\nEntrée invalide. Essayez à nouveau."
    fi
done
