Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF2-A

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S3 - Recueil des besoins

<br><br>
This document contains all the important information we need to know in order to successfully complete this project.

</div>


<br><br><br><br><br><br><br>

## Plan

### [I – Objectif et portée](#p1)
- <b>[a) Quels sont la portée et les objectifs généraux ?](#p1a)</b>
- <b>[b) Lecture du cahier des charges](#p1b) </b>
    - <u>[i. Liste des objets, acteurs et actions](#p1bi) </u>
    - <u>[ii. Les différents niveaux](#p1bii) </u>
    - <u>[iii. Un schéma descriptif des niveaux](#p1biii) </u>
    - <u>[iiii. Le diagramme des cas d'utilisation](#p1biiii) </u>
### [II – Terminologie employée / Glossaire](#p2)
### [III – Les cas d’utilisation](#p3)
- <b>[a) Les acteurs principaux et leurs objectifs généraux](#p3a).</b>
- <b>[b) Les cas d’utilisation métier (concepts opérationnels).](#p3b)</b>
- <b>[c) Les cas d’utilisation stratégique.](#p3c)</b>
- <b>[d) Les cas d’utilisation utilisateur et système.](#p3d)</b>
### [IV – La technologie employée](#p4)
- <b>[a) Quelles sont les exigences technologiques pour ce système ?](#p4a)</b>
- <b>[b) Avec quels systèmes ce système s’interfacera-t-il et avec quelles exigences ?](#p4b)</b>
- <b>[c) Quel materiel est utilisé pour porter le système ?](#p4c)</b>
### [V – Autres exigences](#p5)
- <b>[a) Processus de développement](#p5a)</b>
    - <u>[i. Qui sont les participants au projet ?](#p5ai)</u>
    - <u>[ii. Quelles valeurs devront être privilégiées ? (exemple : simplicité, disponibilité, rapi-
      dité, souplesse etc... )](#p5aii)</u>
    - <u>[iii. Quels retours ou quelle visibilité sur le projet les utilisateurs et commanditaires
      souhaitent-ils ?](#p5aiii)</u>
    - <u>[iv. Que peut-on acheter ? Que doit-on construire ? Qui sont nos concurrents ?](#p5aiv)</u>
    - <u>[v. Quels sont les autres exigences du processus ? (exemple : tests, installation, etc...)](#p5av)</u>
    - <u>[vi. À quelle dépendance le projet est-il soumis ?](#p5avi)</u>
- <b>[b) Performances](#p5b)</b>
- <b>[c) Opérations, sécurité, documentation](#p5c)</b>
- <b>[d) Utilisation et utilisabilité](#p5d)</b>
- <b>[e) Maintenance et portabilité](#p5e)</b>
### [VI – Recours humain, questions juridiques, politiques, organisationnelles.](#p6)
- <b>[a) Quel est le recours humain au fonctionnement du système ?](#p6a)
- <b>[b) Quelles sont les exigences juridiques et politiques ?](#p6b)</b>
- <b>[c) Quelles sont les conséquences humaines de la réalisation du système ?](#p6c)</b>
- <b>[d) Quels sont les besoins en formation ?](#p6d)</b>
- <b>[e) Quelles sont les hypothèses et les dépendances affectant l’environnement humain ?](#p6e)</b>
### [VII - Project management and organization.](#p7)
- <b>[a) Roles and responsibilities](#p7a)
- <b>[b) Life cycle](#p7b)</b>
- <b>[c) Bilan répartition des tâches S3](#p7c)</b>
- <b>[d) Bilan répartition des tâches S4](#p7d)</b>

### [Annexe 1 : Cas d'utilisation](#a1)


<br><br><br><br><br><br><br>

------------------------------------------------------------------------------------------------------------------------



### <a name="p4"></a>IV – La technologie employée

   - <b><a name="p4a"></a>a) Quelles sont les exigences technologiques pour ce système ?</b>

   L'application devra utiliser : SQL, HTML, CSS et un autre langage de programmation pour la partie algorithmique. Cet autre langage sera décidé en fonction des exigences de nos professeurs.<br>
   - SQL est le langage utilisé pour l'utilisation d'un SGBD comme MariaDB.<br>
   - HTML et CSS permettent la création des pages web du site internet.<br>
   - Le dernier langage permet l'implémentation des algorithmes mathématiques.<br>

   Le serveur devra être protégé des intrusions, notamment SSH, à l'aide du logiciel fail2ban et devra faire automatiquement des archives des journaux d'activités à l'aide du logiciel CRON.<br> Nous utiliserons les logiciels PHPStorm et WebStorm de Jetbrains.<br> Ces outils ne sont pas obligatoires, mais ils permettront d’améliorer la qualité du code rendu.<br>
    <br>

   - <b><a name="p4b"></a>b) Quels systèmes seront interfacés avec ce système, et quelles seront leurs exigences ?</b>

   Afin de garantir le bon fonctionnement de l’application web finale, il faudra s’assurer que le serveur web soit prêt à l’utilisation sur une carte micro SD.<br>
   De plus, il sera nécessaire d’assurer le bon fonctionnement du site web sur les postes présents dans les salles machines de l’IUT de Vélizy.<br>
   La carte SD devra contenir un serveur web (Apache est conseillé) ainsi qu’un serveur SGBD.<br>
   Aussi, le serveur contenant l’application web sera porté sur un cluster Raspberry Pi 0 et sera accessible par connexion SSH.<br>
   La plateforme doit permettre de configurer à distance fail2ban et de gérer ses prisons. Apache doit donc être capable d'interagir avec le système pour fail2ban.

<br>

   - <b><a name="p4c"></a>c) Quel matériel est utilisé pour porter le système ?</b>

   Nous travaillons sur un Cluster de Raspberry Pi 0 utilisant un Raspberry Pi 4 et un Cluster HAT.

   Chaque Raspberry Pi 0 contient :
   - <b>CPU</b> : Broadcom BCM2835, un processeur ARM11 à cœur unique cadencé à 1 GHz.
   - <b>RAM</b> : 512 Mo de mémoire SDRAM LPDDR2.
   - <b>Stockage</b> : Carte micro SD.
   - <b>Périphériques</b> : Ports Micro USB, Connecteur CSI, Port Mini HDMI.

   Le Raspberry Pi 4 contient :
   - <b>CPU</b> : Broadcom BCM2711, un processeur ARM Cortex-A72 à quatre cœurs cadencé à 1,5 GHz.
   - <b>RAM</b> : 4 Go.
   - <b>Stockage</b> : Carte micro SD.
   - <b>Périphériques</b> : Ports USB, Ethernet Gigabit, ports micro-HDMI, Jack audio 3,5 mm.
   - <b>Autres</b> : Wi-Fi 802.11ac, Bluetooth 5.0, Alimentation via USB-C.

   Le Cluster HAT contient :
   - <b>Périphériques</b> : Ports USB.

<br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------


### <a name="p5"></a>V – Autres exigences


- <b><a name="p5a"></a>a) Processus de développement</b>

    - <u><a name="p5ai"></a>i. Qui sont les participants au projet ?</u><br>

      Les membres de notre équipe sont les principaux participants au projet.
      Notre équipe est constituée de Tom BOGAERT, Matthieu FARANDJIS, William HERUBEL, Baptiste FOURNIÉ et Florent VASSEUR--BERLIOUX.<br>
      <br>
    - <u><a name="p5aii"></a>ii.  Quelles valeurs devront être privilégiées ? (exemple : simplicité, disponibilité, rapidité, souplesse etc... )</u><br>
      <h3> Efficacité </h3>
      Nous privilégions l'éfficacité pour permettre à nos algorithmes d'atteindre leurs meilleurs performances. Les calculs devront être exécutés le plus rapidement possible. 
      <h3> Souplesse </h3>
      Notre application devra être Extensible, lui permettant d'accueillir de nouvelles fonctionnalités (calculs, etc...) sans avoir à réécrire le code.
      <h3> Portabilité</h3>
      La plateforme web devra être hébergée sur un  Kit Cluster Hat (connecté à 4 Rasberry PI Zero), et posséder une Carte SD configurée par l'équipe de développement. De plus, il faudra pouvoir accéder en SSH au RaspberryPi.
      <h3> Sécurité</h3>
      Les données devront être protégées, et le site ne doit afficher que ce que chaque utilisateur a le droit de voir. Pour cela, il sera impératif de sécuriser les requêtes SQL formulées par les fichiers (PHP), pour restreindre le plus possible les accès et limiter les failles de sécurité. De plus, tout mot de passe devra être crypté avant d'être enregistré dans la base de données, là encore afin de limiter les conséquences d'une fuite. On installera aussi fail2ban pour pouvoir modérer les connexions SSH, les tentatives de connexion et les inscription au site. <br>
      <br>
    - <u><a name="p5aiii"> </a> iii. Quels retours ou quelle visibilité sur le projet les utilisateurs et commanditaires souhaitent-ils ? </u><br><br>
      Ce projet représentant un travail universitaire évalué, les commanditaires de ce projet sont nos enseignants. Ces derniers ont une grande visibilité sur l'avancée du projet et recevront à certaines dates des documents concernant le projet et son avancement. La communication entre les membres de l'équipe et les enseignants est recommandée afin d'assurer le rendu d'un projet fidèle aux attentes de ces derniers.
      La communication avec nos professeurs se fera par email mais également à l'oral.<br>
      Notre client, M. HOGUIN doit avoir un accès général au projet : GitHub, compte administrateur (sudoers) Linux.<br>
      Notre deuxième client, M. DUFAUD doit avoir accès au GitHub afin de suivre l'avancé de notre projet.<br><br>
    - <u><a name="p5aiv"> </a>iv. Que peut-on acheter ? Que doit-on construire ? Qui sont nos concurrents ?</u><br><br>
      Le projet est de concevoir et programmer un logiciel permettant de réaliser divers calculs. Aucun achat n'est nécessaire à la création du logiciel, puisque le matériel (kit cluster) est pris en charge par le client. Nous ne possédons pas de concurrents à proprement parler.<br>
    - <u><a name="p5av"> </a>v. Quels sont les autres exigences du processus ? (exemple : tests, installation, etc.)</u><br><br>
      Nous pouvons noter en exigences sur le projet, l'exécution d'une phase de test assurant le bon fonctionnement de l'application. On attend également le rendu d'annexes concernant l'organisation du travail de l'équipe ou encore la charte graphique du logo de l'application.<br>
      Le projet se fera sous forme de petits cycles en cascade ou cycle en V pour chaque élément du projet. En cycle cascade, on commencera par la conception, puis le développement pour terminer avec les tests. Alors que pour le cycle en V, nous commencerons par la conception suivie des tests et pour finir le développement. Les clients doivent avoir accès au dépôt Git afin de juger de l'évolution du projet et faire des critiques si nécessaire.<br><br>
    - <u><a name="p5avi"> </a>vi. À quelle dépendance le projet est-il soumis ?</u><br><br>
      Ce projet n'a pas de dépendance en raison de la stagnation des langages PHP et MariaDB. Il utilise également les technologies HTML, CSS, JavaScript, Raspberry OS Lite, fail2ban et CRON.

- <b><a name="p5b"> </a>b) Performances</b><br><br>
Le logiciel se devra d'être le plus performant possible afin d'en faciliter l'accès. Pour ce faire, les programmes seront optimisés et testés dans le but de limiter le nombre d'opérations. Les systèmes de stockage de données seront choisis en conséquence pour améliorer au mieux les performances de la plateforme.<br><br>

- <b><a name="p5c"> </a>c) Opérations, documentation</b><br><br>
Tout le code utilisé pour mener le projet à bien devra être documenté afin d'assurer la lisibilité du programme. Toutes les fonctions générées seront accompagnées d'une Docstring. On notera aussi la présence d'un dossier de test et d'une documentation de code.<br>

- <b><a name="p5d"> </a>d) Utilisation et utilisabilité</b><br><br>
Nous veillerons à rendre l’application accessible en nous basant sur la norme UAAG 2.1 de W3C. Nous utiliserons l'extension de navigateur internet "Wave" pour nous en assurer. Toute utilisation d'outil supplémentaire pour s'assurer davantage de l'accessibilité est la bienvenue.
Un guide d'utilisation du site doit être disponible, tout comme la transcription visuelle de la vidéo de présentation. Notre logiciel pourra être utilisé via un site web ou avec des commandes sur un terminal.

- <b><a name="p5e"> </a>e) Maintenance et portabilité</b><br><br>
La portabilité et la maintenance de l'application web seront notamment vérifiées en passant par le validateur de W3C. Il permet de s'assurer de la compatibilité de la plateforme avec tous les navigateurs et de vérifier que le code est conforme aux exigences actuelles. PHP et MariaDB fonctionnent aussi bien sur un serveur Windows que sur un serveur Linux. Nous devrons mener des tests d'intégration pour s'assurer de l'intégration correcte des différents modules à notre projet.

<br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------

### <a name="p6"></a>VI – Recours humain, questions juridiques, politiques, organisationnelles.
- <b><a name="p6a"></a>a) Quel est le recours humain au fonctionnement du système ?</b><br>
  
  Le hardware devras être mis en place à chaque utilisation. Cela nécessitera donc un personnel qualifié à sa mise en place.<br>
  Cependant, ce système pourras à terme être branché en serveur. <br><br>
  Le démarrage et la maintenance du système doivent être faits par du personnel compétent.<br>
  <br>
  
- <b><a name="p6b"></a>b) Quelles sont les exigences juridiques et politiques ?</b><br>
  L'application se doit de respecter la loi française « Informatique et liberté » du 6 janvier 1978, mise à jour le 1er juin 2019, relative à l'informatique, aux fichiers et aux libertés.<br>
  L'application est également soumise au règlement européen « Règlement Général sur la Protection des Données » (RGPD) du 27 avril 2016, relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, et abrogeant la directive 95/46/CE.<br>
  <br>
  A noter, la CNIL propose des recommandations vis à vis de la loi, notamment en matière de cookies.<br>
  <br>
  Les articles peuvent être consultés via les liens ci-dessous :
  - <u>Loi « Informatique et liberté » :</u><br>
    https://www.cnil.fr/fr/la-loi-informatique-et-libertes <br>
  - <u>Règlement européen « Règlement Général sur la Protection des Données » :</u><br>
    https://www.cnil.fr/fr/reglement-europeen-protection-donnees <br>
  - <u>A propos des cookies :</u><br>
    https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies <br>
    <br>

- <b><a name="p6c"></a>c) Quelles sont les conséquences humaines de la réalisation du système ?</b><br>

  L'application permettra aux utilisateurs d'exécuter des programmes nécessitant un calcul distribué ou parallèle de manière plus accessible, sans qu'ils aient besoin de connaissances approfondies en gestion de clusters et en calcul.<br><br>

  L'interface web simplifira l'accès aux ressources du cluster et permet une interaction fluide avec le système, ce qui améliore l'expérience utilisateur.

  Ces données sont utilisables dans le cas d'études statistiques afin de permettre aux administrateurs de se renseigner sur la fréquentation du site et l'utilisation des ressources materiels lors des calculs.<br>
  <br>


- <b><a name="p6d"></a>d) Quels sont les besoins en formation ?</b><br>
  En général, il est nécessaire de savoir se servir d'un ordinateur et d'un navigateur internet.<br>
  <br>
  Un guide d'utilisation, comprenant potentielement une vidéo de présentation pour apprendre à se servir de l'application, sera disponible.<br>
  Celle-ci expliquera comment utiliser l'application.<br>
  <br>
  On peut supposer une page web donnant des conseils pour les utilisateurs.<br>
  <br>
  

- <b><a name="p6e"></a>e) Quelles sont les hypothèses et les dépendances affectant l’environnement humain ?</b><br>
  - Nous supposons que :<br>
    - tous les étudiants, professeurs et personnels concernés possède une connexion internet et savent se servir d'un ordinateur et d'un navigateur internet.<br>
    - l'utilisation de l'application par des personnes handicapées peut-être différente.<br>
      <br>
  - L'application dépend de :<br>
    - la présence des administrateurs.
    - de la loi "Informatique et liberté" en France, ainsi que le RGPD dans l'Union Européenne.
      Leur changement peut demander une réévaluation de l'application afin de s'assurer qu'elle soit toujours conforme.
    - l'évolution des navigateurs internet. L'application pouvant se retrouver obsolète.

  <br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------

### <a name="p7"></a>VII - Project management and organization.
- <b><a name="p7a"></a>a) Roles and responsibilities</b><br>
  L'équipe est composé de :
  - **Matthieu FARANDJIS**
    Project Manager, Database Administrator, RaspberryPi 4 Administrator, Developer, GitHub Manager,
    in charge of communication between professors and the team.
  - **Florent VASSEUR--BERLIOUX**
    Design (conception) Manager, RaspberryPi 4 vice-Administrator, Developer
  - **Tom BOGAERT**
    Artistic Manager, Developer HTML/CSS/JS, Developer
  - **William HERUBEL**
    Redaction Manager, Developer
  - **Baptiste FOURNIÉ**
    Mathematical Calculations Manager, Developer
    <br><br>


- <b><a name="p7b"></a>b) Life cycle</b><br>
  As part of the project, we followed an iterative waterfall cycle.<br>
  Among other things, for each task (pages, for example), we followed the pattern: Designer -> Development -> Testing.<br>
  However, there's nothing to stop us going back to the drawing board in the event of bugs or design errors, for example.<br>

  <br><br><br>
  **Cycle de vie V0.2 : **
