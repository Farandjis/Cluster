# Rapport de Modifications - Projet SAE

## Auteur
Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR-BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA

## Modifications Apportées

### 1. Correction des Déconnexions
- Résolution d'un problème de déconnexion récurrente lors de l'exécution simultanée des modules, causant des échecs dans les calculs parallèles.

### 2. Correction des Formatages
- Résolution de la visualisation des données pour le module Prime dans l'historique de ses executions.

### 3. Corrections Mineures et Accessibilité
- Correction de plusieurs petits bugs et amélioration de l'accessibilité du site en résolvant les problèmes détectés par l'outil Wave.
- Traduction de tous les textes anglais du site en français et ajout de balises `lang="en"` pour les textes anglais restants, comme le nom du module "Hello World".
- Ajout de textes alternatifs pour les logos œil dans le popup de changement de mot de passe et des titres pour les formulaires de processus Nuke afin de transformer les erreurs en alertes.

### 4. Validation HTML
- Utilisation d'un validateur HTML pour identifier et corriger des erreurs mineures sur la page d'accueil et le tableau de bord.

### 5. Améliorations de l'Interface Utilisateur
- Résolution des problèmes d'accessibilité sur toutes les pages du site, en particulier ceux signalés par l'outil Wave.

### 6. Exécution Simultanée des Modules
- Correction d'un problème où le lancement de deux modules en simultané causait des plantages dus à une connexion SQL fermée.

## Conclusion
Ces modifications ont considérablement amélioré la stabilité, l'accessibilité et l'expérience utilisateur de la plateforme **Paralix**. Les prochaines étapes incluent la correction des derniers problèmes et l'optimisation continue du système.
