-- Utilisateur
CREATE OR REPLACE VIEW view_USER_PROFILE AS
SELECT
    `Paralix`.`USERS`.`id_user` AS `id_user`,
    `Paralix`.`USERS`.`login` AS `login`,
    `user`.`default_role` AS `role`
FROM
    `Paralix`.`USERS`
JOIN mysql.user ON
    `user`.`User` = `Paralix`.`USERS`.`id_user`
WHERE
    `Paralix`.`USERS`.`id_user` = SUBSTRING_INDEX(USER(), '@', 1);
