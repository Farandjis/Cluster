Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Cluster installation

<br><br>
This document...<br>
We were helped by : WordReference, DeepL, ChatGPT.
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


---

## <a name="p2"></a> II - Installations

- ### <a name="p2a"></a> a) Docker
    **Sources :**
    - https://www.raspberrypi-france.fr/installer-docker-sur-raspberry-pi/<br>

    <br><br>
    **Steps to install Docker **<br>
    1. System updates and upgrades : `sudo apt-get update && sudo apt-get upgrade`<br>
    2. Get the docker installation script to install it : `curl -fsSL https://get.docker.com -o get-docker.sh`
    3. Run the script : `sudo sh get-docker.sh`

    We can verify that Docker was installed well with `sudo systemctl ` and `sudo docker version`.<b>
    <br><br>
    - ### <a name="p2b"></a> b) Images and containers Docker