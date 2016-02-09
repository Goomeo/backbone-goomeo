# Browserify

Pour la compilation du projet, nous utilisons le package Browserify qui permet de coder son projet en utilisant la norme CommonJS en lieu et place de la norme AMD.

## CommonJS

La norme CommonJS permet de structurer son code en fichiers et d'appeler les dépendances comme nous le ferions sous NodeJS :

```javascript
'use strict';

// appel des dépendances et les stocker dans des var
var $ = require('jquery');

// appel de dépendances sans les stocker dans des variables (ex: pour étendre jquery)
require('jquery.form2js');

// objet/fonction/variable retourné par l'appel de ce fichier par la commande require()
module.exports = function () {
  console.log('a');
};

```

## Limitations

La seule limitation avec Browserify, c'est que votre code ainsi structuré n'est pas utilisable directement dans le navigateur. Vous devrez impérativement builder votre code afin de générer un fichier javascript valide.

_Pour voir comment compiler votre code facilement en temps réel, [veuillez vous référez à la documentation du build](build)._

## Configuration

Il est possible de dire certaines choses à Browserify pour simplifier l'utilisation des ressources externes, mettre certaines variables en global sur notre code, ...

### Librairies externes

Il est possible que dans les librairies installées par *NPM*, il y en aie plusieurs qui ne soient pas prévues pour fonctionner sous CommonJS. Heureusement, il est possible de palier à ceci dans le fichier *package.json* afin d'indiquer à Browserify de convertir les fichiers suivants :

> Browser files

```json
{
  "browser": {
    "jQuery": "./node_modules/jquery/dist/jquery.min.js",
    "jquery.form2js": "./node_modules/form2js/src/jquery.toObject.js"
  }
}
```

Ici nous indiquons aux fichiers `jquery.min,js` et `jquery.toObject.js` d'être convertis en fichiers CommonJS valide et d'être appelé avec la fonction `require()` via le mot clé `jQuery` et `jQuery.form2js`.

### Variables globales

Dans le projet nous utilisons qu'une variable globale : *jquery*. Effectivement, si l'on veut `require('jQuery')`, on va tout le temps récupérer l'objet jQuery de base et non l'objet étendu par tous les modules. Pour palier à ça, nous plaçons jQuery en variable globale afin d'avoir toujours le `jQuery` étendu au lieu de celui de base.

Pour cela, nous passons par un *shim* de browserify configuré comme ceci :

> Shims :

```json
{
  "browserify-shim": {
    "jquery": "global:jQuery"
  }
}
```

Ici on dit que la variable globale `jQuery` sera chargée automatiquement dans nos script avec l'appel `require('jquery')`.

Bien entendu, il faut que dans votre code vous ayez ceci :

> variables globales :

```javascript
// définition de la variable globale jQuery
global.jQuery = require('jQuery');
```

### Alias

Les alias servent à simplifier l'accès à différents répertoires du projet. Par exemple, si vous êtes dans un sous répertoire au cinquième niveau et que vous voulez récupérer un template, vous devrez préfixer votre require de plusieurs `../` ce qui peut vite devenir embêtant.

Voici la liste des alias disponibles :

Alias       | Correspond à 
---         | --- 
collections | /js/collections 
components  | /js/components 
libs        | /js/libs 
models      | /js/models 
modules     | /js/modules 
tpl         | /js/tpl 

Si vous voulez ajouter un template facilement, vous le pouvez grâce au `package.json` de la façon suivante :

```json
{
  "aliasify": {
    "aliases": {
      "tpl": "./js/tpl",
      "models": "./js/models",
      "components": "./js/components",
      "libs": "./js/libs",
      "modules": "./js/modules",
      "collections": "./js/collections"
    }
  }
}
```
