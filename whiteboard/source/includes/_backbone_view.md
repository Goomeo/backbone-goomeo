# Vues Backbone

Les vues Backbone du projet ne devront pas étendre `Backbone.View`. En effet, nous avons créer une classe de base afin d'ajouter un nombre de fonctions utiles permettant d'améliorer le développement.

La classe de base se trouve dans */js/libs/backbone/views/base.js*. Si vous voulez éttendre cette vue pour avoir d'autres vues de base réutilisables, vous devrez les créer dans le répertoire */js/libs/backbone/views*

## Organisation

Toute la partie javascript sera rangée dans le répertoire `js` et toute la partie HTML sera rangée dans le répertoire `tpl`.

Chaque groupe fonctionnel de vues doit se retrouver dans un répertoire désignant ce même groupe. Par exemple, toutes les vues composant le module LNS se retrouvent dans un sous répertoire lns. De même, la vue maîtresse de ce groupe devra s'appeler index.

Les parties vues et templates doivent suivre la même règle et les mêmes nommages. Par exemple, le template de la vue `/modules/events/lns/index.js` se retrouvera comme ceci : `/tpl/events/lns/index.html`

```text
js
├── collections                  # Répertoire de toutes les collections
│   └── todo                     # collections propres au module todo
│       └── tasks.js             # Collection tasks
├── models                       # Répertoire de tous les models
│   └── todo                     # models propres au module todo
│       └── task.js              # model task
├── modules                      # Partie vues Javascript
│   └── todo                     # vues propres au module todo
│       ├── forms                # répertoire des formulaires
│       │   └── form.js          # vue du formulaire
|       ├── item.js              # vue pour une tâche
│       └── index.js             # page d'accueuil du module todo
└── tpl                          # templates
    └── todo                     # vues propres au module todo
        ├── forms                # répertoire des formulaires
        │   └── form.html        # template du formulaire
        └── index.html           # template de la page d'accueuil
```

## Création d'une sous vue

Dans les anciens projets, nous avions pour habitude de créer toutes les sous vues par le viewManager. Mais la tâche était redondante sur le fait qu'il fallait ajouter manuellement la vue au tableau `subviews` afin que toutes les vues soient détruites quand la principale l'était.

Dorénavant, vous devrez passer par la méthode `this.createSubView()`. La fonction s'utilise de la même façon à la différence que vous n'avez plus besoin de rajouter la sous-vue au tableau de subviews. Elle le fait pour vous.

```javascript
// avant
var subView = vm.create('nomdevotrevue', votreView, {
    key : 'foo'
});
this.subviews.push(subView);

// après
var subView = this.createSubView('nomdevotrevue', votreView, {
    key : 'foo'
});
```

> Le nom de votre vue sera composée comme ceci :

```text
fichier : /js/modules/events/maps/index.js
vue     : events:maps:index
```

## Ouverture/fermeture d'un slidePanel.

> ouverture :

```javascript
this.panels.open({
    view    : this.createSubView('todo:form', formView, {
        model : this.model
    }),
    options : {
        title : 'Test'
    }
});
```

> fermeture :

```javascript
this.panels.close();
```

Un slidePanel est un panneau latéral souvent utilisé pour afficher des formulaires ou des donnés complémentaires. Vous avez la possibilité d'en ouvrir et d'en fermet facilement au sein de votre vue backbone gràce à `this.panels`.
 
Cet objet vous donne accès aux fonction `open()` et `close` du panelManager.

Si vous voulez plus d'informations. rendez-vous sur la documentation du panelManager.


## Montage de tags Riot

*Pour de plus amples informations concernant les tags, comment les créer, rangement, ..., Veuillez vous rendre sur la documentation dédiée.*

De base, *riot* regarde le DOM de toute la page web pour créer nos tags et ne garde donc pas la notion de DOM limitée à notre vue courante Backbone. Afin de palier au problème, si vous voulez monter des tags dans votre vue Backbone, vous le pouvez grâce à la fonction `mountTags(params)`.

```javascript
this.mountTags({
    tag : 'jumbotron'
});
```

> **Attention** : Vu que Riot fait la recherche sur le `el` de votre vue, pensez à ajouter le contenu au DOM avant l'appel de cette fonction. De même, pensez à précharger votre tag dans votre vue comme ceci :

```javascript
var _           = require('underscore'),
    View        = require('libs/backbone/views/base'),
    tpl         = require('tpl/index.html');

// préchargement des tags ici
require('components/examples/jumbotron.tag');

module.exports = View.extend({
});
```

## Événements

### De Vue

Les événements de vue sont renseignés dans les vues via l'attribut `events`. Ces événements sont des événements jQuery sur le `$el` de la vue uniquement (et de ses sous vues).

L'objet *events* se sépare en deux parties :

- **Les Fields** : Ce sont les événements jQuery
- **Les valeurs** : Ce sont les noms des fonctions appelées et qui douvent **impérativement** être renseigner et exister dans votre vue.

Le contexte des fonctions appelées par *events* (la variable `this`), correspond à votre vue.

> Events de vue

```javascript
{
  events : {
    'submit form'  : 'validAction',
    'click a#toto' : 'redirectAction'
  },
  validAction : function (evt) {
    // action du formulaire
  },
  redirectAction : function (evt) {
    // action de redirection
  }
}
```

### Globaux

Les événements globaux permettent d'effectuer des actions entre vos différentes vues. Par exemple, si une de vos vue finit l'envoie d'un formulaire, elle peut déclencher l'événement d'envoie avec la réponse en paramètre.

Toutes les vues qui écoutent sur ce même événement vont exécuter *en même temps* la fonction rattachée.

La liste des événements globaux sur lequel une vue écoute est renseignée dans l'attribut `globalEvents` et se présente comme les événements de vue :

- **Les Fields** : Ce sont les noms des événements globaux.
- **Les valeurs** : Ce sont les noms des fonctions appelées et qui douvent **impérativement** être renseigner et exister dans votre vue.

Le contexte des fonctions appelées par *events* (la variable `this`), correspond à votre vue.

> Events globaux :

```javascript
{
  globalEvents : {
      'submitForm' : 'submitAction',
      'addElement' : 'addElementAction'
  },
  submitAction : function submitAction() {
      console.log('submitAction');
  },
  addElementAction : function addElementAction(element) {
    console.log(element);
  }
}
```

> Pour envoyer un événement global, vous devrez faire comme ceci :

```javascript
this.global.trigger('submitForm');
this.global.trigger('addElement' {
  name : 'foo'
});
```

### Tag -> View

Nos vues Backbone peuvent directement capturer des événements Riot (si bien entendu ils en déclenchent) simplement de la même façon que les événements de vue et les événements globaux. Bien entendu, vous ne pouvez écouter sur une vue que les événements des tags qu'elle contient.

La liste des événements de Tags de vue est renseignée dans l'attribut `tagEvents` et elle est séparée en deux niveaux. Au premier niveau on trouve un objet avec pour chaque field le nom du tag et, pour chaque tag, les événements correspondant à `evenement + selecteur CSS` :

> Events de tags :

```javascript
{
  tagEvents : {
    jumbotron : {
      'click #testId' : 'clickAction'
    }
  },
  clickAction : function clickAction(tag) {
      tag.unmount();
      console.log(this);
  },
}
```

Dans l'exemple ci dessus, lorsque l'on reçois l'événement *click* d'un tag *jumbotron* ayant l'ID *testId*, alors on effectue l'action *clickAction*.

Les callback de ces événements ont au moins un paramètre qui correspond à l'objet du Tag concerné par l'événement. Le contexte des fonctions (la variable `this`), correspond à votre vue.

## Stickit

Nos vues backbone étendent toutes la bibliothèque Stickit développé par le New York Times. Sa documentation complète afin de rentrer plus en détail dans son fonctionnement se [trouve ici](https://nytimes.github.io/backbone.stickit)

### Instanciation

Pour utiliser Stickit, vous avez plusieurs choix possibles entre : Le renseignement directement dans les propriétés de la vue ou en appel direct dans le code comme expliqué dans leur documentation.

**À savoir** : Dans nos vues, vous n'aurrez pas besoin de faire l'appel à la fonction `this.stickit()` à la fin de votre *render*. Il est fait automatiquement par nos vues juste après l'instanciation des tags Riot. De plus, vous n'êtes pas limités, dans les propriétés de la vue, au binding du model principal.

### Modèle Principal

> Pour le modèle principal (renseigné par `this.model`), les Bindings sont renseignés dans le field `bindings` comme ceci :

```javascript
{
    bindings : {
        '#author': 'author'
    }
}
```

Ici, si le field `authors` de mon modèle est modifié, alors l'élément de ma vue avec l'identifiant `#authors` est mis à jour avec la nouvelle valeur.

### Modèles complémentaires

> Pour les modèles complémentaires (renseignés dans `this.models`), les Bindings sont renseignés dans le field `<nomdumodel>Bindings`. Ce qui nous donne :

```javascript
{
    userBindings : {
        '#name' : 'name'
    },
    moduleBindings : {
        '#lock' : 'islocked'
    }
    initialize : function (options) {
        this.models.user    = options.user;
        this.models.module  = options.module;
    }
}
```

Ici, les bindins du modèle `user` sont renseignés dans le field `userBindings` et les bindings du modèle `module` sont renseignés dans le field `moduleBindings`.

## Render

> appel pour l'affichage

```javascript
$('body').html(view.render().$el);
```

> déclaration de la fonction

```javascript
render : function (done) {
    this.$el.html(this.template(tpl, {
        model : this.model
    }));

    done();
}
```

La fonction render renseignée dans la vue est maintenant asynchrone. En effet, au lieu de faire un `return this`, vous devrez exécuter le callback passé en paramètre.

**Par contre**, quand vous appellerez la méthode `render` dans un router ou pour l'affichage d'une sous vue, rien ne change. En effet lors de l'appel, plusieurs fonctions sont automatiquement appelées :

- **waitingRender** : utilisée pour afficher le contenu de la vue pendant le chargement des données requises
- **beforeRender** : utilisée pour faire des traitements avant le véritable render (chargement de données externes, ...)
- **render** : exécute la fonction render que vous avez défini dans votre vue
- **afterRender** : utilisé pour faire des traitements après le render de la vue (chargement de scripts javascript, ...)

Et pour finir, chargement de backbone.stickit sur tous les models de la vue, montage des tags de base Riot et lancement de l'événement `DOMContentLoaded`