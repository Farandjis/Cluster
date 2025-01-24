Matthieu FARANDJIS, Tom BOGAERT, Florent VASSEUR--BERLIOUX, William HERUBEL, Baptiste FOURNIÉ, Lucas DA SILVA FERREIRA<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="../../img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S3 - Dossier de test boite noire 
## Site dynamique - Authentification : Inscription

<br><br>
Ce dossier permet de s'assurer que la page inscription soit conforme à ce qui est attendu.

</div>

<br><br><br><br><br><br><br>

## Plan
- ### [I - Introduction](#I)
- ### [II - Contexte des tests](#II)
- ### [III - Test PHP](#III)



<br><br><br>

----------

<br><br><br>

## <a name="I"></a>I - Introduction

Le document suivant a pour but de tester les différents cas de tests réalisé pour l'inscription de l'utilisateur.
<br>

En fonction des paramètres de la base de données et de la conception, nous allons tester une par une chaque case.
<br>

## <a name="II"></a>II - Contexte des tests

| Définition               | Situation pour le test                                                   |
|--------------------------|--------------------------------------------------------------------------|
| Produit testé            | Page inscription                                                     |
| Config. logicielle William  | Navigateur : Google Chrome<br>OS : Windows 10|
| Date de début            | 10/01/2025                                                               |
| Date de finalisation     | 10/01/2025                                                               |
| Test à appliquer         | Vérification de la validité du site                                      |
| Participant              | William Herubel                         |

<br><br><br>

----------

<br><br><br>

## <a name="III"></a>III - Test

### Partitions d'équivalence

Les données qui nous permettent de nous inscrire sur la plateforme sont les suivantes : le login, le mdp, sa confirmation.
<br> Le login peut être correct, incorrect ou vide, le mot de passe quant à lui est conforme, vide ou non conforme, s'il ne respecte pas certaines caractéristiques. Sa confirmation peut être également conforme, non conforme ou incorrect, si elle n'est pas identique au mdp. 
<br> Les résultats attendus sont OK si l'inscription a bien été effectué et KO sinon. 

### Conception des tests

| Cas | $login       | $mdp         | $mdp2        | Résultat attendu | Résultat obtenu | Commentaires                                                                                                                          |
|-----|--------------|--------------|--------------|------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| P1  | Correct      | Conforme     | Correct      | OK               | OK              | 2 <= login <= 20 <br> 8 <= mdp <= 20 |
| P2  | Incorrect    | Conforme     | Correct      | KO               | KO              | Login trop court (< 2)                                                                                                                |
| P3  | Non conforme | Conforme     | Correct      | KO               | KO              | Login trop long (> 20)                                                                                                                |
| P4  | Vide         | Conforme     | Conforme     | KO               | KO              | Absence du login                                                                                                                      |
| P5  | Correct      | Vide         | Conforme     | KO               | KO              | Absence mot de passe 1                                                                                                                |
| P6  | Correct      | Conforme     | Incorrect    | KO               | KO              | mdp 1 et mdp 2 différents                                                                                                             |
| P7  | Correct      | Non conforme | Non conforme | KO               | KO              | mdp trop court (< 8)                                                                                                                 |
| P8  | Correct      | Non conforme | Non conforme | KO               | KO              | mdp trop grand (> 20)                                                                                                                 |
| P9 | Correct      | Non conforme | Non conforme | KO               | KO              | mdp : manque un chiffre                                                                                                               |
| P10 | Correct      | Non conforme | Non conforme | KO               | KO              | mdp : manque un caractère spécial (ou accent)                                                                                         |
| P11 | Correct      | Non conforme | Non conforme | KO               | KO              | mdp : manque une majuscule                                                                                                            |
| P12 | Correct      | Non conforme | Non conforme | KO               | KO              | mdp : manque une minuscule                                                                                                            |

### Exécution des tests 

| Cas | $login                            | $mdp                              | $mdp2                             | Résultat attendu   | Résultat obtenu  |
|-----|-----------------------------------|-----------------------------------|-----------------------------------|--------------------|------------------|
| P1  | Jesuisuntest                      | Jesuisuntest1/                      | Jesuisuntest1/                    | OK                 | OK               |
| P2  | 1                              | Logincourt1/                      | Logincourt1/                       | KO                 | KO               |
| P3  | Jesuisunlogintroplong | Loginlong1/                       | Loginlong1/                       | KO                 | KO               |
| P4  |                |Loginabsent1/                       | Loginabsent1/                       | KO                 | KO               |
| P5  | MDPabsent                              |                       |                       | KO                 | KO               |
| P6  | MDPdifferent                             | MDPdifferent1/                               | MDPdifferent2/                      | KO                 | KO               |
| P7  | MDPcourt                             | Court1/                     | Court1/                      | KO                 | KO               |
| P8  | MDPLong                             | Mdpbeaucouptroplong1/                       | Mdpbeaucouptroplong1/                         | KO                 | KO               |
| P9  | MDPsansChiffre                             | MDPstandart/ | MDPstandart/ | KO                 | KO               |
| P10 | MDPsansSpecial                             | MDPstandart1 | MDPstandart1  | OK                 | OK               |
| P11 | MDPsansMajuscule                             | mdpstandart1/                      |mdpstandart1/                      | KO                 | KO               |
| P12 | MDPsansMinuscule                             | MDPSTANDART1/                      | MDPSTANDART1/                      | KO                 | KO               |

<br><br>
Les caractères spéciaux sont listés ici : https://fr.wikipedia.org/wiki/Aide:Liste_de_caract%C3%A8res_sp%C3%A9ciaux <br>
Note : nous ne considérons pas les accents comme des caractères spéciaux (sauf pour le mot de passe)<br>
<br>
Le test des cases vides a été effectués pour toutes les cases du formulaire. Le résultat KO a été obtenu à chaque fois. Tout va bien<br>
On a testé les limites des cas (cf cas 1 pour les limites), dans l'intervalle : OK à chaque fois, sinon, KO à chaque fois. Tout va bien<br>
<br>
Concernant l'injection de code SQL ou JavaScript, les caractères ">" et "<" sont stockés au format HTML, pas directement ">" "<" dans la base de données.<br>
Il a été vérifié assidûment que le code pour les requêtes préparé correspond à l'exemple de Monsieur HOGUIN.<br>
<br>
<br>
Les données de l'utilisateur sont correctement insérés dans la table Utilisateur.<br>
L'utilisateur MariaDB est bien créé, et il s'attribue de lui-même le rôle utilisateur.

----------
Ceci clôture le développement de la page inscription.php et action inscription php (jusqu'à la création du captcha du moins)
