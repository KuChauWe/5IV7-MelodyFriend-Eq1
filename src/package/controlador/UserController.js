import {getCarr,getSexo,getSemestre, getImgPerfil, getIDSexo, getIDCarr, getIDSemestre, getIDImgPerf,} from './CatalogueController.js';
import User from '../modelo/User.mjs';
import { getConnection } from "./Connection.js";
import sql from 'mssql';
import { queries } from './querys.js';

export const getUserByID = async (id_usu_spoty) => {

    var user = new User();

    const pool = await getConnection();
    const result = await pool.request()
                   .input('id_usu_spoty', sql.NChar, id_usu_spoty)
                   .query(queries.getUserByID);
    
    pool.close();
    user.id_usu_spoti = result.recordset[0].id_usu_spoty;
    user.nickname_usu_spoti  = result.recordset[0].nickname_usu_spoti;
    user.fullName_usu = result.recordset[0].name_usu;
    user.fcNaci_usu = result.recordset[0].fcNaci_usu;
    user.desc_usu = result.recordset[0].desc_usu;
    user.facebook = result.recordset[0].facebook;
    user.twitter = result.recordset[0].twitter;
    user.instagram = result.recordset[0].instagram;


    user.id_sex = result.recordset[0].id_sex;
    user.id_carr = result.recordset[0].id_carr;
    user.id_semestre = result.recordset[0].id_semestre;
    user.id_imgPerf = result.recordset[0].id_imgPerf;
    // console.log(id_sex, id_carr, id_semestre, id_imgPerf);

    user.id_img_drive = await getImgPerfil(user.id_imgPerf);
    user.sexo_usu = await getSexo(user.id_sex);
    user.carrera_usu = await getCarr(user.id_carr);
    user.semestre_usu = await getSemestre(user.id_semestre);

    return user;

    
}



export const updateUser = async (user) => {
    const pool = await getConnection();

    // const id_sex = await getIDSexo(user.sexo_usu);
    // const id_carr = await getIDCarr(user.carrera_usu);
    // const id_semestre = await getIDSemestre(user.semestre_usu);
    // const id_imgPerf = await getIDImgPerf(user.id_img_drive); 

    // console.log(id_sex, id_carr, id_semestre, id_imgPerf);


    try{
        await pool.request()
        .input('id_usu_spoty', sql.NChar, user.id_usu_spoty)
        .input('nickname_usu_spoti', sql.NChar, user.nickname_usu_spoti)
        .input('name_usu', sql.NChar, user.name_usu)
        .input('fcNaci_usu', sql.Date, user.fcNaci_usu)
        .input('desc_usu', sql.NChar, user.desc_usu)
        .input('id_carr', sql.Int, user.id_carr)
        .input('id_semestre', sql.Int, user.id_semestre)
        .input('id_imgPerf', sql.Int, user.id_imgPerf)
        .input('id_sex', sql.Int, user.id_sex)
        .input('facebook', sql.NChar, user.facebook)
        .input('twitter', sql.NChar, user.twitter)
        .input('instagram', sql.NChar, user.instagram)
        .query(queries.UpdateUser);
    }catch(err){
        console.log(err);
    }
    




}



var user = await getUserByID('aozxcvklasdf');

console.log(user);

user.nickname_usu_spoti = 'Spiderman';

await updateUser(user);
console.log(user);

user = await getUserByID('aozxcvklasdf');

console.log(user);

