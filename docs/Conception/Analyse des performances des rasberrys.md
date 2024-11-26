# Analyse des performances des configurations de Raspberry Pi pour le calcul des nombres premiers

## Image :
![Graphique des performances](../../img/diagramme_des_calculs.png "Comparaison des performances des Raspberry Pi")

## 1. Axes et contexte
- **Axe des abscisses (x)** : La plage de recherche des nombres premiers (par exemple, jusqu'à 10, 100, 1 000, etc.).
- **Axe des ordonnées (y)** : Le temps nécessaire en secondes pour effectuer ces calculs.
- Le graphique compare les performances de différentes configurations de Raspberry Pi pour effectuer ces calculs.

---

## 2. Observations
- **Pi 0 seul (rouge)** : Le Raspberry Pi 0 montre une lenteur extrême, avec une courbe qui grimpe fortement dès que la plage des nombres premiers augmente. Cela illustre sa faible capacité pour des calculs intensifs.
- **Cluster de 4 Pi 0 (vert)** : Ce cluster améliore légèrement les performances comparé à un seul Pi 0, mais la courbe reste bien plus raide que celle du Pi 4. Les gains obtenus grâce au parallélisme sont limités par la faible puissance individuelle de chaque Pi 0.
- **Pi 4 seul (bleu)** : Le Raspberry Pi 4 est de loin la configuration la plus performante. Sa courbe quasi plate indique qu'il gère efficacement même les plages de nombres premiers les plus larges.
- **Pi 4 + 4 Pi 0 (violet)** : Cette configuration est **plus lente que le Pi 4 seul**. Les Pi 0 n’apportent aucune amélioration et introduisent même une surcharge, ce qui ralentit le système global.

---

## 3. Analyse détaillée des performances
### Le ralentissement du Pi 4 dans la configuration hybride (Pi 4 + 4 Pi 0) s’explique par des facteurs clairs :
- **Communication inter-nœuds** : Le Pi 4 doit gérer la répartition des tâches avec les Pi 0 via le réseau. Cette coordination introduit un temps supplémentaire qui dépasse les bénéfices potentiels du parallélisme.
- **Déséquilibre de performances** : Les Pi 0 sont beaucoup moins performants que le Pi 4. Cela crée un goulot d'étranglement, car la tâche globale est ralentie par les unités les plus lentes.
- **Répartition et collecte des résultats** : Après avoir décomposé le calcul en sous-tâches, le Pi 4 doit récupérer et assembler les résultats des Pi 0. Ce processus ajoute du temps de calcul supplémentaire.

### Autres points importants :
- **Cluster de 4 Pi 0** : Bien que le parallélisme permette de répartir les calculs entre les 4 unités, l’amélioration reste marginale. Chaque Pi 0 étant peu performant, l’ensemble reste largement inférieur à un Pi 4 seul.
- **Pi 4 seul** : C’est la configuration idéale. Sa puissance de calcul lui permet de gérer les plages croissantes efficacement, sans dépendre d’unités extérieures.

---

## 4. Conclusion
- **Configuration optimale** : Le Raspberry Pi 4 seul offre les meilleures performances pour cette tâche.
- **Impact des Pi 0 dans une configuration hybride** : L’ajout des Pi 0 **ralentit** le calcul global en introduisant une surcharge liée à leur faible performance et à la gestion de la coordination.
- **Configuration utilisé**: La configuration qui nous est demandée d'utiliser est le cluster entier donc le Rasberry PI 4 + Les 4 Rasberry PI 0.
