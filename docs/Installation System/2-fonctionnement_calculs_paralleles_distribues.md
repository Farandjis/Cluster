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
    - [**a) mpi4py**](#p1b)
    - [**a) Using mpirun only on Master (RPi4)**](#p1c)
    - [**a) Using mpriun on Master and/or Workers**](#p1d)

- ### [II – Test of MPI with prime.py](#p2)
    - [**a) prime.py presentation**](#p2a)
<br><br><br>
---

## <a name="p0"></a> Definitions
**noeud de calcul :** <br>
**processus (tâche) de calcul :**<br>
**job de calcul :**<br>
**calcul séquentiel :**<br>
**calcul parallèle :**<br>
**mémoire distribuée :**<br>
---

## <a name="p1"></a> I - MPI utilization

- ### <a name="p1a"></a> a) MPI presentation
MPI (for Message Passing Interface) is a library with an ensemble of standardized function for memory distributed architectures.<br>
MPI allow of exploiting many calcul knot link by a network communication.<br>
