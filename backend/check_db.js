const db = require('./database/connection');
const User = require('./models/User');

async function checkDatabase() {
    try {
        // Synchroniser la base de données
        await db.sync();

        // Voir les tables
        const [tables] = await db.query('SELECT name FROM sqlite_master WHERE type="table"');
        console.log('Tables dans la base de données:');
        tables.forEach(table => console.log('- ' + table.name));

        // Voir les utilisateurs
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'filiere', 'level', 'interests', 'phone', 'createdAt']
        });
        console.log('\nUtilisateurs enregistrés:');
        if (users.length === 0) {
            console.log('Aucun utilisateur enregistré pour le moment.');
        } else {
            users.forEach(user => {
                console.log(`- ID: ${user.id}, Nom: ${user.firstName} ${user.lastName}, Email: ${user.email}, Filière: ${user.filiere}, Niveau: ${user.level}, Intérêts: ${JSON.stringify(user.interests)}, Téléphone: ${user.phone}, Créé le: ${user.createdAt}`);
            });
        }

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await db.close();
    }
}

checkDatabase();