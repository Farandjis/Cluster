const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path'); 
const session = require('express-session');
const { userIsConnected, generateTopMenu } = require('./node_functions');

// Configuring middleware to process form data
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/tableau_bord', async (req, res) => {
    dbUser = await userIsConnected(req, res);
    
    if (dbUser != undefined){
        

        const resDB = await dbUser.promise().query(
            'SELECT saveUserSettings_AutoSave, saveUserSettings_AutoDeletion FROM view_USER_SETTINGS'
          );

        varSus_as = "";
        varSus_ad = "";

        if (Boolean(resDB[0][0]['saveUserSettings_AutoSave'])){
            varSus_as = "checked"
            console.log("TF1 " + varSus_as)
        }
        if (Boolean(['saveUserSettings_AutoSave']) && Boolean(resDB[0][0]['saveUserSettings_AutoDeletion'])){
            varSus_ad = "checked"
            console.log("M6 " + varSus_ad)
        }

        res.render('tableau_bord.ejs', { topMenu: generateTopMenu(true, "tableau_bord"), sus_as: varSus_as, sus_ad: varSus_ad });
    }
});
    
module.exports = router;
