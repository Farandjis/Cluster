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

**calcul code:**<br>In a computer cluster, each node is an individual server that works in parallel with other nodes to process heavy tasks or run applications requiring high computing power.
It must contain RAM, a local hard disk, several processors with several computing cores each <br><br>
**computational process (task):**<br>It must contain a set of instructions to execute a program, and memory space for data.
A computational task usually consists of a series of arithmetic or logical operations, often represented as algorithms. This can include simple operations such as addition, or more complex operations such as data sorting, searching, or statistical analysis.<br><br>
**computational job:**<br>a set of processes linked to the execution of a computational code.
The term “calculation job” refers to a task or set of tasks that a computer system is asked to perform in order to carry out calculations, analyses or data processing.<br><br>
**sequential calculation:**<br> this is a set of processes linked to the execution of a calculation code.
this is a process that is attached to a single computational core.<br>
Sequential calculation is a data processing model in which operations are executed linearly, one after the other. This type of calculation is fundamental to many areas of computer science, and is often the default mode of calculation in many programming languages.<br><br>
**parallel computing:**<br>Parallel computing is a data processing model in which several operations or tasks are performed simultaneously on several processing units. This enables complex problems to be solved more quickly by taking advantage of the computing power of multiple processors or processor cores, as opposed to sequential computing, where operations are performed one at a time.<br><br>
**distributed memory:**<br>when memory is divided into several nodes, with each portion accessible only to certain processors.
Distributed memory refers to a system where memory is shared between several nodes, each with its own physical memory. Nodes can be individual computers, servers or other processing devices. In this model, data can be distributed across multiple nodes, enabling greater scalability and redundancy.<br><br>


---
## <a name="p1"></a> I - MPI utilization

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

  We notice that using the cluster rather than the Pi4 directly is slower.<br>
  The first reason is the power of the Pi0s, the second is that communications overload the Controller Pi GPIO port.<br>
  Since the port is overloaded, the data passes through one by one, and with the Pi4 controlling each of the RPi0s, this takes time.

  <img src="img\img_fonctionnement_calculs_paralleles_distribues\schema_cluster_illustration_transfert_donnees.png" width="300"/>

# faire commande top et voir ce que ça donne, voir comment sont gérés les processus MPI voir quel quantité de mémoire est de part de processeur est utilisé
