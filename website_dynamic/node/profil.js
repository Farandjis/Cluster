const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const router = express.Router();
const mysql = require('mysql2');
const session = require('express-session');
const fs = require('fs');
const { userIsConnected ,validatePassword, generateTopMenu,connectUser} = require('./node_functions');

// Configuring middleware to process form data
router.use(bodyParser.urlencoded({ extended: true }));


//router.set('view cache', false); 


router.get('/profil', async (req, res) => {
    try {
        const dbUser = await userIsConnected(req, res); // Vérifie si l'utilisateur est connecté
        
        if (dbUser != undefined){
            const query = `SELECT login,role,id_user FROM view_USER_PROFILE`;

            dbUser.query(query, [dbUser.userId], (error, results) => {
                if (error) {
                    console.error('Erreur lors de la récupération du nom:', error);
                    res.send('Erreur de récupération des données');
                    return;
                }
                
                if (results.length > 0) {
                    const nomUtilisateur = results[0].login;
                    const query2 = 'SELECT time, module,filename FROM User_History ORDER BY time DESC LIMIT 20;'
                    dbUser.query(query2,(error,results2) => {
                        if (error) {
                            console.error('Erreur lors de la récupération du nom:', error);
                            res.send('Erreur de récupération des données');
                            return;
                        }

                        const loginMessage = req.query.loginMessage  ? "<div class='erreur'><p>Erreur ! " + req.query.loginMessage + "</p></div>" : ''; 
                        const successMessage = req.query.successMessage  ? "<div class='erreur'><p>Success : " + req.query.successMessage + "</p></div>" : ''; 

                        if(results[0].role=="role_admin"){
                            const query3 = 'Select * from Module_Usage_Stats'
                            dbUser.query(query3,(error,results3) => {
                                if (error) {
                                    console.error('Erreur lors de la récupération des données :', error);
                                    res.send('Erreur de récupération des données');
                                    return;
                                }
                                const query4 = 'Select * from Module_Usage_By_User'
                                dbUser.query(query4,(error,results4) => {
                                    if (error) {
                                        console.error('Erreur lors de la récupération des données :', error);
                                        res.send('Erreur de récupération des données');
                                        return;
                                    }
                                    const query5 = 'Select * from User_Action_History ORDER BY time'
                                    dbUser.query(query5,(error,results5) => {
                                        if (error) {
                                            console.error('Erreur lors de la récupération des données :', error);
                                            res.send('Erreur de récupération des données');
                                            return;
                                        }
                                        const query6 = 'SELECT DISTINCT id_user, login FROM view_USERS_LIST';
                                        dbUser.query(query6,(error,results6) => {
                                            if (error) {
                                                console.error('Erreur lors de la récupération des données :', error);
                                                res.send('Erreur de récupération des données');
                                                return;
                                            }

                                            res.render('profil.ejs',{
                                                nomUser: nomUtilisateur,
                                                id_user: results[0].id_user,
                                                data1: results2.map(row => ({time:row.time,module:row.module,filename:row.filename})),
                                                data2: results3.map(row => ({module: row.module,total_uses: row.total_uses})),
                                                data3: results4.map(row => ({login: row.login,module:row.module,usage_count:row.usage_count})),
                                                data4: results5.map(row => ({time:row.time,calcul:row.calcul,module:row.module,login:row.login})),
                                                data5: results6,
                                                loginMessage: loginMessage, 
                                                successMessage : successMessage,
                                                topMenu: generateTopMenu(true, "profil")
                                            })
                                        })
                                    })
                                })
                            })
                        }else{
                            res.render('profil.ejs',{
                                nomUser: nomUtilisateur,
                                id_user: results[0].id_user,
                                data1: results2.map(row => ({time:row.time,module:row.module,filename:row.filename})),
                                loginMessage: loginMessage,
                                successMessage : successMessage,
                                topMenu: generateTopMenu(true, "profil")
                            })
                        }
                    });
                } else {
                    res.send('Utilisateur non trouvé');
                }        
            });
        }
        
    } catch (error) {
        console.error('Erreur de connexion:', error);
        res.send('Erreur de connexion');
    }
});

router.post('/changeMDP', async (req, res) => {
    const { anpassword,newpassword, Conpassword } = req.body;

    if (!newpassword || !Conpassword) {
        return res.redirect(`/profil?loginMessage=${encodeURIComponent('Veuillez compléter tous les champs.')}`);
    }

    if (newpassword !== Conpassword) {
        return res.redirect(`/profil?loginMessage=${encodeURIComponent('Les mots de passe ne correspondent pas.')}`);
    }

    const passwordValidation = validatePassword(newpassword);
    if (!passwordValidation.valid) {
        return res.redirect(`/profil?loginMessage=${encodeURIComponent('Le mot de passe doit respecter les critères de sécurité.')}`);
    }



    try{
        const dbUser = await userIsConnected(req, res); // Vérifie si l'utilisateur est connecté

        if (dbUser != undefined){
            const query = `SELECT id_user FROM view_USER_PROFILE`;
                
            dbUser.query(query, [dbUser.userId], async (error, results) => {
                if (error) {
                    console.error('Erreur lors de la récupération du nom:', error);
                    res.send('Erreur de récupération des données');
                    return;
                }
                if (results.length > 0) {
                    const User_id = results[0].id_user

                    const dbUserTest = await connectUser(User_id, anpassword, req);
                    if (dbUserTest == false || dbUserTest == undefined){
                        return res.redirect(`/profil?loginMessage=${encodeURIComponent("L'ancien mot de passe ne correspond pas.")}`);
                    }else{
                        // const ChangePasswordQuery = `ALTER USER '${User_id}'@'172.20.0.3' IDENTIFIED BY '${newpassword}';'`;
                        const ChangePasswordQuery = 'SET PASSWORD = PASSWORD(?);';
                        await dbUser.promise().query(ChangePasswordQuery, [newpassword]);


                        dbUser.end();
                        const dbUser2 = await connectUser(User_id, newpassword, req);
                        if (dbUser2 != false) {
                            dbUser2.end();
                            return res.redirect(`/profil?successMessage=${encodeURIComponent('Le Mot de passe à été modifier avec success')}`);
                        }
                        else {
                            const loginMessage = 'Problème de connection au un compte avec le nouveau mot de passe.';
                            return res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent(loginMessage)}`);
                        }
                    }
                } else {
                    res.send('Utilisateur non trouvé');
                }
            });
        }
    }catch (error) {
        console.error('Erreur de connexion:', error);
        res.send('Erreur de connexion');
        res.redirect(`/inscription_connexion?loginMessage=${encodeURIComponent('Probleme de connexion')}`);
    }
});


router.get('/nuke_someone', async (req, res) => {
    try {

        dbUser = await userIsConnected(req, res);
        
        if (dbUser != undefined){

            console.log("Nuke someone");
            const userId = req.query.userId;
            console.log("Connection réussie");

            // Command to kill processes - if userId is empty, it will kill all PPP processes
            const grepPattern = userId ? `PPP${userId}` : 'PPP';
            console.log(grepPattern);
            const command = `ssh moi@172.19.181.254 "ps aux | grep mpiexec | grep ${grepPattern} | awk '{print \\$2}' | xargs -r sudo kill"`;
            console.log(command);
            exec(command, { shell: true }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${stderr}`);
                    return res.status(500).json({ message: 'Error terminating calculation' });
                }
                console.log(`Terminated processes ${userId ? 'for user ' + userId : 'for all users'}`);
                res.status(200).json({ message: 'Calculation terminated successfully' });
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/active-processes', async (req, res) => {
    try {
        dbUser = await userIsConnected(req, res);
        
        if (dbUser != undefined){

            const dbUser = await userIsConnected(req, res);
            if (!dbUser) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const command = `ssh moi@172.19.181.254 "ps aux | grep mpiexec | grep PPP"`;
            exec(command, { shell: true }, (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ activeUsers: [] });
                }
                
                const activeUserIds = stdout.split('\n')
                    .filter(line => line.includes('PPP'))
                    .map(line => {
                        const match = line.match(/PPP(\d+)/);
                        return match ? match[1] : null;
                    })
                    .filter(id => id !== null);

                res.json({ activeUsers: [...new Set(activeUserIds)] });
            });
        }
    } catch (error) {
        res.status(500).json({ activeUsers: [] });
    }
});



  

router.get('/get-file/:idUser/:filename', async (req, res) => {
    dbUser = await userIsConnected(req, res);
        
    if (dbUser != undefined){

        const { idUser, filename } = req.params;
        const filePath = '/DATA_USERS/'+ idUser +'/'+ filename;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err);
                return res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
            }
            res.json(JSON.parse(data));
        });
    }
});

router.get('/DeleteFile/:userId/:filename', async (req, res) => {
    const { userId, filename } = req.params;
    const TrueuserId = decodeURIComponent(userId).replace(/"/g, '');
    const Truefilename = decodeURIComponent(filename).replace(/"/g, '');

    try {
        dbUser = await userIsConnected(req, res);
        
        if (dbUser != undefined){

            // Construire le chemin du fichier à supprimer
            const filePath = '/DATA_USERS/'+ TrueuserId +'/'+ Truefilename;
            
            // Supprimer le fichier
            fs.unlinkSync(filePath);
            await dbUser.promise().query(
                'DELETE FROM User_History WHERE filename = ?', 
                [Truefilename]
            );
            console.log(`Le fichier ${Truefilename} a été supprimé.`);
            return res.redirect(`/profil?successMessage=${encodeURIComponent('La Suppression à réussi avec success')}`);
            // Si la suppression est réussie, afficher un message de succès
        }
    } catch (err) {
        console.error(`Erreur lors de la suppression de "${Truefilename}": ${err.message}`);
        // Si une erreur se produit, afficher un message d'erreur
        res.send(`Erreur de connexion`);
        res.redirect(`/profil?loginMessage=${encodeURIComponent('Une Erreur à eu lieu durant la suppression du fichier')}`);
    }
});


module.exports = router;