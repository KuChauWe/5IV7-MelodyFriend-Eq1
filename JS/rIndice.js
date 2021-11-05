var userAgent = navigator.userAgent || navigator.vendor || window.opera;


if (/android/i.test(userAgent)) { // Aqui obtengo el dispositivo
    //Inicio con el responsive de la BARRA LATERAL
    document.querySelector('barraLateral').style.width = '346px';
}
if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {

}
/*
if (/iPad/.test(userAgent) && !window.MSStream) {

}
*/