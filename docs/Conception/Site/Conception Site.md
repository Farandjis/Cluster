Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5 Design Report
</div>

<br><br><br><br><br><br><br>

## Table of Contents

### [I – Detailed Design](#p1)
- #### [Detailed Design's Diagram](#p1.1)
    - <b>[Figure 2: Detailed Diagram](#fg1)</b>
    - <b>[Figure 3: Class Diagram](#fg2)</b>
- #### [Programmation Form](#p1.2)


<br><br><br>
## Introduction
This document details the implementation and design of the project.
It explores the different aspects of the project's structure and the behaviors associated with its use.

<br><br><br><br>

------------------------------------------------------------------------------------------------------------------------

### <a id="p1"></a>Detailed Design
<br><br>

#### <a id="p1.1"></a>Detailed Design's Diagram

<i><a id="fg1"></a>Figure 2: Dependnecy Diagram.</i>

<img height="800" width="600" src="Modèle UML/dependencyDiagramm2.png" title="UML design of the site"/><br><br>

<i><a id="fg2"></a>Figure 3: Class Diagram.</i>

<img height="800" width="800" src="Modèle UML/ClassDiagramV2.png" title="UML design of the site"/><br><br>


#### <a id="p1.2"></a>Programmation Form

The project consists of 4 directories:
- ***js***: containing all the JavaScript files used for the static aspect of the site.
- ***img***: containing the images used on the site.
- ***node***: containing the Node.js files for the dynamic part of the site.
- ***style***: containing the CSS files related to the site's style.
- ***view***: contains all the site's html pages, created from files in the node folder.

The dynamic code is written in Node.js.  
We have chosen an object-oriented programming paradigm.  
As a result, the code is represented in the form of methods belonging to an object, which is an instance of the Express class.

We have separated our methods into several files. Thus, we import the auxiliary files related to each feature of the site into the `server.js` file.

**Frontend**: The user interface is managed using HTML/CSS/JavaScript files.

**Backend**: Uses a Node.js server with Express to handle routes, process HTTP requests, and interact with a MariaDB MySQL database.

------------------------------------------------------------------------------------------------------------------------
