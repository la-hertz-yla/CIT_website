# CIT Club Website

Un site web complet pour le Club IT (CIT) de l'INPT avec formulaire d'inscription et base de données MySQL.

## 🎯 Fonctionnalités

- **Page d'accueil**: Présentation du club avec section hero attractive
- **Page À propos**: Mission et valeurs du club
- **Page Activités**: Domaines d'expertise (Web Dev, Cybersécurité, Data Science, DevOps, etc.)
- **Page Événements**: Calendrier des événements, workshops et hackathons
- **Formulaire d'inscription**: Enregistrement des nouveaux membres avec validation
- **Base de données MySQL**: Stockage sécurisé des données utilisateurs avec Sequelize ORM
- **Backend Express.js**: API REST pour gérer les inscriptions
- **Frontend HTML/CSS/JS**: Interface utilisateur responsive

## 📋 Prérequis

- Node.js (v14+)
- MySQL (v5.7+)
- npm ou yarn

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/la-hertz-yla/CIT_website.git
cd CIT_website
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer la base de données

Créez une base de données MySQL:
```sql
CREATE DATABASE cit_db;
```

### 4. Configurer les variables d'environnement
```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos paramètres MySQL:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=cit_db
PORT=3000
```

### 5. Démarrer le serveur

Mode développement (avec auto-reload):
```bash
npm run dev
```

Mode production:
```bash
node backend/server.js
```

Le serveur démarrera sur `http://localhost:3000`

## 📁 Structure du Projet

```
CIT_website/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js       # Logique métier pour les utilisateurs
│   ├── database/
│   │   └── connection.js           # Connexion à MySQL avec Sequelize
│   ├── middleware/
│   │   └── auth.js                 # Middleware d'authentification
│   ├── models/
│   │   └── User.js                 # Modèle Sequelize pour User
│   ├── routes/
│   │   └── userRoutes.js           # Routes API pour l'inscription
│   └── server.js                   # Point d'entrée du serveur
├── web-dev/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── css-files/
│   │   └── index.css               # Styles globaux
│   ├── html-files/
│   │   ├── index.html              # Page d'accueil
│   │   ├── about.html              # À propos
│   │   ├── activities.html         # Activités
│   │   ├── events.html             # Événements
│   │   └── register.html           # Formulaire d'inscription
│   └── js-files/
│       ├── main.js                 # Script principal
│       └── register.js             # Logique du formulaire
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### POST /api/users/register
Enregistre un nouvel utilisateur

**Request Body:**
```json
{
  "name": "layla chmourk",
  "email": "chmourklayla@example.com",
  "password": "password123"
}
```

**Response (201 Success):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "layla chmourk",
    "email": "chmourklayla@example.com",
    "createdAt": "2026-05-08T10:30:00Z"
  }
}
```

**Response (400 Error):**
```json
{
  "message": "Email already registered"
}
```

## 🔐 Sécurité

- Les mots de passe sont hashés avec **bcrypt** avant stockage
- Validation des données côté serveur
- Protection CORS activée
- Emails uniques garantis par la base de données

## 🎨 Personnalisation

### Changer les couleurs
Modifiez les variables de couleur dans `web-dev/css-files/index.css`

### Ajouter des images
Placez vos images dans `web-dev/assets/images/` et référencez-les dans les fichiers HTML

### Ajouter des pages
1. Créez un nouveau fichier HTML dans `web-dev/html-files/`
2. Ajoutez le lien dans le menu de navigation (balise `<nav>`)
3. Suivez la structure de mise en page existante

## 📦 Dépendances

- **express** - Framework web Node.js
- **sequelize** - ORM pour MySQL
- **mysql2** - Driver MySQL pour Node.js
- **bcrypt** - Hash sécurisé des mots de passe
- **cors** - Middleware CORS
- **nodemon** - Auto-reload en développement

## 🐛 Dépannage

### Erreur de connexion à la base de données
- Vérifiez que MySQL est en cours d'exécution
- Vérifiez les paramètres dans `.env`
- Assurez-vous que la base de données `cit_db` existe

### Erreur 404 sur les pages
- Vérifiez que les fichiers HTML existent dans `web-dev/html-files/`
- Vérifiez les chemins des liens dans le navigation

### Erreur CORS
- Vérifiez la configuration CORS dans `backend/server.js`
- Assurez-vous que les origines autorisées sont correctes

## 📄 Licence

Ce projet est sous licence ISC.

## 👥 Contribution

Les contributions sont les bienvenues! Veuillez:
1. Fork le projet
2. Créer une branche pour votre feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Contact

Pour toute question, contactez le Club CIT via l'email: contact@citclub.inpt

## 🚀 Déploiement

Pour déployer en production:

1. Configurez les variables d'environnement sur votre serveur
2. Installez les dépendances: `npm install --production`
3. Lancez le serveur: `npm start`
4. Configurez un proxy inverse (Nginx/Apache)
5. Utilisez un gestionnaire de processus (PM2)

```bash
# Avec PM2
npm install -g pm2
pm2 start backend/server.js --name "cit-website"
pm2 save
pm2 startup
```
