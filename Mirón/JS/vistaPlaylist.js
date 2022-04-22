const btnToggle = document.querySelector('.toggle-btn')

btnToggle.addEventListener('click', function() {
    document.getElementById('barraLateral').classList.toggle('active');
    document.getElementById('contenidoGeneral').classList.toggle('active');
    document.getElementById('contenedorImagen').classList.toggle('active');
})