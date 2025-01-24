FROM node:latest
WORKDIR /app

RUN apt-get update && apt-get install -y \
    mpich \
    python3-mpi4py

# Copier tout le contenu de Paralix dans /app
COPY ./Paralix/ ./
# COPY ./cluster-prime-master /home/
COPY ./hosts_cluster /home/
COPY ./.ssh /root/.ssh/
RUN chmod 700 /root/.ssh && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 644 /root/.ssh/id_rsa.pub && \
    chmod 600 /root/.ssh/authorized_keys && \
    chmod 644 /root/.ssh/known_hosts


# Installer les dépendances dans /app/node
WORKDIR /app/node
RUN npm install
RUN npm install ejs
#RUN RM -r /app/node/node_modules/date-fns
RUN npm install date-fns
RUN npm install diskusage
RUN npm install du

# Exposer le port 3000
EXPOSE 3000

# Lancer le serveur depuis /app/node
CMD ["node", "/app/node/server.js"]
