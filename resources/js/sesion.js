function validateSeign() {
    var rutaActual = window.location.pathname;
    var segmentos = rutaActual.split('/');
    var ultimoSegmento = segmentos[segmentos.length - 1];
    var userData = JSON.parse(localStorage.getItem('userData'));
    if(userData==null) {
            if(ultimoSegmento!='')
                window.location.assign('./');
    } else {
        if(userData.user) {
            if(userData.redirect_url!=ultimoSegmento)
                window.location.assign('task');
        
            $('.nameuser').text(capitalizeFirstLetterOfEachWord(userData.user.name));
        }
    }
}  

function capitalizeFirstLetterOfEachWord(sentence) {
    var words = sentence.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

function signOff() {
    localStorage.removeItem('userData');
    validateSeign();
}

window.addEventListener('pageshow', function (event) {
    validateSeign();
});