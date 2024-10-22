Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI

# SAE 5.01 - Specifications Document

## Table of Contents

* [**Chapter 1**](#part1) **:** _Introduction_
* [**Chapter 2**](#part2) **:** _Statement_
* [**Chapter 3**](#part3) **:** _Prerequisites_

## <a id="part1"></a>Introduction

This Specifications Document outlines the project's expected outcomes and defines the client's requirements. It has been written to effectively present the system's objectives, both for project stakeholders and the client.

The project plays a central role in evaluating and validating the project by ensuring that all the conditions and goals stated in this document are fully met. Thus, it represents a critical step in certifying the project’s compliance with the client’s expectations.

This document will begin with a detailed description of the development context and the objectives that the project must achieve. The constraints imposed on the project will then be provided, which will be the focus of the project. Finally, it will detail the knowledge, hardware resources, software resources, and skills required to complete the project.

---

## <a id="part2"></a>Statement

## _Project Objectives_

The project aims to develop an application that can perform parallel or distributed computations on a Raspberry Pi cluster. For better visualization, the application will have a web version (web application).

### System Objects

// Todo

### System Actors

#### 1. Visitor

The visitor is a non-registered and non-logged-in user. This may be an external person but could also include any other type of user who has not yet logged in to the platform. Therefore, it is essential that the homepage display for Visitors is effective and ergonomic, as all types of users will visit it.

#### 2. Logged-in User

The logged-in user will be able to execute predefined computations either through terminal commands or via the Web Page. The user will have access to a history of all their previous calculations. They can log out of the website via the Web Page.

#### 3. Administrator

The administrator can add, modify (change passwords), and delete other users’ accounts. They can log out of the website via the Web Page.

## _Constraints and Requirements_

The web application must be developed in PHP & MySQL and installed on a server running on a Raspberry Pi cluster, accessible via SSH from the machines in the computer labs.

An SD card must be configured to install the system, the web server, and the MySQL database server. Four additional SD cards will be configured identically to perform various computations. The base login for the SD card will be [username], and the password will be [password].

A GitHub repository for the project must be shared with the professors who wish to consult it, and it should contain all project elements, from its documentation to its PHP code.

---

## <a id="part3"></a>Prerequisites

The project requires skills in PHP & MySQL, Requirements Analysis, and Design. Knowledge of HTML and system and network installation is also necessary for successful project completion. Mathematical knowledge is needed to perform distributed or parallel computations.

It is necessary to be familiar with working with Git and have communication skills for the documentation, graphic charter, and logo creation.

In terms of hardware resources, the project will require a Raspberry Pi cluster and several SD cards to be configured. For software resources, we will use GitHub to maintain a project registry, and JetBrains IDEs and VSCode to write markdown files and code PHP, CSS, HTML, and other files.

Lastly, software like Excalidraw or StarUML should be used to format diagrams and figures to design and illustrate the design choices.
