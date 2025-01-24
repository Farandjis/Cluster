-- Création des différents utilisateurs fictifs
CREATE USER 'fictif_connexionDB'@'%' IDENTIFIED BY 't!nt1n_connexionDB241745414'; -- Attention ! 172.18.0.3 pour qu'il soit accessible depuis le Docker NodeJS
CREATE USER 'fictif_inscriptionDB'@'%' IDENTIFIED BY 't!nt1n_inscriptionDB17053417';
CREATE USER 'fictif_droitDB'@'%' IDENTIFIED BY 't!nt1n_droitDB4768174457';




-- Accès à tous les identifiants et les logins des utilisateurs
CREATE OR REPLACE VIEW UserFictif_connexion AS
SELECT id_user, login
FROM USERS
WHERE login IS NOT NULL;

-- Permet d'ajouter un nouvel utilsateur
CREATE OR REPLACE VIEW UserFictif_inscription AS
SELECT id_user, login, role
FROM USERS;

-- Permet de modifier les infos de connexion d'un utilisateur
CREATE OR REPLACE VIEW UserFictif_maj_derniere_co AS
SELECT id_user, last_login_user_date, last_login_user_ip
FROM USERS;




-- Ajout des droits pour l'utilisateurs fictif_inscriptionDB
GRANT INSERT (login, role) ON UserFictif_inscription TO 'fictif_inscriptionDB'@'%';
GRANT SELECT(id_user) ON UserFictif_inscription TO 'fictif_inscriptionDB'@'%';
GRANT CREATE USER ON *.* TO 'fictif_inscriptionDB'@'%';


-- UF droitDB peut est considéré comme un utilisateur de la plateforme pour pouvoir transmettre le rôle à qui il veut.
GRANT role_utilisateur TO 'fictif_droitDB'@'%' WITH ADMIN OPTION;

-- UF droitBD peut voir la structure de la BD (pour s'y connecter), mais ne peut absolument rien faire avec (pas de SELECT, UPDATE...)
GRANT SHOW VIEW ON Paralix.* TO 'fictif_droitDB'@'%';



-- Ajout des droit pour l'utilisateurs fictif_connexionDB
GRANT SELECT ON UserFictif_connexion TO 'fictif_connexionDB'@'%';
GRANT UPDATE (last_login_user_date, last_login_user_ip) ON UserFictif_maj_derniere_co TO 'fictif_connexionDB'@'%';

-- Pour l'administrateur de la BD, pour qu'il puisse continuer à donner le rôle utilisateur lui aussi
GRANT 'role_utilisateur' TO root@localhost WITH ADMIN OPTION;
