function validateForm() {
    var isFormValid = true;
    var fields = ['NomInsc', 'MdpInsc', 'ValidMdpInsc'];

    fields.forEach(function(field) {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        document.getElementById('form_inscription').submit;
    } else {
        alert('Veuillez remplir correctement tous les champs.');
    }
}

function validateField(fieldName) {
    const input = document.querySelector(`#${fieldName}`);
    const pattern = getValidationPattern(fieldName);

    if (fieldName === 'ValidMdpInsc') {
        // Pour le champ 'ValidMdpInsc', vérifiez si la valeur est identique à celle de 'mdp'
        const mdpValue = document.getElementById('ValidMdpInsc').value;
        if (input.value === mdpValue && pattern.test(input.value)) {
            updateFieldStatus(input, 'champValide');
            return true;
        } else {
            updateFieldStatus(input, 'champInvalide');
            return false;
        }
    } else {
        // Pour les autres champs, utilisez le motif de validation standard
        if (pattern.test(input.value)) {
            updateFieldStatus(input, 'champValide');
            return true;
        } else {
            updateFieldStatus(input, 'champInvalide');
            return false;
        }
    }
}


function getValidationPattern(fieldName) {
    // Ajoutez ici la logique pour retourner le motif de validation en fonction du champ
    switch(fieldName) {
        case 'NomInsc':
            return /^.{5,32}$/;
        case 'MdpInsc':
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.&*])(.{12,32})$/;
        case 'ValidMdpInsc':
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.&*])(.{12,32})$/;
        case 'prenom':
        case 'nom':
            return /^[a-zA-Z\-]{2,50}$/;
        case 'email':
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        default:
            return /.*/;
    }
}

function updateFieldStatus(input, status) {
    input.classList.remove('champValide', 'champInvalide');
    input.classList.add(status);
}

window.onload = init;

function init() {
    document.getElementById('form_inscription').addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    var fields = ['NomInsc', 'MdpInsc', 'ValidMdpInsc'];
    fields.forEach(function(field) {

        document.getElementById(field).addEventListener('input', function() {
            validateField(field);
            /*if (field === 'MdpInsc'){
                document.getElementById('MdpInsc').addEventListener('input', validateField('ValidMdpInsc'));
            }*/
        });
    });
    /*document.getElementById('MdpInsc').addEventListener('input', function() {
        validatePassword();  // Réexécutez la validation du champ mdp
        validateVerifPassword();  // Réexécutez la validation du champ ValidMdpInsc
    });*/
}