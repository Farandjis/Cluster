Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF2-A


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
  - [**a) Equipment requirements **](#p2a)
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

  - ### <a name="p1d"></a> d) CNAT image presentation

    RaspberryPi OS Lite est la version de RaspberryPi OS sans interface graphique.<br>
    Cette version permet de démarrer le RPi4 sans écran, sans clavier et sans souris. Elle pèse près de 600 Mo, c'est donc le système idéal pour notre serveur.<br>
    Bien que nous savons utiliser le terminal, le cas échéant, il est toujours possible d'ajouter une interface graphique à Raspberry OS Lite.<br>
    <br>
    RaspberryPi OS est fondé sur le système d'exploitation gratuit Debian et est conçu spécialement pour le RaspberryPi.<br>
    En effet, au lancement de Raspbian, l'ancien nom de l'OS, Debian n'était pas disponible pour la famille de processeur du RaspberryPi : l'ARMv6.<br>
    Vu que ce système d'exploitation est dédié au RaspberryPi, il comporte des commandes dédiées au micro-ordinateur comme "raspi-config" ou encore "pinout" cité plus tôt.<br>
    Ubuntu étant aussi issu sur Debian, nous pouvons aussi bien s'aider de la documentation de Raspberry OS, que celle de Debian ou celle d'Ubuntu.<br>
    Pour notre serveur de secours, nous utiliserons Ubuntu Server. L'installation du serveur LAMP et de LogMeIn Hamachi reste pratiquement la même.<br>

    <br><br>
    **Sources :**
    - https://www.raspberrypi.com/documentation/
    - https://raspberrytips.fr/raspberry-pi-os-versions/
    - https://alain-michel.canoprof.fr/eleve/tutoriels/raspberry/premiers-pas-raspberrypi/activities/utiliser-raspi-config.html
    - https://www.macg.co/ailleurs/2023/10/les-raspberry-pi-passent-bookworm-pour-le-nouvel-os-139771

<br><br><br>

---

## <a name="p2"></a> II - Préparatif

  - ### <a name="p2a"></a> a) Matériels nécessaires
    Pour utiliser le RPi4 sur le même écran de son ordinateur tout en l'utilisant, on peut utiliser un boîtier d'acquisition.<br>
    C'est un adaptateur HDMI vers USB, permettant de récupérer le signal vidéo sur son ordinateur. Utile pour enregistrer l'écran du RPi4 par exemple.<br>

    <br>
    Pour procéder à l'installation du système, il faut au préalable avoir :<br><br>

    - **Un RaspberryPi et son alimentation**<br>
      Monsieur Hoguin nous a confié un RaspberryPi 4 modèle B. C'est un micro-ordinateur à manipuler avec précaution. En effet, il n'est pas dans un boîtier.<br>
      Son alimentation se branche au RPi4 via son port USB type C.<br><br>
    
    - **Une carte microSD**<br>
      Monsieur Hoguin nous a donné une carte micro SD Verbatim de 16Go.<br>
      Le RPi4 est réputé comme étant un tueur de carte micro SD. Nous devons donc archiver régulièrement l'intégralité du contenu de cette carte.<br><br>
    
    - **Un câble HDMI et son adaptateur vers micro HDMI**<br>
      Le RPi4 se branche en micro HDMI. Ayant un câble HDMI, un adaptateur était nécessaire. Il nous a coûté 3€ à la FNAC.<br><br>
  
    - **Un clavier d'ordinateur**<br>
      Un clavier d'ordinateur basique se branchant en USB suffit.<br><br>
    
    - **Un câble ethernet** (préférable)<br>
      Brancher un câble ethernet permet de vérifier grâce aux leds que le RPi4 soit bien connecté au réseau.<br>
      On peut aussi connecter le RPi4 en Wi-Fi. Mais grâce au câble nous sommes assurés de ne pas accuser la connexion si on rencontre des problèmes dans la plupart des cas.

<br>

  - ### <a name="p2b"></a> b) Logiciels nécessaires

    Pour installer un système sur un support dédié au RaspberryPi, le plus simple est d'utiliser le logiciel "Pi Imager".<br>

    <br>
    En-dehors du logiciel Pi Imager, vu que nous possédons un boîtier d'acquisition, nous allons utiliser les logiciels VLC et Mirillis Action!.<br>
    VLC permettra d'afficher sur son ordinateur la sortie vidéo du boîtier provenant du RPi4, et Action! permettra en même temps d'enregistrer celui-ci et même le bureau Windows.<br>
    Grâce aux vidéos, nous pouvons décrire précisément l'installation du système et la résolution des problèmes rencontrés.<br>
    Des captures d'écran de ces vidéos illustrent ce document.<br>

    <br><br>

    <div align="center">
       <img src="img\II_preparatif\vlc.webp" title="VLC sur Windows 10 affichant l'écran du RPi4 installant PHPMyAdmin" height="220"/><br>
       <i>VLC affichant l'écran du RPi4 sur Windows 10</i>
    </div>


- ### <a name="p2c"></a> c) Installation de Raspberry OS Lite

    À partir du bouton "Choisir l'OS", Pi Imager propose différents systèmes pouvant être installé. On peut aussi installer son propre système.<br>
    Nous avons choisi Raspberry OS Lite pour les raisons évoqué lors de la présentation de ce système.

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
