Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS, Lucas DA SILVA FERREIRA<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="https://www.uvsq.fr/medias/photo/iut-velizy-villacoublay-logo-2020-ecran_1580904185110-jpg?ID_FICHE=214049" title="logo uvsq vélizy"/>

# SAÉ INF3-FI - Cluster installation

<br><br>
This document describes in detail the installation process of the RPi4 and RPi0 cluster and how it works..
<br>

</div>

<br><br><br><br><br><br><br>

---

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
  - [**d) Cluster test**](#p2d)


- ### [III - Cluster Installation](#p3)
- [**a) Starting the Cluster HAT**](#p3a)
- [**b) SSH Connection Between All Raspberry Pis**](#p3b)


- ### [IV - System Services for Automatic Shutdown](#p4)
  
- ### [V - Automation of Cluster Startup](#p5)

<br><br><br>

---

## <a name="p1"></a> I - Presentation

The RaspberryPi is a single-board microcomputer that appeared in February 2012.<br>
Apart from the power supply and a storage medium, it contains everything you need to make it work, such as a processor and RAM.
As with most computers, it features ports for connecting a screen, peripherals, power supply, camera or ethernet cable.
As with most computers, this one features ports for connecting a monitor, peripherals, power supply, camera or ethernet cable.

  - ### <a name="p1a"></a> a) RaspberryPi 4 presentation
    The RPi 4 is different from previous RPi models.<br>
    In processor terms, its CPU has newer cores (the Cortex-A72) and its GPU is 25% faster than previous models:<br>
    its maximum screen resolution is now 4K UltraHD. Its HDMI/Mini-HDMI port has been replaced by two micro HDMI ports.<br>
    As for RAM, which has been upgraded from LPDDR2 to LPDDR4, there are four versions of the RPi4: 1GB, 2GB, 8GB and 4GB, which is ours.<br>
    Two of its USB 2 ports have been replaced by two USB 3 ports, and in terms of network connectivity, the RPi4 boasts a better LAN port, Wi-Fi and Bluetooth.

    We can learn more about the features of our Raspberry Pi 4 by executing the Raspberry OS command: `pinout`<br>
    <br>
    <div align="center">
    <img width=350px src="img/img_installation_cluster/pinout.png" title="result of the pinout command with the different ports, a drawing of the board and a description of the pins"/><br>
    <i>result of pinout command</i>
    </div>
    <br>
    <br>
    As previously mentioned, the RPi 4 features an ARM Cortex-A72 processor. Although it's a 64-bit processor, it's part of the ARMv8 family and not the x86 family often found on our PCs.<br>
    ARM processors are mainly used for “compact devices and tend to optimize autonomy, size, cooling and, above all, cost”, according to RedHat. This corresponds to the RPi 4's criteria: to be an affordable microcomputer.<br>
    It should be noted, however, that according to RedHat, x86 architecture is used more for servers, for its speed. So, outside the scope of this CAS, using RaspberryPi as a server is not the best choice.<br>
    <br>
    Also note the “LP” prefix of “LPDDR4” as the RPi4's RAM type. “LP” for ‘Low Power’ is a smaller, less resource-hungry version of the simple DDR ‘Double Data Rate’.<br>
    DDR replaced SDRAM in the early 2000s thanks to its speed: “DDR transfers data to the processor in both the rising and falling phases of the clock signals”, according to Crucial.<br>
    Once again, it's a suitable component for compact devices like the RaspberryPi.
    
    <br><br>
    **Sources :**
    - https://www.jmdoudoux.fr/raspberry/raspberry_pi_4_modele_B.htm
    - https://www.conrad.fr/fr/guides/materiel-educatif-kits-de-developpement/raspberry-pi.html
    - https://fr.wikipedia.org/wiki/Raspberry_Pi
    - https://www.raspberrypi.com/products/raspberry-pi-4-model-b/
    - https://fr.wikipedia.org/wiki/ARM_Cortex-A72
    - https://www.redhat.com/fr/topics/linux/ARM-vs-x86
    - https://www.hardware.fr/news/13047/quelques-details-lpddr4-ddr4-wide-i-o.html
    - https://fr.msi.com/blog/ultra-thin-business-and-productivity-laptop-with-lpddr4x-memory
    - https://www.crucial.fr/articles/about-memory/difference-among-ddr2-ddr3-ddr4-and-ddr5-memory
    - https://fr.wikipedia.org/wiki/LPDDR

  - ### <a name="p1b"></a> b) RaspberryPi 0 presentation

    The Raspberry Pi Zero was released in November 2015, so it came out before the RPi4 B.<br>
    It is a bit smaller and has fewer connectivity ports. For example, it has no Ethernet port and only 1 USB port (compared to 5 on the RPi4). It also has a mini HDMI port instead of a micro HDMI.<br>
    The Raspberry Pi Zero is less powerful than the RPi4: it has 512MB of RAM (compared to 4GB), and its processor has 1 core (compared to 4) and is clocked at 1GHz (compared to 1.5GHz on the RPi4).<br>
    Other information :<br>
    - GPU : VideoCore IV (compared to VideoCore VI)
    - SOC Type : Broadcom BCM2835 (compared to Broadcom BCM2711)
    - Core Type : ARM1176JZF-S (compared to Cortex-A72 (ARM v8) 64-bit)
    
    <br><br>
    **Sources :**
    - https://socialcompare.com/fr/review/raspberry-pi-zero
    - https://socialcompare.com/fr/review/raspberry-pi-4
    - https://www.raspberrypi.com/products/raspberry-pi-zero/

  - ### <a name="p1c"></a> c) RaspberryPi Hat presentation

    The Raspberry Pi Hat is an extension board for the RPi 4 and the RPi Zero, which connects to the GPIO port.<br>
    With it, we can connect four RPi Zeros to the RPi 4: the Hat serves as a bridge. Moreover, we can control the Hat using commands.<br>


  - ### <a name="p1d"></a> d) CNAT image presentation

    The CNAT Image is based on RaspberryPi OS Lite, the without graphical interface version of RPi OS.<br>
    The RPi OS Lite is a version enabling to start the RPi4 without display, keyboard or mouse. This version is dedicated for server.<br>
    RaspberryPi OS is based on the free operating system Debian, and it specially designed for the RaspberryPi and has commands for it.<br>
    <br>

    The issue with the original Raspberry Pi     OS Lite image is that it does not include the commands necessary to control the RaspberryPi Hat, such as `clusterhat` (also known as `clusterctrl`).
    For example, this prevents us from starting a Raspberry Pi Zero.<br>
    While we can manually install the command from a GitHub repository, the easiest solution is to use the CBRIDGE or CNAT image, which already include these commands.<br>
    The difference between the CBRIDGE and CNAT images is that the CNAT image can automatically recognize a Raspberry Pi Zero thanks to the additional images "P1", "P2", "P3", and "P4".
    Each PX image is dedicated to one specific Raspberry Pi Zero, where PX refers to the USB port on the Raspberry Pi Hat used to connect a Raspberry Pi Zero.<br>
    Additionally, with the `clusterhat` command, we can start a specific Raspberry Pi Zero by referring to its PX name.<br>
    <br>
    The CNAT image is regularly updated. Our version is from 2024, but there is also a 2020 version, which does not take custom settings from the Pi Imager into account.<br>

    <br><br>
    **Sources :**
    - https://www.raspberrypi.com/documentation/
    - https://raspberrytips.fr/raspberry-pi-os-versions/
    - https://alain-michel.canoprof.fr/eleve/tutoriels/raspberry/premiers-pas-raspberrypi/activities/utiliser-raspi-config.html
    - https://www.macg.co/ailleurs/2023/10/les-raspberry-pi-passent-bookworm-pour-le-nouvel-os-139771
    - https://clusterctrl.com/setup-software

<br><br><br>

---

## <a name="p2"></a> II - Preparations

  - ### <a name="p2a"></a> a) Equipment requirements

    To install the system, you need to have :

      - **1 RaspberryPi 4 and 4 RaspberryPi 0 and its power supply**.
        Mr Hoguin has entrusted us with a RaspberryPi 4 model B. This is a microcomputer to be handled with care. It is not housed in a case.
        Les 4 autres RPi0 se branchent sur le RPiHat.
        Its power supply is connected to the RPi4 via its USB type C port.

      - **1 RaspberryPi Hat**
        Connect the 4 RPi0s to it, connect it to the RPi4 via its micro USB port and place it on the RPi4 via its GPIO port.

      - **5 microSD cards**
        The RPi is reputed to be a micro SD card killer. We therefore need to archive the entire contents of these cards on a regular basis.

      - **HDMI cable, HDMI-Micro HDMI adapter, HDMI-VGA adapter** The RPi4 connects via micro HDMI.**
        The RPi4 connects via micro HDMI. Having an HDMI cable, an adapter was required.

      - **A computer keyboard**
        A basic USB-connected computer keyboard is all that's needed.
   
<br>

  - ### <a name="p2b"></a> b) Software requirements

    To install a system on a dedicated RaspberryPi support, the easiest way is to use the “Pi Imager” software.<br>


- ### <a name="p2c"></a> c) Installation of images

  From the “Choisir OS” button, Pi Imager proposes different systems that can be installed. You can also install your own system, which is what we're going to do.<br>

    <br><br>

    <div align="center">
        <img src="img\img_installation_cluster\0_piimager_menu.webp" title="Pi Imager menu with OS choice, Storage choice, Write buttons and a parameter button" height="220"/><br>
        <i>Menu de Pi Imager</i>
    </div>
  
    <br>

    Once you've selected the system, a small gear button appears, allowing you to configure the installation of the image.<br>
    Here you can give the RaspberryPi a name, activate SSH, change the default user login and password, configure Wi-Fi, keyboard and time zone.<br>
    We've configured the installation to suit our needs. This can be done later with the `raspi-config` command.<br>
    <br>
    The three checkboxes at the bottom are not very important.<br>
    Telemetry corresponds to sending pings to raspberry.org for static purposes. It's useless, it doesn't restrict the use of the system, so we've disabled it to avoid being monitored.<br>
    <br><br>

    <div align="center">
        <img src="img\img_installation_cluster\1_piimager_option.webp" title="Pi Imager installation options" height="220"/><br>
        <i>Options d'installation de Pi Imager</i>
    </div>

    <br>

    Once done, simply select the right reader and flash the microSD card. It's quite quick, and the microSD card is immediately operational.<br>
    Note: the 2020 image does not take custom settings into account.
    <br><br>
    **Source :**
    - https://framboise-pi.skyost.eu/article/maitriser-raspberry-pi-imager/

<br><br><br>

---

## <a name="p3"></a> III - Cluster Installation

- ### <a name="p3a"></a> a) Starting the Cluster HAT
This report documents the process of installing and configuring a Cluster HAT (version 2.5) composed of 4 Raspberry Pi Zero connected to a Raspberry Pi 4, on which a CNAT image is deployed.<br>
#### 1.1 Activating the Cluster HAT
- **Executed Command**:  
  ```bash
  clusterhat on
  ```
- **Description**:  
  This command activates the Cluster HAT, allowing the Raspberry Pi Zero to connect to the Raspberry Pi 4. At this stage, the USB interfaces (usb0, usb1, usb2, usb3) are established.

#### 1.2 Configuring the `brint` Network Interface
- **Executed Commands**:  
  ```bash
  sudo ifdown brint && sudo ifup brint
  ```
- **Observation**:  
  No output or visible effect was observed. This lack of response suggests that the `brint` interface is not yet active or correctly configured.

#### 1.3 Editing the Configuration File
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
  This file configures the `brint` interface as a network bridge, assigning it the IP address `172.19.181.254` and integrating the USB interfaces of the Raspberry Pi Zero. This facilitates the management of these devices through the Raspberry Pi 4.

---


- ### <a name="p3a"></a> b) SSH Connection Between All Raspberry Pis

#### Explanation of `brint` and `br0`

##### `brint`
- **Definition**: `brint` is a bridge interface that we created to group multiple network interfaces (in this case, the USB interfaces of the Raspberry Pi Zero) into a single logical interface.
  
- **Functionality**: 
  - With `brint`, we enable all connected Raspberry Pi Zero devices via USB to operate as if they are on the same local network. This facilitates communication between the Raspberry Pi 4, which manages the cluster, and the Raspberry Pi Zero devices.
  - By grouping the USB interfaces into a single bridge, `brint` simplifies network management, allowing us to assign an IP address to the bridge interface instead of each individual interface.

- **Usage**: 
  - When we configure `brint`, we allow all connected devices to communicate directly. This is especially useful in a cluster environment, where devices need to collaborate and exchange data without latency due to network configuration.

##### `br0`
- **Definition**: `br0` is typically the first default bridge interface in many Linux network configurations. If we have another bridge network configured on our system, it might be named `br0`.

- **Functionality**:
  - Like `brint`, `br0` allows for the grouping of multiple network interfaces, including Ethernet interfaces, Wi-Fi, or other bridge interfaces.
  - We often use `br0` to establish network connections in virtual environments or advanced network configurations, where multiple networks need to be interconnected.

- **Usage**: 
  - In a typical setup, we might see `br0` used to link virtual machines to a physical network, allowing VMs to access the Internet or communicate with each other on the same local network.

#### Viewing `brint` and `br0`
We can view the configured bridge interfaces, including `brint` and `br0`, by executing the following command:
```bash
ip addr
```
This command lists all network interfaces and their assigned IP addresses, allowing us to confirm that `brint` is properly configured with the desired address.

---

#### 2.1 Connectivity Test with `ping`
- **Executed Command**:  
  ```bash
  ping 172.19.181.1
  ```
- **Observation**:  
  The ping test did not succeed, indicating a connectivity issue between the Raspberry Pi 4 and the Raspberry Pi Zero at the specified address. This suggests that the `brint` bridge or the USB interfaces are not fully operational at this stage.

#### 2.2 SSH Connection
- **Executed Command**:  
  ```bash
  ssh bapti@172.19.181.1
  ```
- **Observation**:  
  We successfully established the SSH connection. This success indicates that network communication has been restored, allowing the Raspberry Pi 4 to connect to the Raspberry Pi Zero.

#### 2.3 New Connectivity Test with `ping`
- **Executed Command**:  
  ```bash
  ping 172.19.181.1
  ```
- **Observation**:  
  This time, the ping test succeeded. This shows that the network route has been properly configured after the SSH connection, and the `brint` bridge is now functioning as expected.

---

## <a name="p4"></a> IV - System Service for Automatic Shutdown

To ensure that the Cluster HAT shuts down automatically when the Raspberry Pi 4 is powered off, we can create a systemd service. This service will trigger the necessary commands to power down the Cluster HAT along with the Raspberry Pi 4. This ensures that the Cluster HAT does not remain active after the main system has shut down, conserving energy and reducing wear on the devices.

### 4.1 Creating the systemd Service

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

---

## <a name="p5"></a> V - Automation of Cluster Startup

Modify the `rc.local` file to include commands that turn on the Cluster HAT automatically when the Raspberry Pi 4 boots up. This ensures that the cluster is immediately operational after a restart without manual intervention.

### 5.1 Modifying the `rc.local` File

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
