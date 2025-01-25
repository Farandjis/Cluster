Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS, Lucas DA SILVA FERREIRA<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="https://www.uvsq.fr/medias/photo/iut-velizy-villacoublay-logo-2020-ecran_1580904185110-jpg?ID_FICHE=214049" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Comprehensive Multi-Cluster Installation Report


<br><br>
This document describes in detail the installation process of the RPi4 and RPi0 multi clustering and how it works..
<br>

</div>

This report provides a detailed overview of the setup and deployment of a multi-cluster system utilizing Raspberry Pi 4 (RPi4) as master nodes and Raspberry Pi Zero devices as worker nodes. The objective is to create a scalable and efficient cluster network capable of supporting distributed computing tasks across 16 workers divided between two main clusters.

---

<a id="summary">

## Plan

- ### [I – System Overview](#p1)
  - [**a) Hardware Components**](#p1a)
  - [**b) Networking Setup**](#p1b)

- ### [II – Equipment and Configuration](#p2)
  - [**a) Hardware Setup**](#p2a)
  - [**b) Software Configuration**](#p2b)
  - [**c) Network Configuration**](#p2c)

- ### [III – Testing and Validation](#p3)
  - [**a) Connectivity Tests**](#p3a)
  - [**b) Advanced Network Configuration Testing**](#p3b)
  - [**c) Load Testing**](#p3c)
  - [**d) System Optimization**](#p3d)

- ### [IV – Challenges and Resolutions](#p4)

- ### [V – Performance Challenges Due to Hardware Heterogeneity](#p5)

- ### [VI – Technical Differences Between Raspberry Pi 4 and Raspberry Pi Zero](#p6)
  - [**Processor**](#p6a)
  - [**Memory**](#p6b)
  - [**Network Connectivity**](#p6c)

- ### [VII – Impact on Performance](#p7)

- ### [VIII – Load Distribution Adjustment](#p8)

- ### [IX – Conclusion](#p9)



---

## <a id="p1"></a> I - System Overview

## <a id="p1a"></a> **Hardware Components**:
- **Master Nodes**: Two Raspberry Pi 4 devices, each serving as the central control unit for each cluster.
- **Worker Nodes**: Eight Raspberry Pi Zero devices per cluster, totaling 16 workers, providing computational power for distributed tasks.

## <a id="p1b"></a> **Networking Setup**:
- Utilizes a dynamic DHCP configuration similar to mobile devices, allowing for automatic IP management which simplifies network administration and enhances scalability.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

## <a id="p2"></a> II - Equipment and Configuration

### <a id="p2a"></a> a) Hardware Setup
- Each cluster consists of one Raspberry Pi 4 and four Raspberry Pi Zeros connected through a managed switch that facilitates network communication.
- Power supplies are configured to ensure stable and continuous power delivery to all devices without overloading the electrical infrastructure.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

### <a id="p2b"></a> b) Software Configuration
- **Operating System**: A lightweight Linux distribution optimized for network performance and low overhead to maximize the computational capabilities of the hardware.
- **Cluster Management**: Configuration management tools are employed to maintain consistency in software deployment across all nodes.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

## <a id="p2c"></a> c) Network Configuration

- **DHCP Configuration**: All devices are set to acquire IP addresses dynamically from a centralized DHCP server, which records and assigns IP addresses to avoid conflicts and ensure proper network mapping.
- **SSH Configuration**: SSH keys are generated and distributed to each node to facilitate secure, passwordless access, essential for remote management and automation.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

## <a id="p3"></a> III - Testing and Validation

### <a id="p3a"></a> a) Connectivity Tests
- **Network and SSH Functionality**: Verified through ICMP echo requests and SSH login attempts to ensure all nodes are reachable and responsive.
- **MPI Execution Test**: Utilized to confirm correct network configuration and operational readiness of the MPI environment across all nodes.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

### <a id="p3b"></a> b) Advanced Network Configuration Testing
- **Network Performance**: Tools such as `iperf` and `nuttcp` were used to measure latency and throughput, providing insights into the network’s performance under different load conditions.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

### <a id="p3c"></a> c) Load Testing
- Distributed computational tasks were executed to assess the performance and stability of the system under simulated workloads, focusing on optimizing resource allocation and job scheduling.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

### <a id="p3d"></a> d) System Optimization
- **Kernel and Network Tuning**: Adjustments were made to the system’s kernel and network settings to minimize latency and maximize throughput.
- **Resource Management**: System limits for resources like CPU, memory, and I/O were optimized to ensure efficient utilization under peak loads.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

## <a id="p4"></a> IV - Challenges and Resolutions

- **Intermittent MPI Communication Issues**: Addressed by refining SSH configurations and ensuring all nodes had uninterrupted network access.
- **IP Address Conflicts**: Resolved through more robust DHCP server settings and regular monitoring to prevent address duplication.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

## <a id="p5"></a> V - Performance Challenges Due to Hardware Heterogeneity

During the deployment and operational testing of the multi-cluster environment, a significant performance issue was identified, stemming from the heterogeneous nature of the hardware used in the clusters. The clusters were composed of both Raspberry Pi 4 and Raspberry Pi Zero devices, which differ substantially in terms of computational power and capabilities.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

### <a id="p6"></a> VI - Technical Differences Between Raspberry Pi 4 and Raspberry Pi Zero

- ### <a id="p6a"></a> **Processor**: The Raspberry Pi 4 is equipped with a more powerful Broadcom BCM2711, Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz processor, whereas the Raspberry Pi Zero utilizes a much less powerful Broadcom BCM2835, Single-core CPU @ 1GHz.
- ### <a id="p6b"></a> **Memory**: Raspberry Pi 4 models come with multiple memory options up to 8GB of LPDDR4-3200 SDRAM, providing substantial multitasking capabilities, whereas the Raspberry Pi Zero has a fixed 512MB of LPDDR2 RAM, which limits its ability to handle complex or multiple simultaneous processes.
- ### <a id="p6c"></a> **Network Connectivity**: Raspberry Pi 4 includes full Gigabit Ethernet and dual-band Wi-Fi, enhancing its network throughput significantly compared to the Raspberry Pi Zero, which lacks onboard Ethernet and offers only 802.11 b/g/n wireless networking capabilities.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

### <a id="p7"></a> VII - Impact on Performance

The disparity in processor capabilities and memory between the Raspberry Pi 4 and Raspberry Pi Zero led to a drastic drop in overall cluster performance when tasks were distributed evenly across all 16 workers. Computational tasks that involved complex calculations and higher data throughput exhibited significant slowdowns when executed on the Raspberry Pi Zero nodes.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

### <a id="p8"></a> VIII - Load Distribution Adjustment

To mitigate the performance bottleneck and optimize overall system efficiency, a strategic decision was made to adjust the load distribution among the clusters:
- **80% of computational tasks were allocated to the Raspberry Pi 4 workers**. This distribution leverages their higher processing power and memory capabilities, ensuring that more resource-intensive tasks are handled more efficiently.
- **20% of the workload was assigned to the Raspberry Pi Zero workers**. This allocation is suitable for less demanding tasks, allowing the Raspberry Pi 4 nodes to focus on more compute-heavy processes without being bottlenecked by the slower Raspberry Pi Zero nodes.

This load distribution strategy not only addressed the immediate performance issues but also enhanced the operational stability and throughput of the entire multi-cluster environment.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

## <a id="p9"></a> IX - Conclusion

The deployment of this multi-cluster system demonstrates a cost-effective approach to building a scalable and efficient distributed computing environment using Raspberry Pi devices.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>
