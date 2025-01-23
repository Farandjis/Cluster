Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5 - Conception base de données

<br><br>
Ce document décrit la base de données. Comme ses tables, ses vues ou encore ses utilisateurs et leurs droits.<br>
Ce document est complété par les différents diagrammes montrant la mise en relations des différents éléments entre eux.
</div>

<br><br><br>


- ### [I - Analyse](#p1)

- ### [II - Les tables](#p2)
  - Pour chaque table
    - Nom de la table
    - Description

- ### [III - Les attributs des tables](#p3)
  - Pour chaque table
    - Nom de la table 
    - Liste de ses attributs
    - Options des attributs (clées primaire...)

- ### [IV - Les vues](#p4)
  - Pour chaque vue
    - Nom de la vue
    - Présentation de la vue
    - Description de ses attributs, jointure
    - Comportement par rapport aux rôles, aux utilisateurs

- ### [V - Les rôles et utilisateurs fictifs MariaDB](#p5)
  - Pour chaque Rôle, Utilisateur Fictif
    - Nom
    - Présentation
    - Actions
    - Droits



---------

## <a name="p1"></a> I - Analyse
  Nous avons besoin d'une base de données capable de stocker les différentes données concernant les utilisateurs et leur historique.
  
  Cette base des données permet de joindre les différents historique à leur utilisateur.
  
  Celle-ci doit être sécurisée, elle ne doit pas permettre l'accès ou la modification non autorisée.
  Ainsi, un utilisateur ne doit pouvoir accéder uniquement aux données publiques et à ses données personnelles, et non aux données personnelles des autres utilisateurs.
  
  En cela, il est nécessaire de mettre en place des vues ainsi que la création d'utilisateurs sur la base de données.



## <a name="p2"></a> II - Les tables
  - ### Utilisateur
    La table UTILISATEUR comporte toutes les données liées aux utilisateurs et à leur compte.

  - ### History
    La table History comporte tous les actions(calcul) réaliser par les utilisateur, on y retrouve l'utilisateur qui la exécuter et le calcul effectué

  - ### Log_Connection
    La table Log_Connection comporte toutes les connection effectué que ce soit ceux ayant réussi ou échoué


## <a name="p3"></a> III - Les attributs des tables

  - ### Utilisateur
    - **ID_USER** [INT] : Primary key, autoincrement
    - **LOGIN** [VARCHAR 20] : Not Null Unique 
    - **ROLE** [VARCHAR 50] : Not Null
    - **LAST_LOGIN_USER_IP** [VARCHAR 15]
    - **LAST_LOGIN_USER_DATE** [DATETIME] : DEFAULT CURRENT_TIMESTAMP NOT NULL
    - **saveUserSettings_AutoSave** [BOOL] : DEFAULT TRUE NOT NULL
    - **saveUserSettings_AutoDeletion** [BOOL] : DEFAULT TRUE NOT NULL
    
  - ### History
    - **TIME** [TIMESTAMP] : Not Null
    - **ID_USER** [INT] : Not Null, foreign key (USERS.ID_USER)
    - **MODULE** [VARCHAR 20] : Not Null 
    - **FILENAME** [VARCHAR 100] : NOT NULL, Primary KEY

  - ### Log_Connection
    - **ID_CONNECTION** [INT] : Primary key autoincrement
    - **DATE** [TIMESTAMP] : DEFAULT CURRENT_TIMESTAMP
    - **LOGIN_TESTED** [VARCHAR 50]
    - **PASSWORD_TESTED** [VARCHAR 100] : Not Null
  
## <a name="p4"></a> IV - Les vues
    
  - ### view_USER_PROFILE
    Permet à l'utilisateur d'avoir accès à ses données personnelles
    - Sélectionne ID_USER, LOGIN de la table USERS
    - Sélectionne default_role de la vue user de la DB MySQL -> Jointure user.User = PARALIX.users.ID_USER
    - Où ID_USER correspond à l'utilisateur qui exécute le SELECT (SUBSTRING_INDEX(USER(), '@', 1))
    
  - ### view_USER_SETTINGS
    Permet à l'utilisateur d'avoir accès à ses données personnelles
    - Sélectionne ID_USER, saveUserSettings_AutoSave, saveUserSettings_AutoDeletion de la table USERS
    - Où ID_USER correspond à l'utilisateur qui exécute le SELECT (SUBSTRING_INDEX(USER(), '@', 1))
    
  - ### Module_Usage_By_User
    Permet de voir le nombre d'utilisation de chaque module par Utilisateur
    - Sélectionne MODULE de la table History 
    - Sélectionne LOGIN de la table USERS -> Jointure USERS.ID_USER = HISTORY.ID_USER
    - Sélectionne TOTAL_USAGE_COUNT du nombre de ligne -> COUNT(*)
    - Trié par USERS.LOGIN puis par HISTORY.MODULE

  - ### Module_Usage_Stats
    Permet de voir le nombre d'utilisation de chaque module
    - Sélectionne MODULE de la table History 
    - Sélectionne TOTAL_USAGE_COUNT du nombre de ligne -> COUNT(*)
    - Trié par HISTORY.MODULE

  - ### USER_ACTION_HISTORY
    Permet de voir Toutes les Actions réalisé par les utilisateurs
    - Sélectionne TIME, MODULE  de la table History 
    - Sélectionne LOGIN de la table USERS -> Jointure USERS.ID_USER = HISTORY.ID_USER

  - ### USER_HISTORY
    Permet de voir Toutes les Actions réalisé par UN utilisateurs
    - Sélectionne TIME, ID_USER, MODULE, FILENAME  de la table History
    - Où ID_USER correspond à l'utilisateur qui exécute le SELECT (SUBSTRING_INDEX(USER(), '@', 1))

  - ### view_USERS_LIST
    Permet de voir TOUTES les informations des utilisateurs sauf ceux effacer
    - Sélectionne ID_USER, LOGIN, ROLE, last_login_user_date, last_login_user_ip  de la table USERS
    - Où LOGIN n'est pas "deleteUSER"

  - ### USERFICTIF_CONNEXION
    Permet de voir tous les utilisateurs
    - Sélectionne ID_USER, LOGIN de la table USERS
    - Où LOGIN n'est pas égale à Null

  - ### USERFICTIF_INSCRIPTION
    Permet de voir tous les utilisateurs avec leur role
    - Sélectionne ID_USER, LOGIN, ROLE de la table USERS

  - ### USERFICTIF_MAJ_DERNIERE_CO
    Permet de voir tous les utilisateurs
    - Sélectionne ID_USER, LAST_LOGIN_USER_DATE, LAST_LOGIN_USER_IP de la table USERS

## <a name="p5"></a> V - Les rôles et utilisateurs MariaDB

  - ### Rôle Utilisateur `role_utilisateur`
    - **Présentation**
      - Est une personne inscrite sur la plateforme et ayant le droit d'y accéder et de l'utiliser.
    - **Actions**
      - Peut consulter ses informations personnelles.
      - Peut se connecter, se déconnecter, supprimer son compte.
      - Peut changer son mot de passe.
      - Peut Réaliser des calculs.
      - Peut Voir son historique.
      - Modifier ses parametres de sauvegarde et les voirs.
      - **Droits**
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
      
  - ### Rôle technicien `role_admin`
    - **Présentation**
      - Est un utilisateur capable de réaliser les actions d'un utilisateur et de voir différentes analyses 
    - **Actions**
      - Possède les droits d'un utilisateur
      - Peut voir l'historique de tout les utilisateurs 
      - Peut voir le nombre d'utilisation par module 
      - Peut voir le nombre d'utilisation par module pour chaque utilisateur
      - Peut voir la liste de Utilisateur
    - **Droits**
      - SELECT
        - Paralix.Module_Usage_By_User
        - Paralix.Module_Usage_Stats
        - Paralix.User_Action_History
        - Paralix.view_USERS_LIST
          
  - ### Utilisateur MariaDB : fictif_connexionDB [POUR FONCTIONNEMENT SITE WEB UNIQUEMENT]:
    - **Présentation**
      - Dédié à la connexion d'un utilisateur à la plateforme
    - **Actions**
      - Peut retrouver l'ID USER d'un utililisateur MariaDB à partir d'un login
    - **Droits**
      - SELECT
        - Paralix.UserFictif_connexion
      - UPDATE
        - (Last_login_user_date, Last_login_user_ip) ON Paralix.UserFictif_maj_derniere_co
        
  - ### Utilisateur MariaDB : fictif_inscriptionDB [POUR FONCTIONNEMENT SITE WEB UNIQUEMENT]:
    - **Présentation**
      - Dédié à l'inscription d'un utilisateur à la plateforme mais n'attribue pas les droits
    - **Actions**
      - Créer un utilisateur MariaDB
      - Insère un utilisateur dans la table Utilisateur
      - Peut voir les identifiants de tous les utilisateurs (sinon, on ne peut pas récupéré l'identifiant du dernier enregistrement...)
    - **Droits**
      - SELECT
        - (ID_USER) ON UserFictif_inscription
      - INSERT
        - (LOGIN, ROLE) ON UserFictif_inscription
      - CREATE USER
        - Partout !
        
  - ### Utilisateur MariaDB : fictif_droitDB [POUR FONCTIONNEMENT SITE WEB UNIQUEMENT]:
    - **Présentation**
      - Dédié à la distribution du rôle Utilisateur
    - **Actions**
      - Distribuer le rôle utilisateur à un utilisateur MariaDB
      - Voir la structure de DB_TIX
    - **Droits**
      - SHOW VIEW ON Paralix.*
      - GRANT role_utilisateur ... WITH ADMIN OPTION;
