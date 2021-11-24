const sql = require('mssql');
const dbsettings = require('./querys.js');

async function getConnection() {

    try {
        const pool = await sql.connect(dbsettings.dbsettings);
        pool.setMaxListeners(0);
        return pool;
    } catch (error) { console.log(error) }

}

module.exports = getConnection

