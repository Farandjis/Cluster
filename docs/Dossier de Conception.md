Florent VASSEUR--BERLIOUX, Tom BOGAERT,William HERUBEL, Baptiste FOURNIE, Matthieu FARANDJIS<br>
INF2-A

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5  Dossier de conception
</div>

<br><br><br><br><br><br><br>

## Plan

### [I – Conception Architectural](#p1)
- <b>[Figure 1 : Diagramme des composants ](#fg1)</b>

### [II – Conception Détaillée](#p2)


<br><br><br><br><br><br><br>


------------------------------------------------------------------------------------------------------------------------
### <a name="p2"></a>I – Conception Architecturale
<br><br>

## Introduction
Ce document expose en détail la mise en œuvre et la conception du projet.
Il explore les différentes perspectives de la structure du projet et les comportements associés à son utilisation.

### Conception Architecturale
<img height="800" width="800" src="Conception/ComponentDiagramV1.png" title="conception UML du site statique"/><br><br>
<i><a name="fg1"></a>Figure 1 : Diagramme de composants.</i>

#### Outils utilisées :

Langage de programmation :
- Server Apache
- MariaDB (SQL)

Architecture matériel :
 - Raspberry pi 0
 - Raspberry pi 4
 - Kit Cluster HAT

 (rèf :  Recueil des besoins; Part 4)


#### Forme de l'architecture :

Notre architecture est constitué d'un Kit Cluster HAT, lui même composé de quatre Rasberry pi 0 et d'un Raspberry pi 4.
Notre Kit Cluster HAT dépend d'un serveur Apache. Ce dernier utilise les services de l'interface MySQL afin d'accéder à la base de données.

------------------------------------------------------------------------------------------------------------------------