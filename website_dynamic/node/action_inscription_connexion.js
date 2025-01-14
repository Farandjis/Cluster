const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql2');
const session = require('express-session');
const { getIp, chiffre, tokenCreation, validatePassword, connectUser, getRoleOf } = require('./node_functions');

// Configuring middleware to process form data
router.use(bodyParser.urlencoded({ extended: true }));


//router.set('view cache', false); 


// HTML page inscription_connexion that can display errors
router.get('/inscription_connexion', (req, res) => {
      const errorLogin = req.query.loginMessage  ? "<div class='erreur'><p>Erreur ! " + req.query.loginMessage + "</p></div>" : ''; 
      const errorRegistration = req.query.registrationMessage  ? "<div class='erreur'><p>Erreur ! " + req.query.registrationMessage + "</p></div>" : ''; 
      
      res.render('inscription_connexion.ejs', { loginMessage: errorLogin, registrationMessage: errorRegistration });
});



// login page
router.post('/login', async (req, res) => {
    const { login, password} = req.body;

    res.clearCookie('connected_users'); // clear the session cookie 

    if (!login || !password) {
        const loginMessage = 'Veuillez compléter tous les champs.';
        return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
    }

    
    const dbFiCoDB = mysql.createConnection({
        host: 'mariadb',
        user: 'fictif_connexionDB', // fictive user to get the ID user from the login
        password: 't!nt1n_connexionDB241745414',
        database: 'Paralix',
    });
    dbFiCoDB.connect(err => {
        if (err) {
            console.error('Erreur de connexion à la base de données FiCo lors du login:', err);
            const loginMessage = "Une erreur s'est produite, veuillez contacter l'administrateur : Erreur de connexion de fictif_connexionDB.";
            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
        } else {
            // console.log('Connecté à la base de données MariaDB FiCo.');
        }
    });



    const [id_user] = await dbFiCoDB.promise().query(
        'SELECT id_user FROM UserFictif_connexion WHERE login = ?',
        [login]
    );

    dbFiCoDB.end();


    if (id_user[0] == null) {
        const loginMessage = "Mauvais login ou mauvais mot de passe dans le cas où vous avez un compte.";
        return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
    }
    
    const userId = id_user[0].id_user;

    dbUser2 = await connectUser(userId, password, req);
    if (dbUser2 != false) {
        dbUser2.end();
        return res.redirect(`/tableau_bord`);
    }
    else {
        const loginMessage = 'Mauvais login ou mauvais mot de passe dans le cas où vous avez un compte.';
        return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
    }
});


// registration page
router.post('/register', async (req, res) => {
    const { login, password, confirmPassword} = req.body;

    res.clearCookie('connected_users');

    if (!login || !password || !confirmPassword) {
        const registrationMessage = 'Veuillez compléter tous les champs.';
        return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
    }

    if (login.length < 2 || login.length > 20){
        const registrationMessage = 'Le login doit contenir entre 2 et 20 caractères.';
        return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
    }

    if (password !== confirmPassword) {
        const registrationMessage = 'Le mot de passe et le mot de passe de confirmation ne correspondent pas.';
        return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
            const registrationMessage = 'Le mot de passe doit contenir entre 8 et 20 caractères, doit avoir au moins : une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial.';
        return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
    }





    const dbFiInscDB = mysql.createConnection({
        host: 'mariadb',
        user: 'fictif_inscriptionDB', // fictive user to create a MariaDB User and insert data into  
        password: 't!nt1n_inscriptionDB17053417',
        database: 'Paralix',
    });
    dbFiInscDB.connect(err => {
        if (err) {
            console.error('Erreur de connexion à la base de données FiInsc - register:', err);
            const loginMessage = "Une erreur s'est produite, veuillez contacter l'administrateur : Erreur de connexion de fictif_inscriptionDB.";
            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
        } else {
            // console.log('Connecté à la base de données MariaDB FiInsc.');
        }
    });

    userId = null;

    try {


        const dbFiCoDB = mysql.createConnection({
            host: 'mariadb',
            user: 'fictif_connexionDB', // fictive user to get the ID user from the login
            password: 't!nt1n_connexionDB241745414',
            database: 'Paralix',
        });
        dbFiCoDB.connect(err => {
            if (err) {
                console.error('Erreur de connexion à la base de données FiCo - register :', err);
                const loginMessage = "Une erreur s'est produite, veuillez contacter l'administrateur : Erreur de connexion de fictif_connexionDB.";
                return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
            } else {
                // console.log('Connecté à la base de données MariaDB FiCo.');
            }
        });


        // Check if login or email already exists
        const [userExists] = await dbFiCoDB.promise().query(
            'SELECT COUNT(*) AS count FROM UserFictif_connexion WHERE login = ?',
            [login]
        );

        dbFiCoDB.end();


        if (userExists[0].count > 0) {
            const registrationMessage = 'Ce login est déjà utilisé par un autre utilisateur.';
            return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
        }




        // Insert user in database
        const [result] = await dbFiInscDB.promise().query(
            'INSERT INTO UserFictif_inscription(login, role) VALUES (?, "user")',
            [login]
        );
        
        userId = result.insertId;

        


        const dbFiDrDB = mysql.createConnection({
            host: 'mariadb',
            user: 'fictif_droitDB', // Fictive user to give user rights
            password: 't!nt1n_droitDB4768174457',
            database: 'Paralix',
        });
        dbFiDrDB.connect(err => {
            if (err) {
                console.error('Erreur de connexion à la base de données FiDr - register:', err);
                const loginMessage = "Une erreur s'est produite, veuillez contacter l'administrateur : Erreur de connexion de fictif_droitDB.";
                return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
            } else {
                // console.log('Connecté à la base de données MariaDB FiDr.');
            }
        });



        // Create the MariaDB user and give user rights
        const createUserQuery = `CREATE USER '${userId}'@'172.20.0.3' IDENTIFIED BY '${password}';`;
        const grantRoleQuery = `GRANT 'role_utilisateur' TO '${userId}'@'172.20.0.3';`;  // Appliquer le rôle par défaut pour l'utilisateur

        await dbFiInscDB.promise().query(createUserQuery);
        await dbFiDrDB.promise().query(grantRoleQuery); 

        dbFiInscDB.end();

        const dbUser = mysql.createConnection({
            host: 'mariadb',
            user: `${userId}`, // The MariaDB User to activate by default his 
            password: password,
        });
        dbUser.connect(err => {
            if (err) {
                // console.error('Erreur de connexion à la base de données user:', err);
            const registrationMessage = "Une erreur s'est produite lors de la connexion automatique à votre compte. Si vous n'arrivez pas à vous connecter, veuillez contacter l'administrateur.";
            return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
            } else {
                // console.log('Connecté à la base de données MariaDB FiDr.');
            }
        });

        await dbUser.promise().query(`SET DEFAULT ROLE 'role_utilisateur' FOR CURRENT_USER();`);

        dbUser.end();


        

        dbUser2 = await connectUser(userId, password, req);
        if (dbUser2 != false){
            dbUser2.end();
            return res.redirect(`/tableau_bord`);
        }
        else {
            throw ("error connectUser : " + success);
        }

    } catch (err) {
        console.error(`Erreur lors de l\'inscription de user id : '${userId}', login : '${login}':`, err);

        if (userId != null){
            await dbFiInscDB.promise().query(`DROP USER IF EXISTS '${userId}'@'172.20.0.3';`);
            dbFiInscDB.end();
        }

        const registrationMessage = 'Une erreur est survenue ';
        return res.redirect(`/inscription_connexion?registrationMessage=${encodeURIComponent(registrationMessage)}`);
    }

    
});

module.exports = router;

