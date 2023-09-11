# 2d_procedural_game


Démo en ligne:
- phase 1: génération d'un chunk unique
> https://nicolasthebaud.github.io/2d_procedural_game/history/phase1/index.html
- phase 2: génération de chunks voisins
> https://nicolasthebaud.github.io/2d_procedural_game/history/phase2/index.html
- phase 3: génération infinie de la map
> https://nicolasthebaud.github.io/2d_procedural_game/history/phase3/index.html

/!\ dev version (unstable)
https://nicolasthebaud.github.io/2d_procedural_game/dev/index.html


Informations générales:

> Le Monde créé est vu du dessus (en 2D)
> Sa génération est procédurale
> Le Monde est divisé en *Chunks*, des subdivisions carrées du monde
> Chaque Chunk est lui-même divisés en Tiles (ie. pixel), ayant une couleur correspondant à leur "altitude"
> Chaque Chunk est aligné avec ses voisins (i.e. l'altitude des côtés adjacents sont identiques)
> (wip)

Informations techniques:
> Le Monde est dessiné dans un canvas dans une page HTML (voir "CanvasRenderingContext2D")



# Scope I - Génération du Monde


- 1. Génération d'un Chunk unique
acceptance; le chunk:
> est carré, d'une taille paramétrable
> est généré aléatoirement
> respecte une altitude incluse entre 0 et 9

technical guidance:
une méthode simple consiste à générer les 4 points cardinaux aléatoirement,
puis extrapoler les données
e.g:

donné un tableau unidimensionnel:
[5, _, _, _, _, _, 1] // ou "_" représente une donnée vide
plusieurs méthodes sont possible pour générer cette ligne:

[5, 4, 4, 3, 2, 2, 1] // génération lineaire standard (note: "3" n'est présent qu'une fois mais peut remplacer un "4" ou un "2" selon l'algorithme utilisé)

un autre algorithme pourrait résulter en une ligne différente, e.g.
[5, 4, 2, 1, 2, 2, 1] // ici la génération n'est pas linéaire

> possibles algorithmes à étudier: Interpolation bilinéaire, Bruit de Perlin


- 2. Gestion de voisinnage
acceptance:
> le monde est composé de X Chunks (nombre paramétrable)
> les chunks sont générés de manière à ce que deux chunks adjacents soit "voisins" en terme d'altitude; e.g.

[1, 2, 3] | [1, 2, 3]   // Génération KO

[2, 3, 4] | [1, 2, 3]   // trop de différence entre les deux côtés

[3, 4, 5] | [1, 3, 4]

---------------------------------------------------------------

[1, 2, 3] | [3, 3, 3]   // Génération OK

[2, 3, 4] | [4, 4, 4]   // les deux côtés sont egaux

[3, 4, 5] | [5, 4, 4]

note: permettre aux chunks d'avoir des coordonnées inégales (ex: [..., 5] | [4, ...]) génère des résultats moins réalistes



- 3. Génération infinie
acceptance:
> permettre l'ajout post-génération d'une nouvelle ligne/colonne de Chunk (via une bouton sur la page HMTL)
/!\ les canvas HTML ont une taille prédéfinie
