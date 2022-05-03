var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/android/i.test(userAgent)) { // Aqui obtengo el dispositivo
    document.getElementsByClassName('ios')[0].style.visibility = 'hidden'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementsByClassName('ios')[0].style.display = 'none'; //Lo de arriba x2
}
if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.getElementsByClassName('android')[0].style.visibility = 'hidden';
    document.getElementsByClassName('android')[0].style.display = 'none';
}