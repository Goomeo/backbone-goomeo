# Riot

Riot.JS est un petit framework permettantde crér des tags à la manière de Reat.JS afin de réutiliser très facilement des composants complexes.

La documentation complète (et en français) [se trouve ici](http://riotjs.com/fr/api/)

## Organisation

Les tags de Riot sont rangés dans le répertoire *js/components* et sont rangés par rapport aux modules les utilisant (ou _common_ pour les composants communs).

## Structuration

```html
<tag-name>
  <!-- contenu HTML du tag -->

  <script>
    // script rattaché aux tags
  </script>
</tag-name>
```

Les tags sont définis dans le noeud `tag-name` qui sera à remplacer par le nom de votre tag (par exemble : `colorpicker`, `datepicker`, ...) et il est divisé à l'intérieur en deux grandes parties :

- **Le HTML** : C'est en réalité le *template** du contenu de votre tag. Vouis pouvez très bien appeler un sous tag à cet endroit là comme vous le feriez ailleurs.
- **Le Javascript** : C'est toute la partie traitement de votre tag. C'est aussi ici que vous pourrez faire les appels à `require()` pour charger les dépendances.

**Attention** : Les alias de Browserify pour le require ne marchent pas du tout ici.