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

## System Overview

**Hardware Components**:
- **Master Nodes**: Two Raspberry Pi 4 devices, each serving as the central control unit for each cluster.
- **Worker Nodes**: Eight Raspberry Pi Zero devices per cluster, totaling 16 workers, providing computational power for distributed tasks.

**Networking Setup**:
- Utilizes a dynamic DHCP configuration similar to mobile devices, allowing for automatic IP management which simplifies network administration and enhances scalability.

---

## Equipment and Configuration

### Hardware Setup
- Each cluster consists of one Raspberry Pi 4 and four Raspberry Pi Zeros connected through a managed switch that facilitates network communication.
- Power supplies are configured to ensure stable and continuous power delivery to all devices without overloading the electrical infrastructure.

### Software Configuration
- **Operating System**: A lightweight Linux distribution optimized for network performance and low overhead to maximize the computational capabilities of the hardware.
- **Cluster Management**: Configuration management tools are employed to maintain consistency in software deployment across all nodes.

---

## Network Configuration

- **DHCP Configuration**: All devices are set to acquire IP addresses dynamically from a centralized DHCP server, which records and assigns IP addresses to avoid conflicts and ensure proper network mapping.
- **SSH Configuration**: SSH keys are generated and distributed to each node to facilitate secure, passwordless access, essential for remote management and automation.

---

## Testing and Validation

### Connectivity Tests
- **Network and SSH Functionality**: Verified through ICMP echo requests and SSH login attempts to ensure all nodes are reachable and responsive.
- **MPI Execution Test**: Utilized to confirm correct network configuration and operational readiness of the MPI environment across all nodes.

### Advanced Network Configuration Testing
- **Network Performance**: Tools such as `iperf` and `nuttcp` were used to measure latency and throughput, providing insights into the network’s performance under different load conditions.

### Load Testing
- Distributed computational tasks were executed to assess the performance and stability of the system under simulated workloads, focusing on optimizing resource allocation and job scheduling.

### System Optimization
- **Kernel and Network Tuning**: Adjustments were made to the system’s kernel and network settings to minimize latency and maximize throughput.
- **Resource Management**: System limits for resources like CPU, memory, and I/O were optimized to ensure efficient utilization under peak loads.

---

## Challenges and Resolutions

- **Intermittent MPI Communication Issues**: Addressed by refining SSH configurations and ensuring all nodes had uninterrupted network access.
- **IP Address Conflicts**: Resolved through more robust DHCP server settings and regular monitoring to prevent address duplication.

---

## Performance Challenges Due to Hardware Heterogeneity

During the deployment and operational testing of the multi-cluster environment, a significant performance issue was identified, stemming from the heterogeneous nature of the hardware used in the clusters. The clusters were composed of both Raspberry Pi 4 and Raspberry Pi Zero devices, which differ substantially in terms of computational power and capabilities.

### Technical Differences Between Raspberry Pi 4 and Raspberry Pi Zero

- **Processor**: The Raspberry Pi 4 is equipped with a more powerful Broadcom BCM2711, Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz processor, whereas the Raspberry Pi Zero utilizes a much less powerful Broadcom BCM2835, Single-core CPU @ 1GHz.
- **Memory**: Raspberry Pi 4 models come with multiple memory options up to 8GB of LPDDR4-3200 SDRAM, providing substantial multitasking capabilities, whereas the Raspberry Pi Zero has a fixed 512MB of LPDDR2 RAM, which limits its ability to handle complex or multiple simultaneous processes.
- **Network Connectivity**: Raspberry Pi 4 includes full Gigabit Ethernet and dual-band Wi-Fi, enhancing its network throughput significantly compared to the Raspberry Pi Zero, which lacks onboard Ethernet and offers only 802.11 b/g/n wireless networking capabilities.

### Impact on Performance

The disparity in processor capabilities and memory between the Raspberry Pi 4 and Raspberry Pi Zero led to a drastic drop in overall cluster performance when tasks were distributed evenly across all 16 workers. Computational tasks that involved complex calculations and higher data throughput exhibited significant slowdowns when executed on the Raspberry Pi Zero nodes.

### Load Distribution Adjustment

To mitigate the performance bottleneck and optimize overall system efficiency, a strategic decision was made to adjust the load distribution among the clusters:
- **80% of computational tasks were allocated to the Raspberry Pi 4 workers**. This distribution leverages their higher processing power and memory capabilities, ensuring that more resource-intensive tasks are handled more efficiently.
- **20% of the workload was assigned to the Raspberry Pi Zero workers**. This allocation is suitable for less demanding tasks, allowing the Raspberry Pi 4 nodes to focus on more compute-heavy processes without being bottlenecked by the slower Raspberry Pi Zero nodes.

This load distribution strategy not only addressed the immediate performance issues but also enhanced the operational stability and throughput of the entire multi-cluster environment.

## Conclusion

The deployment of this multi-cluster system demonstrates a cost-effective approach to building a scalable and efficient distributed computing environment using Raspberry Pi devices.
