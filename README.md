###Project Back-end Ebook :   
For the documentation, I refer you to Docu-Projet03.docx in themain branch.
# Backend pour la gestion des livres


## Configuration

- Le serveur utilise Express.js
- Il écoute sur le port 5000
- Utilise MongoDB comme base de données
- Utilise le middleware CORS pour permettre les requêtes cross-origin
- Utilise express.json() pour parser les requêtes JSON

## Connexion à la base de données

- Se connecte à une base de données MongoDB via une URI (non fournie dans le code pour des raisons de sécurité)
- Utilise Mongoose pour la modélisation des données

## Modèle de données

Le schéma de livre (Book) contient :
- title : String
- author : String

## Routes API

1. GET /books
   - Récupère tous les livres de la base de données
   - Renvoie un tableau JSON de tous les livres

2. DELETE /deleteBook/:id
   - Supprime un livre spécifique par son ID
   - Paramètres :
     - id : ID du livre à supprimer
   - Réponses :
     - 200 : Livre supprimé avec succès
     - 400 : ID invalide
     - 404 : Livre non trouvé
     - 500 : Erreur serveur

## Gestion des erreurs

- Capture et log les erreurs de connexion à MongoDB
- Gère les erreurs pour chaque route avec des réponses HTTP appropriées
