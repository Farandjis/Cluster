-- ======================== LES UTILISATEURS ========================
-- info sur l'utilisateur
GRANT SELECT ON Paralix.view_USER_PROFILE TO 'role_utilisateur';

-- pour ajouter les informations sur les fichiers générés
GRANT INSERT(module, filename)
  ON Paralix.HISTORY
  TO 'role_utilisateur';
