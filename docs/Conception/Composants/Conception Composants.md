Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5 Design Report
</div>

<br><br><br><br><br><br><br>

## Table of Contents

### [I – Architectural Design](#p1)
- #### [Architectural Design's Diagram](#p1.1)
    - <b>[Figure 1: Component Diagram](#fg1)</b>
- #### [Tools Used](#p1.2)
- #### [Architecture Form](#p1.3)


<br><br><br>
## Introduction
This document details the implementation and design of the project.
It explores the different aspects of the project's structure and the behaviors associated with its use.

<br><br><br><br>


------------------------------------------------------------------------------------------------------------------------
### <a id="p1"></a>I – Architectural Design
<br><br>

#### <a id="p1.1"></a>Architectural Design's Diagram
<i><a id="fg1"></a>Figure 1: Component Diagram.</i>

<img height="600" width="600" src="Modèle UML/ComponentDiagramV1.png" title="UML design of the architecture"/>
<br>
This diagram represents the architecture of our project. It is composed of a Cluster HAT Kit, which is made up of four Raspberry Pi 0 units and a Raspberry Pi 4. The Cluster HAT Kit is connected to an Apache server, which uses MySQL interface services to access the database. The Apache server is responsible for managing the website.
<br><br>

#### <a id="p1.2"></a>Tools Used:

Programming Language:
- Apache Server
- MariaDB (SQL)
- JavaScript / Node.js (Express)
- HTML / CSS

Hardware Architecture:
 - Raspberry Pi 0
 - Raspberry Pi 4
 - Cluster HAT Kit

 (ref: Requirements Collection; Part 4)


#### <a id="p1.3"></a>Architecture Form:

Our architecture consists of a Cluster HAT Kit, which itself is made up of four Raspberry Pi 0 units and a Raspberry Pi 4.
Our Cluster HAT Kit relies on an Apache server. The latter uses MySQL interface services to access the database.

------------------------------------------------------------------------------------------------------------------------