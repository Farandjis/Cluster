# Utilise l'image officielle Node.js
FROM node:latest

#Crée le répertoire de l'application
WORKDIR Paralix:/app

#Copie le fichier package.json et package-l...
COPY Paralix/package*.json ./

#Installe les dépendances
# RUN rm -rf node_modules
RUN npm install
#Copie le reste du code de l'application
COPY Paralix/ .

# Expose le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
