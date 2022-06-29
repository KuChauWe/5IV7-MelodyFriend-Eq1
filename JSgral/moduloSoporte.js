/*const btnToggle = document.querySelector('.toggle-btn')

btnToggle.addEventListener('click', function() {
    document.getElementById('barraLateral').classList.toggle('active');
    document.getElementById('contenidoGeneral').classList.toggle('active');
})
*/
new Glider(document.querySelector('.glider'), {
    slidesToScroll: 1,
    slidesToShow: 8,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });


function cerdo (id){
    
  const respuesta1 = document.querySelector('#solucion1')
  const respuesta2 = document.querySelector('#solucion2')
  const respuesta3 = document.querySelector('#solucion3')
  const respuesta4 = document.querySelector('#solucion4')
  const respuesta5 = document.querySelector('#solucion5')
  const respuesta6 = document.querySelector('#solucion6')
  const respuesta7 = document.querySelector('#solucion7')
  const respuesta8 = document.querySelector('#solucion8')

  if(id = respuesta1){
    document.querySelector('#solucion1').classList.toggle('active1');
    document.querySelector('#solucion3').classList.toggle('desactive');
    document.querySelector('#solucion4').classList.toggle('desactive');
    document.querySelector('#solucion5').classList.toggle('desactive');
    document.querySelector('#solucion6').classList.toggle('desactive');
    document.querySelector('#solucion7').classList.toggle('desactive');
    document.querySelector('#solucion8').classList.toggle('desactive');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta2){
    document.querySelector('#solucion2').classList.toggle('active2');
    document.querySelector('#solucion3').classList.toggle('desactive');
    document.querySelector('#solucion4').classList.toggle('desactive');
    document.querySelector('#solucion5').classList.toggle('desactive');
    document.querySelector('#solucion6').classList.toggle('desactive');
    document.querySelector('#solucion7').classList.toggle('desactive');
    document.querySelector('#solucion8').classList.toggle('desactive');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta3){
    document.querySelector('#solucion3').classList.toggle('active');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta4){
    document.querySelector('#solucion4').classList.toggle('active');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta5){
    document.querySelector('#solucion5').classList.toggle('active');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta6){
    document.querySelector('#solucion6').classList.toggle('active');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta7){
    document.querySelector('#solucion7').classList.toggle('active');
    /*console.log(respuesta1)*/
  }
  if(id = respuesta8){
    document.querySelector('#solucion8').classList.toggle('active');
    /*console.log(respuesta1)*/
  }
}
/*
var idProblema = document.querySelector('.glider p');
var idSolucion = document.querySelector('.medio p');
*/

