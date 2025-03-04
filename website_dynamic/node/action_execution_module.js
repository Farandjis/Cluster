// IMPORTS
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const { notifPreparation} = require('./node_saveResults')
const { userIsConnected } = require('./node_functions')
const fs = require('fs');

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

//EXECUTION MODULE NOMBRE PREMIER
router.post('/execute_prime', async (req, res) => {
    const dbUser = await userIsConnected(req, res,true);

    if (dbUser != undefined) {

        const { endNumber, nbProc, checkbox1, checkbox2, calcId } = req.body;

        if (!endNumber || isNaN(endNumber) || !nbProc || isNaN(nbProc )) {
            return res.status(400).json({ success: false, error: 'Paramètre invalide' });
        }

        const dbUser = await userIsConnected(req, res, true);
        if (!dbUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const [resMariaDB] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
        const userId = resMariaDB[0].id_user;

        // Commande pour exécuter le script Python avec MPI
        // Note de Matthieu du 17/01/2025 à 10h45 : je ne sais pas ce qu'est --oversubscribe, alors je l'ai retiré pour pouvoir réutiliser le script sans master
        const command = `ssh moi@172.19.181.254 "mpiexec --allow-run-as-root -host pi4master:127.0.0.1,172.19.181.1,172.19.181.2,172.19.181.3,172.19.181.4 -n ${nbProc} -x PROC_NAME=PPP${userId}___${calcId} python /home/moi/cluster-prime-master/prime.py ${endNumber}"`;
        console.log(command)

        exec(command, { shell: true }, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur : ${error.message}`);
                return res.status(500).end();
            }
            

            if (stderr) {
                console.error(`Erreur standard : ${stderr}`);
                return res.status(500).json({ success: false, error: stderr });
            }
            
            const data = JSON.parse(stdout);

            output_html = `
                <h1 id="title_res">${data.message}</h1>
                <p>Tous les nombres premiers jusqu'à : ${data.find_up_to}</p>
                <p>Nombre de noeuds de calcul : ${data.nodes}</p>
                <p>Temps de calcul : ${data.time_elapsed} seconds</p>
                <p>Nombre de résultat : ${data.primes_found}</p>
                <h2>Tous les nombres premiers :</h2>
                <p>${data.all_primes.join(', ')}</p>
            `;


            const [varNotif_title, varNotif_message, varNotif_aboutFiles] = await notifPreparation(checkbox1, checkbox2, stdout, req, res, 'prime', dbUser)

            res.json({ success: true, primes: output_html, notif_title: varNotif_title, notif_message: varNotif_message, notif_aboutFiles: varNotif_aboutFiles });
        });
    }
});

//EXECUTION MODULE HELLO WORLD
router.post('/execute_hello', async (req, res) => {
    dbUser = await userIsConnected(req, res, true);

    if (dbUser != undefined){

        const { distributedText , nbProc, checkbox1, checkbox2, calcId } = req.body;

        const sanitizedText = distributedText
        .replace(/"/g, '\\"')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/;/g, '')
        .replace(/\|/g, '')
        .replace(/>/g, '')
        .replace(/</g, '')
        .replace(/&/g, '');


        if (sanitizedText.length<4){return res.status(400).json({ success: false, error: 'Too few letters in the text' });}



        if (!nbProc || isNaN(nbProc) || !distributedText) {
        return res.status(400).json({ success: false, error: 'Invalid number of processors' });
        }


        const [resMariaDB] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
        const userId = resMariaDB[0].id_user;

        const command = `ssh moi@172.19.181.254 "mpiexec --allow-run-as-root --mca routed direct --host pi4master:172.19.181.254,172.19.181.1,172.19.181.2,172.19.181.3,172.19.181.4 -n ${nbProc} -x PROC_NAME=PPP${userId}___${calcId} python /home/moi/cluster-prime-master/hello.py '${sanitizedText}'"`;

        exec(command, { shell: true }, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).end();
        }

        if (stderr) {
            console.error(`Standard error: ${stderr}`);
            return res.status(500).json({ success: false, error: stderr });
        }

        const data = JSON.parse(stdout);


        let result = '';
        for (let i = 0; i < data.full_text.length; i++) {
            let {class_number, part_text} = data.full_text[i];
            result += `<span class=raspn${class_number}>${part_text}</span>`;
        }

        const output_html = `
        <h1 id="title_res">${data.message}</h1>
        <div>
        <h2>Explication de la programmation distribuée</h2>
        <p>La programmation distribué fonctionne par la répartition de tâches entre plusieurs machines.<br/>
        Ainsi, l'ensemble des modules ci-contre fonctionne par la distribution du travail de calcul entre un RPI4 maître plusieurs RPI0 travailleurs.<br/>
        Voici un exemple simple illustrant la programmation distribué. Le texte est coloré dans une couleur différente en fonction du RPI0 qui l'a traîté : </p>
        <span class=raspn0>RPI0 n°1</span><br/>
        <span class=raspn1>RPI0 n°2</span><br/>
        <span class=raspn2>RPI0 n°3</span><br/>
        <span class=raspn3>RPI0 n°4</span>
        <div/>
        <p>Nombre de noeuds de calcul : ${data.nodes}</p>
        <div class="distributed-text">
            ${result}
        </div>
        `;


        const [varNotif_title, varNotif_message, varNotif_aboutFiles] = await notifPreparation(checkbox1, checkbox2, stdout, req, res, 'rainbow-text', dbUser)



        res.json({ success: true, result: output_html, notif_title: varNotif_title, notif_message: varNotif_message, notif_aboutFiles: varNotif_aboutFiles });
        });
    }
});


    //EXECUTION MODULE PI
router.post('/execute_montecarlo', async (req, res) => {

    dbUser = await userIsConnected(req, res, true);

    if (dbUser != undefined){

        const { nbIt, nbProc, checkbox1, checkbox2, calcId } = req.body;

        if (!nbIt || isNaN(nbIt) || !nbProc || isNaN(nbProc)) {
            return res.status(400).json({ success: false, error: 'Paramètre invalide' });
        }


        const [resMariaDB] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
        const userId = resMariaDB[0].id_user;

        // Commande pour exécuter le script Python avec MPI
        //const command = `mpiexec --allow-run-as-root --hostfile /home/hosts_cluster -n ${nbProc} python /home/moi/cluster-prime-master/montecarlo.py ${nbIt}`;
        const command = `ssh moi@172.19.181.254 "mpiexec --allow-run-as-root -host pi4master:127.0.0.1,172.19.181.1,172.19.181.2,172.19.181.3,172.19.181.4 -n ${nbProc} -x PROC_NAME=PPP${userId}___${calcId} python /home/moi/cluster-prime-master/montecarlo.py ${nbIt}"`;

        console.log(command)


        exec(command, { shell: true }, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur : ${error.message}`);
                return res.status(500).end();
            }
            
            if (stderr) {
                console.error(`Erreur standard : ${stderr}`);
                return res.status(500).json({ success: false, error: stderr });
            }

            const data = JSON.parse(stdout);

            const output_html = `
                <h1 id="title_res">${data.message}</h1>
                <p>Nombre de lancés pour l'algorithme de Monte Carlo : ${data.nb_it}</p>
                <p>Nombre de noeuds de calcul : ${data.nodes}</p>
                <p>Estimation de Pi : ${data.approx_pi}</p>
                <p>Erreur : ${data.error}</p>
                <p>Temps de calcul : ${data.time_elapsed} seconds</p>
            `;

            const [varNotif_title, varNotif_message, varNotif_aboutFiles] = await notifPreparation(checkbox1, checkbox2, stdout, req, res, "montecarlo", dbUser)



            res.json({ success: true, pi: output_html, notif_title: varNotif_title, notif_message: varNotif_message, notif_aboutFiles: varNotif_aboutFiles });
        });
    }
});


router.get('/terminate_calculation', async (req, res) => {
    try {
        dbUser = await userIsConnected(req, res);
        
        if (dbUser != undefined){

            const calcId = req.query.calcId;
            
            const [resMariaDB] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
            const userId = resMariaDB[0].id_user;
            console.log(`USERID : ${userId}`);

            const command = `ssh moi@172.19.181.254 "ps aux | grep mpiexec | grep PPP${userId}___${calcId} | awk '{print \\$2}' | xargs -r sudo kill"`;
            
            exec(command, { shell: true }, (error, stdout, stderr) => {
                console.log(`Terminated processes for user ${userId}`);
                if (error) {
                    console.error(`Error executing command: ${stderr}`);
                    return res.status(500).json({ message: 'Error terminating calculation' });
                }
                res.status(200).json({ message: 'Calculation terminated successfully' });
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Server error' });
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

module.exports = router;
