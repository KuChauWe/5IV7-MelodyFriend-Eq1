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


export const insertIDPlaylist = async (id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty).query(queries.insertIDPlaylist);
    pool.close();
    return result;
}

export const insertIDTrack = async(id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_trac_spoty', sql.VarChar(50), id_trac_spoty).query(queries.insertIDTrack);
    pool.close();
    return result;
}

export const deleteIDPlaylist = async (id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty).query(queries.deleteIDPlaylist);
    pool.close();
    return result;
}

export const deleteIDTrack = async (id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().input('id_trac_spoty', sql.VarChar(50), id_trac_spoty).query(queries.deleteIDTrack);
    pool.close();
    return result;
}

export const getAllIDPlaylist = async (id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllIDPlaylist);
    pool.close();
    return result.recordset;
}

export const getAllIDTrack = async(id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllIDTrack);
    pool.close();
    return result.recordset;
}


/**
 * 
 * 
 * 
 * SOBRE LOS ENCABEZADOS DE PLAYLIST Y TRACK
 * 
 * 
 */


 export const insertUser_IDPlay = async (id_usu_spoty, id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
                             .input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty)
                             .query(queries.insertUser_IDPlay);
    pool.close();
    return result;
}

export const insertUser_IDTrack = async(id_usu_spoty, id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
                             .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
                             .query(queries.insertUser_IDTrack);
    pool.close();
    return result;
}

export const deleteUser_IDPlay = async (id_usu_spoty, id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
                             .input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty)
                             .query(queries.deleteUser_IDPlay);
    pool.close();
    return result;
}

export const deleteUser_IDTrack = async(id_usu_spoty, id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
                             .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
                             .query(queries.deleteUser_IDTrack);
    pool.close();
    return result;
}

export const getAllIDPlay_User = async(id_usu_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_usu_spoty', sql.Varchar(50), id_usu_spoty)
                             .query(queries.getAllIDPlay_User);
    pool.close();
    return result;
}

export const getAllIDTrack_User = async(id_usu_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_usu_spoty', sql.VarChar(50), id_usu_spoty)
                             .query(queries.getAllIDTrack_User);
    pool.close();
    return result;
}

export const getAllUser_IDPlay = async(id_playlist_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_playlist_spoty', sql.VarChar(50), id_playlist_spoty)
                             .query(queries.getAllUser_IDPlay);
    pool.close();
    return result;
}

export const getAllUser_IDTrack = async(id_trac_spoty) => {
    const pool = await getConnection();
    const result = await pool.request()
                             .input('id_trac_spoty', sql.VarChar(50), id_trac_spoty)
                             .query(queries.getAllUser_IDPlay);
    pool.close();
    return result;
}


module.exports = insertIDPlaylist;

module.exports = insertIDTrack;
module.exports = deleteIDPlaylist;

module.exports = deleteIDTrack;
module.exports = getAllIDPlaylist;

module.exports = getAllIDTrack;
module.exports = insertUser_IDPlay;
module.exports = insertUser_IDTrack;
module.exports = deleteUser_IDPlay;
module.exports = deleteUser_IDTrack;
module.exports = getAllIDPlay_User;
module.exports = getAllIDTrack_User;
module.exports = getAllUser_IDTrack;
module.exports = getAllUser_IDPlay;
