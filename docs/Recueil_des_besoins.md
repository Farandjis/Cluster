Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S3 - Recueil des besoins

<br><br>
This document contains all the important information we need to know in order to successfully complete this project.

</div>


<br><br><br><br><br><br><br>

## Plan

### [I – Objective and Scope](#p1)
- <b>[a) What are the scope and general objectives?](#p1a)</b>
- <b>[b) Review of the project brief](#p1b) </b>
    - <u>[i. List of objects, actors, and actions](#p1bi) </u>
    - <u>[ii. The different levels](#p1bii) </u>
    - <u>[iii. A descriptive diagram of the levels](#p1biii) </u>
    - <u>[iiii. Use case diagram](#p1biiii) </u>
### [II – Terminology / Glossary](#p2)
### [III – Use Cases](#p3)
- <b>[a) Main actors and their general objectives](#p3a).</b>
- <b>[b) Business use cases (operational concepts).](#p3b)</b>
- <b>[c) Strategic use cases.](#p3c)</b>
- <b>[d) User and system use cases.](#p3d)</b>
### [IV – Technology Used](#p4)
- <b>[a) What are the technological requirements for this system?](#p4a)</b>
- <b>[b) With which systems will this system interface, and with what requirements?](#p4b)</b>
- <b>[c) What hardware is used to support the system?](#p4c)</b>
### [V – Other Requirements](#p5)
- <b>[a) Development process](#p5a)</b>
    - <u>[i. Who are the project participants?](#p5ai)</u>
    - <u>[ii. What values should be prioritized? (e.g., simplicity, availability, speed, flexibility, etc.)](#p5aii)</u>
    - <u>[iii. What feedback or visibility do users and sponsors expect on the project?](#p5aiii)</u>
    - <u>[iv. What can be purchased? What must be built? Who are our competitors?](#p5aiv)</u>
    - <u>[v. What are the other process requirements? (e.g., testing, installation, etc.)](#p5av)</u>
    - <u>[vi. What dependencies does the project have?](#p5avi)</u>
- <b>[b) Performance](#p5b)</b>
- <b>[c) Operations, security, documentation](#p5c)</b>
- <b>[d) Usability and user-friendliness](#p5d)</b>
- <b>[e) Maintenance and portability](#p5e)</b>
### [VI – Human Resources, Legal, Political, and Organizational Issues](#p6)
- <b>[a) What human resources are needed for system operation?](#p6a)
- <b>[b) What are the legal and political requirements?](#p6b)</b>
- <b>[c) What are the human consequences of implementing the system?](#p6c)</b>
- <b>[d) What are the training needs?](#p6d)</b>
- <b>[e) What assumptions and dependencies affect the human environment?](#p6e)</b>
### [VII - Project Management and Organization](#p7)
- <b>[a) Roles and responsibilities](#p7a)
- <b>[b) Life cycle](#p7b)</b>
- <b>[c) Task distribution report S3](#p7c)</b>
- <b>[d) Task distribution report S4](#p7d)</b>

### [Appendix 1: Use Case](#a1)


<br><br><br><br><br><br><br>

------------------------------------------------------------------------------------------------------------------------

### <a name="p1"></a>I – Objective and Scope
- <b><a name="p1a"></a>a) What are the scope and general objectives?</b>
- <b><a name="p1b"></a>b) Review of the project brief </b>
    - <u><a name="p1bi"></a>i. List of objects, actors, and actions </u>
    - <u><a name="p1bii"></a>ii. The different levels</u>
    - <u><a name="p1biii"></a>iii. A descriptive diagram of the levels </u>
    - <u><a name="p1biiii"></a>iiii. Use case diagram</u>

<br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------

### <a name="p2"></a>II – Terminology / Glossary

| Words                | Definition                                                                                                                                                                                                                               |
|:---------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CNIL                 | National Commission for Information Technology and Civil Liberties. An independent French administrative authority responsible for ensuring that information technology serves the citizen.                                                |
| Failed login attempt | The failure of an attempt to log into a system or user account due to incorrect information or a technical issue.                                                                                                                         |
| Cookie               | (in computing): A small file stored by a server on a user's device (computer, phone, etc.) and associated with a web domain.                                                                                                             |
| Support request      | A request submitted by a user to report a problem or technical difficulty that requires intervention or resolution (Ticket) by the IT support team.                                                                                       |
| SQL Injection        | A technique that allows SQL elements to be injected into web form fields or page links, aiming to send them to the web server to modify elements in a database.                                                                           |
| Labels               | Tags or keywords assigned to an IT ticket to categorize, organize, and facilitate the search for similar issues or support requests.                                                                                                      |
| GDPR                 | General Data Protection Regulation. The reference text on personal data protection. It strengthens and unifies data protection for individuals within the European Union.                                                                 |
| RPi4                 | Raspberry Pi 4, a small single-board computer developed by the Raspberry Pi Foundation.                                                                                                                                                   |
| RPi Zero             | Raspberry Pi Zero, a small, low-cost single-board computer developed by the Raspberry Pi Foundation.                                                                                                                                      |
| RPi Zero             | Raspberry Pi Zero, a small, low-cost single-board computer developed by the Raspberry Pi Foundation.                                                                                                                                      |
| Cluster HAT v2.5     | A hardware add-on that allows up to four Raspberry Pi Zero boards to be used in a cluster setup, providing a platform for cluster computing and testing.                                                                                 |
| DBMS                 | Database Management System.                                                                                                                                                                                                              |
| IT Support           | Technical assistance that handles support requests, troubleshoots technical problems, and resolves IT-related questions.                                                                                                                  |
| Dashboard            | An online interface that displays summary information and key data to help users monitor and manage operations related to tickets and IT support.                                                                                         |
| W3C                  | World Wide Web Consortium. An international organization that defines technical web standards and the rules that all developers worldwide must follow.                                                                                   |
| Wave                 | A browser extension that evaluates the accessibility of a web page for people with disabilities.                                                                                                                                         |

<br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------

### <a name="p3"></a>III – Use Cases
- <b><a name="p3a"></a>a) Main actors and their general objectives.</b>
- <b><a name="p3b"></a>b) Business use cases (operational concepts).</b>
- <b><a name="p3c"></a>c) Strategic use cases.</b>
- <b><a name="p3d"></a>d) User and system use cases.</b>

<br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------



### <a name="p4"></a>IV – Technology Used

- <b><a name="p4a"></a>a) What are the technological requirements for this system?</b>

The application must use: SQL, HTML, CSS, and other programming languages for the algorithmic part. This other language will be decided based on the requirements from our professors.<br>
- SQL is the language used for working with a DBMS such as MariaDB.<br>
- HTML and CSS are used to create the web pages of the website.<br>
- The other languages will be used to implement mathematical algorithms.<br>

The server must be protected from intrusions, particularly SSH, using the fail2ban software and should automatically archive activity logs using the CRON software.<br> We will use Jetbrains' PHPStorm and WebStorm software.<br> These tools are not mandatory, but they will help improve the quality of the submitted code.<br>
<br>

- <b><a name="p4b"></a>b) Which systems will be interfaced with this system, and what are their requirements?</b>

To ensure the proper functioning of the final web application, it will be necessary to make sure that the web server is ready for use on a micro SD card.<br>
Additionally, it will be necessary to ensure the website works correctly on the computers in the machine rooms of the IUT in Vélizy.<br>
The SD card must contain a web server (Apache is recommended) as well as a DBMS server.<br>
Also, the server hosting the web application will be deployed on a Raspberry Pi 0 cluster and accessible via SSH connection.<br>
The platform must allow remote configuration of fail2ban and management of its jails. Therefore, Apache must be able to interact with the system for fail2ban.

<br>

- <b><a name="p4c"></a>c) What hardware is used to support the system?</b>

We are working on a Raspberry Pi 0 Cluster using a Raspberry Pi 4 and a Cluster HAT v2.5 .

Each Raspberry Pi 0 contains:
- <b>CPU</b>: Broadcom BCM2835, a single-core ARM11 processor clocked at 1 GHz.
- <b>RAM</b>: 512 MB of LPDDR2 SDRAM.
- <b>Storage</b>: Micro SD card.
- <b>Peripherals</b>: Micro USB ports, CSI connector, Mini HDMI port.

The Raspberry Pi 4 contains:
- <b>CPU</b>: Broadcom BCM2711, a quad-core ARM Cortex-A72 processor clocked at 1.5 GHz.
- <b>RAM</b>: 4 GB.
- <b>Storage</b>: Micro SD card.
- <b>Peripherals</b>: USB ports, Gigabit Ethernet, micro-HDMI ports, 3.5 mm audio jack.
- <b>Others</b>: 802.11ac Wi-Fi, Bluetooth 5.0, power via USB-C.

The Cluster HAT contains:
- <b>Peripherals</b>: USB ports.    

<br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------


### <a name="p5"></a>V – Other Requirements

- <b><a name="p5a"></a>a) Development Process</b>

    - <u><a name="p5ai"></a>i. Who are the project participants?</u><br>

      The members of our team are the main participants in the project. Our team consists of Tom BOGAERT, Matthieu FARANDJIS, William HERUBEL, Baptiste FOURNIÉ, and Florent VASSEUR-BERLIOUX.<br>
      <br>
  
    - <u><a name="p5aii"></a>ii. What values should be prioritized? (e.g., simplicity, availability, speed, flexibility, etc.)</u><br>
      <h3> Efficiency </h3>
      We prioritize efficiency to ensure our algorithms achieve their best performance. Calculations must be executed as quickly as possible.
      <h3> Flexibility </h3>
      Our application should be extensible, allowing new features (calculations, etc.) to be added without rewriting the code.
      <h3> Portability</h3>
      The web platform must be hosted on a Cluster Hat Kit (connected to 4 Raspberry Pi Zeros) and have an SD card configured by the development team. Additionally, it must allow SSH access to the Raspberry Pi.
      <h3> Security</h3>
      Data must be protected, and the site should display only what each user is allowed to see. It is essential to secure the SQL queries made by the (PHP) files to restrict access as much as possible and limit security vulnerabilities. Moreover, all passwords must be encrypted before being stored in the database to mitigate the effects of any potential data breach. We will also install fail2ban to moderate SSH connections, login attempts, and website registrations.<br>
      <br>
  
    - <u><a name="p5aiii"> </a> iii. What feedback or visibility on the project do users and sponsors expect?</u><br><br>
      Since this project is part of an evaluated academic work, the sponsors of this project are our instructors. They have significant visibility into the project's progress and will receive documentation on the project and its advancement at specific dates. Communication between team members and instructors is recommended to ensure the project meets their expectations.
      Communication with our professors will take place via email as well as in person.<br>
      Our client, Mr. HOGUIN, should have full access to the project: GitHub, Linux administrator account (sudoers).<br>
      Our second client, Mr. DUFAUD, should have access to the GitHub to track the progress of our project.<br><br>
  
    - <u><a name="p5aiv"> </a>iv. What can be purchased? What needs to be built? Who are our competitors?</u><br><br>
      The project involves designing and developing software to perform various calculations. No purchases are required for software development, as the hardware (cluster kit) is provided by the client. We do not have direct competitors.<br><br>
  
    - <u><a name="p5av"> </a>v. What are the other process requirements? (e.g., testing, installation, etc.)</u><br><br>
      Project requirements include a testing phase to ensure the application functions correctly. We also expect the submission of appendices related to the team’s work organization and the graphic design of the application logo.
      The project will follow a waterfall or V-model approach for each project element. In the waterfall model, we will start with design, followed by development, and finish with testing. In the V-model, we will begin with design, followed by testing, and then development. Clients should have access to the Git repository to assess project progress and provide feedback if necessary.<br><br>
  
    - <u><a name="p5avi"> </a>vi. What dependencies does the project have?</u><br><br>
      This project has no major dependencies due to the stability of PHP and MariaDB. It also uses technologies such as HTML, CSS, JavaScript, Raspberry OS Lite, fail2ban, and CRON.<br><br>

- <b><a name="p5b"> </a>b) Performance</b><br><br>
  The software must be as efficient as possible to facilitate access. Programs will be optimized and tested to minimize the number of operations. Data storage systems will be chosen accordingly to maximize platform performance.<br><br>

- <b><a name="p5c"> </a>c) Operations, Documentation</b><br><br>
  All the code used in the project must be documented to ensure readability. All generated functions will be accompanied by a Docstring. Additionally, a test folder and code documentation will be included.<br>

- <b><a name="p5d"> </a>d) Usability and User-friendliness</b><br><br>
  We will ensure the application is accessible by adhering to the W3C UAAG 2.1 standard. We will use the "Wave" browser extension to verify compliance. Any additional tools to further ensure accessibility are welcome.
  A user guide for the website must be available, as well as a visual transcript of the presentation video. Our software can be used via a website or through terminal commands.

- <b><a name="p5e"> </a>e) Maintenance and Portability</b><br><br>
  The web application’s portability and maintenance will be checked using the W3C validator. This ensures compatibility across all browsers and verifies that the code complies with current standards. PHP and MariaDB function on both Windows and Linux servers. We will conduct integration tests to ensure the correct integration of different modules into our project.
<br><br><br><br><br><br><br>

------------------------------------------------------------------------------------------------------------------------

### <a name="p6"></a>VI – Human Resources, Legal, Political, and Organizational Questions

- <b><a name="p6a"></a>a) What is the human involvement in the system's operation?</b><br>

  The hardware must be set up for each use. This will require qualified personnel for its installation.<br>
  However, this system could eventually be connected as a server.<br><br>
  The system startup and maintenance must be handled by competent personnel.<br>
  <br>

- <b><a name="p6b"></a>b) What are the legal and political requirements?</b><br>
  The application must comply with the French law "Informatique et Liberté" of January 6, 1978, updated on June 1, 2019, regarding information technology, files, and liberties.<br>
  The application is also subject to the European regulation "General Data Protection Regulation" (GDPR) of April 27, 2016, concerning the protection of natural persons with regard to the processing of personal data and the free movement of such data, repealing Directive 95/46/EC.<br>
  <br>
  It should be noted that the CNIL provides recommendations regarding the law, particularly concerning cookies.<br>
  <br>
  The articles can be consulted via the links below:
    - <u>"Informatique et Liberté" law:</u><br>
      https://www.cnil.fr/fr/la-loi-informatique-et-libertes <br>
    - <u>European regulation "General Data Protection Regulation":</u><br>
      https://www.cnil.fr/fr/reglement-europeen-protection-donnees <br>
    - <u>About cookies:</u><br>
      https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies <br>
      <br>

- <b><a name="p6c"></a>c) What are the human impacts of the system's implementation?</b><br>

  The application will allow users to run programs requiring distributed or parallel computing in a more accessible way, without needing in-depth knowledge of cluster management and computing.<br><br>

  The web interface will simplify access to cluster resources and enable smooth interaction with the system, enhancing the user experience.

  This data can be used for statistical studies, allowing administrators to monitor site traffic and the use of hardware resources during computations.<br>
  <br>

- <b><a name="p6d"></a>d) What are the training requirements?</b><br>
  In general, users need to know how to use a computer and an internet browser.<br>
  <br>
  A user guide, potentially including a presentation video to help users learn how to use the application, will be available.<br>
  This will explain how to use the application.<br>
  <br>
  It is possible to have a web page providing tips for users.<br>
  <br>


- <b><a name="p6e"></a>e) What hypothesis and dependencies affect the human environment?</b><br>
    - We assume that:<br>
        - all students, teachers, and staff involved have an internet connection and know how to use a computer and an internet browser.<br>
        - the use of the application by individuals with disabilities may differ.<br>
          <br>
    - The application depends on:<br>
        - the presence of administrators.
        - the "Informatique et Liberté" law in France, as well as the GDPR in the European Union.
          Changes to these laws may require a reevaluation of the application to ensure continued compliance.
        - the evolution of internet browsers. The application may become obsolete.

  <br><br><br><br><br><br><br>
------------------------------------------------------------------------------------------------------------------------

### <a name="p7"></a>VII - Project management and organization.

- <b><a name="p7a"></a>a) Roles and responsibilities</b><br>
  The team is composed of:
    - **Matthieu FARANDJIS**  
      Project Manager, Database Administrator, RaspberryPi 4 Administrator, Developer, GitHub Manager,  
      responsible for communication between professors and the team.
    - **Florent VASSEUR--BERLIOUX**  
      Design Manager, RaspberryPi 4 Vice-Administrator, Developer
    - **Tom BOGAERT**  
      Artistic Manager, HTML/CSS/JS Developer, Developer
    - **William HERUBEL**  
      Redaction Manager, Developer
    - **Baptiste FOURNIÉ**  
      Mathematical Calculations Manager, Developer
      <br><br>

- <b><a name="p7b"></a>b) Life cycle</b><br>
  As part of the project, we followed an iterative waterfall cycle.<br>
  For each task (like pages), we followed the pattern: Design -> Development -> Testing.<br>
  However, we can always go back to the drawing board in case of bugs or design errors, for example.<br>

  <br><br><br>
  **Life cycle V0.2:**
