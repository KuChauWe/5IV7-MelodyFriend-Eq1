var userAgent = navigator.userAgent || navigator.vendor || window.opera;


if (/android/i.test(userAgent)) { // Aqui obtengo el dispositivo
    //Inicio con el responsive de la BARRA LATERAL
    //document.querySelector('barraLateral').style.width = '346px'; no quiero hacerlo de esta forma, me moriría de viejo antes de acabar
}
if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {

}
/*
if (/iPad/.test(userAgent) && !window.MSStream) {

}
*/