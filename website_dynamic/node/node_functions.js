const express = require('express');
const crypto = require('crypto');
const session = require('express-session');
const mysql = require('mysql2');
const router = express();

const { crypt, decrypt} = require('./node_CRYPTOfunctions');


function generateTopMenu(isConnected, pageName){
    let pages = ``;
    let currpage_index = "", currpage_tdb = "", currpage_profil = "";

    if (pageName == "index")
        currpage_index = `id="current_page"`;
    else if (pageName == "tableau_bord")
        currpage_tdb = `id="current_page"`;
    else if (pageName == "profil")
        currpage_profil = `id="current_page"`;

    if (isConnected == true){
        pages = 
        `
            <div id="nav_conteneur">
                <a href="/" class="nav_link" ${currpage_index}>Accueil</a>
                <a href="/tableau_bord" class="nav_link" ${currpage_tdb}>Tableau de Bord</a>
                <a href="/profil" class="nav_link" ${currpage_profil}>Profil</a>
            </div>
        `
        if (pageName == "profil"){
            boutonCoInscrDeco = `<div id="button_profile"><a id="butDeconnexion" tabindex="0" onclick="if(confirm('Voulez-vous vraiment vous déconnecter ?')) window.location.href='/deconnexion_site'">Déconnexion</a><button id="butDesincription" onclick="togglePopupSup()">Désinscription</button></div>`;
        }else{
            boutonCoInscrDeco = `<div id="button_profile"><a id="butDeconnexion" onclick="if(confirm('Voulez-vous vraiment vous déconnecter ?')) window.location.href='/deconnexion_site'">Déconnexion</a></div>`;
        }
    } 
    else {
        boutonCoInscrDeco = `<div id="button_profile"><a id="butConnexion" href="/inscription_connexion">Rejoindre Paralix</a></div>`;
    }
        


    html = `
    <nav>
        <div id="logo"><a href="/"><img src="img/logo_origin.png"></a></div>

        ${pages}
        
        ${boutonCoInscrDeco}

        <div class="hamburger-menu" tabindex="0" onclick="hamburger()" onkeydown="hamburger()">
            <div class="slice"></div>
            <div class="slice"></div>
            <div class="slice"></div>
        </div>
    </nav>
    `;

    return html
}



function getIp(req) {
    /**
    * PRINCIPLE : 
    *       get ip from the user request
    * INPUT :
    *       req -> the user request to acces on the page
    * RETURN :
    *       string : the ip
    */
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');
}



// Fonction de création du jeton
function tokenCreation(req, idMariaDB, pwdDecrypted, timeSeconds = 600) {
    /**
    * PRINCIPLE : 
    *       Create a session cookie with connexion information
    * INPUT :
    *       req -> the user request to acces on the page
    *       idMariaDB -> id user mariadb
    *       pwd -> password
    */


    // Set deadline (600 seconds = 10 minutes)
    const echeance = Math.floor(Date.now() / 1000) + timeSeconds;

    // Recover IP address
    const ip = getIp(req);


    pwdCrypted = crypt(ip, echeance, pwdDecrypted);

    // Build the token
    const jeton = {
        id: idMariaDB,
        ip: ip,
        echeance: echeance,
        password: pwdCrypted,
    };

    // Save token in session
    req.session.jeton = jeton;

    // console.log('Jeton créé et stocké dans la session :', req.session.jeton);
}


async function userIsConnected(req, res, userWillCalculate = false){
    /**
    * PRINCIPLE : 
    *       Function to check if the user has a valid token
    * INPUT :
    *       req -> the user request to acces on the page
    *       res -> answer of the page
    * RETURN :
    *       true -> the user is connected
    *       res.redirect -> redirection to login page because access denied (functions calling userIsConnected get undefined)
    */
    try{
        if (req.session.jeton === undefined){
            // the user is disconnected
            const loginMessage = "Veuillez vous connecter afin d'accéder à cette page.";
            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
        }

        if (req.session.jeton["echeance"] < Math.floor(Date.now() / 1000)){
            // if the token has expired
            const loginMessage = "Votre session a expiré, veuillez vous reconnecter.";
            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
        }

        pwdDecrypted = decrypt(req);

        dbUser = await connectUser(req.session.jeton["id"], pwdDecrypted, req);
        
        if (dbUser == undefined){
            // if the account has been deleted, or there is a problem with the password (like the cookie session deleted)
            const loginMessage = "Vous êtes déconnecté de la base de données de Paralix, veuillez vous reconnecter à la plateforme.";
            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
        }

        if (getIp(req) != req.session.jeton["ip"]){
            // if the ip in token does not correspond to the ip of the computer currently used
            const loginMessage = "Accès illégale au site : informations de connexion incohérente. Veuillez vous reconnecter";
            console.error("Tentative d'accéder illégalement au site (ip) : ip cookie :" + req.session.jeton["ip"] + " ip machine : " + getIp(req) +" id cookie : " + req.session.jeton["id"] + " echeance cookie :" + req.session.jeton["echeance"]);
            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
        }
        
        if (userWillCalculate){
            tokenCreation(req, req.session.jeton["id"], pwdDecrypted, 11400); // updating the toekn 11400s = 3h10 (because a calculation takes 3 hours)
        }
        else {
            tokenCreation(req, req.session.jeton["id"], pwdDecrypted); // updating the toekn
        }


        return dbUser;
    }
    catch (err){
        const loginMessage = "Accès illégale au site : informations de connexion incohérente. Veuillez vous reconnecter";
        console.error("Tentative d'accéder illégalement au site (login ou mdp) : ip cookie :" + req.session.jeton["ip"] + " ip machine : " + getIp(req) +" id cookie : " + req.session.jeton["id"] + " echeance cookie :" + req.session.jeton["echeance"]);
        return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
    }
}

// Function to validate password
const validatePassword = password => {
    /**
    * PRINCIPLE : 
    *       Function to validate password
    * INPUT :
    *       password -> the password to test
    * RETURN :
    *       true -> valid password
    *       message (string) -> error message
    */
    if (password.length < 8 || password.length > 20) return { valid: false, message: "Taille entre 8 et 20 caractères." };
    if (!/[A-Z]/.test(password)) return { valid: false, message: "Doit contenir au moins une lettre majuscule." };
    if (!/[a-z]/.test(password)) return { valid: false, message: "Doit contenir au moins une lettre minuscule." };
    if (!/[0-9]/.test(password)) return { valid: false, message: "Doit contenir au moins un chiffre." };
    if (!/[^A-Za-z0-9]/.test(password)) return { valid: false, message: "Doit contenir au moins un caractère spécial." };
    return { valid: true };
};



function getRoleOf(dbUser){
    /**
    * PRINCIPLE : 
    *       Get the MariaDB role of the user
    * INPUT :
    *       dbUser -> database connection user
    * RETURN :
    *       string -> the role of user (or a generic role)
    */
    rolebrute = mysqli_fetch_row(mysqli_query(dbUser, "SELECT CURRENT_ROLE();"))[0];

    const rolebrute = dbUser.promise().query(`SELECT CURRENT_ROLE() AS role;`)[0].role;

     if (rolebrute == 'role_utilisateur') { return "User"; }
     else if (rolebrute == NULL) { return "Missing role"; }
     else { return "Unknow role"; }
}


async function connectToDatabase(dbUser) {
    /**
    * PRINCIPLE : 
    *       Tests if the user can connect to the database (dbUser is a initialized connection)
    * INPUT :
    *       dbUser -> initialized connection before attempting to connect
    * RETURN :
    *       reject -> error (e.g. invalidate password)
    *       resolve -> indicates that the the user is successfully connected
    */
    return new Promise((resolve, reject) => {
        dbUser.connect(err => {
            if (err) {
                reject(new Error('Erreur de connexion'));
            } else {
                resolve();
            }
        });
    });
}

async function connectUser(idMariaDB, pwdMariaDB, req){
    /**
     * PRINCIPLE : 
     *      Connects the user to the site and database.
     * INPUT:
     *      loginMariaDB -> user ID (1, 2... 25, 9445...)
     *      loginSite -> user login (toto, titi, tartempion...)
     *      pwdMariaDB -> user's password when logging in
     * RETURN :
     *      True -> If connection successful
     *      string -> Otherwise
     */

    try {
        dbUser = mysql.createConnection({
            host: 'mariadb',
            user: `${idMariaDB}`,
            password: pwdMariaDB,
            database: 'Paralix',
        });
        await connectToDatabase(dbUser);

        // if we're here, it's good to go
        const ip = getIp(req);

        const dbFiCoDB = mysql.createConnection({
            host: 'mariadb',
            user: 'fictif_connexionDB',
            password: 't!nt1n_connexionDB241745414',
            database: 'Paralix',
        });
        dbFiCoDB.connect(err => {
            if (err) {
                return "error dbFiCoDB connexion - connectUser";
            }
        });

        const updateInfo = `UPDATE UserFictif_maj_derniere_co SET last_login_user_date = current_timestamp(), last_login_user_ip = '${ip}' WHERE ID_USER = ${idMariaDB}`;
        dbFiCoDB.promise().query(updateInfo);
        dbFiCoDB.end();


        tokenCreation(req, idMariaDB, pwdMariaDB);

        return dbUser; 
        
    }
    catch (err){
        // FAILED CONNEXION
        // console.error('Erreur lors de connectUser :', err);
        return false;
    }
}



// Export functions
module.exports = { getIp, crypt, decrypt, creationJeton: tokenCreation, validatePassword, connectUser, getRoleOf, userIsConnected, generateTopMenu };
