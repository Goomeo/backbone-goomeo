# Composants formulaire

Tous les composants de formulaires utilisent l'apparence Material UI définie par *materialize-css*. 
De base, si vous utilisez ces composants Riot dans une vue Backbone étendant `backbone-goomeo/js/libs/backbone/views/base.form`, alors vous aurez automatiquement de chargés les composants `material-input` et `material-textarea`

<aside class="notice">La plupart des composants de formulaire ont des paramètres supplémentaires afin de permettre leur validation par la bibliothèque *ParsleyJS*.
Pour cela, vous devrez juste ajouter en lieu et place de `data-parsley-<suite>` les attribut `parsley-<suite>` sur les composants concernés.</aside>

## Input

```html
<material-input
    col="s6"
    data-id="name"
    data-name="name"
    parsley-required="true"
    ></material-input>
```

```javascript
this.mountTags({
    tag : 'material-input'
});
```

Input de base généré avec le label associé.

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| col       | Si renseigné, permet de définir la colonne associée au grid système                           | -         |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| type      | Type de l'input                                                                               | text      |
| disabled  | Si renseigné, disable l'input                                                                 | -         |
| icon      | nom de l'icon du material design afin de le rajouté en préfixe                                | -         |
| value     | valeur de l'input                                                                             | -         |
| isActive  | ajoute la classe `active` au label associé                                                    | -         |
| label     | libellé du label. Si le libellé est un code de traduction, il sera automatiquement traduit    | name      |

<aside class="notice">Utilise *ParsleyJS*.</aside>

## Textarea

```html
<material-textarea
    col="s6"
    data-id="name"
    data-name="name"
    parsley-required="true"
    ></material-textarea>
```

```javascript
this.mountTags({
    tag : 'material-textarea'
});
```

Textarea de base généré avec le label associé.

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| col       | Si renseigné, permet de définir la colonne associée au grid système                           | -         |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| disabled  | Si renseigné, disable l'input                                                                 | -         |
| icon      | nom de l'icon du material design afin de le rajouté en préfixe                                | -         |
| value     | valeur de l'input                                                                             | -         |
| isActive  | ajoute la classe `active` au label associé                                                    | -         |
| label     | libellé du label. Si le libellé est un code de traduction, il sera automatiquement traduit    | name      |

<aside class="notice">Utilise *ParsleyJS*.</aside>

## Checkbox

```html
<material-checkbox
    data-id="name"
    data-name="name"
    parsley-required="true"
    label="Choix 1"
    ></material-checkbox>
```

```javascript
this.mountTags({
    tag : 'material-checkbox'
});
```

Checkbox de base généré avec le label associé.

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| disabled  | Si renseigné, disable l'input                                                                 | -         |
| value     | valeur de l'input                                                                             | -         |
| label     | libellé du label. Si le libellé est un code de traduction, il sera automatiquement traduit    | -         |
| isfilled  | Si présent rajoute la classe `filled-in` à la checkbox                                        | -         |
| checked   | Si présent, rajoute l'attribut `checked` à la checkbox                                        | -         |

<aside class="notice">Utilise *ParsleyJS*.</aside>

## Radio

```html
<material-radio
    data-id="name"
    data-name="name"
    parsley-required="true"
    label="Choix 1"
    ></material-radio>
```

```javascript
this.mountTags({
    tag : 'material-radio'
});
```

Radio de base généré avec le label associé.

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| disabled  | Si renseigné, disable l'input                                                                 | -         |
| value     | valeur de l'input                                                                             | -         |
| label     | libellé du label. Si le libellé est un code de traduction, il sera automatiquement traduit    | -         |
| isgap     | Si présent rajoute la classe `with-gap` à la radio                                            | -         |
| checked   | Si présent, rajoute l'attribut `checked` à la radio                                           | -         |

<aside class="notice">Utilise *ParsleyJS*.</aside>

## Select

```html
<material-select
    col="s6"
    data-id="name"
    data-name="name"
    parsley-required="true"
    default="Choose item please"
    ></material-select>
```

```js
this.mountTags({
    tag : 'material-select',
    options : {
        items : [
            { value : 1, name : "Choice One" },
            { value : 2, name : "Choice Two" }
        ]
    }
});
```

Select de base avec les éléments passés en Javascript

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| col       | Si renseigné, permet de définir la colonne associée au grid système                           | -         |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| disabled  | Si renseigné, disable l'input                                                                 | -         |
| multiple  | Si présent, le select est un multiselect                                                      | -         |
| label     | libellé du label. Si le libellé est un code de traduction, il sera automatiquement traduit    | choice    |
| default   | Option par défaut des selects affichée en première position sans aucune valeur associée       | -         |
| items     | Tableau d'éléments                                                                            | [ ]       |
| items[ ].name      | libellé d'un élément                                                                 | -         |
| items[ ].value     | valeur d'un élément                                                                  | -         |
| items[ ].selected  | Si présent, alors lélément est sélectionné                                           | -         |

<aside class="notice">Utilise *ParsleyJS*.</aside>

## Switch

```html
<material-switch
    data-id="name"
    data-name="name"
    on="Label de droite"
    off="Label de gauche"
    ></material-checkbox>
```

```javascript
this.mountTags({
    tag : 'material-switch'
});
```

Switch de base.

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| disabled  | Si renseigné, disable l'input                                                                 | -         |
| value     | valeur de l'input                                                                             | -         |
| checked   | Si présent, rajoute l'attribut `checked` à l'input                                            | -         |
| on        | libellé du label positionné à droite (switch checked). Si le libellé est un code de traduction, il sera automatiquement traduit | on |
| off       | libellé du label positionné à gauche (switch non checked). Si le libellé est un code de traduction, il sera automatiquement traduit | off |

<aside class="notice">Utilise *ParsleyJS*.</aside>

## Colorpicker

Génère un colorpicker avec le label de base. Pour le colorpicker, on utilise la library jquery *Spectrum* qui permet d'avoir un colorpicker complet et léger.

```html
<colorpicker
    col="s6"
    data-id="color"
    data-name="color"
    parsley-required="true"
    ></colorpicker>
```

```javascript
this.mountTags({
    tag : 'colorpicker'
});
```

| option    | description                                                                                   | default   |
| ------    | -----------                                                                                   | -------   |
| col       | Si renseigné, permet de définir la colonne associée au grid système                           | -         |
| data-id   | Identifiant de l'input                                                                        | -         |
| data-name | Nom de l'input                                                                                | -         |
| color     | couleur renseignée de base                                                                    | -         |
| label     | libellé du label. Si le libellé est un code de traduction, il sera automatiquement traduit    | color     |
| spectrum  | Configuration spectrum. Merci de voir la [documentation de Spectrum](https://bgrins.github.io/spectrum/) | - |

<aside class="notice">Utilise *ParsleyJS*.</aside>

Voici la configuration de base de spectrum : 

| option            | description                                                                                   | valeur    |
| ------            | -----------                                                                                   | -------   |
| showInitial       | Permet d'afficher la couleur de base en entrant dans le colorpicker et la nouvelle couleur    | true      |
| showInput         | Affiche l'input de couleur afin de rentrer le code rgba, hex, hex8, ...                       | true      |
| preferredFormat   | Format d'affichage de la réponse dans l'input                                                 | hex       |

Voici la liste des événements que vous pouvez capturer dans votre vue :

| événement             | description                                                   |
| -----                 | -----                                                         |
| `change.spectrum`     | appelé quand la couleur de spectrum a été validée             |
| `show.spectrum`       | appelé lors de l'affichage du composant spectrum              |
| `hide.spectrum`       | appelé lors du masquage du composant spectrum                 |
| `beforeShow.spectrum` | appelé après l'affichage de spectrum                          |
| `dragstart.spectrum`  | appelé quand on bouge le curseur de couleur dans spectrum     |
| `dragstop.spectrum`   | appelé quand on relache le curseur de couleur dans spectrum   |

<aside class="notice">Si vous activez l'alpha, la couleur est affichée en utilisant le format *hex8* en lieu et place de *hex*.</aside>


## Datepicker

Génère un datepicker avec le label de base. Pour le datepicker, on utilise la library jquery *pickadate* modifiée par l'équire de *materialize-css*. 
Cette library permet d'avoir un datepicker entièrement configurable.

