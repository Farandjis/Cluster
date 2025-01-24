DELIMITER //

CREATE FUNCTION ObtenirRoleUtilisateur()
RETURNS VARCHAR(30) COLLATE utf8mb4_general_ci
BEGIN
  DECLARE sonRole VARCHAR(30) COLLATE utf8mb4_general_ci; -- On déclare une variable au formatage utf8mb4_general_ci
  SELECT role INTO sonRole FROM view_USER_PROFILE LIMIT 1;  -- On instancie la variable avec le rôle de l'utilisateur
  RETURN sonRole COLLATE utf8mb4_general_ci; -- On renvois le rôle dont on essaye de remettre le bon formatage...
END //

DELIMITER ;
	

DROP PROCEDURE IF EXISTS ATTENTION_SupprimerSonCompte;

DELIMITER // -- Désormais une requête se termine par // (pour éviter tout problème dans la fonction)
CREATE PROCEDURE ATTENTION_SupprimerSonCompte()
BEGIN
    DECLARE monRole VARCHAR(50);
    -- Récupérer le rôle de l'utilisateur qui a fait appel à la commande
    SELECT ObtenirRoleUtilisateur() INTO monRole;


    -- Note : USER() correspond à l'utilisateur qui a fait appel à la commande

    -- On vérifie que c'est un utilisateur
    IF (monRole = 'role_utilisateur') THEN
        -- Si oui, on supprime le compte

        -- En principe, les modifications sont prises en compte uniquement quand on atteint le commit.
        -- S'il y a un plantage entre temps, le compte est toujours utilisable.
        -- Je dis en principe, car en PHP, CREATE USER provoquait un autocommit donc je sais pas pour REVOKE et DROP USER...
        START TRANSACTION;

	    -- On retire l'utilisateur de la liste des utilisateurs de la plateforme TIX.
        DELETE FROM HISTORY WHERE ID_USER = SUBSTRING_INDEX(USER(), '@', 1);
        UPDATE Paralix.USERS SET login = NULL, last_login_user_date = current_timestamp() WHERE ID_USER = SUBSTRING_INDEX(USER(), '@', 1);

	    -- On retire l'intégralité des droits au compte MariaDB de l'utilisateur.
	    SET @suppression_droits = CONCAT('REVOKE ALL ON *.* FROM ', QUOTE(SUBSTRING_INDEX(USER(), '@', 1)),'@',QUOTE(SUBSTRING_INDEX(USER(), '@', -1)));
        PREPARE suppression_droits2 FROM @suppression_droits;
        EXECUTE suppression_droits2;
        DEALLOCATE PREPARE suppression_droits2;

	    -- On supprime le compte MariaDB.
        SET @suppression_compte = CONCAT('DROP USER ', QUOTE(SUBSTRING_INDEX(USER(), '@', 1)),'@',QUOTE(SUBSTRING_INDEX(USER(), '@', -1)));
        PREPARE suppression_compte2 FROM @suppression_compte;
        EXECUTE suppression_compte2;
        DEALLOCATE PREPARE suppression_compte2;


	    COMMIT;
        -- Le compte TIX et MariaDB ont été effacés, la plateforme ne possède plus ses données personnelles et l'utilisateur ne peut plus se connecter.

    END IF;
END //
DELIMITER ; -- On remet le délimiteur par défaut pour les requêtes

GRANT EXECUTE ON PROCEDURE ATTENTION_SupprimerSonCompte TO role_utilisateur;
