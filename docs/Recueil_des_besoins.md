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
- <b>[c) Performances](#p5c)</b>
- <b>[d) Opérations, sécurité, documentation](#p5d)</b>
- <b>[e) Utilisation et utilisabilité](#p5e)</b>
- <b>[f) Maintenance et portabilité](#p5f)</b>
- <b>[g) Questions non résolues ou reportées à plus tard](#p5g)</b>
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



<a name="p4"></a>IV – La technologie employée

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
