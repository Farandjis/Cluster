Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Cluster installation

<br><br>
This document...<br>
We were helped by : WordReference, DeepL, ChatGPT (mainly to correct spelling and wording errors).
<br>

</div>

<br><br><br><br><br><br><br>

---

## Plan

- ### [I – Presentations](#p1)
    - [**a) Docker**](#p1a)
    - [**b) MariaDB**](#p1b)
    - [**c) NodeJS**](#p1c)
    - [**d) Project tree**](#p1c)
      - [**i) File 1**](#p1ci)
      - [**ii) File 2**](#p1cii)


- ### [II – Installations](#p2)
    - [**a) Docker**](#p2a)
    - [**b) Images and containers Docker**](#p2b)
    - [**c) Website test**](#p2c)
    - [**d) MPI with NodeJS Docker test**](#p2d)
    - [**e) MariaDB Docker with NodeJS Docker test**](#p2e)

- ### [III – Use and maintenance](#p3)
    - [**a) Docker instantiation**](#p3a)
    - [**b) Tools box**](#p3b)
      - Comment rentrer dans un Docker
      - Comment vérifier l'état du réseau virtuel (bridge)
      - Comment vérifier l'état des services
      - Comment vérifier le partage port 3000 Docker NodeJS avec 3000 RPi4
      - Mettre les questions que M Hoguin aura sur notre système

- ### [IV – Appendices](#p4)
  - [**a) Dockerfile (in the directory)**](#p4a)
  - [**b) Dockercompose (in the directory)**](#p4b)
  - [**c) package**](#p4c)

---
## <a name="p1"></a> I - Presentations

- ### <a name="p1a"></a> a) Docker
  **Sources :**
  - https://aws.amazon.com/fr/docker/ <br><br>
    Docker est une plateforme logicielle qui vous permet de concevoir, tester et déployer des applications rapidement. Docker enveloppe les logiciels dans des unités normalisées appelées conteneurs, qui rassemblent tous les éléments nécessaires à leur fonctionnement : bibliothèques, outils système, code et environnement d’exécution. Avec Docker, vous pouvez facilement déployer et dimensionner des applications dans n'importe quel environnement, avec l'assurance que votre code s'exécutera correctement.

- ### <a name="p1b"></a> b) MariaDB
  **Sources :**
    - https://www.lemagit.fr/definition/MariaDB
  <br><br>
  
  MariaDB est un système de gestion de base de données relationnelle (SGBDR) open source qui constitue une solution de remplacement compatible avec la technologie très répandue des bases de données MySQL.
  <br>
  MariaDB repose sur SQL et prend en charge le traitement de données selon le modèle ACID, c'est-à-dire avec garantie d'atomicité, de cohérence, d'isolation et de durabilité des transactions.
  <br>


- ### <a name="p1c"></a> c) NodeJS
  **Sources :**
    - https://makina-corpus.com/front-end/introduction-nodejs
  <br><br>

  Node.js est une plateforme de développement Javascript. Ce n'est pas un serveur, ce n'est pas un framework, c'est juste le langage Javascript avec des bibliothèques permettant de réaliser des actions comme écrire sur la sortie standard, ouvrir/fermer des connections réseau ou encore créer un fichier.
---
## <a name="p2"></a> II - Installations

- ### <a name="p2a"></a> a) Docker
    **Sources :**
    - https://www.raspberrypi-france.fr/installer-docker-sur-raspberry-pi/<br>

    <br><br>
    **Steps to install Docker **<br>
    1. Update and upgrade the system : `sudo apt-get update && sudo apt-get upgrade`<br>
    2. Get the docker installation script : `curl -fsSL https://get.docker.com -o get-docker.sh`
    3. Run the script : `sudo sh get-docker.sh`

    We can verify that Docker was installed successfully with `sudo systemctl ` and `sudo docker version`.<br>
    <br><br>
    - ### <a name="p2b"></a> b) Images and containers Docker
    - 
    **Sources :**
    - https://hub.docker.com/r/tobi312/rpi-mariadb/
    - https://blog.codetitans.pl/post/howto-mariadb-in-docker-on-raspberry-pi/

    For this project, we will use MariaDB and NodeJS images.<br>
    While NodeJS is avaible for the Armhf architecture (the one we installed), MariaDB is not natively avaible.<br>
    So we must use a custom and unofficial MariaDB image for this architecture.<br> 
    <br><br>
    **1. Download and install the NodeJS image** : `sudo docker pull node`<br>
    **2. Download and install the MariaDB image** : `docker pull tobi312/rpi-mariadb`<br>
    <br>
    We can test MariaDB with the followed command (give in the image's installation page):<br>
    `docker run -d --restart unless-stopped --name some-mariadb -v $(pwd)/mariadb:/var/lib/mysql:rw -p 3306:3306 -e MARIADB_ROOT_PASSWORD=my-secret-pw -d tobi312/rpi-mariadb:10.6-alpine`<br>
    <br>
    Descriptions :<br>
  - `-d` : Runs in detached mode, allowing the container to run in the background.<br>
  - `--restart unless-stoped` : Automatically restarts the contener if it's stops unexpectedly (not necessary).<br>
  - `--name some-mariadb` : Specifies the container's name<br>
  - `-v $(pwd)/mariadb:/var/lib/mysql:rw` : Mounts a volume to persist container data.<br>
    - `$(pwd)/mariadb` : path on the host machine<br>
    - `/var/lib/mysql` : path on the container
    - `rw` : Mounts the volume in read-write mode.
    - → The repertory in the container and the host machine are synchronised.
  - `-p 3306:3306` : Sets up port mapping. Port 3306 on the host (left) and container (right) form a single common port
  - `tobi312/rpi-mariadb:10.6-alpine` : Specifies the image and version
    <br>
    Note : Execute this command in /home<br>
  <br><br>

  **3. Lauching NodeJS with MariaDB container**<br>
    # à corriger
  All files must be installed (see part 4 in the appendices).<br>
  <br>
  If we test `docker ps`, we will see that no docker process is running.<br>
  <br>
  To launch NodeJS service with MariaDB, we will generate a new image using the command `sudo docker compose up --build -d`.
  - `--build` : forces the image to be built. Once we are satisfied, we won't need to use this option anymore.<br>
  - `-d` : Runs in detached mode, allowing the container to run in the background.<br><br>
  
  Once completed, if we test `docker ps`, we can see the two processus running. If we test `docker images`, we can see the new image created by the `docker compose up` command (the result is not shown in the screenshot).<br>
  <img src="img\img_installation_node_mariadb_docker\docker_compse_up_with_docker_ps.png" width="800"/><br>
  We can also observe that the host and container port  are mapped to a single common port : `0.0.0:3000->3000/tcp`. This allows us to view the NodeJS page directly on the Pi4 !<br>
<img src="img\img_installation_node_mariadb_docker\website_test.png" width="800"/><br><br>

  **4. Problem during my installation**
  
  - **NodeJS starts but it stops immediately, it restarts in a loop**<br>
    The solution was to add the `app.listen` code, which enables the server to listen to requests continuously. Without this, NodeJS shuts down because it finishes executing the code, and Docker restarts it since the service is required to stay online.<br>
  
  - **express module doesn't settle despite the --build**
