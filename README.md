# Author 
Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA
# README - Paralix

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
