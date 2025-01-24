# Author 
Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA
# README - Paralix

## Liens

### Système
- Installation du cluster : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/1-installation_cluster.md
- Présentation du fonctionnement de MPI sur le cluster : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/2-fonctionnement_calculs_paralleles_distribues.md
- Installation de NodeJS + MariaDB + Docker : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/3-installation_node_mariadb_docker.md
- Explications de comment on arrête un calcul trop long : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/Gestion%20des%20processus%20de%20calcul.md

### Docker
- Dockerfile :
- docker-compose.yml :
- package.js :
- Script qui executé compose down et compose up build (en tâche de fond) :
- hosts-clusters comportant l'adresse des Pi0 (abandonné ?) :

### Base de données
- Scripts SQL : https://github.com/Farandjis/Cluster/tree/main/database/scripts
- Conception : https://github.com/Farandjis/Cluster/tree/main/docs/Conception/BD
- Tests : https://github.com/Farandjis/Cluster/tree/main/docs/Test

### Site web
- Conception : https://github.com/Farandjis/Cluster/tree/main/docs/Conception/Site
- Site statique : https://github.com/Farandjis/Cluster/tree/main/website_static
- Site dynamique : https://github.com/Farandjis/Cluster/tree/main/website_dynamic
- Tests : https://github.com/Farandjis/Cluster/tree/main/docs/Test

### Scripts Python MPI utilisés par Paralix
- Script bash pour copier du Pi4 sur les Pi0 (copieur.sh) : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/copieur.sh
- Script Python Nombres Premiers : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/prime.py
- Script Python Nombres Premiers version Blinkt (inutilisé) : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/prime-blinkt.py
- Script Python Pi Monte-Carlo : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/montecarlo.py
- Script Python Hello World (rainboew-text) : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/hello.py


### Scalabilités et performances (préparations et études)
- Installation et fonctionnement du multi-cluster RPi4 + RPi0 : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/4-Comprehensive_Multi-Cluster_Installation_Report.md
- MPI sur les PC de la E51 : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/5-MPI_Test_on_E51_Computers.md
- Analyse de performance du RPi : Calcul des nombres premiers : https://github.com/Farandjis/Cluster/blob/main/docs/Installation%20System/Gestion%20des%20processus%20de%20calcul.md
- Rapport pour Pi Monte-Carlo (MPI) : https://github.com/Farandjis/Cluster/blob/main/docs/scalabilite/rapportMPIMonteCarlo.md
- Rapport pour les nombres Premiers (MPI) : https://github.com/Farandjis/Cluster/blob/main/docs/scalabilite/rapportPrime.md
- Script Python Scalabité pour Monte-Carlo 1 : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/mcscala.py
- Script Python Scalabité pour Monte-Carlo 2 : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/mcscala2.py
- Script Python Scalabilité pour Nombres Premiers 1 : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/prime_scalability.py
- Script Python Scalabilité pour Nombres Premiers 2 : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/prime_scalability2.py
- Script Python Scalabilité pour Nombre Premiers verison Eratosthene : https://github.com/Farandjis/Cluster/blob/main/website_dynamic/cluster-prime-master/prime_scalability_eratosthene.py

### Gestion du projet
- Cahier des charges : https://github.com/Farandjis/Cluster/blob/main/docs/Management/Cahier%20des%20Charges.md
- Recueil des besoins : https://github.com/Farandjis/Cluster/blob/main/docs/Management/Recueil%20des%20Besoins.md
- Les livrables : https://github.com/Farandjis/Cluster/blob/main/docs/Management/les%20livrables.txt
- Gestion des risques : https://github.com/Farandjis/Cluster/blob/main/docs/Management/Gestion%20des%20Risques.pdf
- Cas d'utilisation : https://github.com/Farandjis/Cluster/blob/main/docs/Management/CU_V3.png


### Manuel d'utilisateur
- Manuel d'utilisateur : https://github.com/Farandjis/Cluster/blob/main/docs/manuel.md




---------------------------

## Introduction

**Paralix** est une plateforme dédiée à la réalisation de modules mathématiques, permettant d'effectuer des calculs complexes en utilisant un cluster de Raspberry Pi. Ce système permet des calculs parallèles via un ensemble de **Raspberry Pi 4** et **Raspberry Pi Zero** pour optimiser les performances.

## Architecture du Cluster

Le cluster est constitué de **Raspberry Pi 4** et **Raspberry Pi Zero**, chacun avec des caractéristiques spécifiques pour exécuter des calculs mathématiques parallèles.

### **Raspberry Pi 4 (4 unités)**  
- **Mémoire vive** : 4 Go ou 8 Go de RAM  
- **Processeur** : Quad-core Cortex-A72, jusqu'à 1.5 GHz  
- **Cœurs** : 4

### **Raspberry Pi Zero (4 unités)**  
- **Mémoire vive** : 512 Mo de RAM  
- **Processeur** : Single-core ARM1176, jusqu'à 1 GHz  
- **Cœurs** : 1

Les **Raspberry Pi 4** sont utilisés pour les calculs plus complexes et gourmands en ressources, tandis que les **Raspberry Pi Zero** gèrent les tâches plus légères et permettent une répartition parallèle massive des calculs.

## Installation

### Prérequis
Avant d'utiliser **Paralix**, assurez-vous d'avoir :
- Un environnement avec un cluster de **Raspberry Pi 4** et **Raspberry Pi Zero**.
- Un smartphone pour le partage de connexion internet.
- Un réseau local configuré automatiquement par le serveur DHCP de votre smartphone.
- L'installation du système d'exploitation **Raspberry Pi OS** sur chaque Raspberry Pi.
- Un ordinateur distant avec des outils comme **FileZilla** ou **WinSCP** pour la gestion des fichiers via FTP.

### Étapes de connexion et d'installation :
1. **Connectez votre Raspberry Pi à votre téléphone via partage de connexion** :
   - Activez le partage de connexion sur votre smartphone.
   - Reliez le **Raspberry Pi 4** à votre téléphone via un câble USB.
   - Assurez-vous que votre Raspberry Pi utilise le réseau local DHCP configuré automatiquement par votre smartphone.

2. **Configurer la connexion réseau sur le Raspberry Pi** :
   - Ouvrez une session en SSH avec votre Raspberry Pi.
   - Utilisez **nmtui** (Network Manager Text User Interface) pour configurer la connexion réseau.
     - Lancez la commande `sudo nmtui` dans le terminal pour configurer l'interface réseau.
     - Sélectionnez le réseau local créé par votre téléphone et connectez-vous.

3. **Accédez à votre Raspberry Pi via SSH** :
   - Une fois la connexion réseau établie, vous pouvez vous connecter à votre Raspberry Pi via SSH en utilisant l'adresse IP locale fournie par votre smartphone.
   - Exemple de commande SSH : `ssh pi@192.168.x.x` (remplacez `192.168.x.x` par l'adresse IP de votre Raspberry Pi).

4. **Accédez au Raspberry Pi via FTP** :
   - Utilisez un client FTP comme **FileZilla** ou **WinSCP** pour accéder aux fichiers de votre Raspberry Pi et les gérer à distance.
   - Utilisez l'adresse IP locale du Raspberry Pi et le nom d'utilisateur **pi** avec le mot de passe correspondant.

5. **Téléchargez le projet **Paralix** depuis le dépôt GitHub** :
   - Une fois connecté, clonez le dépôt ou téléchargez les fichiers nécessaires pour configurer le système.
   - Suivez les instructions dans le fichier `install.sh` pour configurer et déployer le cluster.

## Utilisation

### Accès à la plateforme
Une fois l'installation terminée, vous pouvez accéder à la plateforme via votre navigateur web. Connectez-vous avec vos identifiants ou créez un nouveau compte pour commencer à utiliser les modules de calcul.

### Modules
Paralix vous permet d'exécuter plusieurs modules mathématiques, comme :
- **Hello World**
- **Prime**
- **Pi**

Chaque module est exécuté en parallèle sur les différents Raspberry Pi, ce qui permet de traiter des calculs complexes rapidement et efficacement.

### Calculs Parallèles
Le système utilise le calcul parallèle sur les différentes unités du cluster pour accélérer les processus. Les **Raspberry Pi 4** traitent des calculs plus lourds tandis que les **Raspberry Pi Zero** gèrent des tâches plus simples et facilitent le parallélisme global.

### Interface Utilisateur
L'interface vous permet de :
- Créer un compte utilisateur.
- Accéder à des modules mathématiques.
- Suivre vos résultats et gérer votre profil.

## Support et Assistance

Si vous avez des questions ou des problèmes techniques, vous pouvez consulter la section d'aide de la plateforme ou contacter notre support via l'adresse email fournie sur le site.



**Paralix** est conçu pour simplifier les calculs mathématiques complexes en utilisant des ressources matérielles efficaces. Profitez d'une plateforme rapide et flexible pour vos travaux mathématiques !
