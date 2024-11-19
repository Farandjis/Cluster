Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Cluster installation

<br><br>
This document describes how we succeed in making parallel and distributed calculations.
<br>

</div>

<br><br><br><br><br><br><br>

---

## Plan
- ### [Definitions](#p0)
- ### [I – MPI utilization](#p1)
  - [**a) MPI presentation**](#p1a)
  - [**b) mpi4py**](#p1b)
  - [**c) The hostfile for use mpriun on Master and/or Workers**](#p1c)
  - [**d) Create a common repertory for all Pi**](#p1d)

- ### [II – Test of MPI with prime.py](#p2)
  - [**a) prime.py presentation**](#p2a)
    <br><br><br>
---
## <a name="p0"></a> Definitions

**noeud de calcul :** Dans un cluster informatique, chaque noeud est un serveur individuel qui travaille en parallèle avec d'autres noeuds pour traiter des tâches lourdes ou exécuter des applications nécessitant une grande puissance de calcul.
Il doit contenir une mémoire vive, un disque dur local, plusieurs processeurs à plusieurs cœurs de calcul chacun <br><br>
**processus (tâche) de calcul :**  Il doit contenir un ensemble d'instruction à exécuter un programme, un espace mémoire pour les donnée
Une tâche de calcul consiste généralement en une série d'opérations arithmétiques ou logiques, souvent représentées sous forme d'algorithmes. Cela peut inclure des opérations simples comme l'addition ou des opérations plus complexes comme le tri de données, la recherche, ou l'analyse statistique.<br><br>
**job de calcul :** c'est un ensemble de processus liés à l'exécution d'un code calcul
Le terme "job de calcul" désigne une tâche ou un ensemble de tâches que l'on soumet à un système informatique pour qu'il exécute des calculs, des analyses ou des traitements de données.<br><br>
**calcul séquentiel :** c'est un processus qui est rattaché à un seul coeur de calcul
Le calcul séquentiel est un modèle de traitement des données où les opérations sont exécutées de manière linéaire, une après l'autre. Ce type de calcul est fondamental dans de nombreux domaines de l'informatique et est souvent le mode de calcul par défaut dans de nombreux langages de programmation.<br><br>
**calcul parallèle :** Le calcul parallèle est un modèle de traitement des données dans lequel plusieurs opérations ou tâches sont exécutées simultanément sur plusieurs unités de traitement. Cela permet de résoudre des problèmes complexes plus rapidement en tirant parti de la puissance de calcul de plusieurs processeurs ou cœurs de processeur, en opposition au calcul séquentiel, où les opérations sont effectuées une par une.<br><br>
**mémoire distribuée :** lorsque la mémoire est répartie en plusieurs noeuds, chaque portion n'étant accessible qu'à certains processeurs.
La mémoire distribuée se réfère à un système où la mémoire est partagée entre plusieurs nœuds, chacun ayant sa propre mémoire physique. Les nœuds peuvent être des ordinateurs individuels, des serveurs ou d'autres dispositifs de traitement. Dans ce modèle, les données peuvent être réparties sur plusieurs nœuds, permettant ainsi une plus grande évolutivité et redondance.<br><br>

---
## <a name="p1"></a> I - MPI utilization

# A corriger
_**Sources :**_
- https://mpi4py.readthedocs.io/en/stable/<br>
- https://mpitutorial.com/tutorials/running-an-mpi-cluster-within-a-lan/
- https://www.matrics.u-picardie.fr/documentation/mpi/
  <br><br>
  
- ### <a name="p1a"></a> a) MPI presentation
  MPI (Message Passing Interface) is a library with an ensemble of standardized function for memory distributed architectures.<br>
  MPI allow of exploiting many calcul knots link by a network communication.<br>
  The objective it's to takes advantage of having more than a single core in CPU.<br>
  <br>
  Remarks :
  - The Workers must have all the necessary to execute the command (so for a python file, Workers must have library used)
  - If a location is defined, all Pi must have this (for example, to execute the Python file, all the Pi0 must find the file in the repertory specified).
    <br>
    <br>
    On our RPi, we can use the command `mpirun -np [nb of processes] --hostfile [file] -wdir [repertory] -mca [parametre] [valeur] [command linux to execute]`.<br>
  - **-np**
    - Description : specifies the number of processes to run
    - Minimum value : 1
    - Maximum value : license size
    - Default value : none
    - Example : mpirun -np 4 python prime.py
  - **--hostfile**
    - Description : specifies the machines file to use for the current MPI job
    - Default value : none (→ we uses default parameter so only Master is used)
    - Example : mpirun --hostfile hosts -np 8 python prime.py
  - **-wdir**
    - Description : specifies the working directory to be used by the MPI processes
    - Default : current working directory
    - Example : mpirun -wd /home/moi/ -np 4 python prime.py
  - **-mca**
    - Description : allows you to configure specific MCA (Modular Component Architecture) parameters.
      <br><br>
- ### <a name="p1b"></a> b) mpi4py
  mpi4py (MPI for Python) allowing Python applications to exploit MPI.<br>


- ### <a name="p1b"></a> b) The hostfile for use mpriun on Master and/or Workers
  We have already explain the command `mpirun --hostfile hosts -np 8 python prime.py` in the part a).<br>
  So the hostfile is for example :<br>
  <br>
  <br>

      127.0.0.1 slots = 28
      172.19.181.1 slots = 1
      172.19.181.2 max-slots= 1
      172.19.181.3
      172.19.181.4

  127.0.0.1 is localhost, so if we execute mpirun on Master, 127.0.0.1 is... Master.<br>
  172.19.181.X is the RPi0<br>
  <br>
  `slots` is the number of processus associed by default on a knot gived, for example 28 and 1 :<br>
  - 28 is the maximum value for Pi4, (above, the command crash)
  - 1 is the minimum value for everyone
  - none is the default value : 1
  - If all Pi0 have slots=1 and Pi4 have slots=28, this is mean that Pi4 will have more processus and make more calcul than Pi0.<br>
    <br>
    `max-slots` is the maximum limit of process which can be executed on this knot, even if others slots can be avaible.  
    <br><br>
    When we made `mpirun --hostfile hosts -np 8 python prime.py` when slots=28 for Master, only Master will be used.<br>
    If Master have just 4 slots, all RaspberryPi will be used (because 4 slots for Pi4 and 1 for each Pi0)<br>


# Insérer aussi dessin Hoguin
# faire commande top et voir ce que ça donne, voir comment sont gérés les processus MPI voir quel quantité de mémoire est de part de processeur est utilisé
