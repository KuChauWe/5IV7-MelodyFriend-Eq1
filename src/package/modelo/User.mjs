import UserControler from "../controlador/UserControler.mjs";


export default class User{

    constructor(){
        this.id_usu_spoti = null;
        this.nickname_usu_spoti = null;
        this.id_img_drive = null;
        this.fullName_usu = null;
        this.fcNaci_usu = null;
        this.sexo_usu = null;
        this.semestre_usu = null;
        this.carrera_usu = null;
        this.desc_usu = null;
        this.facebook = null;
        this.twitter = null;
        this.instagram = null;

    }
    /**
     * 
     * @param {String} id_usu_spoti 
     * @param {String} nickname_usu_spoti 
     * @param {String} fullName_usu 
     * @param {String} sexo_usu 
     * @param {Date} fcNaci_usu 
     * @param {Int16Array} semestre_usu 
     * @param {String} carrera_usu 
     */
    createUserInBD(id_usu_spoti, nickname_usu_spoti, fullName_usu, sexo_usu, fcNaci_usu, semestre_usu, carrera_usu){

        //Datos de la sesión Spoti
        this.id_usu_spoti = id_usu_spoti;
        this.nickname_usu_spoti = nickname_usu_spoti;


        //Datos que en el formulario
        this.fullName_usu = fullName_usu;
        this.sexo_usu = sexo_usu;
        this.semestre_usu = fcNaci_usu;
        this.semestre_usu = semestre_usu;
        this.carrera_usu = carrera_usu;

        //Valores predeterminados
        this.id_img_drive = '1cK3jqu93qd2rUmz_4__P20a5lLGqWgNf'; //Es la id de la imagen predeterminada en Drive
        this.facebook  = "";
        this.twitter = "";
        this.instagram = "";
        this.desc_usu = `Hola soy ${this.nickname_usu_spoti}`; // Descripción predeterminada

        //Intento subir el Usuario a la BD
        try{
            UserControler.insertToBD(this);
        }catch{
            console.log('Error al registrar el Usuario en la BD');

        }
        


    }
}

