var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/android/i.test(userAgent)) { // Aqui obtengo el dispositivo
    document.getElementById('primera-linea').style.visibility = 'visible'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementById('primera-linea').style.display = 'flex'; //Lo de arriba x2
    document.getElementsByClassName('contenedorPrincipal')[0].style.visibility = 'hidden'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementsByClassName('contenedorPrincipal')[0].style.display = 'none'; //Lo de arriba x2
}
if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.getElementById('primera-linea').style.visibility = 'visible'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementById('primera-linea').style.display = 'flex'; //Lo de arriba x2
    document.getElementsByClassName('contenedorPrincipal')[0].style.visibility = 'hidden'; //De esta forma elijo la etiqueta a modificar y le agrego el css o lo que quiera
    document.getElementsByClassName('contenedorPrincipal')[0].style.display = 'none'; //Lo de arriba x2
}