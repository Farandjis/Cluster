Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S3 - Dossier de test boite noire 
## Site dynamique (connexion)

<br><br>

</div>

<br><br><br><br><br><br><br>

## Plan
- ### [I - Introduction](#I)
- ### [II - Contexte des tests](#II)
- ### [III - Test](#III)


<br><br><br>

----------

<br><br><br>

## <a name="I"></a>I - Introduction

Le document suivant a pour but de tester la page connexion.
<br>

Nous allons tester tous les cas d'erreurs possibles lors de la connexion ainsi que les cas où elle fonctionne. 
<br>

## <a name="III"></a>III - Contexte des tests

| Définition                         | Situation pour le test                                                   |
|------------------------------------|--------------------------------------------------------------------------|
| Produit testé                      | Site dynamique                                                     |
| Config. logicielle William  | Navigateur : Google Chrome<br>OS : Windows 10|
| Date de début            | 10/01/2025                                                               |
| Date de finalisation     | 10/01/2025                                                               |
| Test à appliquer         | Vérification de la validité du site                                      |
| Participant              | William Herubel                         |


<br><br><br>

----------

<br><br><br>

## <a name="IV"></a>IV - Test

### Partitions d'équivalence 

Afin de se connecter à la plateforme l'utilisateur a besoin de renseigner son login et son mot de passe. S'il parvient à se connecter le résultat obtenu sera OK, ce qui veut dire que la connexion a bien été effectué. 
<br>
Cependant, s'il échoue parce qu'un des champs ou les deux sont vides ou incorrects, l'erreur 3 ou 2 sera déclenchée. Ainsi, le login et le mot de passe peuvent être vides, corrects ou incorrects.  

### Conception des tests

| Cas | $loginSite                | $mdpMariaDB               | Résultat attendu   | Résultat obtenu    | Commentaires                                               |
|:----|---------------------------|---------------------------|--------------------|--------------------|------------------------------------------------------------|
| P1  | Vide                      | Correct                   | Exception erreur 3 | Exception erreur 3 | $loginSite vide et $mdpMariaDB correct                     |
| P2  | Correct                   | Vide                      | Exception erreur 3 | Exception erreur 3 | $loginSite correct et $mdpMariaDB vide                     |
| P3  | Vide                      | Vide                      | Exception erreur 3 | Exception erreur 3 | $loginSite et $mdpMariaDB vide                             |
| P4  | Correct                   | Incorrect                 | id = 2             | id = 2             | $loginSite correct et $mdpMariaDB incorrect                |
| P5  | Incorrect                 | Correct                   | id = 2             | id = 2             | $loginSite incorrect et $mdpMariaDB correct    |
| P6  | Correct                   | Correct                   | OK                 | OK                 | $loginSite et $mdpMariaDB correct                          |
| P7 | Correct                   | Incorrect (injection SQL) | id = 2             | id = 2             | Tentative ratée d'injection SQL                            |
| P8 | Incorrect (injection SQL) | Correct                   | id = 2             | id = 2             | Tentative ratée d'injection SQL                            |


### Exécution des tests 

| Cas n° | $loginSite | $mdpMariaDB      | Résultat attendu   | Résultat obtenu    |
|:-------|------------|------------------|--------------------|--------------------|
| 1      | " "        | MDPtest1/  | Exception erreur 3 | Exception erreur 3 |
| 2      | CompteTest      | " "              | Exception erreur 3 | Exception erreur 3 |
| 3      | " "        | " "              | Exception erreur 3 | Exception erreur 3 |
| 4      | CompteTest     | mdptest1/    | id = 2             | id = 2             |
| 5      | CmpteTest      | MDPtest1/  | id = 2             | id = 2             |
| 6      | CompteTest      | MDPtest1/  | OK             | OK             |
| 7      | CompteTest      | Azertyalice!123  | id = 2                 | id = 2                 |
| 8      | alice      | MDPtest1/  | id = 2             | id = 2             |

Si le login et le mot de passe est bon, mais que l'utilisateur ne possède pas de rôle dans la base de donnée, l'accès lui est refusé avec un message d'erreur "Vous n'avez aucun rôle pour accéder au site."<br>
Si le login et le mot de passe est bon, mais que le rôle de l'utilisateur ne permet pas l'accès, l'accès lui sera refusé avec un message d'erreur "Votre rôle ne permet par la connexion".<br>
Si le compte n'existe pas, le login ou le mot de passe est invalide, il affiche l'erreur : "ERREUR : Le champ login ou mot de passe est incorrect ou votre compte n'existe pas"
