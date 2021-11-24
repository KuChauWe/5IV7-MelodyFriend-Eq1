//Empieza la validación

function validar() {
  var semestre = document.getElementById("semestre");
  var carrera = document.getElementById("carrera");
  var sexo = document.getElementById("sexo");
  var nombre = document.getElementById("textoNom").value;
  expresion = /^[a-zA-ZÀ-ÿ\s]{4,50}$/;

  if(semestre.value == 0 || semestre.value == "" || carrera.value == 0 || carrera.value == "" || sexo.value == 0 || sexo.value == "") {
      alert("Selecciona una de las opciones antes de continuar");
      return false;
     }else
     console.log("Me robaré todos tus datos jijijija 😱");

  if(!expresion.test(nombre)){
    alert("papu");
    return false;
  }
}