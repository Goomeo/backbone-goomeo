# API - View : Base

La vue Base permet de rajouter plusieurs fonctions à Backbone.JS parmis :

- renseignement dans votre vue des events globaux à la manière des events de DOM
- renseignement des modification du dom à partir de tous les models de votre vue (via baxkbone.stickit)
- renseignement des events des composants riot à la manière des events de DOM
- montage de tags riot à partir du DOM de votre vue
- utilisation des toasts de materialize-css plus facilement
- création des sous vues permettant automatiquement leur suppression si la vue parente est supprimée

## createSubView(name, view, options)

Permet de créer une sous vue et de la rattacher directement à cette vue-ci.

| params    | type          | description                                                                                   | default   |
| ---       | ---           | ---                                                                                           | ---       |
| name      | string        | Nom de la vue. Attention si le nom existe déjà, l'ancienne vue est supprimée                  | -         |
| view      | Backbone.View | Vue Backbone non initialisée                                                                  | -         |
| [options] | object        | Options passées à la vue Backbone et que vous pouvez retrouver dans la fonction `initialize`  | -         |

## template(template, params)

Permet de compiler un template en fonction des paramètres passés et retourne un string du template compilé.

| params    | type          | description               | default   |
| ---       | ---           | ---                       | ---       |
| template  | string        | Template à compiler.      | -         |
| params    | object        | Paramètres du template    | -         |

De base, les templates faits à partir d'ici ont les paramètres suivants :

- **moment** : Objet moment afin de facilement manipuler les dates

## dispose()

Supprime la vue et tout ce qui s'y rapporte en événements et en tags

## mountTags(params)

Permet de monter des tags RIOT dans notre vue et de rattacher tous les événements renseignés

| params            | type          | description                                       | default   |
| ---               | ---           | ---                                               | ---       |
| params            | object        | Function params                                   | -         |
| params.tag        | string        | nom du tag à monter                               | -         |
| [params.selector] | string        | Selecteur CSS valide (ex : 'div#monid > span')    | -         |
| [params.domNode]  | domNode       | Node DOM qui sera remplacée par le tag à charger  | -         |
| [params.options]  | object        | Options du tag                                    | -         |

Retourne un tableau de tags Riot.

## unmountAllTags()

Supprime tous les tags Riot de notre Vue

## waitingRender(callback)

Fonction appelée avant beforeRender pour afficher du contenu pendant l'exécution de cette fonction (chargement, une emptyView, ...). Fonction asynchrone. Pensez à appeler le callback à la fin de votre fonction

## beforeRender(callback) 

Fonction appelée juste avant l'appel de Render. Fonction asynchrone. Pensez à appeler le callback à la fin de votre fonction

## render(callback)

Fonction appelée pour afficher le rendu final de votre vue. Fonction asynchrone. Pensez à appeler le callback à la fin de votre fonction

## afterRender(callback)

Fonction appelée juste après l'appel de Render. Fonction asynchrone. Pensez à appeler le callback à la fin de votre fonction

## prerequireAction()

Fonction appelée juste après Initialize et servant à charger des données externes (données de models, collections, ...)

## global

Objet permettant de gérer tous les événements globaux de votre vue. Cet objet est composé des mêmes fonctions que Backbone.Events.

## panels

Objet permettant de manipuler le slidePanel au travers du PanelManager. Utilise les fonctions `open` et `close`.

## modal

Objet permettant de manipuler les modals au travers du ModalManager. Utilise les fonctions `open` et `close`.

## toasts.show(params)

Permet d'afficher un élément Toast à partir des paramètres d'entrée.

| params            | type                      | description                                                                               | default   |
| ---               | ---                       | ---                                                                                       | ---       |
| params            | object                    | Function params                                                                           | -         |
| params.message    | string ou jqueryObject    | Message du toast, l'HTML est accepté mais devra impérativement être un objet jQuery       | -         |
| [params.duration] | number                    | Temps d'affichage du toast en milliseconde                                                | 3000      |
| [params.style]    | string                    | Classe de personnalisation pour le toast. De base seul la classe `rounded` est disponible mais vous pouvez créer les votres. | - |
| [params.callback] | function                  | Fonction appelée après l'affichage du toast                                               | - |

## toasts.success(params)

Permet d'afficher un élément Toast à partir des paramètres d'entrée pour les messages de succès (avec l'icône à gauche)

| params            | type                      | description                                                                               | default   |
| ---               | ---                       | ---                                                                                       | ---       |
| params            | object                    | Function params                                                                           | -         |
| params.message    | string                    | Message du toast, l'HTML est accepté mais devra impérativement être un objet jQuery       | -         |
| [params.duration] | number                    | Temps d'affichage du toast en milliseconde                                                | 3000      |
| [params.style]    | string                    | Classe de personnalisation pour le toast. De base seul la classe `rounded` est disponible mais vous pouvez créer les votres. | - |
| [params.callback] | function                  | Fonction appelée après l'affichage du toast                                               | - |

## toasts.error(params)

Permet d'afficher un élément Toast à partir des paramètres d'entrée pour les messages d'erreur (avec l'icône à gauche)

| params            | type                      | description                                                                               | default   |
| ---               | ---                       | ---                                                                                       | ---       |
| params            | object                    | Function params                                                                           | -         |
| params.message    | string                    | Message du toast, l'HTML est accepté mais devra impérativement être un objet jQuery       | -         |
| [params.duration] | number                    | Temps d'affichage du toast en milliseconde                                                | 3000      |
| [params.style]    | string                    | Classe de personnalisation pour le toast. De base seul la classe `rounded` est disponible mais vous pouvez créer les votres. | - |
| [params.callback] | function                  | Fonction appelée après l'affichage du toast                                               | - |

## toasts.info(params)

Permet d'afficher un élément Toast à partir des paramètres d'entrée pour les messages d'information (avec l'icône à gauche)

| params            | type                      | description                                                                               | default   |
| ---               | ---                       | ---                                                                                       | ---       |
| params            | object                    | Function params                                                                           | -         |
| params.message    | string                    | Message du toast, l'HTML est accepté mais devra impérativement être un objet jQuery       | -         |
| [params.duration] | number                    | Temps d'affichage du toast en milliseconde                                                | 3000      |
| [params.style]    | string                    | Classe de personnalisation pour le toast. De base seul la classe `rounded` est disponible mais vous pouvez créer les votres. | - |
| [params.callback] | function                  | Fonction appelée après l'affichage du toast                                               | - |

## toasts.warn(params)

Permet d'afficher un élément Toast à partir des paramètres d'entrée pour les messages de warning (avec l'icône à gauche)

| params            | type                      | description                                                                               | default   |
| ---               | ---                       | ---                                                                                       | ---       |
| params            | object                    | Function params                                                                           | -         |
| params.message    | string                    | Message du toast, l'HTML est accepté mais devra impérativement être un objet jQuery       | -         |
| [params.duration] | number                    | Temps d'affichage du toast en milliseconde                                                | 3000      |
| [params.style]    | string                    | Classe de personnalisation pour le toast. De base seul la classe `rounded` est disponible mais vous pouvez créer les votres. | - |
| [params.callback] | function                  | Fonction appelée après l'affichage du toast                                               | - |

## getLogger()

Permet de récupérer le logger rattaché à la vue courante. à utiliser à la place et comme l'objet `console`.