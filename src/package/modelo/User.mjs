const insertUser = require('../controlador/UserController.js');

export const User = () => {

    var User;
    User.id_usu_spoti = null;
    User.nickname_usu_spoti = null;
    User.id_img_drive = null;
    User.fullName_usu = null;
    User.fcNaci_usu = null;
    User.sexo_usu = null;
    User.semestre_usu = null;
    User.carrera_usu = null;
    User.desc_usu = null;
    User.facebook = null;
    User.twitter = null;
    User.instagram = null;

    return User;

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

    var user = User();

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


module.exports = User;
module.exports = createUserInBD;
