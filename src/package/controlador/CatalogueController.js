const sql = require('mssql');
const queries = require('./querys.js');
const getConnection = require('./Connection.js');


 const getIDSexo = async (sexo_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('sexo', sql.NChar, sexo_param ).query(queries.queries.getIDSexo);
    // console.log(result.recordset[0].id_sex);

    pool.close();
    return result.recordset[0].id_sex;

}

 const getSexo = async (id_sexo_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_sex',sql.Int, id_sexo_param).query(queries.queries.getSexo);
    // console.log(result.recordset[0].sexo);

    pool.close();
    return result.recordset[0].sexo;

}

 const getAllSexo = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.queries.getAllSexo);
    // console.log(result.recordset[0].sexo);

    pool.close();
    return result.recordset;

}


 const getIDSemestre = async (semestre_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('semestre', sql.NChar,semestre_param).query(queries.queries.getIDSemestre);
    // console.log(result.recordset[0].id_semestre);

    pool.close();
    return result.recordset[0].id_semestre;

}

 const getSemestre = async (id_semestre_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_semestre',sql.Int, id_semestre_param).query(queries.queries.getSemestre);
    // console.log(result.recordset[0].semestre);

    pool.close();
    return result.recordset[0].semestre;

}

 const getAllSemestre = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.queries.getAllSemestre);
    // console.log(result.recordset[0].sexo);

    pool.close();
    return result.recordset;

}

 const getIDCarr = async (carrera_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('carrera', sql.NChar,carrera_param).query(queries.queries.getIDCarrera);
    // console.log(result.recordset[0].id_carr);

    pool.close();
    return result.recordset[0].id_carr;

}

 const getCarr = async (id_carr_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_carr',sql.Int, id_carr_param).query(queries.queries.getCarrera);
    // console.log(result.recordset[0].carrera);

    pool.close();
    return result.recordset[0].carrera;

}

 const getAllCarrera = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.queries.getAllCarrera);
    // console.log(result.recordset[0].sexo);

    pool.close();
    return result.recordset;

}

 const getIDImgPerf = async (id_img_drive_param) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_img_drive', sql.NChar,id_img_drive_param).query(queries.queries.getIDImgPerf);
    // console.log(result.recordset[0].id_imgPerf);

    pool.close();
    return result.recordset[0].id_imgPerf;

}

 const getImgPerfil = async (id_imgPerf_param) => {
    const pool = await getConnection(); 
    const result = await pool.request().input('id_imgPerf',sql.Int, id_imgPerf_param).query(queries.queries.getImgPerfil);
    // console.log(result.recordset[0].id_img_drive);

    pool.close();
    return result.recordset[0].id_img_drive;

}

 const getAllImgPerfil = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.queries.getAllImgPerfil);
    // console.log(result.recordset[0].sexo);

    pool.close();
    return result.recordset;

}


module.exports.getIDSexo = getIDSexo;
module.exports.getSexo = getSexo;
module.exports.getAllSexo = getAllSexo;

module.exports.getIDSemestre = getIDSemestre;
module.exports.getSemestre = getSemestre;
module.exports.getAllSemestre = getAllSemestre;

module.exports.getIDCarr = getIDCarr;
module.exports.getCarr = getCarr;
module.exports.getAllCarrera = getAllCarrera;

module.exports.getIDImgPerf = getIDImgPerf;
module.exports.getImgPerfil = getImgPerfil;
module.exports.getAllImgPerfil = getAllImgPerfil;


