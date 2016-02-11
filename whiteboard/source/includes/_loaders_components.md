# Composants loaders

Les composants loaders permettent d'afficher un loader à l'écran. Barre de progression, spinner, barre de loading indéterminé, ...

## Spinner

```html
<spinner
    size="button"
    color="spinner-grey-only"
    ></spinner>
```

```javascript
this.mountTags({
    tag : 'spinner'
});
```

| option        | description                                                                               | default   |
| ------        | -----------                                                                               | -------   |
| size          | Taille du spinner parmi `button`, `small` et `big`                                        | small     |
| color         | Couleur du spinner parmi `spinner-green-only`, `spinner-red-only`, `spinner-blue-only`, `spinner-yellow-only` et `spinner-grey-only` | spinner-green-only |


## Progress

Génère une progressBar faisant, selon les cas, soit une progression standard, soit une progression indéterminée.

```html
<material-progress></material-progress>
```

```javascript
this.mountTags({
    tag : 'material-progress'
});
```

| option        | description                                                                                           | default   |
| ------        | -----------                                                                                           | -------   |
| isdeterminate | Si présent, alors la progressBar est de type déterminé                                                | -         |
| progress      | Permet de dire à combien de % se situe la progressBar. Ne marche que si isdeterminate est renseigné   | 0         |

Voici les événements que vous pouvez lancer depuis le javascript gràce à la fonction `trigger` :

| événement             | description                                                   |
| -----                 | -----                                                         |
| `progress`            | Permet de changer le pourcentage de la progressBar            |