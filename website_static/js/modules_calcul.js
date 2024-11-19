window.onload = init;

function init(){

    const title_module = document.getElementsByClassName('title_module');
    const l_title_module = document.getElementsByClassName('l_title_module');
    const module = document.getElementsByClassName('module');

    for (let i = 0; i < title_module.length; i++) {
        title_module[i].addEventListener('click', (e) => {

            if (module[i].classList.contains('active')){
                title_module[i].classList.remove('active');
                module[i].classList.remove('active');
            }
            else{
                for (let j = 0; j < title_module.length; j++) {
                    title_module[j].classList.remove('active');
                    module[j].classList.remove('active');
                }
                title_module[i].classList.add('active');
                module[i].classList.add('active');
            }
        })


        l_title_module[i].addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                console.log("AHAGAGHAHAHAHA");
                if (module[i].classList.contains('active')){
                    title_module[i].classList.remove('active');
                    module[i].classList.remove('active');
                }
                else{
                    for (let j = 0; j < title_module.length; j++) {
                        title_module[j].classList.remove('active');
                        module[j].classList.remove('active');
                    }
                    title_module[i].classList.add('active');
                    module[i].classList.add('active');
                }
            }
        })
    }
}
