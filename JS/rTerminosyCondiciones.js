var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/android/i.test(userAgent)) { // Aqui obtengo el dispositivo
    document.getElementsByTagName('iframe')[0].style.height = '400px'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementsByTagName('iframe')[0].style.width = '300px';
}
if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.getElementsByTagName('iframe')[0].style.height = '650px'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementsByTagName('iframe')[0].style.width = '300px';
}
if (/iPad/.test(userAgent) && !window.MSStream) {
    document.getElementsByTagName('iframe')[0].style.height = '800px'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementsByTagName('iframe')[0].style.width = '600px';
}