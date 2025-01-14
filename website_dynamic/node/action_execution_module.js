// IMPORTS
const express = require('express');
const { exec } = require('child_process');

const router = express();

//EXECUTION MODULE NOMBRE PREMIER
router.post('/execute_prime', (req, res) => {
    const { endNumber } = req.body;

    if (!endNumber || isNaN(endNumber)) {
        return res.status(400).json({ success: false, error: 'Paramètre invalide' });
    }

    // Commande pour exécuter le script Python avec MPI
    const command = `mpiexec --allow-run-as-root -n 4 --hostfile /home/hosts_cluster python3 /home/moi/cluster-prime-master/prime.py ${endNumber}`;

    exec(command, { shell: true }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${error.message}`);
            return res.status(500).json({ success: false, error: 'Erreur lors de l\'exécution du script Python' });
        }
        

        if (stderr) {
            console.error(`Erreur standard : ${stderr}`);
            return res.status(500).json({ success: false, error: stderr });
        }

        // Parsez la sortie et retournez-la au client
        const output = stdout.trim();
        console.log(typeof(output));
        res.json({ success: true, primes: output });
    });
});

//EXECUTION MODULE HELLO WORLD
router.post('/execute_hello', (req, res) => {
    // Your hello world implementation
});


//EXECUTION MODULE PI
router.post('/execute_montecarlo', (req, res) => {
    const { nbIt } = req.body;

    if (!nbIt || isNaN(nbIt)) {
        return res.status(400).json({ success: false, error: 'Paramètre invalide' });
    }

    // Commande pour exécuter le script Python avec MPI
    const command = `mpiexec --allow-run-as-root -n 4 --hostfile /home/hosts_cluster python3 /home/moi/cluster-prime-master/montecarlo.py ${nbIt}`;

    exec(command, { shell: true }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${error.message}`);
            return res.status(500).json({ success: false, error: 'Erreur lors de l\'exécution du script Python' });
        }
        
        if (stderr) {
            console.error(`Erreur standard : ${stderr}`);
            return res.status(500).json({ success: false, error: stderr });
        }

        // Parsez la sortie et retournez-la au client
        const output = stdout.trim();
        console.log(output);
        console.log(stdout);
        res.json({ success: true, pi: output });
    });
});

module.exports = router;
