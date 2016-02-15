# API - PanelManager

Le panel manager gère la gestion du panneau latéral servant à contenir un formulaire ou des informations complémentaires.

Ce pannel se situe du côté droite de l'écran et, selon la résulution de lécran et la taille désirée, vous pouvez avoir un panneau couvrant entre 30 et 100% de l'écran.

## Tailles disponibles

Voici les classes disponibles ainsi que la taille qu'elles représentent :

| classe        | taille    |
| ---           | ---       |
| low           | 30%       |
| medium        | 50%       |
| low-high      | 70%       |
| medium-high   | 80%       |
| high          | 90%       |
| max           | 100%      |

<aside class="warning">**Attention** : Ces tailles sont indiquées pour les écrans d'une résolution suppérieure ou égale à 992px</aside>

## open(params)

Fonction appelée pour ouvrir un slidePannel

| parametre                     | description                                               | default   |
| ---                           | ---                                                       | ---       |
| params                        | Function params                                           | -         |
| params.sizeClass              | Taille du panneau. Utilisez les classes notée au dessus   | medium    |
| params.view                   | Vue Backbone instanciée. N'est pas obligatoire            | -         |
| params.html                   | Contenu HTML à mettre dans le slidePanel. Se met à la place du param `view` | - |
| params.closeOnClickOutside    | true : Le panel se ferme quand on clic en dehors.         | false |

## close

Ferme le slidePanel