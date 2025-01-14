const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path'); 
const session = require('express-session');
const { userIsConnected } = require('./node_functions');

// Configuring middleware to process form data
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/tableau_bord', async (req, res) => {
    dbUser = await userIsConnected(req, res);
    
    if (dbUser != undefined){
        res.sendFile(path.join(__dirname, '../tableau_bord.html'));
    }
});
    
module.exports = router;
