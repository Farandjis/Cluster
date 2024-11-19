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
  - [**a) Dockerfile**](#p4a)
  - [**b) Dockercompose**](#p4b)
  - [**b) package**](#p4c)

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
  <br>
  <br>
  **3. Lauching NodeJS with MariaDB container**<br>
    # à corriger
  All files must be installed (see part 4 on appendices).
