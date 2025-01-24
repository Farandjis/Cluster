Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS, Lucas DA SILVA FERREIRA  
INF3-FI

<div align="center">
<img height="95" width="400" src="https://www.uvsq.fr/medias/photo/iut-velizy-villacoublay-logo-2020-ecran_1580904185110-jpg?ID_FICHE=214049" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - MPI Test on E51 Computers.

<br><br>
This document describes in detail the preparation and efforts undertaken to implement an MPI cluster on CentOS in the computer lab E51, and the progress made despite encountering unresolved challenges.
<br>
</div>

---

## Table of Contents

1. **System Overview**
2. **Machine Setup and Preparation**
3. **Manual SSH Configuration**
4. **Automating Environment Preparation**
5. **Testing the MPI Environment**
6. **Automated Shutdown Script Implementation**
7. **Conclusion**

---

## 1. System Overview

The goal of this project was to set up a distributed computing cluster in lab E51, leveraging CentOS machines for parallel computation using MPI (Message Passing Interface). This report outlines the preliminary steps, obstacles encountered, and the potential solutions identified for future progress.

---

## 2. Machine Setup and Preparation

### Machine Initialization
- Machines in room E51 were powered on manually and booted into CentOS.
- IP addresses of each machine were recorded dynamically using local DHCP assignment, ensuring they could be individually addressed during the configuration.

### Software Installation
- The essential `openssh-server` package was manually installed on each machine to enable secure remote access via SSH.
- Steps taken:
  ```bash
  sudo yum install openssh-server
  sudo systemctl start sshd
  sudo systemctl enable sshd
  ```
- Verification was performed by connecting to each machine using its assigned IP address with:
  ```bash
  ssh adminetu@<remote_machine_ip>
  ```
  This confirmed remote access functionality.

---

## 3. Manual SSH Configuration

To facilitate secure communication between nodes in the cluster:
- **Key-Based Authentication**: RSA keys were manually generated and distributed.
  ```bash
  ssh-keygen -t rsa
  ssh-copy-id adminetu@<remote_machine_ip>
  ```
- This allowed passwordless SSH access, simplifying future automation processes.

---

## 4. Automating Environment Preparation

Automation scripts were developed to streamline updates, dependency installation, and system configuration:

### Key Dependencies Installed:
1. **MPI** (MPICH or OpenMPI):
   Installed for enabling parallel computation.
   ```bash
   sudo yum install mpich
   ```

2. **Firewall Management**:
   - `ufw` was considered for simple firewall configuration and management.
     ```bash
     sudo yum install epel-release
     sudo yum install ufw
     ```

3. **EPEL Repository**:
   - Added for access to additional CentOS libraries and tools.
     ```bash
     sudo yum install epel-release
     ```

4. **Automation Scripts**:
   - **RSA Key Distribution**: Automated the key generation and sharing process across all nodes.
   - **CentOS Updates**: Scripted updates for packages and dependencies.
     ```bash
     sudo yum update -y
     ```

   - Dependency installation was packaged into a single script, reducing manual intervention.

---

## 5. Testing the MPI Environment

### Objective:
To run parallel tasks across the cluster using MPI.

### Steps Taken:
- **MPI Command Execution**:
  ```bash
  mpiexec -n 12 --host <remote_ip> python /home/adminetu/project/mcsaccola2.py
  ```

### Result:
- Execution failed due to missing or improperly configured SLURM libraries:
  - Error: `Unable to contact Slurm controller (connect failure)`
- Identified root causes:
  - SLURM services (`slurmd` and `slurmctld`) were not installed or configured on the system.
  - Further resolution required installation and configuration of SLURM or an alternative job scheduler.

Despite these obstacles, progress was made in setting up the MPI environment, and a clear pathway has been identified to resolve the issues in the next phase.

---

## 6. Automated Shutdown Script Implementation

To improve energy efficiency and manage resources effectively, scripts were designed to shut down all machines in the lab automatically after computations are complete.

### Implementation:
- A simple script utilizing SSH was written:
  ```bash
  for ip in $(cat hosts.txt); do
    ssh adminetu@$ip 'sudo shutdown -h now'
  done
  ```

- This script ensures machines are powered off after use, preventing unnecessary energy consumption.

---

## 7. Conclusion

Significant progress was made in configuring the environment for parallel computation with MPI on CentOS in room E51. While the MPI tests were not fully successful due to unresolved SLURM library issues, the foundation has been laid for a robust distributed computing setup. The following steps are recommended for future progress:

1. Complete SLURM installation and configuration.
2. Refine automation scripts for dependency installation and environment preparation.
3. Conduct further tests to validate the MPI setup and troubleshoot remaining issues.

The project is on track to achieve its goals and is expected to be fully operational in the next iteration (S6).

---

