Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA  <br>
INF3-FI
<br>
<div align="center">
<img height="95" width="400" src="https://www.uvsq.fr/medias/photo/iut-velizy-villacoublay-logo-2020-ecran_1580904185110-jpg?ID_FICHE=214049" title="logo uvsq vélizy"/>
</div>
<br>



### 1. Introduction
- [**Cahier des charges**](docs/Management/Cahier%20des%20Charges.md)
- [**Recueil des besoins**](docs/Management/Recueil%20des%20Besoins.md)
- [**Cas d'utilisation**](docs/Management/CU_V3.png)
- [**Gestion des risques**](docs/Management/Gestion%20des%20Risques.pdf)

### 2. Conception
- **Conception Architecturale** : *Lien vers le rapport de conception architectural à ajouter ici*
- [**Conception de la base de données**](docs/Conception/BD)
- **Conception du site web** :
  - [Site statique et dynamique](docs/Conception/Site)

### 3. Réalisation
- **Architecture du système**
  - [Installation et configuration du cluster](docs/Installation%20System/1-installation_cluster.md)
  -[MPI sur le cluster](docs/Installation%20System/2-fonctionnement_calculs_paralleles_distribues.md)
  - [Installation de NodeJS, MariaDB, Docker](docs/Installation%20System/3-installation_node_mariadb_docker.md)
  - [Multi-cluster installation (RPi4 + RPi0)](docs/Installation%20System/4-Comprehensive_Multi-Cluster_Installation_Report.md)
  - [MPI sur les PC de la E51](docs/Installation%20System/5-MPI_Test_on_E51_Computers.md)
- **Scripts et déploiements**
  - Docker :
    - Dockerfile et docker-compose : [Dockerfile](Docker/Dockerfile), [docker-compose.yml](Docker/docker-compose.yml)
    - Scripts de gestion Docker : [r.sh](Docker/r.sh)
  - Base de données :
    - [Scripts SQL](database/scripts)
  - Scripts de gestion des calculs :
    - [Arrêt des calculs longs](docs/Installation%20System/deleteLongModule.sh)
- **Scripts Python MPI utilisés par Paralix**
  - [Nombres Premiers](website_dynamic/cluster-prime-master/prime.py), [Monte-Carlo](website_dynamic/cluster-prime-master/montecarlo.py), [Hello World](website_dynamic/cluster-prime-master/hello.py)

### 4. Tests
- **Tests de fonctionnalités et de performance**
  - [Tests des scripts SQL, site web, et MPI](docs/Test)
  - Rapports de scalabilité pour MPI : [Monte-Carlo](docs/scalabilite/rapportMPIMonteCarlo.md), [Nombres premiers](docs/scalabilite/rapportPrime.md)

### 5. Documentation et manuel utilisateur
- [**Manuel d'utilisateur**](docs/manuel.md)

### 6. Livrables
- [**Documentation sur les livrables**](docs/Management/les%20livrables.txt)
