import { getConnection } from "./Connection.js";
import sql from 'mssql';
import { queries } from "./querys.js";


export const getIDSexo = async (sexo_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('sexo', sql.NChar,sexo_param ).query(queries.getIDSexo);
    // console.log(result.recordset[0].id_sex);

    pool.close();
    return result.recordset[0].id_sex;

}

export const getSexo = async (id_sexo_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_sex',sql.Int, id_sexo_param).query(queries.getSexo);
    // console.log(result.recordset[0].sexo);

    pool.close();
    return result.recordset[0].sexo;

}

export const getIDSemestre = async (semestre_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('semestre', sql.NChar,semestre_param).query(queries.getIDSexo);
    // console.log(result.recordset[0].id_semestre);

    pool.close();
    return result.recordset[0].id_semestre;

}

export const getSemestre = async (id_semestre_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_semestre',sql.Int, id_semestre_param).query(queries.getSemestre);
    // console.log(result.recordset[0].semestre);

    pool.close();
    return result.recordset[0].semestre;

}

export const getIDCarr = async (carrera_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('carrera', sql.NChar,carrera_param).query(queries.getIDCarrera);
    // console.log(result.recordset[0].id_carr);

    pool.close();
    return result.recordset[0].id_carr;

}

export const getCarr = async (id_carr_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_carr',sql.Int, id_carr_param).query(queries.getCarrera);
    // console.log(result.recordset[0].carrera);

    pool.close();
    return result.recordset[0].carrera;

}

export const getIDImgPerf = async (id_img_drive_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_img_drive', sql.NChar,id_img_drive_param).query(queries.getIDImgPerf);
    // console.log(result.recordset[0].id_imgPerf);

    pool.close();
    return result.recordset[0].id_imgPerf;

}

export const getImgPerfil = async (id_imgPerf_param) => {
    const pool = await getConnection(); 
    const result = await pool.request().input('id_imgPerf',sql.Int, id_imgPerf_param).query(queries.getImgPerfil);
    // console.log(result.recordset[0].id_img_drive);

    pool.close();
    return result.recordset[0].id_img_drive;

}




var result = null;
 result = await getIDSexo('Masculino');

if(result == null){}
else{
    console.log(result);
}
 



