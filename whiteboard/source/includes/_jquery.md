# Jquery

Le projet utilise toujours une couche de jQuery pour simplifier la manipulation du DOM ou pour le bon fonctionnement de [Backbone](backbone).

## Appel

Si vous avez besoin d'utiliser jQuery, vous avez plusieurs façons de le faire selon l'endroit où vous êtes :

- **Vue Backbone**  :
   - via `this.$`. Les vues backbone ont effectivement un accès interne à jQuery. Il faut aussi savoir qu'il est limité au DOM de la vue courante **ainsi** qu'à ses sous vues.
   - via `var $ = require('jquery')`. Ici, on charge jQuery via le composant *require*. Là le sélecteur jQuery a accès au DOM complet.
- **Scripts JS**    :
   - via `var $ = require('jquery')`. Ici, on charge jQuery via le composant *require*. Là le sélecteur jQuery a accès au DOM complet.
- **Vues HTML**     :
   - via `jQuery`. Là le sélecteur jQuery a accès au DOM complet.

## Extensions

Il est parfois utile et nécéssaire d'étendre jQuery avec de nouvelles fonctions/modules. Pour cela, plusieurs solutions sont possibles.

Si vous voulez éttendre jQuery à tout le projet, peu importe l'application lancée derrière, vous devrez injecter les dépendances dans le fichier *js/init.js*. Là vous trouverez une fonction qui s'appelle **extendjQuery** et vous aurez juste à ajouter votre module par un simple appel à `require('monmodule')` :

```
{
  extendjQuery : function extendjQuery() {
    $.support.cors = true;

    // form2js pour $('form').toObject();
    require('form2js');
    require('jquery.form2js');
  }
}
```

### Exceptions

**Attention** : Il est fortement probable que certains modules jQuery ne soient pas pensés pour fonctionner avec *CommonJS*.

Si c'est le cas, vous devrez renseigner certaines choses dans le fichier *package.json* à la rubrique *browser* :

```
{
    "browser" : {
         "jQuery"         : "./node_modules/jquery/dist/jquery.min.js",
         "jquery.form2js" : "./node_modules/form2js/src/jquery.toObject.js"
    }
}
```

Ceci va permettre à browserify de convertir le code du fichier en code compatible *CommonJS* et de créer un alias pour le récupérer via la commande `require()`.
