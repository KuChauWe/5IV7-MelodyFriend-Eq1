const sql = require('mssql');
const dbsettings = require('./querys.js');

export async function getConnection() {

    try{
        const pool = await sql.connect(dbsettings);  
        return pool;
    }catch(error){console.log(error)}
    
}


