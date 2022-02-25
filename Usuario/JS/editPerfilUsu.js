const formulario = document.getElementById("formulario");


function ValidarUrl(entrada){
    entrada = document.getElementById("rs").value;
    //entrada = entradas.toString(entradas);
    entrada= new String(entrada)
    var urlSplit = entrada.split(".");

    if(urlSplit.length >= 2) // parametro que cambiaras segun sea la estrutura de tu url 
    { 
        if(urlSplit[0] !== "https://twitter" )
            {
                alert("Url invalida");
                return false;
        }
        else if( urlSplit[1] !== "instagram")
            {
                alert("Url invalida");
                return false;
            }
        else if(urlSplit[1] !=="facebook"  &&  urlSplit[2] !== "com/profile")
            {                   
            alert("Url invalida");
            return false;}

            else {
                alert("Url invalida");
                return false;
            }
        // aqui agrega las demas condiciones para validar tu url
    }
    var semestre = document.getElementById("semestre");
    var carrera = document.getElementById("carrera");
    var sexo = document.getElementById("sexo");

    if(semestre.value == 0 || semestre.value == "" || carrera.value == 0 || carrera.value == "" || sexo.value == 0 || sexo.value == "") {
        alert("Selecciona una de las opciones antes de continuar");
        return false;
       }else
       console.log("Me robaré todos tus datos jijijija 😱");
};
