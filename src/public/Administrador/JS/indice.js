const btnToggle = document.querySelector('.toggle-btn')

btnToggle.addEventListener('click', function() {
    document.getElementById('barraLateral').classList.toggle('active');
    document.getElementById('contenidoGeneral').classList.toggle('active');
})

/** Primer Slider **/
new Glider(document.querySelector('.glider'), {
    slidesToScroll: 1,
    slidesToShow: 6,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });

/** Segundo Slider **/
new Glider(document.querySelector('.segundoGlider'), {
    slidesToScroll: 1,
    slidesToShow: 6,
    draggable: true,
    dots: '.dots2',
    arrows: {
      prev: '#btnPrev',
      next: '#btnNext'
    }
  });
