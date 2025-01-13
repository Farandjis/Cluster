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
   Docker is a software platform that allows you to design, test, and deploy applications quickly. Docker packages software into standardized units called containers, which bundle all the necessary components for the application to run: libraries, system tools, code, and runtime environment. With Docker, you can easily deploy and scale applications in any environment, with the assurance that your code will run correctly.

- ### <a name="p1b"></a> b) MariaDB
  **Sources :**
    - https://www.lemagit.fr/definition/MariaDB
  <br><br>
  
 MariaDB is an open-source relational database management system (RDBMS) that serves as a compatible replacement for the widely used MySQL database technology. <br> MariaDB is based on SQL and supports data processing according to the ACID model, which guarantees atomicity, consistency, isolation, and durability of transactions.
<br>

- ### <a name="p1c"></a> c) NodeJS
  **Sources :**
    - https://makina-corpus.com/front-end/introduction-nodejs
  <br><br>
Node.js is a JavaScript development platform. It is neither a server nor a framework; it is simply the JavaScript language with libraries that allow performing actions such as writing to the standard output, opening/closing network connections, or creating a file.
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

## <a name="p4"></a> IV – Appendices

- ### <a name="p4a"></a> a) Dockerfile (in the directory)
  Dockerfiles are crucial for defining the environments of our Docker containers. Below are the Dockerfiles used for setting up the Node.js and MariaDB containers.

  **Node.js Dockerfile:**
  ```Dockerfile
  # Use an official Node runtime as a parent image
  FROM node:14

  # Set the working directory
  WORKDIR /usr/src/app

  # Copy package.json and install dependencies
  COPY package*.json ./
  RUN npm install

  # Bundle app source
  COPY . .

  # Bind to all network interfaces so that it can be mapped to the host OS
  EXPOSE 3000

  CMD ["node", "app.js"]
  ```
  **Explanation:**
  This Dockerfile sets up a Node.js environment, installs dependencies, and prepares the application to run on port 3000.

  **MariaDB Dockerfile:**
  ```Dockerfile
  # Use a specific version of MariaDB optimized for ARM architectures
  FROM tobi312/rpi-mariadb:10.6-alpine

  # Set environment variables
  ENV MARIADB_ROOT_PASSWORD my-secret-pw
  ENV MARIADB_DATABASE exampledb
  ENV MARIADB_USER user
  ENV MARIADB_PASSWORD password

  # Expose port 3306 to allow communication to/from the server
  EXPOSE 3306

  # These commands copy your files into the specified directory in the image
  # and set the default command to execute when creating a new container
  COPY setup.sql /docker-entrypoint-initdb.d/

  CMD ["mysqld"]
  ```
  **Explanation:**
  This Dockerfile configures a MariaDB server with a specified root password and user details, ready for database operations.

- ### <a name="p4b"></a> b) Dockercompose (in the directory)
  The `docker-compose.yml` file simplifies the deployment of multi-container Docker applications. Here's how we set up our containers to work together:

  ```yaml
  version: '3'
  services:
    node-app:
      build: ./node
      ports:
        - "3000:3000"
      links:
        - mariadb
      restart: unless-stopped

    mariadb:
      build: ./mariadb
      environment:
        MARIADB_ROOT_PASSWORD: my-secret-pw
      volumes:
        - db-data:/var/lib/mysql
      ports:
        - "3306:3306"
      restart: unless-stopped

  volumes:
    db-data:
  ```

  **Explanation:**
  This file defines two services: `node-app` (our Node.js application) and `mariadb` (our database server). It sets up port mapping, volume management for data persistence, and ensures that both containers restart unless manually stopped.

- ### <a name="p4c"></a> c) package
  The `package.json` file specifies the Node.js project’s dependencies, scripts, and version information.

  ```json
  {
    "name": "cluster-project",
    "version": "1.0.0",
    "description": "A simple Node.js project",
    "main": "app.js",
    "scripts": {
      "start": "node app.js"
    },
    "dependencies": {
      "express": "^4.17.1",
      "mysql": "^2.18.1"
    }
  }
  ```

  **Explanation:**
  This JSON file helps manage the Node.js application dependencies, ensuring all necessary libraries are installed for proper execution.

