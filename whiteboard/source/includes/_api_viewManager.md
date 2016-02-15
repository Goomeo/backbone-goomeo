# API - ViewManager

Le view Manager est la classe utilisée pour gérer la création de nouvelles vues et la suppression des vues existantes.

## create(name, view, [options])

Créer une nouvelle vue Backbone et l'ajoute à la collection des vues.

| parametre | description                                           | default   |
| ---       | ---                                                   | ---       |
| name      | Nom de la vue. Fait office d'ID et doit être unique   | -         |
| view      | Vue Backbone non instanciée                           | -         |
| options   | Options à passer à la vue lors de l'instanciation. Ce sont ceux que vous retrouverez dans la fonction `initialize` | -    |

<aside class="warning">**Attention** : Si vous créez une vue avec un nom utilisé par une autre, alors l'ancienne vue est purement et simplement supprimée.</aside>

## get(name)

Récupère une vue à partir de son nom. Si la vue n'existe pas, retourne `false`

| parametre | description                                           | default   |
| ---       | ---                                                   | ---       |
| name      | le nom de la vue                                      | -         |

## disposeAll([without]) 

Supprime toutes les vues sauf celles passées en paramètre

| parametre | description                                           | default   |
| ---       | ---                                                   | ---       |
| without   | Tableau de noms de vues à ne pas supprimer            | -         |

## dispose(name)

upprime la vue passée en paramètre, ses événements ainsi que toutes ses sous-vues et leurs événements

| parametre | description                                           | default   |
| ---       | ---                                                   | ---       |
| name      | le nom de la vue                                      | -         |

## exist(name)

Test si la vue passé en paramètre existe.

| parametre | description                                           | default   |
| ---       | ---                                                   | ---       |
| name      | le nom de la vue                                      | -         |

