const sql = require('mssql');
const queries = require('./querys.js');
const getConnection = require('./Connection.js');

/**
 * 
 * 
 * 
 * SOBRE LAS IDENTIDADES DE PLAYLIST Y TRACK
 * 
 * 
 */


const insertIDPlaylist = async (id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty).query(queries.queries.insertIDPlaylist);
    pool.close();
    return result;
}

const insertIDTrack = async (id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_trac_spoty', sql.VarChar(50), id_trac_spoty).query(queries.queries.insertIDTrack);
    pool.close();
    return result;
}

const deleteIDPlaylist = async (id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty).query(queries.queries.deleteIDPlaylist);
    pool.close();
    return result;
}

const deleteIDTrack = async (id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_trac_spoty', sql.VarChar(50), id_trac_spoty).query(queries.queries.deleteIDTrack);
    pool.close();
    return result;
}

const getAllIDPlaylist = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.queries.getAllIDPlaylist);
    pool.close();
    return result.recordset;
}

const getAllIDTrack = async () => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.queries.getAllIDTrack);
    pool.close();
    return result.recordset;
}

const isInMTrack = async (id_trac_spoty) => {

    const pool = await getConnection();
    const result = await pool.request()
        .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
        .query(queries.queries.isInMTrack);
    pool.close();

    if (result.recordset[0] == id_trac_spoty) return true;
    else return false;
}
/**
 * 
 * 
 * 
 * SOBRE LOS ENCABEZADOS DE PLAYLIST Y TRACK
 * 
 * 
 */


const insertUser_IDPlay = async (id_usu_spoty, id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
        .input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty)
        .query(queries.queries.insertUser_IDPlay);
    pool.close();
    return result;
}

const insertUser_IDTrack = async (id_usu_spoty, id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
        .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
        .query(queries.queries.insertUser_IDTrack);
    pool.close();
    return result;
}

const deleteUser_IDPlay = async (id_usu_spoty, id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
        .input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty)
        .query(queries.queries.deleteUser_IDPlay);
    pool.close();
    return result;
}

const deleteUser_IDTrack = async (id_usu_spoty, id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
        .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
        .query(queries.queries.deleteUser_IDTrack);
    pool.close();
    return result;
}

const getAllIDPlay_User = async (id_usu_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_usu_spoty', sql.Varchar(50), id_usu_spoty)
        .query(queries.queries.getAllIDPlay_User);
    pool.close();
    return result;
}

const getAllIDTrack_User = async (id_usu_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
        .query(queries.queries.getAllIDTrack_User);
    pool.close();
    return result.recordset;
}

const getAllUser_IDPlay = async (id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty)
        .query(queries.queries.getAllUser_IDPlay);
    pool.close();
    return result;
}

const getAllUser_IDTrack = async (id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
        .query(queries.queries.getAllUser_IDTrack);
    pool.close();
    return result.recordsets;
}


module.exports.insertIDPlaylist = insertIDPlaylist;

module.exports.insertIDTrack = insertIDTrack;
module.exports.deleteIDPlaylist = deleteIDPlaylist;

module.exports.deleteIDTrack = deleteIDTrack;
module.exports.getAllIDPlaylist = getAllIDPlaylist;
module.exports.isInMTrack = isInMTrack;
module.exports.getAllIDTrack = getAllIDTrack;
module.exports.insertUser_IDPlay = insertUser_IDPlay;
module.exports.insertUser_IDTrack = insertUser_IDTrack;
module.exports.deleteUser_IDPlay = deleteUser_IDPlay;
module.exports.deleteUser_IDTrack = deleteUser_IDTrack;
module.exports.getAllIDPlay_User = getAllIDPlay_User;
module.exports.getAllIDTrack_User = getAllIDTrack_User;
module.exports.getAllUser_IDTrack = getAllUser_IDTrack;
module.exports.getAllUser_IDPlay = getAllUser_IDPlay;
