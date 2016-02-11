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

## Empty

Génère une empty view avec icône + texte. Utilisé pour les vues liste si aucun élément disponible

```html
<empty material="true" data-icon="list" data-message="tasksEmpty"></empty>
```

```javascript
this.mountTags({
    tag : 'empty'
});
```

| option        | description                                                                               | default   |
| ------        | -----------                                                                               | -------   |
| material      | Si renseigné, on passe par les icônes material                                            | -         |
| dataIcon      | nom de l'icône (ou sa classe si non material)                                             | -         |
| dataMessage   | Message affiché. Si le libellé est un code de traduction, il sera automatiquement traduit | -         |

<aside class="notice">Ce composant est monté automatiquement si vous étendez une vue basée sur celle de base fournit par cette library.</aside>

## Raw

Génère une vue contenant du code HTML. Ce composant est surtout utilisé pour gérer le rendu html d'une variable dans un autre composant RiotJS personnalisé.

```html
<raw content="contenuHtmlouPas" />
```

```javascript
this.mountTags({
    tag : 'raw'
});
```

| option        | description                                                                               | default   |
| ------        | -----------                                                                               | -------   |
| content       | Contenu de l'objet Raw. Si il contient de l'HTML, sera affiché avec le bon formattage.    | -         |

## I18n

A venir