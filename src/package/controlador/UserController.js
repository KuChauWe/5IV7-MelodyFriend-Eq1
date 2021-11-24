const CatalogueControler = require('./CatalogueController.js');
const User = require('../modelo/User.js');
const getConnection = require("./Connection.js");
const sql = require('mssql');
const queries = require('./querys.js');

const getUserByID = async (id_usu_spoty) => {
    console.log("asdasd");


    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_usu_spoty', sql.NChar, id_usu_spoty)
            .query(queries.queries.getUserByID);

        pool.close()
        const id_sex = result.recordset[0].id_sex;
        const id_carr = result.recordset[0].id_carr;
        const id_semestre = result.recordset[0].id_semestre;
        const id_imgPerf = result.recordset[0].id_imgPerf;
        var user = {
            id_usu_spoti: result.recordset[0].id_usu_spoty,
            nickname_usu_spoti: result.recordset[0].nickname_usu_spoti,
            fullName_usu: result.recordset[0].name_usu,
            fcNaci_usu: result.recordset[0].fcNaci_usu,
            desc_usu: result.recordset[0].desc_usu,
            facebook: result.recordset[0].facebook,
            twitter: result.recordset[0].twitter,
            instagram: result.recordset[0].instagram,



            // console.log(id_sex, id_carr, id_semestre, id_imgPerf);

            id_img_drive: await CatalogueControler.getImgPerfil(id_imgPerf),
            sexo_usu: await CatalogueControler.getSexo(id_sex),
            carrera_usu: await CatalogueControler.getCarr(id_carr),
            semestre_usu: await CatalogueControler.getSemestre(id_semestre)
        }
        return user;


    } catch (err) {
        console.log(err);
        return null;

    }
}


/**
 * 
 * @param {String} id_usu_spoty 
 * @param {String} atribute 
 * @param {Object} new_value 
 * @returns {Number} rowsAffected
 * 
 * IMPORTANTE, TIENE RIESGO DE INYECCIÓN
 */
const updateUser = async (id_usu_spoty, atribute, new_value) => {
    const pool = await getConnection();

    var type = null;
    if (atribute == 'id_usu_spoty' ||
        atribute == 'nickname_usu_spoti' ||
        atribute == 'name_usu' ||
        atribute == 'facebook' ||
        atribute == 'twitter' ||
        atribute == 'instagram') type = sql.VarChar(50);
    if (atribute == 'id_sex' ||
        atribute == 'id_semestre' ||
        atribute == 'id_carr' ||
        atribute == 'id_imgPerf') type = sql.Int;
    if (atribute == 'fcNaci_usu') type = sql.Date;
    if (atribute == 'desc_usu') type = sql.VarChar(250);

    if (type == null) {
        console.log('atributo desconocido ＞﹏＜');
        return null;
    }

    try {
        console.log(type);

        const query = 'UPDATE [bd_melodyfriend].[musuario] SET   ' + atribute + '   =  @new_value  WHERE [id_usu_spoty] = @id_usu_spoty';

        // console.log(query);
        const result = await pool.request()
            .input('id_usu_spoty', sql.NChar, id_usu_spoty)
            // .input('atribute',  atribute)
            .input('new_value', type, new_value)
            .query(query);


        await pool.close()
        return result.rowsAffected;
    } catch (err) {
        console.log(err, '\n EN EL UPDATE');
        return null;
    }





}

const insertUser = async (user_full) => {

    //Consulta a los catalogos
    var id_sex = null;
    var id_carr = null;
    var id_semestre = null;
    var id_imgPerf = null;

    try {
        id_sex = await CatalogueControler.getIDSexo(user_full.sexo_usu);
        id_carr = await CatalogueControler.getIDCarr(user_full.carrera_usu);
        id_semestre = await CatalogueControler.getIDSemestre(user_full.semestre_usu);
        id_imgPerf = await CatalogueControler.getIDImgPerf(user_full.id_img_drive);
    } catch (err) {
        console.log(err, 'Error en con el CatalogueControler');
    }



    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('id_usu_spoty', sql.VarChar(50), user_full.id_usu_spoti)
            .input('nickname_usu_spoti', sql.VarChar(50), user_full.nickname_usu_spoti)
            .input('name_usu', sql.VarChar(50), user_full.fullName_usu)
            .input('fcNaci_usu', sql.Date, user_full.fcNaci_usu)
            .input('desc_usu', sql.VarChar(250), user_full.desc_usu)
            .input('id_sex', sql.Int, id_sex)
            .input('id_carr', sql.Int, id_carr)
            .input('id_semestre', sql.Int, id_semestre)
            .input('id_imgPerf', sql.Int, id_imgPerf)
            .input('facebook', sql.VarChar(50), user_full.facebook)
            .input('twitter', sql.VarChar(50), user_full.twitter)
            .input('instagram', sql.VarChar(50), user_full.instagram)
            .query(queries.queries.insertUser)

        pool.close()
        return result;

    } catch (err) {
        console.log(err)
        return null;
    }
}
module.exports.getUserByID = getUserByID
module.exports.updateUser = updateUser
module.exports.insertUser = insertUser


