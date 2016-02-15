# Modals

Voici la collection de toutes les modals disponibles au sein de la library.

La plupart des modals sont des vues Backbone afin de simplifier la gestion des événements et la personnalisation de chacune d'elles.

## Delete

Modale utilisée pour la suppression d'éléments. Vous pouvez choisir entre une suppression 1 et 2 facteurs. La suppression à 2 facteurs demandant de remplir un input avant suppression.

```javascript
var deleteModal = require('backbone-goomeo/js/modules/common/modals/delete');

// ...
this.modal.open({
  view : this.createSubView('modal:delete', deleteModal, {
      hasDoubleVerif      : true,
      validateCallback    : function () {
          this.model.destroy();
          this.toasts.success({ message : 'Tâche supprimée avec succès.' });
          this.dispose();
      }.bind(this)
  })
});
// ...
```

| parametre         | type      | description                                                                                               | default   |
| ---               | ---       | ---                                                                                                       | ---       |
| message           | String    | Message du dialog. Si le libellé est un code de traduction, il sera automatiquement traduit               | deleteMessage |
| title             | String    | Titre du dialog. Si le libellé est un code de traduction, il sera automatiquement traduit                 | deleteTitle |
| accept            | String    | Texte du bouton de validation. Si le libellé est un code de traduction, il sera automatiquement traduit   | delete |
| cancel            | String    | Texte du bouton d'annulation. Si le libellé est un code de traduction, il sera automatiquement traduit    | cancel |
| icon              | String    | Classe d'îcone pour l'afficher à gauche du texte de la modal                                              | delete |
| labelDoubleVerif  | String    | Label utilisé sir la bouble vérification est activée                                                      | deleteDoubleVerif |
| hasDoubleVerif    | Boolean   | True : Double vérification activée. Il y a un input avec KO. Pour que la modale soit confirmée il faut le remplacer par OK. | false |
| validateCallback  | Function  | Fonction appelée lors de la confirmation de la modale                                                     | - |
| cancelCallback    | Function  | Fonction appelée lors de l'annulation de la modale                                                        | - |
