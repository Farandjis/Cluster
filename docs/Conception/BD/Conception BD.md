Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA  
INF3-FI

<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5 - Database Design

<br><br>
This document describes the database, including its tables, views, users, and their rights.  
It is complemented by various diagrams showing the relationships between different elements.
</div>

<br><br><br>

- ### [I - Analysis](#p1)

- ### [II - Tables](#p2)
  - For each table:
    - Table Name
    - Description

- ### [III - Table Attributes](#p3)
  - For each table:
    - Table Name
    - List of its attributes
    - Attribute options (Primary keys...)

- ### [IV - Views](#p4)
  - For each view:
    - View Name
    - View description
    - Description of its attributes, joins
    - Behavior concerning roles and users

- ### [V - Roles and MariaDB Users](#p5)
  - For each Role and MariaDB User:
    - Name
    - Presentation
    - Actions
    - Rights


---------

## <a name="p1"></a> I - Analysis
  We need a database capable of storing various data related to users and their history.
  
  This database links the different histories to their respective users.
  
  It must be secure, preventing unauthorized access or modifications.
  Thus, a user should only be able to access public data and their own personal data, not the personal data of other users.
  
  Therefore, it is necessary to implement views and create users in the database.

## <a name="p2"></a> II - Tables
  - ### User
    The USERS table contains all data related to users and their accounts.

  - ### History
    The HISTORY table stores all actions (calculations) performed by users, including the user who executed them and the calculation done.

  - ### Log_Connection
    The Log_Connection table records all connection attempts, both successful and failed.


## <a name="p3"></a> III - Table Attributes

  - ### User
    - **ID_USER** [INT]: Primary key, autoincrement
    - **LOGIN** [VARCHAR 20]: Not Null, Unique 
    - **ROLE** [VARCHAR 50]: Not Null
    - **LAST_LOGIN_USER_IP** [VARCHAR 15]
    - **LAST_LOGIN_USER_DATE** [DATETIME]: DEFAULT CURRENT_TIMESTAMP, NOT NULL
    - **saveUserSettings_AutoSave** [BOOL]: DEFAULT TRUE, NOT NULL
    - **saveUserSettings_AutoDeletion** [BOOL]: DEFAULT TRUE, NOT NULL
    
  - ### History
    - **TIME** [TIMESTAMP]: Not Null
    - **ID_USER** [INT]: Not Null, foreign key (USERS.ID_USER)
    - **MODULE** [VARCHAR 20]: Not Null 
    - **FILENAME** [VARCHAR 100]: NOT NULL, Primary Key

  - ### Log_Connection
    - **ID_CONNECTION** [INT]: Primary key, autoincrement
    - **DATE** [TIMESTAMP]: DEFAULT CURRENT_TIMESTAMP
    - **LOGIN_TESTED** [VARCHAR 50]
    - **PASSWORD_TESTED** [VARCHAR 100]: Not Null
  
## <a name="p4"></a> IV - Views
    
  - ### view_USER_PROFILE
    Allows users to access their personal data
    - Selects ID_USER, LOGIN from the USERS table
    - Selects default_role from the user view in MySQL DB -> Join user.User = PARALIX.users.ID_USER
    - Where ID_USER corresponds to the user executing the SELECT (SUBSTRING_INDEX(USER(), '@', 1))
    
  - ### view_USER_SETTINGS
    Allows users to access their settings
    - Selects ID_USER, saveUserSettings_AutoSave, saveUserSettings_AutoDeletion from the USERS table
    - Where ID_USER corresponds to the user executing the SELECT (SUBSTRING_INDEX(USER(), '@', 1))
    
  - ### Module_Usage_By_User
    Displays module usage counts per user
    - Selects MODULE from the History table 
    - Selects LOGIN from the USERS table -> Join USERS.ID_USER = HISTORY.ID_USER
    - Selects TOTAL_USAGE_COUNT as the number of rows -> COUNT(*)
    - Ordered by USERS.LOGIN and then HISTORY.MODULE

  - ### Module_Usage_Stats
    Displays module usage counts
    - Selects MODULE from the History table 
    - Selects TOTAL_USAGE_COUNT as the number of rows -> COUNT(*)
    - Ordered by HISTORY.MODULE

  - ### USER_ACTION_HISTORY
    Displays all actions performed by users
    - Selects TIME, MODULE from the History table 
    - Selects LOGIN from the USERS table -> Join USERS.ID_USER = HISTORY.ID_USER

  - ### USER_HISTORY
    Displays actions performed by a specific user
    - Selects TIME, ID_USER, MODULE, FILENAME from the History table
    - Where ID_USER corresponds to the user executing the SELECT (SUBSTRING_INDEX(USER(), '@', 1))

  - ### view_USERS_LIST
    Displays all user information, except deleted ones
    - Selects ID_USER, LOGIN, ROLE, last_login_user_date, last_login_user_ip from the USERS table
    - Where LOGIN is not "deleteUSER"

  - ### USERFICTIF_CONNEXION
    Displays all users
    - Selects ID_USER, LOGIN from the USERS table
    - Where LOGIN is not Null

  - ### USERFICTIF_INSCRIPTION
    Displays all users with their roles
    - Selects ID_USER, LOGIN, ROLE from the USERS table

  - ### USERFICTIF_MAJ_DERNIERE_CO
    Displays all users' latest login information
    - Selects ID_USER, LAST_LOGIN_USER_DATE, LAST_LOGIN_USER_IP from the USERS table

## <a name="p5"></a> V - Roles and MariaDB Users

  - ### User Role `role_utilisateur`
    - **Presentation**
      - A person registered on the platform with access rights.
    - **Actions**
      - Can view personal information.
      - Can log in, log out, and delete their account.
      - Can change their password.
      - Can perform calculations.
      - Can view their history.
      - Can modify and view their save settings.
    - **Rights**
      - SELECT
        - Paralix.vue_USER_PROFILE
        - Paralix.User_History
        - view_USER_SETTINGS (saveUserSettings_AutoSave, saveUserSettings_AutoDeletion)
      - INSERT
        - Paralix.History (module, filename)
      - UPDATE
        - view_USER_SETTINGS (saveUserSettings_AutoSave, saveUserSettings_AutoDeletion)
      - DELETE
        - Paralix.User_History
      
  - ### Technician Role `role_admin`
    - **Presentation**
      - A user capable of performing user actions and viewing different analyses 
    - **Actions**
      - Has user rights
      - Can view the history of all users
      - Can view module usage counts
      - Can view module usage by each user
      - Can view the user list
    - **Rights**
      - SELECT
        - Paralix.Module_Usage_By_User
        - Paralix.Module_Usage_Stats
        - Paralix.User_Action_History
        - Paralix.view_USERS_LIST
          
  - ### MariaDB User: fictif_connexionDB [FOR WEBSITE ONLY]:
    - **Presentation**
      - Dedicated to connecting users to the platform
    - **Actions**
      - Can retrieve the USER ID of a MariaDB user from their login
    - **Rights**
      - SELECT
        - Paralix.UserFictif_connexion
      - UPDATE
        - (Last_login_user_date, Last_login_user_ip) ON Paralix.UserFictif_maj_derniere_co
        
  - ### MariaDB User: fictif_inscriptionDB [FOR WEBSITE ONLY]:
    - **Presentation**
      - Dedicated to user registration but does not assign rights
    - **Actions**
      - Creates a MariaDB user
      - Inserts a user into the User table
      - Can view the identifiers of all users (otherwise, it would not be possible to retrieve the last inserted user...)
    - **Rights**
      - SELECT
        - (ID_USER) ON UserFictif_inscription
      - INSERT
        - (LOGIN, ROLE) ON UserFictif_inscription
      - CREATE USER
        - Everywhere!
        
  - ### MariaDB User: fictif_droitDB [FOR WEBSITE ONLY]:
    - **Presentation**
      - Dedicated to assigning the User role
    - **Actions**
      - Assigns the user role to a MariaDB user
      - Views the DB_TIX structure
    - **Rights**
      - SHOW VIEW ON Paralix.*
      - GRANT role_utilisateur ... WITH ADMIN OPTION;
