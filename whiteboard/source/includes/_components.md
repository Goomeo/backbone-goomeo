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

Permet de traduire un texte, mot, phrase dans la langue courante à partir d'un mot clé. Le système de traduction passe par la classe i18n du projet utilisant en arrière plan la library globalize.

À noter que le tag se trouve moins personnalisable que la fonction de traduction fournie par la classe `i18n`. Si vous voulez plus de choix, veuillez ne pas utiliser le tag.

```html
<i18n word="welcome" />
```

```javascript
this.mountTags({
    tag : 'i18n'
});
```

| option                    | description                                                                                   | default   |
| ------                    | -----------                                                                                   | -------   |
| word                      | mot clé à traduire par rapport à vos fichiers json de globalize                               | -         |
| locale                    | Permet de traduire dans une autre locale que la locale courante                               | -         |
| var-<nom variable>        | Variables à insérer dans la traduction comme par exemple une quantité, un nom, une heure, ... | -         |

Pour les variables, vous devrez les passer comme ceci si par exemple votre phrase à traduire a besoin de la variable `quantity` :

```html
<i18n word="cartItem" var-quantity="2" />
```

<aside class="notice">Ce composant est monté automatiquement si vous étendez une vue basée sur celle de base fournit par cette library.</aside>