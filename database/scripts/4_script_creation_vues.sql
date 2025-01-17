-- FOR ALL THE USERS
-- Info of the user
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


-- history of user backup history
CREATE OR REPLACE VIEW `Paralix`.User_History AS 
    SELECT H.time, H.id_user, H.module, H.filename
FROM 
    `Paralix`.HISTORY H
WHERE 
    H.`id_user` = SUBSTRING_INDEX(USER(), '@', 1);



-- FOR ADMINS
-- the count of backups by user and module
CREATE OR REPLACE VIEW `Paralix`.Module_Usage_By_User AS
    SELECT 
    U.login, 
    H.module, 
    COUNT(*) AS usage_count
FROM 
    `Paralix`.HISTORY H
JOIN `Paralix`.USERS U ON 
    H.id_user = U.id_user
GROUP BY 
    U.login, H.module;


-- the count of backups by module
CREATE OR REPLACE VIEW `Paralix`.Module_Usage_Stats AS 
    SELECT module, COUNT(*) AS total_uses 
FROM 
    `Paralix`.HISTORY
GROUP BY 
    module;


-- the backups by all users
CREATE OR REPLACE VIEW `Paralix`.User_Action_History AS 
    SELECT H.time, U.login, H.module
FROM 
    `Paralix`.HISTORY H
JOIN `Paralix`.USERS U 
    ON H.id_user = U.id_user;



