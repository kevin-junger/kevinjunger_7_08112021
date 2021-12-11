# Les petits plats

> Septième projet du parcours _développeur front-end_ chez OpenClassrooms.

## Contexte

Après avoir édité des livres de cuisine pendant plusieurs années, l’entreprise _Les Petits Plats_ a décidé de se lancer dans un nouveau projet : réaliser son propre site de recettes de cuisine à l’instar de _Marmiton_ ou _750g_.

Le gros du travail sera d'implémenter une fonctionnalité de recherche de recettes par mots-clés, avec possibilité de filtrer par ingrédients, appareils et ustensiles, en mettant l'accent sur la performance : les utilisateurs veulent une recherche rapide, presque instantanée.

Pour ce faire, une investigation de fonctionnalité sera menée afin de comparer deux versions de l'algorithme de recherche (déclenché par saisie de l'utilisateur dans la barre de recherche), l'une utilisant les boucles natives JavaScript, l'autre tirant parti des méthodes de l'objet `Array` ; pour en mesurer les performances grâce à une analyse comparitive sur banc d'essai.

## Éléments fournis

- **La [description du cas d'utilisation de la fonctionnalité de recherche](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P6+Algorithms/Cas+d%E2%80%99utilisation+%2303+Filtrer+les+recettes+dans+l%E2%80%99interface+utilisateur.pdf)**, servant de référence pour le développement ;
- **La [maquette du site](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK)**, en variante _desktop_ uniquement ;
- **Un set de données au format JSON**, à utiliser en guise de base de données pour les besoins du développement.

## Cahier des charges

- **Généralités** : dépôt GitHub, séparation des fichiers HTML, CSS et JavaScript, validation W3C.
- **Documentation** : réalisation d'une fiche d'investigation de fonctionnalité pour la barre de recherche et d'un _flowchart_.
- Deux branches pour chaque implémentation de l'algorithme de recherche.
- Le code doit être **commenté** et **testé**.

## Technologies mises en oeuvre

- HTML 5 avec balises sémantiques
- Bootstrap 5 et CSS 3
- Font Awesome (icônes)
- JavaScript (ES6) avec utilisation de programmation orientée objet
- JSON pour la "base de données"
- draw.io pour le _flowchart_
- JSBench.ch pour l'analyse comparative des algorithmes de recherche

## Environnement

- Le projet a été réalisé sur Visual Studio équipé des _plugins_ Live Server, Prettier et ESLint, le tout avec NodeJS et npm, sous Linux.
- Plusieurs modules NodeJS ont été utilisés : `eslint`, `eslint-config-airbnb-base`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-prettier` et `prettier`. Les fichiers de configuration du projet sont fournis, mais les dépendances doivent être installées en local par la suite.
- La majorité des débogages et tests de compatibilité ont été réalisés sous Mozilla Firefox et Google Chrome dans leurs dernières versions au moment de l'écriture, sur ordinateur (Linux) et téléphone (Android).
