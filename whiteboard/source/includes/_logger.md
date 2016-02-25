# Logger

Le logger sert à réaliser du log de différents levels au sein de l'application.

Ces logs sont disponibles en 5 niveaux :

| level | code  | fonction  | description                                                       |
| ---   | ---   | ---       | ---                                                               |
| 0     | TRACE | trace()   | Permet d'afficher toute sorte d'informations                      |
| 1     | DEBUG | debug()   | Permet de logger des informations dites de debug                  |
| 2     | INFO  | info()    | Permet d'afficher des messages d'information                      |
| 3     | WARN  | warn()    | Permet d'afficher des messages d'erreurs non bloquantes           |
| 4     | ERROR | error()   | Permet d'afficher des messages d'erreurs critiques ou bloquantes  |

Pour utiliser facilement ces noiveaux de log et savoir lesquels afficher en fonction de notre environnement, nous utilisons la library `loglevel` ainsi que son extension `loglevel-message-prefix` pour avoir un préfixe d'erreur propre.

## Initialisation

Si vous voulez créer votre propre logger, voici la marche à suivre :

```javascript
var log                     = require('loglevel'),
    loglevelMessagePrefix   = require('loglevel-message-prefix');

var logger = log.getLogger('unnompourlerendreunique');

loglevelMessagePrefix(this._logger, {
    staticPrefixes : [ 'unnompourlerendreunique' ]
});

// ensuite vous pouvez utiliser logger comme vous voulez
logger.info('test info');
```

<aside class="warning">**Attention** : Si vous faites une fonction pour automatiser ces lignes, ne faites pas x fois l'appel de `loglevelMessagePrefix` sur le même logger sinon vous aurez plusieurs fois le préfixe d'affiché.</aside>

