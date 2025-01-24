Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S3 - Dossier de test boite noire 
## Site dynamique (connexion)

<br><br>

</div>

## Plan
- ### [I - Introduction](#I)
- ### [II - Contexte des tests](#II)
- ### [III - Test](#III)
    - [**Partie Historique**](#III.A)
    - [**Profil**](#III.B)
    - [**Partie Process Control**](#III.C)


<br><br><br>

----------


## <a name="I"></a>I - Introduction

Le présent document a pour objectif de tester la page **Profil**.  

Nous allons :  
- Tester tous les cas d'erreur possibles provenant de l'utilisateur.  
- Vérifier le bon fonctionnement de toutes les fonctionnalités disponibles sur cette page.  

<br>

## <a name="II"></a>II - Contexte des tests

| Définition                         | Situation pour le test                                                   |
|------------------------------------|--------------------------------------------------------------------------|
| Produit testé                      | Site dynamique                                                     |
| Config. logicielle William  | Navigateur : Google Chrome <br> OS : Windows 11|
| Date de début            | 22/01/2025                                                               |
| Date de finalisation     | 22/01/2025                                                               |
| Test à appliquer         | Vérification de la validité du site sur la page Profil                                      |
| Participant              | William Herubel                         |

<br><br>

## <a name="III"></a>III - Test

Pour réaliser ce dossier de test, nous devons effectuer les vérifications suivantes :  

---

### **1. Partie Informations Personnelles**  
- Tester le **bouton "Changer de Mot de Passe"**.  

---

### **2. Partie Historique**  
- Tester les actions suivantes :  
  - **Bouton "Vision"** : Vérifier que les attributs et données sont affichés correctement.  
  - **Bouton "Téléchargement"** : Vérifier que les résultats peuvent être téléchargés.  
  - **Bouton "Effacer"** : Vérifier que les résultats sont correctement supprimés.  

---

### **3. Partie Process Control**  
- Tester les actions suivantes :  
  - **Arrêter un calcul** : Vérifier que l'arrêt d'un calcul spécifique fonctionne.  
  - **Arrêter tous les calculs** : Vérifier que tous les calculs en cours peuvent être arrêtés.  
  - **Rafraîchir la liste des calculs** : Vérifier que la liste se met à jour correctement pour afficher les nouveaux calculs.  

## <a name="III.A"></a> A. Partie Informations Personnelles

Afin de changer son mot de passe l'utilisateur à besoin de renseigner son ancien mot de passe, le nouveau mot de passe et la confirmation du nouveau mot de passe.
<br> Le l'ancien mot de passe peut être correct, incorrect ou vide, le nouveau mot de passe quant à lui est conforme, vide ou non conforme, s'il ne respecte pas certaines caractéristiques. Sa confirmation peut être également conforme, non conforme ou incorrect, si elle n'est pas identique au mdp. 
<br>Les résultats attendus sont OK si le changement a bien été effectué et KO sinon. 

### Conception des tests

| Cas | $ancienMDP      | $newMdp         | $confirmation        | Résultat attendu | Résultat obtenu | Commentaires                                                                                                                          |
|-----|--------------|--------------|--------------|------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| P1  | Vide      | Conforme         | Conforme     | KO               | KO              | Absence ancien mot de passe                                                                                                                 |
| P2  | Incorrect      | Conforme     | Conforme    | KO               | KO              | ancienMDP n'est pas celui enregistrer  pour l'utilisateur                                                                                                             |
| P3  | Correct      | Vide         | Conforme     | KO               | KO              | Absence new mot de passe 1                                                                                                                |
| P4  | Correct      | Conforme     | Incorrect    | KO               | KO              | new mdp et confirmation différents                                                                                                             |
| P5  | Correct      | Non conforme | Non conforme | KO               | KO              | new mdp trop court (< 8)                                                                                                                 |
| P6 | Correct      | Non conforme | Non conforme | KO               | KO              | new mdp trop grand (> 20)                                                                                                                 |
| P7 | Correct      | Non conforme | Non conforme | KO               | KO              | new mdp : manque un chiffre                                                                                                               |
| P8 | Correct      | Non conforme | Non conforme | KO               | KO              | new mdp : manque un caractère spécial (ou accent)                                                                                         |
| P9 | Correct      | Non conforme | Non conforme | KO               | KO              | new mdp : manque une majuscule                                                                                                            |
| P10 | Correct      | Non conforme | Non conforme | KO               | KO              | new mdp : manque une minuscule                                                                                                            |
| P11 | Correct      | Conforme         | Conforme     | OK               | OK              | Tout va bien                                                                                                             |

### Exécution des tests 

| Cas | $ancienMDP      | $newMdp         | $confirmation        | Résultat attendu | Résultat obtenu | Commentaires                                                                                                                          |
|-----|--------------|--------------|--------------|------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| P1  |       | Tests!01         | Tests!01     | KO               | KO              | Absence ancien mot de passe                                                                                                                 |
| P2  | JesuisIncorrecte      | Tests!01     | Tests!01    | KO               | KO              | ancienMDP n'est pas celui enregistrer pour l'utilisateur                                                                                                  |
| P3  | Alice!01      |          | Tests!01     | KO               | KO              | Absence new mot de passe 1                                                                                                                |
| P4  | Alice!01      | Tests!01     | Tests!02    | KO               | KO              | new mdp et confirmation différents                                                                                                             |
| P5  | Alice!01      | Tests!0 | Tests!0 | KO               | KO              | new mdp trop court (< 8)                                                                                                                 |
| P6 | Alice!01      | Jesuisunmotdepassetroplong | Jesuisunmotdepassetroplong | KO               | KO              | new mdp trop grand (> 20)                                                                                                                 |
| P7 | Alice!01      | Tests! | Tests! | KO               | KO              | new mdp : manque un chiffre                                                                                                               |
| P8 | Alice!01      | Tests01 | Tests01 | KO               | KO              | new mdp : manque un caractère spécial (ou accent)                                                                                         |
| P9 | Alice!01      | tests!01 | tests!01 | KO               | KO              | new mdp : manque une majuscule                                                                                                            |
| P10 | Alice!01      | TESTS!01 | TESTS!01 | KO               | KO              | new mdp : manque une minuscule                                                                                                            |
| P11 | Alice!01      | Tests01         | Tests01     | OK               | OK              | Tout va bien                                                                                                             |

## <a name="III.B"></a> B. Partie Historique  

## 1. **Test du Bouton "Vision"**
### Objectif :
Vérifier que les attributs et données sont affichés correctement après avoir cliqué sur le bouton "Vision".

### Étapes :
1. Cliquer sur le bouton "Vision".
2. Vérifier que les attributs attendus sont correctement affichés.
   - Exemple d'attributs : `name`, `status`.
3. Vérifier que les données attendues sont affichées correctement.
   - Exemple de données : `result`.

### Résultat attendu :
- Les attributs (ex : `name`, `status`) sont visibles et correctement affichés.
- Les données (ex : `result`) sont également affichées et correspondent aux attentes.

### Résultat obtenu :
- Les attributs (ex : `name`, `status`) sont visibles et correctement affichés.
- Les données (ex : `result`) sont également affichées et correspondent aux attentes.


---

## 2. **Test du Bouton "Téléchargement"**
### Objectif :
Vérifier que les résultats peuvent être téléchargés correctement après avoir cliqué sur le bouton "Téléchargement".

### Étapes :
1. Cliquer sur le bouton "Téléchargement".
2. Vérifier que le fichier est généré et sauvegardé à l'emplacement attendu.
   - Exemple de chemin : `/mock/path/downloaded_result.txt`.
3. Vérifier que le contenu du fichier téléchargé correspond bien aux résultats attendus.

### Résultat attendu :
- Un fichier de résultats est téléchargé avec succès.
- Le contenu du fichier est correct et conforme aux attentes.

### Résultat obtenu :
- Un fichier de résultats est téléchargé avec succès.
- Le contenu du fichier est correct et conforme aux attentes.

---

## 3. **Test du Bouton "Effacer"**
### Objectif :
Vérifier que les résultats sont correctement supprimés après avoir cliqué sur le bouton "Effacer".

### Étapes :
1. Cliquer sur le bouton "Effacer".
2. Vérifier que les résultats sont bien supprimés de l'interface.
3. Vérifier que les données supprimées ne sont plus accessibles.

### Résultat attendu :
- Les résultats sont supprimés de l'interface.
- Aucune donnée supprimée n'est accessible après l'action.

### Résultat obtenu :
- Les résultats sont supprimés de l'interface.
- Aucune donnée supprimée n'est accessible après l'action.

## <a name="III.C"></a> C. Partie Process Control

## 1. **Test de l'Action "Arrêter un calcul"**
### Objectif :
Vérifier que l'arrêt d'un calcul spécifique fonctionne correctement.

### Étapes :
1. Démarrer un calcul spécifique dans le système.
2. Cliquer sur le bouton "Arrêter" associé à ce calcul.
3. Vérifier que le calcul est bien arrêté.

### Résultat attendu :
- Le calcul spécifique est arrêté avec succès.

### Résultat obtenu :
- Le calcul spécifique est arrêté avec succès.

---

## 2. **Test de l'Action "Arrêter tous les calculs"**
### Objectif :
Vérifier que tous les calculs en cours peuvent être arrêtés simultanément.

### Étapes :
1. Démarrer plusieurs calculs simultanément dans le système.
2. Cliquer sur le bouton "Arrêter tous les calculs".
3. Vérifier que tous les calculs en cours sont arrêtés.

### Résultat attendu :
- Tous les calculs en cours sont arrêtés simultanément.

### Résultat obtenu :
- Tous les calculs en cours sont arrêtés simultanément.

---

## 3. **Test de l'Action "Rafraîchir la liste des calculs"**
### Objectif :
Vérifier que la liste des calculs est mise à jour correctement pour afficher les nouveaux calculs.

### Étapes :
1. Démarrer plusieurs calculs.
2. Cliquer sur le bouton "Rafraîchir la liste".
3. Vérifier que la liste des calculs affichée se met à jour pour inclure tous les calculs en cours, y compris les nouveaux calculs.
4. Vérifier que les calculs terminés ou arrêtés sont correctement supprimés de la liste, le cas échéant.

### Résultat attendu :
- La liste des calculs est mise à jour en temps réel pour refléter l'état actuel des calculs.
- Les nouveaux calculs apparaissent dans la liste, et les calculs terminés ou arrêtés sont retirés si nécessaire.

### Résultat obtenu :
- La liste des calculs est mise à jour en temps réel pour refléter l'état actuel des calculs.
- Les nouveaux calculs apparaissent dans la liste, et les calculs terminés ou arrêtés sont retirés si nécessaire.
