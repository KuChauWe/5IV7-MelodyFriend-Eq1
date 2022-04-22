const btnToggle = document.querySelector('.toggle-btn')
const btnFiltro = document.querySelector('.bi-filter-circle')

btnToggle.addEventListener('click', function() {
    document.getElementById('barraLateral').classList.toggle('active');
    document.getElementById('contenidoGeneral').classList.toggle('active');
})
btnFiltro.addEventListener('click', function() {
    document.getElementById('contenedorOpt').classList.toggle('active');
    document.getElementsByClassName('filtrosOpts')[0].classList.toggle('active');
    document.getElementsByClassName('filtrosOpts')[1].classList.toggle('active');
    document.getElementsByClassName('filtroCkx')[0].classList.toggle('active');
    document.getElementsByClassName('filtroCkx')[1].classList.toggle('active');
})