# API - ModalManager

le modalManager gère la création et la fermeture de toutes les modales crées au sein du projet. 

<aside class="notice">Vous êtes limités à une modale ouverte en simultané. Si vous essayez d'en ouvrir une autre, l'ancienne est fermée sans aucun préavis.</aside>

## open(params)

Permet de crér une modale à partir d'HTML ou d'une vue backbone.

**Atention** : Popur marcher en html vous devez avoir la structure totale d'une modal.
Pour les vue, la classe de votre vue doit être celle de base de la modal.

| parametre                     | description                                               | default   |
| ---                           | ---                                                       | ---       |
| params.html                   | code html de votre modal                                  | -         |
| params.view                   | Vue backbone instanciée                                   | -         |
| params.options                | Options de la fonction modal fournie par [materialize-css](http://materializecss.com/modals.html) | - |

## close(params)

| parametre                     | description                                                   | default   |
| ---                           | ---                                                           | ---       |
| params.name                   | Nom de la vue backbone associée pour qu'elle soit détruite    | -         |
| params.options                | Options de la fonction modal fournie par [materialize-css](http://materializecss.com/modals.html) | - |