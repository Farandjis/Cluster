Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS, Lucas DA SILVA FERREIRA<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Cluster installation

<br><br>
This document describes how we managed the process in the project.
<br>

</div>

<br><br><br><br><br><br><br>

## Crontab and process programmation

Crontab is a tool in Linux used to schedule tasks to be automatically executed at specific times or intervals. Each user can have their own crontab file, where they define these tasks with time expressions and commands to execute.

The lines `@reboot clusterhat`, `@reboot sudo /sbin/ifdown brint`, and `@reboot sudo /sbin/ifup brint` are commands to be executed at system startup. The first one starts a service or task called "clusterhat." The next two disable (`ifdown`) and then re-enable (`ifup`) the `brint` network interface, to reset the network interface during boot.

The line `* * * * * * /home/moi/docker-app/deleteLongModule.sh` indicates a task that runs every minute. The script `deleteLongModule.sh` will be executed once a minute to remove long-running processes. Specifically, the bash script kills processes running for more than 3 hours (or 10800 seconds, adjustable by changing the related constant) by comparing the current timestamp with the process creation timestamp.


## Process identification for calculus

Processes are identified based on two criteria:
- Using the command `grep mpi` to identify mpi processes used to run distributed Python scripts.
- By a specific identifier in the process name:
   mpi processes started by users from the web platform all include an identifier in their name. This identifier follows this format: 
   PPP`IdUser`_\_\_`RandomId`
   
   The string "PPP" marks the start of the identifier. `IdUser` is an integer identifying the user’s account (used in various parts of the site). The string "_\_\_" separates `IdUser` from `RandomId`. `RandomId` is a random string used to distinguish one process from another for the same user (the chances of two active processes from the same user having the same `RandomId` are very close to zero, so negligible).
