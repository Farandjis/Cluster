Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS, Lucas DA SILVA FERREIRA<br>
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
    - [**c) Website Test**](#p2c)
    - [**d) Integration and Testing of Fail2Ban**](#p2d)
    - [**d) MariaDB Docker with NodeJS Docker test**](#p2e)

- ### [III – Use and maintenance](#p3)
    - [**a) Docker instantiation**](#p3a)
    - [**b) Tools box**](#p3b)
      - **How to Enter a Docker Container**
      - **How to Check the Status of the Virtual Network (Bridge)**
      - **How to Check the Status of Services**
      - **How to Verify Port Sharing between Docker NodeJS and RPi4 on Port 3000**
      - **Prepare for Questions That our client May Have About Our System**

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


 
- ### <a name="p2c"></a> c) Website Test

  Wait for the next deliverable


- ### <a name="p2d"></a> d) Integration and Testing of Fail2Ban

  **1. Objective**

    The aim of this section is to describe the implementation and effectiveness of Fail2Ban, a security tool used to prevent brute force attacks by monitoring server logs for suspicious activity and temporarily banning IP addresses that display malicious behavior.

  **2. Configuration**

    Fail2Ban was installed and configured to monitor the MariaDB and Node.js Docker containers for unauthorized access attempts. The configuration involved setting up jail rules specifically for the Docker containers to ensure that any anomalous login attempts would trigger IP banning.

    ```bash
    sudo apt-get install fail2ban
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    ```

    The following settings were applied in the `jail.local` file to customize the Fail2Ban behavior:

    ```ini
    [DEFAULT]
    bantime = 3600
    findtime = 600
    maxretry = 3

    [mariadb-docker]
    enabled = true
    port = 3306
    filter = mariadb
    logpath = /var/log/docker/mariadb.log
    maxretry = 5
    bantime = 600
    ```

  **3. Testing Methodology**

    Testing involved simulating unauthorized access attempts to both MariaDB and the Node.js application. Scripts were used to automate login attempts from various IP addresses with incorrect credentials.

  **4. Results**

    Fail2Ban successfully detected and banned IP addresses that exceeded the maximum number of failed login attempts. The tool was effective in reducing the risk of brute-force attacks on both MariaDB and the Node.js application by blocking malicious traffic for the specified ban time.

    Logs from Fail2Ban provided insight into the banned IP addresses and the trigger that led to their banning, verifying that Fail2Ban was actively monitoring and responding to security threats as expected.


- ### <a name="p2e"></a> e) MariaDB Docker with NodeJS Docker Test

  **1. Objective**

    The purpose of this section is to document the procedures and outcomes of SQL SELECT query testing between a Node.js application and a MariaDB database, both deployed within Docker containers. This testing was essential to validate the interaction and data retrieval capabilities of our system.

  **2. Test Configuration**

    The testing environment was set up using Docker, where both Node.js and MariaDB were hosted in separate containers on the same network bridge. This setup aimed to mimic a production-like environment to ensure accurate results.

    - **Node.js Container**: Ran the application server with environment variables configured for database connections.
    - **MariaDB Container**: Utilized an image optimized for the Raspberry Pi architecture (`tobi312/rpi-mariadb:10.6-alpine`) to host the database.

  **3. Test Execution**

    The Node.js application was programmed to perform SQL SELECT operations to fetch data from the MariaDB database. Below is a sample route implemented in the application for these tests:

    ```javascript
    app.get('/fetch-users', (req, res) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database query failed" });
            }
            res.json(results);
        });
    });
    ```

    This route was accessed using a simple HTTP GET request, which triggered the SELECT query to retrieve all records from the 'users' table in the MariaDB database.

  **4. Results and Observations**

  The tests were successful, demonstrating that:
  - The Node.js application could establish a connection with the MariaDB container.
  - SQL SELECT queries executed correctly and retrieved expected data, confirming the integrity and responsiveness of the database interactions.

  Logs and system monitoring tools were used to observe the transactions and ensure no unwanted behaviors occurred during the queries.


## <a name="p3"></a> III - Use and Maintenance

In this section, we outline the procedures for regular operation and maintenance tasks essential for the proper functioning of the Docker-hosted Node.js and MariaDB services. This guide serves as a practical reference for routine checks and administrative tasks.

- ### <a name="p3a"></a> a) Docker Instantiation

  **Starting and Stopping Containers:**
  To manage Docker containers efficiently, use the following commands:
  - **Start Containers:** `docker start [container_name]`
  - **Stop Containers:** `docker stop [container_name]`

  **Automated Container Management:**
  Ensure containers are set to restart automatically upon failure or system reboot:
  ```bash
  docker update --restart unless-stopped [container_name]
  ```

- ### <a name="p3b"></a> b) Tools Box

  This toolbox section provides a collection of essential commands and checks for managing Docker environments effectively.

  - **Entering a Docker Container:**
    To access the interactive shell of a running Docker container:
    ```bash
    docker exec -it [container_name] /bin/bash
    ```

  - **Checking Virtual Network Status (Bridge):**
    Review the status and configuration of Docker's virtual network:
    ```bash
    docker network inspect [network_name]
    ```

  - **Checking Service Status:**
    Monitor the operational status of Docker services:
    ```bash
    docker service ls
    ```

  - **Verifying Port Sharing between Node.js Docker and RPi4:**
    Confirm the correct mapping and sharing of ports, particularly for services exposed to the host:
    ```bash
    docker port [container_name]
    ```

  - **Questions Anticipated from M. Hoguin:**
    Prepare responses for potential queries regarding system architecture, data security, and operational efficiency. Include logs, configuration files, and system metrics to support the responses.

- ### Regular Maintenance Checks

  - **Update and Upgrade Docker Images:**
    Regularly check for updates to the Docker images used:
    ```bash
    docker pull [image_name]
    docker-compose up -d --build
    ```

  - **Backup and Data Recovery:**
    Implement routine backups of the MariaDB database to ensure data integrity and facilitate quick recovery in case of data loss:
    ```bash
    docker exec [mariadb_container_name] /usr/bin/mysqldump -u [user] --password=[password] [database_name] > backup.sql
    ```

  - **Log Monitoring:**
    Regular review of Docker and application logs to identify and respond to potential issues:
    ```bash
    docker logs [container_name]
    ```

  - **Security Audits:**
    Conduct periodic security checks using tools like Fail2Ban to ensure no unauthorized access attempts succeed.
