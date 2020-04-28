document 
    .querySelector("header input")
    .addEventListener('click', function(){
        if (document.querySelector("section").style.display == 'block'){
        document.querySelector("section").style.display = 'none'
        } else {document.querySelector("section").style.display = 'block'}
    })

    function typeWriter(element) {
        const textoArray = element.innerHTML.split('')
        element.innerHTML = ''
        textoArray.forEach((letra, i) => {
            setTimeout(function() {
                element.innerHTML += letra;
            }, 75 * i)
        });
    }
    
    typeWriter(document.querySelector('header h2'))