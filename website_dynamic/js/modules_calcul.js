window.onload = init;

function init(){

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
        resultSelector: '#primeRes p',
        resultKey: 'primes',
        successMessage: 'Nombres premiers',
    };

    const piConfig = {
        inputSelector: '#nbIt',
        apiEndpoint: '/execute_montecarlo',
        payloadKey: 'nbIt',
        resultSelector: '#piRes p',
        resultKey: 'pi',
        successMessage: 'Pi',
    };

    const fiboConfig = {
        inputSelector: '#end-number-fibo',
        apiEndpoint: '/execute_fibonnaci',
        payloadKey: 'endNumber',
        resultSelector: '#fibonnaciRes p',
        resultKey: 'fibo',
        successMessage: 'Suite de Fibonacci',
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

    const fiboForm = document.querySelector('form.module.fibonnaci');
    if (fiboForm) {
        fiboForm.addEventListener('submit', event => handleSubmit(event, fiboConfig));
    }


}

function handleSubmit(event, config) {
    event.preventDefault(); // Empêcher la soumission classique du formulaire

    // Récupérer les valeurs du champ spécifié dans la configuration
    const inputValue = parseInt(event.target.querySelector(config.inputSelector).value, 10);

    if (!inputValue || isNaN(inputValue)) {
        alert('Veuillez entrer des valeurs valides.');
        return;
    }

    // Appeler l'API via fetch
    fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [config.payloadKey]: inputValue }),
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
            } else {
                resultDiv.textContent = `Erreur : ${data.error}`;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête:', error);
            document.querySelector(config.resultSelector).textContent = 'Une erreur est survenue.';
        });
}

