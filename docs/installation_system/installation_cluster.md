Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI


<div align="center">
<img height="95" width="400" src="../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

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
    <img width=350px src="img/I_presentation/pinout.png" title="result of the pinout command with the different ports, a drawing of the board and a description of the pins"/><br>
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

    The issue with the original Raspberry Pi OS Lite image is that it does not include the commands necessary to control the RaspberryPi Hat, such as `clusterhat` (also known as `clusterctrl`).
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

    À partir du bouton "Choisir l'OS", Pi Imager propose différents systèmes pouvant être installé. On peut aussi installer son propre système, ce que l'on va faire.<br>

    <br><br>

    <div align="center">
        <img src="img\II_preparatif\0_piimager_menu.webp" title="Menu de Pi Imager avec les boutons choix OS, choix Stockage, écrire et un bouton paramètre" height="220"/><br>
        <i>Menu de Pi Imager</i>
    </div>
  
    <br>

    Une fois avoir sélectionné le système, un petit bouton engrenage apparaît pour paramétrer l'installation de RaspberryPi OS Lite.<br>
    On peut y donner un nom à l'ordinateur, activer SSH, modifier le login et le mot de passe de l'utilisateur par défaut, configurer le Wi-Fi, le clavier ou encore le fuseau horaire.<br>
    Nous avons configuré l'installation par rapport à notre besoin. Il est tout à fait possible de le faire plus tard avec la commande `raspi-config`.<br>
    <br>
    Les trois cases à cocher tout en bas ne sont pas très importante.<br>
    La télémétrie correspond à l'envoi de pings à raspberry.org pour des fins de statiques, c'est inutile, ça ne restreint pas l'utilisation du système, nous l'avons donc désactivé pour ne pas être surveillés.<br>
    <br><br>

    <div align="center">
        <img src="img\II_preparatif\1_piimager_option.webp" title="Les options d'installation de Pi Imager" height="220"/><br>
        <i>Options d'installation de Pi Imager</i>
    </div>

    <br>

    Une fois fait, il suffit de sélectionner le bon lecteur et de flasher la carte microSD. C'est assez rapide, et la carte microSD est immédiatement opérationnel.

    <br><br>
    **Source :**
    - https://framboise-pi.skyost.eu/article/maitriser-raspberry-pi-imager/

<br><br><br>

---
