-- ======================== LES UTILISATEURS ========================
-- info sur l'utilisateur
GRANT SELECT ON Paralix.view_USER_PROFILE TO 'role_utilisateur';

-- pour ajouter les informations sur les fichiers générés
GRANT INSERT(module, filename)
  ON Paralix.HISTORY
  TO 'role_utilisateur';

-- L'admin peut consulter ses dernières sauvegarde sur le site
Grant Select On Paralix.User_History To 'role_utilisateur';

-- L'admin peut supprimer ses sauvegardes
Grant Delete on Paralix.User_History to 'role_utilisateur';



-- ======================== LES ADMINS ========================
-- L'admin est un utilisateur
Grant role_utilisateur To role_admin;

-- L'admin peut consulter l'activité des sauvegardes sur le site
Grant Select On Paralix.Module_Usage_By_User To 'role_admin';
Grant Select On Paralix.Module_Usage_Stats To 'role_admin';
Grant Select On Paralix.User_Action_History To 'role_admin';
