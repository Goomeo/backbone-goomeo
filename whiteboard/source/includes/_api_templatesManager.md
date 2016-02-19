# TemplatesManager

Classe servant à compiler les templates et à récupérer directement ceux qui l'ont été.

## compile(template)

Compile le template passé en paramètre et retourne la fonction généré par `_.template()`.  
Si le template passé a déjà été compilé, retourne directement le résultat de `_.template` stocké en mémoire.

| parametre                     | description                                               | default   |
| ---                           | ---                                                       | ---       |
| template                      | Contenu du template à compiler                            | -         |

## remove(template)

Supprime le template passé en paramètre de la mémoire du templateManager pour permettre une nouvelle compilation de zéro au prochain appel de `compile()`

| parametre                     | description                                               | default   |
| ---                           | ---                                                       | ---       |
| template                      | Contenu du template à supprimer                           | -         |