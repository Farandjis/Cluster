const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');
const { userIsConnected, generateTopMenu } = require('./node_functions');

// Configuring middleware to process form data
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', async (req, res) => {


    res.render('index.ejs', { 
        userConnected: req.session.jeton !== undefined,
        topMenu: generateTopMenu(req.session.jeton !== undefined, "index")
    });
    
});
    
module.exports = router;
