import { insertUser } from "../controlador/UserController.js";

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
export const createUserInBD =  async  (id_usu_spoti, nickname_usu_spoti, 
                                      fullName_usu, sexo_usu, fcNaci_usu,
                                      semestre_usu, carrera_usu) => {

    var user = new User();

    //Datos de la sesión Spoti
    user.id_usu_spoti = id_usu_spoti;
    user.nickname_usu_spoti = nickname_usu_spoti;
    //Datos que en el formulario
    user.fullName_usu = fullName_usu;
    user.sexo_usu = sexo_usu;
    user.fcNaci_usu = fcNaci_usu;
    user.semestre_usu = semestre_usu;
    user.carrera_usu = carrera_usu;
    //Valores predeterminados
    user.id_img_drive = '1cK3jqu93qd2rUmz_4__P20a5lLGqWgNf'; //Es la id de la imagen predeterminada en Drive
    user.facebook  = "facebook"; 
    user.twitter = "twitter";
    user.instagram = "instagram";
    user.desc_usu = `Hola soy ${user.nickname_usu_spoti}`; // Descripción predeterminada

    //Intento subir el Usuario a la BD
    try{

        const result = await insertUser(user);

        return result;

    }catch(err){
        console.log(err, 'Error en createUserInBD');
    }
    


}

