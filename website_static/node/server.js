// IMPORTS

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');


// PREPARATION
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// CONNECTION MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})


// CHEMINS STATICS 
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/style', express.static(path.join(__dirname, '../style')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/images', express.static(path.join(__dirname, '../images')));


// REDIRECTION DE L'UTILISATEUR
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/inscription_connexion', (req, res) => {
    res.sendFile(path.join(__dirname, '../inscription_connexion.html'));
});

app.get('/tableau_bord', (req, res) => {
    res.sendFile(path.join(__dirname, '../tableau_bord.html'));
});


// INSCRIPTION

app.post('/inscription', (req, res) => {
    const { username, password } = req.body;
});


// CONNECTION

app.post('/connexion', (req, res) => {
    const { username, password } = req.body;
});

//EXECUTION MODULE PI
app.post('/execute_pi', (req, res) => {

});


//EXECUTION MODULE NOMBRE PREMIER
app.post('/execute_prime', (req, res) => {

});


//EXECUTION MODULE HELLO WORLD
app.post('/execute_hello', (req, res) => {

});


// LANCEMENT DU SERVEUR
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
