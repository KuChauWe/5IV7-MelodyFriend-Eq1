const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = (value/2) + "%";
  slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});

//Empieza la validación

function validar() {
    var semestre = document.getElementById("semestre");
    var carrera = document.getElementById("carrera");
    var sexo = document.getElementById("sexo");

    if(semestre.value == 0 || semestre.value == "" || carrera.value == 0 || carrera.value == "" || sexo.value == 0 || sexo.value == "") {
        alert("Selecciona una de las opciones antes de continuar");
        return false;
       }else
       console.log("Me robaré todos tus datos jijijija 😱");
}