# SAE 5.01 - Cahier des Charges

## Sommaire

* [**Chapitre 1**](#part1) **:** _Introduction_
* [**Chapitre 2**](#part2) **:** _Énoncé_
* [**Chapitre 3**](#part3) **:** _Pré-requis_

## <a id="part1"></a>Introduction

Ce Cahier des Charges décrit les attendus du projet, et exprime les
besoins du client. Ce document a été rédigé dans le but de présenter efficacement les objectifs du système, tant pour les intervenants
au projet que pour le client.

Le projet joue un rôle central dans l'évaluation et la validation du projet, en veillant à ce que toutes les conditions et objectifs
énoncés dans ce document soient pleinement satisfaits. Il constitue ainsi une étape critique pour certifier la conformité du projet
aux attentes du client.

Ce cahier des charges commencera par une description détaillée du contexte de développement et des objectifs que le projet doit
atteindre. Les contraintes imposées au projet seront données ensuite, autour desquelles le projet devra se concentrer. Enfin, il
détaillera les connaissances, ressources matérielles, ressources logicielles et compétences nécessaires à la réalisation du projet.

---

## <a id="part2"></a>Énoncé

## _Objectifs du projet_

Le projet vise à mettre en place une application permettant de réaliser des calculs paralléles ou distribués sur un cluster de Raspberry. Pour une meilleure visualisation, l'application disposera d'une version web (application web).

### Objets du système

// Todo

### Acteurs du système

#### 1. Visiteur

Le visiteur est un utilisateur non connecté/non inscrit. Il peut donc s'agir d'une personne extérieure au système, mais également
de n'importe quel autre type d'utilisateur ne s'étant simplement pas encore connecté à la plateforme. Il est ainsi vital que l'affichage
de la page d'accueil dans le format Visiteur soit efficace et ergonomique, car tout type d'utilisateur sera amené à la visiter.

#### 2. Utilisateur connecté

L'utilisateur connecté pourra lancer des calculs prédéfinis via soit grâce à des commande sur un terminal, soit grâce à la Page Web. L'utilisateur disposera d'un historique de tous ses calculs précédents.Il pourra se déconnecter du site via la page Web.

#### 3. Administrateur

L'administrateur pourra ajouter,modifier (modifier les mots de passe) et supprimmer des comptes d'autres utilisateurs. Il pourra se déconnecter du site via la page Web.

## _Contraintes et Exigences_

L'application web devra être développée en PHP & MYSQL et être installée sur un serveur porté par un cluster de Raspberry, disponible en connexion ssh
depuis les postes des salles machines.

Une carte SD devra être configurée pour installer le système, le serveur web et le serveur SGBD Mysql, et 4 autres carte SD seront configurés de maniére identique pour réaliser différents calculs. Le login de base de la
carte SD sera [utilisateur] et son mot de passe [mot de passe].

Un github du projet devra être partagé avec les professeurs souhaitant le consulter, et devra contenir tous les éléments du projet,
de sa documentation à son code php.

---

## <a id="part3"></a>Pré-requis

Le projet demande des compétences en PHP & MYSQL, en Analyse des besoins et en Conception. Des connaissances en HTML et en
installation système et réseau sont également nécessaires à la bonne réalisation du projet. Des connaissances en Mathématiques pour réaliser les calculs distribués ou parallèles. 

Il est nécessaire de savoir travailler avec Git, ainsi que d'avoir des compétences en communication dans le cadre de la documentation, 
de la charte graphique et du logo à réaliser. 

En termes de ressources matérielles, le projet devra faire l'objet d'un cluster Raspberry et de plusieur carte SD à paramétrer. Pour les
ressources logicielles, nous allons utiliser Github pour tenir un registre du projet, et les IDE Jetbrains ainsi que VSCode pour
écrire les fichiers markdown et coder les fichiers php, css, html et autres.

Enfin, l'utilisation de logiciel comme Excalidraw ou StarUML pour permettre de mettre en forme des diagrammes et des figures pour concevoir et illustrer
les choix de conceptions.