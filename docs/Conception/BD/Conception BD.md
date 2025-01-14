Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S3 - Database Design (version 2)

<br><br>
This document describes the database. Like its tables, views, users, and their rights.<br>
This document is complemented by various diagrams showing the relationships between the different elements.
</div>

<br><br><br>


- ### [I - Analysis](#p1)

- ### [II - CDM](#p2)
  - For each table
    - Table name
    - Description

- ### [III - LDM](#p3)

- ### [IV - Views](#p4)
  - For each view
    - View name
    - Presentation of the view
    - Description of its attributes, joins
    - Behavior with respect to roles, users

- ### [V - MariaDB fictitious roles and users](#p5)
  - For each Role, Fictitious User
    - Name
    - Presentation
    - Actions
    - Rights


---------

## <a name="p1"></a> I - Analysis
We need a database capable of storing different data regarding users and their history.
  
This database allows joining the different histories to their user.
  
It must be secure, and it should not allow unauthorized access or modification.
Thus, a user should only be able to access public data and their personal data, and not the personal data of other users.
  
Therefore, it is necessary to set up views and create users on the database.


## <a name="p2"></a>II – CDM

<br><br>

**Table `UTILISATEUR` :**

This table describes the user information.
- `user` : The username. It is the primary key of the table.
- `password` : The password associated with the user, used for authentication.
- `role` : The role of the user.

<br><br>

**Table `HISTORY` :**

This table stores information about the calculations and actions performed by users.

- `id_history` : A unique identifier for each history record. This is the primary key.
- `calcul` : A column to store calculations or computed information.
- `module` : Indicates which module the calculation is related to or the context of the action.
- `user` : A foreign key that references the `User` field in the `Utilisateur` table, showing which user is linked to this history record.

<br><br>

**Table `LOG_CONNECTION` :**

This table records unsuccessful login attempts to the system.

- `id_connection` : A unique identifier for each login attempt. This is the primary key.
- `password_tester` : The password used during this login attempt.
- `date` : The date and time of the login attempt. This column uses the `TIMESTAMP` type which, by default, records the current time automatically.
- `user_tester` : A foreign key that references the `User` field in the `Utilisateur` table, indicating which user made the login attempt.


<br><br>

<b> Relationship between the tables:</b>

- The relationship between ``UTILISATEUR`` and ``HISTORY`` is "one-to-many", modeled by the foreign key User in the ``HISTORY`` table.

<br><br>

<i><a name="fg1"></a>Figure 1: CDM Diagram.</i>

<img height="300" width="400" src="./Modèle UML/Sae_Mcd.png" title="Database CDM Model"/>


## <a name="p3"></a>III – LDM
<br><br>

<b> Explanation of specific points for MariaDB:</b>

- Foreign keys with constraints:<br>
A special rule will ensure that when a user is deleted from the ``UTILISATEUR`` table, all related rows in the ``HISTORY`` table are also deleted.<br>
In the same way, a rule that automatically updates foreign key values if the username is changed in the ``UTILISATEUR`` table will be added.

- Auto-increment:<br>
An auto-increment function will be used to automatically generate a unique ID for each new record in the ``HISTORY`` and ``LOG_CONNECTION`` tables.<br>
These IDs are the primary keys of these tables.

<br><br>

<i><a name="fg2"></a>Figure 2: LDM Diagram.</i>

<img height="90" width="400" src="./Modèle UML/Sae_Mld.png" title="Database LDM Model"/>


## <a name="p4"></a> IV - Views
    
 1. **`UserFictif_connexion`** :
   - **Data**: `id_user`, `login`
   - **Source Table**: `USERS`
   - **Description**: This view retrieves user IDs (`id_user`) and logins. It is used for user login.

2. **`UserFictif_inscription`** :
   - **Data**: `id_user`, `login`, `role`
   - **Source Table**: `USERS`
   - **Description**: This view retrieves the necessary information for a new user registration, including their role.

3. **`UserFictif_maj_derniere_co`** :
   - **Data**: `id_user`, `last_login_user_date`, `last_login_user_ip`
   - **Source Table**: `USERS`
   - **Description**: This view updates the last login information of a user, including date and IP address.

4. **`view_USER_PROFILE`** :
   - **Data**: `id_user`, `login`, `role`
   - **Source Tables**: `USERS` and `mysql.user`
   - **Description**: This view retrieves a user's profile by joining the `USERS` and `mysql.user` tables. It is used to display the profile information of the logged-in user.

These views are designed to simplify access to specific data from the `USERS` and `mysql.user` tables while restricting access to sensitive or unnecessary information for different fictitious user roles.

## <a name="p5"></a> V - MariaDB Roles and Users

  - ### User Role `role_utilisateur`
    - **Presentation**
      - Is a person registered on the platform and having the right to access and use it.
    - **Actions**
      - Can view their personal information.
      - Can log in, log out, delete their account.
      - Can change their password and email address.
      - Can perform calculations.
      - Can view their history.
    - **Rights**
      - SELECT Paralix.vue_USER_PROFILE
      - SELECT.User_History
      
  - ### Technician Role `role_admin`
    - **Presentation**
      - Is a user capable of performing user actions and viewing various analyses.
    - **Actions**
      - Has the rights of a user.
      - Can view the history of all users.
      - Can view module usage statistics.
      - Can view module usage for each user.
    - **Rights**
      - SELECT Paralix.Module_Usage_By_User
      - SELECT Paralix.Module_Usage_Stats
      - SELECT Paralix.User_Action_History
          
  - ### MariaDB User: fictif_connexionDB [FOR WEBSITE FUNCTIONALITY ONLY]:
    - **Presentation**
      - Dedicated to user login on the platform.
    - **Actions**
      - Can find a MariaDB user ID based on a login.
    - **Rights**
      - SELECT Paralix.UserFictif_connexion
      - UPDATE (Last_login_user_date, Last_login_user_ip) ON Paralix.UserFictif_maj_derniere_co
        
  - ### MariaDB User: fictif_inscriptionDB [FOR WEBSITE FUNCTIONALITY ONLY]:
    - **Presentation**
      - Dedicated to user registration on the platform but does not assign rights.
    - **Actions**
      - Create a MariaDB user.
      - Insert a user into the Utilisateur table.
      - Can view the IDs of all users (otherwise, we cannot retrieve the ID of the last entry...).
    - **Rights**
      - SELECT (ID_USER) ON UserFictif_inscription
      - INSERT (LOGIN, ROLE) ON UserFictif_inscription
      - CREATE USER ON Paralix.*
        
  - ### MariaDB User: fictif_droitDB [FOR WEBSITE FUNCTIONALITY ONLY]:
    - **Presentation**
      - Dedicated to distributing the User role.
    - **Actions**
      - Distribute the user role to a MariaDB user.
      - View the structure of DB_TIX.
    - **Rights**
      - SHOW VIEW ON Paralix.*
      - GRANT role_utilisateur ... WITH ADMIN OPTION;
