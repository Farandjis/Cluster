const container = document.getElementById('container');
const inscriptionButton = document.getElementById('inscription');
const connexionButton = document.getElementById('connexion');

inscriptionButton.addEventListener('click', () => {
    container.classList.add('panel-active');
})

connexionButton.addEventListener('click', () => {
    container.classList.remove('panel-active');
})