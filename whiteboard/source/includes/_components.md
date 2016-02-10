# Composants de base

Vous trouverez ici la liste complète ainsi que le fonctionnement de tous les composants de base RiotJS.

## Chips

Génère un composant chips définit par materialize. Est aussi utilisé si vous voulez créer des tags.

```html
<chips content="Chip d'exemple"></chips>
```

```javascript
this.mountTags({
    tag : 'chips'
});
```

| option        | description                                                                                   | default   |
| ------        | -----------                                                                                   | -------   |
| content       | Contenu de la chip. Si le libellé est un code de traduction, il sera automatiquement traduit  | -         |
| img           | url d'image de la chip affiché en cerclé à gauche                                             | -         |
| close         | Si présent, affiche une croix à droite pour pouvoir supprimer la chip                         | -         |

Voici la liste des événements que vous pouvez capturer dans votre vue :

| événement             | description                                                   |
| -----                 | -----                                                         |
| close                 | Appelé lors du clic sur le bouton close de la chip            |