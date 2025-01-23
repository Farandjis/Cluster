// IMPORTS

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');

const serverRoutes_InscCo = require('./action_inscription_connexion.js');
const serverRoutes_ExecMod = require('./action_execution_module.js');
const serverRoutes_TabBord = require('./tableau_bord.js');
const serverRoutes_Prof = require('./profil.js');
const serverRoutes_Index = require('./index.js');

// PREPARATION
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// CHEMINS STATICS 
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/style', express.static(path.join(__dirname, '../style')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(session({
    secret: 'Paral!xxXXxx_24454115414',
    resave: false,
    saveUninitialized: false,
    name: 'connected_users',
    rolling: true, // Extends duration with each request
    unset: 'destroy' // Deletes session on logout (on the server side, when req.session becomes null (i.e. when the browser is closed))
}));


// ROUTES
app.use('/', serverRoutes_InscCo);
app.use('/', serverRoutes_ExecMod);
app.use('/', serverRoutes_TabBord);
app.use('/', serverRoutes_Prof);
app.use('/', serverRoutes_Index);

// REDIRECTION DE L'UTILISATEUR
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/inscription_connexion', (req, res) => {
    res.sendFile(path.join(__dirname, '../inscription_connexion.html'));
});
*/

app.get('/profil', (req, res) => {
    res.sendFile(path.join(__dirname, '../profil.html'));
});

app.get('/profil_Admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../profil_Admin.html'));
});


// LANCEMENT DU SERVEUR
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
