Florent VASSEUR-BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS, Lucas DA SILVA FERREIRA  
INF3-FI

<div align="center">
<img height="95" width="400" src="https://www.uvsq.fr/medias/photo/iut-velizy-villacoublay-logo-2020-ecran_1580904185110-jpg?ID_FICHE=214049" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Cluster Installation

---

<br>
This document describes in detail the installation process of the RPi4 and RPi0 cluster and how it works.
<br>

</div>

<br><br><br><br><br><br><br>

---

<a id="summary">

## Plan

- ### [I – Presentation](#p1)
    - [**a) RaspberryPi 4 presentation**](#p1a)
    - [**b) RaspberryPi 0 presentation**](#p1b)
    - [**c) RaspberryPi Hat presentation**](#p1c)
    - [**d) CNAT image presentation**](#p1d)
      - Contains: explanation of the problems encountered.

- ### [II – Preparations](#p2)
  - [**a) Equipment requirements**](#p2a)
  - [**b) Software requirements**](#p2b)
  - [**c) Installation of images**](#p2c)

- ### [III - Cluster Installation](#p3)
  - [**a) Starting the Cluster HAT**](#p3a)
  - [**b) SSH Connection Between All Raspberry Pis**](#p3b)

- ### [IV - System Services for Automatic Shutdown](#p4)
  - [**a) Creating the systemd Service**](#p4a)

- ### [V - Automation of Cluster Startup](#p5)
  - [**a) Modifying the `rc.local` File**](#p5a)

---

### <a id="p1"></a> I - Presentation

The RaspberryPi is a single-board microcomputer that appeared in February 2012.<br>
It features ports for connecting a monitor, peripherals, power supply, camera or ethernet cable.

  - #### <a id="p1a"></a> a) RaspberryPi 4 presentation
    The RPi 4 has improved CPU cores (Cortex-A72) and a GPU 25% faster than previous models. Its maximum screen resolution is now 4K UltraHD. Its HDMI/Mini-HDMI port has been replaced by two micro HDMI ports.<br>
    The RAM has been upgraded from LPDDR2 to LPDDR4. There are four versions of the RPi4: 1GB, 2GB, 8GB and 4GB. Two of its USB 2 ports have been replaced by two USB 3 ports, and it boasts better network connectivity.

    <div align="center">
    <img width=350px src="img/img_installation_cluster/pinout.png" title="result of the pinout command with the different ports, a drawing of the board and a description of the pins"/><br>
    <i>result of pinout command</i>
    </div>
    <br>
    <br>
    The RPi 4 uses an ARM Cortex-A72 processor, which is optimized for compact devices. The RAM type, “LPDDR4”, indicates 'Low Power' usage, making it suitable for devices like the RaspberryPi.

    <br><br>
    **Sources :**
    - [https://www.jmdoudoux.fr/raspberry/raspberry_pi_4_modele_B.htm](https://www.jmdoudoux.fr/raspberry/raspberry_pi_4_modele_B.htm)
    - [https://www.conrad.fr/fr/guides/materiel-educatif-kits-de-developpement/raspberry-pi.html](https://www.conrad.fr/fr/guides/materiel-educatif-kits-de-developpement/raspberry-pi.html)
    - [https://www.raspberrypi.com/products/raspberry-pi-4-model-b/](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
    - [https://www.redhat.com/fr/topics/linux/ARM-vs-x86](https://www.redhat.com/fr/topics/linux/ARM-vs-x86)
    - [https://www.crucial.fr/articles/about-memory/difference-among-ddr2-ddr3-ddr4-and-ddr5-memory](https://www.crucial.fr/articles/about-memory/difference-among-ddr2-ddr3-ddr4-and-ddr5-memory)

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

  - #### <a id="p1b"></a> b) RaspberryPi 0 presentation

    The Raspberry Pi Zero, released in November 2015, is smaller and has fewer connectivity ports than the RPi4. It has 512MB of RAM and its processor is clocked at 1GHz.

    <br><br>
    **Sources :**
    - [https://www.raspberrypi.com/products/raspberry-pi-zero/](https://www.raspberrypi.com/products/raspberry-pi-zero/)

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

  - #### <a id="p1c"></a> c) RaspberryPi Hat presentation

    The Raspberry Pi Hat connects four RPi Zeros to the RPi 4, acting as a bridge. It allows control of the cluster using commands.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

  - #### <a id="p1d"></a> d) CNAT image presentation

    The CNAT Image is based on RaspberryPi OS Lite, designed for server use without a graphical interface. It includes commands necessary for controlling the RaspberryPi Hat.

    <br><br>
    **Sources :**
    - [https://www.raspberrypi.com/documentation/](https://www.raspberrypi.com/documentation/)
    - [https://raspberrytips.fr/raspberry-pi-os-versions/](https://raspberrytips.fr/raspberry-pi-os-versions/)

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

### <a id="p2"></a> II - Preparations

  - #### <a id="p2a"></a> a) Equipment requirements

    To install the system, you need a RaspberryPi 4 and 4 RaspberryPi 0s, a RaspberryPi Hat, and 5 microSD cards.

  - #### <a id="p2b"></a> b) Software requirements

    The “Pi Imager” software is used for system installation on RaspberryPi supports.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

  - #### <a id="p2c"></a> c) Installation of images

    Pi Imager allows for the installation of various systems. It provides options for configuring installation settings.

      <div align="center">
          <img src="img\img_installation_cluster\0_piimager_menu.webp" title="Pi Imager menu with OS choice, Storage choice, Write buttons and a parameter button" height="220"/><br>
          <i>Menu de Pi Imager</i>
      </div>
  
      <div align="center">
          <img src="img\img_installation_cluster\1_piimager_option.webp" title="Pi Imager installation options" height="220"/><br>
          <i>Options d'installation de Pi Imager</i>
      </div>

      <br><br>
      **Source :**
      - [https://framboise-pi.skyost.eu/article/maitriser-raspberry-pi-imager/](https://framboise-pi.skyost.eu/article/maitriser-raspberry-pi-imager/)

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

### <a id="p3"></a> III - Cluster Installation

- #### <a id="p3a"></a> a) Starting the Cluster HAT
    This report documents the process of installing and configuring a Cluster HAT (version 2.5) composed of 4 Raspberry Pi Zero connected to a Raspberry Pi 4, on which a CNAT image is deployed.<br>
  - ##### 1.1 Activating the Cluster HAT
    - **Executed Command**:  
      ```bash
      clusterhat on
      ```
    - **Description**:  
      This command activates the Cluster HAT, allowing the Raspberry Pi Zero to connect to the Raspberry Pi 4. At this stage, the USB interfaces (usb0, usb1, usb2, usb3) are established.

  - ##### 1.2 Configuring the `brint` Network Interface
    - **Executed Commands**:  
      ```bash
      sudo ifdown brint && sudo ifup brint
      ```
    - **Observation**:  
      No output or visible effect was observed. This lack of response suggests that the `brint` interface is not yet active or correctly configured.

  - ##### 1.3 Editing the Configuration File
    - **Executed Command**:  
      ```bash
      sudo nano /etc/network/interfaces.d/brint
      ```
    - **Configuration Added**:
      ```plaintext
      auto brint
      iface brint inet static
      address 172.19.181.254
      netmask 255.255.255.0
      bridge_ports usb0 usb1 usb2 usb3
      ```
    - **Description**:  
      This file configures the `brint` interface as a network bridge, assigning it the IP address `172.19.181.254` and integrating the USB interfaces of the Raspberry Pi Zero. This facilitates the management of these devices through the
    Raspberry Pi 4.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

- #### <a id="p3b"></a> b) SSH Connection Between All Raspberry Pis

    #### Explanation of `brint` and `br0`
    
    - ##### `brint`
      - **Definition**: `brint` is a bridge interface that groups multiple network interfaces into a single logical interface.
      
      - **Functionality**: 
        - `brint` enables all connected Raspberry Pi Zero devices via USB to operate as if they are on the same local network. This facilitates communication between the Raspberry Pi 4, which manages the cluster, and the Raspberry Pi Zero devices.
    
      - **Usage**: 
        - `brint` simplifies network management, allowing an IP address to be assigned to the bridge interface instead of each individual interface.
    - ##### `br0`
      - **Definition**: `br0` is typically the first default bridge interface in many Linux network configurations.

      - **Functionality**:
        - `br0` allows for the grouping of multiple network interfaces, including Ethernet interfaces, Wi-Fi, or other bridge interfaces.

      - **Usage**: 
        - `br0` is often used to link virtual machines to a physical network, allowing VMs to access the Internet or communicate with each other on the same local network.

    - #### Viewing `brint` and `br0`
      - We can view the configured bridge interfaces, including `brint` and `br0`, by executing the following command:
        ```bash
        ip addr
        ```
        This command lists all network interfaces and their assigned IP addresses, allowing us to confirm that `brint` is properly configured with the desired address.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

- #### 2.1 Connectivity Test with `ping`
  - **Executed Command**:  
    ```bash
    ping 172.19.181.1
    ```
  - **Observation**:  
    The ping test did not succeed, indicating a connectivity issue between the Raspberry Pi 4 and the Raspberry Pi Zero at the specified address. This suggests that the `brint` bridge or the USB interfaces are not fully operational at this stage.

- #### 2.2 Brint Reset
  - **Executed Command**:  
    ```bash
    sudo ifdown brint && sudo ifup brint
    ```
  - **Observation**:  
    We successfully established the SSH connection. This success indicates that network communication has been restored, allowing the Raspberry Pi 4 to connect to the Raspberry Pi Zero.

- #### 2.3 New Connectivity Test with `ping`
  - **Executed Command**:  
    ```bash
    ping 172.19.181.1
    ```
  - **Observation**:  
    This time, the ping test succeeded. This shows that the network route has been properly configured after the SSH connection, and the `brint` bridge is now functioning as expected.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---

### <a id="p4"></a> IV - System Service for Automatic Shutdown

To ensure that the Cluster HAT shuts down automatically when the Raspberry Pi 4 is powered off, we can create a systemd service. This service will trigger the necessary commands to power down the Cluster HAT along with the Raspberry Pi 4. This ensures that the Cluster HAT does not remain active after the main system has shut down, conserving energy and reducing wear on the devices.

- #### <a id="p4a"></a>4.1 Creating the systemd Service

  1. **Create a New Service File**:
     ```bash
     sudo nano /etc/systemd/system/clusterhat-shutdown.service
     ```

  2. **Add the Following Content to the Service File**:
     ```ini
     [Unit]
     Description=Shutdown Cluster HAT Pi Zeros on system shutdown
     DefaultDependencies=no
     Before=shutdown.target reboot.target halt.target

     [Service]
     Type=oneshot
     ExecStart=/usr/sbin/clusterhat off all
     RemainAfterExit=yes

     [Install]
     WantedBy=halt.target reboot.target shutdown.target
     ```

  3. **Enable and Start the Service**:
     ```bash
     sudo systemctl enable clusterhat-shutdown.service
     sudo systemctl start clusterhat-shutdown.service
     ```

  4. **Testing the Service**:
     - Shut down your Raspberry Pi 4 to verify that the Cluster HAT and all connected Raspberry Pi Zero devices also shut down.

  5. **Troubleshooting**:
     - If the Cluster HAT does not shut down as expected, check the logs to diagnose any issues:
       ```bash
       sudo journalctl -u clusterhat-shutdown.service
       ```
     - Ensure that the path to the `clusterhat` command is correct and that the service is configured to execute before the system shutdown processes begin.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>

---
### <a id="p5"></a> V - Automation of Cluster Startup

Modify the `rc.local` file to include commands that turn on the Cluster HAT automatically when the Raspberry Pi 4 boots up. This ensures that the cluster is immediately operational after a restart without manual intervention.

- #### <a id="p5a"></a>5.1 Modifying the `rc.local` File

  1. **Open the `rc.local` File**:
        ```bash
        sudo nano /etc/rc.local
        ```

  2. **Add the Following Lines Before `exit 0`**:
       ```bash
       /usr/sbin/clusterhat on
       sleep 10  # Gives time for Cluster HAT to activate properly
       sudo ifdown brint
       sudo ifup brint
       ```

  3. **Save and Close the File**:
     - Ensure that `rc.local` is executable:
       ```bash
       sudo chmod +x /etc/rc.local
       ```

  4. **Testing the Setup**:
     - Reboot your Raspberry Pi 4 to verify that the Cluster HAT turns on and that the network interfaces (`brint`) are configured correctly automatically.

<div align="right">
    <a href="#summary">⮐ return to summary</a>
</div>
