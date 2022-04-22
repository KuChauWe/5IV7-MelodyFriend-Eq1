var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/android/i.test(userAgent)) { // Aqui obtengo el dispositivo
    document.getElementsByClassName('contenedorPrincipal')[0].style.padding = '25%';
    document.getElementsByClassName('textoIntroductorio')[0].style.fontSize = '16px';
    document.getElementsByClassName('textoIntroductorio')[0].style.width = '300px';
    document.getElementsByClassName('cuadradoFondo')[0].style.padding = '5px';
    document.getElementsByTagName('button')[1].style.width = '172px';
    document.getElementsByTagName('button')[0].style.width = '172px';
    document.getElementsByTagName('button')[1].style.height = '40px';
    document.getElementsByTagName('button')[0].style.height = '40px';
    document.getElementsByClassName('textoInferior')[0].style.fontSize = '9px';
    document.getElementsByClassName('textoBotones')[1].style.fontSize = '16px';
    document.getElementsByClassName('textoBotones')[0].style.fontSize = '16px';
    document.getElementsByTagName('img')[0].style.width = '120px';
}
if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.getElementsByClassName('contenedorPrincipal')[0].style.padding = '40%';
    document.getElementsByClassName('textoIntroductorio')[0].style.fontSize = '16px';
    document.getElementsByClassName('textoIntroductorio')[0].style.width = '320px';
    document.getElementsByClassName('cuadradoFondo')[0].style.padding = '5px';
    document.getElementsByTagName('button')[1].style.width = '172px';
    document.getElementsByTagName('button')[0].style.width = '172px';
    document.getElementsByTagName('button')[1].style.height = '40px';
    document.getElementsByTagName('button')[0].style.height = '40px';
    document.getElementsByClassName('textoInferior')[0].style.fontSize = '9px';
    document.getElementsByClassName('textoBotones')[1].style.fontSize = '16px';
    document.getElementsByClassName('textoBotones')[0].style.fontSize = '16px';
    document.getElementsByTagName('img')[0].style.width = '120px';
}
/*
if (/iPad/.test(userAgent) && !window.MSStream) {

}
*/