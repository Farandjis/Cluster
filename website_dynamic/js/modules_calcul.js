window.onload = init;

let interval;

function init() {
    document.querySelectorAll('input[type="submit"][value="Exécuter"]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('p.bis').forEach(el => el.textContent = '');
        });
    });

    document.getElementById('end').addEventListener('click', (e) => {
        e.preventDefault();
        const resultDivs = document.querySelectorAll('.res');
        resultDivs.forEach(div => {
            div.innerHTML = `<p></p><p class="bis">Calcul Annulé</p>`;
        });
        stopWaiting();
    });
    


    const section = document.getElementById("section_module");
    const title_module = document.getElementsByClassName('title_module');
    const l_title_module = document.getElementsByClassName('l_title_module');
    const module = document.getElementsByClassName('module');
    const res = document.getElementsByClassName('res');




    for (let i = 0; i < title_module.length; i++) {
        title_module[i].addEventListener('click', (e) => {

            if (module[i].classList.contains('active')){
                section.classList.remove('active');
                title_module[i].classList.remove('active');
                module[i].classList.remove('active');
                res[i].classList.remove('active');

            }
            else{
                for (let j = 0; j < title_module.length; j++) {
                    title_module[j].classList.remove('active');
                    module[j].classList.remove('active');
                    res[j].classList.remove('active');
                }
                section.classList.add('active');
                title_module[i].classList.add('active');
                module[i].classList.add('active');
                res[i].classList.add('active');
            }
        })


        l_title_module[i].addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (module[i].classList.contains('active')){
                    section.classList.remove('active');
                    title_module[i].classList.remove('active');
                    module[i].classList.remove('active');
                    res[i].classList.remove('active');
                }
                else{
                    for (let j = 0; j < title_module.length; j++) {
                        title_module[j].classList.remove('active');
                        module[j].classList.remove('active');
                        res[i].classList.remove('active');
                    }
                    section.classList.add('active');
                    title_module[i].classList.add('active');
                    module[i].classList.add('active');
                    res[i].classList.add('active');
                }
            }
        });
    }

    console.log("TEST")

    // Configuration pour les différents formulaires
    const primeConfig = {
        inputSelector: '#end-number',
        apiEndpoint: '/execute_prime',
        payloadKey: 'endNumber',
        nameNbProc : '#nbProcPremier',
        resultSelector: '#primeRes p',
        resultKey: 'primes',
        successMessage: 'Nombres premiers',
    };

    const piConfig = {
        inputSelector: '#nbIt',
        apiEndpoint: '/execute_montecarlo',
        payloadKey: 'nbIt',
        nameNbProc : '#nbProcMonteCarlo',
        resultSelector: '#piRes p',
        resultKey: 'pi',
        successMessage: 'Pi',
    };

    const testConfig = {
        inputSelector: '#distributedText',
        apiEndpoint: '/execute_hello',
        payloadKey: 'distributedText',
        nameNbProc : '#nbProcHello',
        resultSelector: '#testRes p',
        resultKey: 'result',
        successMessage: 'Hello World',
    };

// Attacher les gestionnaires d'événements
    const primeForm = document.querySelector('form.module.prime');
    if (primeForm) {
        primeForm.addEventListener('submit', event => handleSubmit(event, primeConfig));
    }

    const piForm = document.querySelector('form.module.pi');
    if (piForm) {
        piForm.addEventListener('submit', event => handleSubmit(event, piConfig));
    }

    const testForm = document.querySelector('form.module.test');
    if (testForm) {
        testForm.addEventListener('submit', event => handleSubmit(event, testConfig));
    }


}

function handleSubmit(event, config) {
    event.preventDefault();

    const inputValueElement = event.target.querySelector(config.inputSelector);
    const calcId = Math.random().toString(36).substring(2, 15);

    let inputValue;
    
    if (config.successMessage == 'Hello World') {
        inputValue = inputValueElement.value;  // Récupère la valeur en tant que string

   	if (!inputValue) {
            alert('Veuillez entrer des valeurs valides.');
            return;
    	}
    } else {
        inputValue = parseInt(inputValueElement.value, 10);  // Essaie de convertir en nombre
        if (!inputValue || isNaN(inputValue)) {
            alert('Veuillez entrer des valeurs valides.');
            return;
        }
    }

    const nbProc = parseInt(event.target.querySelector(config.nameNbProc).value, 10);
    const checkbox1Element = event.target.querySelector('.checkbox1');
    const checkbox2Element = event.target.querySelector('.checkbox2');

    // Logique des checkbox
    const checkbox1 = checkbox1Element.checked;
    let checkbox2 = checkbox2Element.checked;

    if (!checkbox1) {
        checkbox2 = false; // Si la première checkbox est décochée, la deuxième l'est aussi
        checkbox2Element.checked = false; // Synchronisation avec l'état visuel
    } else if (!checkbox1Element.disabled) {
        checkbox2Element.disabled = false; // Active la deuxième checkbox si la première est cochée
    }


    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.setAttribute('data-calc-id', calcId);
    loadingScreen.style.display = "flex";
    document.body.style.overflow = "hidden";
    let secondsElapsed = 0;
    let interval;

    interval = setInterval(() => {
        secondsElapsed += 1;
        chronometer.textContent = `Temps écoulé : ${secondsElapsed}s`;
    }, 1000);

    fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            [config.payloadKey]: inputValue,
            nbProc: nbProc,
            checkbox1: checkbox1,
            checkbox2: checkbox2,
            calcId: calcId
        }),
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);
        const resultDiv = document.querySelector(config.resultSelector);
        if (data.success) {
            console.log(data[config.resultKey]);
            resultDiv.innerHTML = `${data[config.resultKey]}`;
            if (data.notif_title != undefined){
                addNotification(data.notif_title, data.notif_message, data.notif_aboutFiles);
            }
        } else {
            resultDiv.textContent = `Erreur : ${data.error}`;
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requ�te:', error);
        document.querySelector(config.resultSelector).textContent = 'Une erreur est survenue.';
    })
    .finally(() => {
        chronometer.textContent = `Temps écoulé : 0s`;
        clearInterval(interval);
        loadingScreen.style.display = "none";
        document.body.style.overflow = "";
        const content = document.getElementById("content");
        if (content) {
            content.style.display = "block";
        }
    });
}


function stopWaiting() {
    const loadingScreen = document.getElementById('loading-screen');
    const calcId = loadingScreen.getAttribute('data-calc-id');
    
    loadingScreen.style.display = 'none';
    document.body.style.overflow = '';
    clearInterval(interval);
    document.getElementById('chronometer').textContent = 'Temps écoulé : 0s';

    fetch(`/terminate_calculation?calcId=${calcId}`)
        .then(response => response.json());
}



