Florent VASSEUR--BERLIOUX, Tom BOGAERT, William HERUBEL, Baptiste FOURNIE, Matthieu FARANDJIS  
INF2-A

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5 Design Report
</div>

<br><br><br><br><br><br><br>

## Table of Contents

### [I – Architectural Design](#p1)
- <b>[Figure 1: Component Diagram](#fg1)</b>

### [II – Detailed Design](#p2)


<br><br><br><br><br><br><br>


------------------------------------------------------------------------------------------------------------------------
### <a name="p2"></a>I – Architectural Design
<br><br>

## Introduction
This document details the implementation and design of the project.
It explores the different aspects of the project's structure and the behaviors associated with its use.

### Architectural Design
<img height="800" width="800" src="Conception/ComponentDiagramV1.png" title="UML design of the static site"/><br><br>
<i><a name="fg1"></a>Figure 1: Component Diagram.</i>

#### Tools Used:

Programming Language:
- Apache Server
- MariaDB (SQL)

Hardware Architecture:
 - Raspberry Pi 0
 - Raspberry Pi 4
 - Cluster HAT Kit

 (ref: Requirements Collection; Part 4)


#### Architecture Form:

Our architecture consists of a Cluster HAT Kit, which itself is made up of four Raspberry Pi 0 units and a Raspberry Pi 4.
Our Cluster HAT Kit relies on an Apache server. The latter uses MySQL interface services to access the database.

------------------------------------------------------------------------------------------------------------------------
