import sql from 'mssql'

const dbsettings = {
    user: 'melodyFriendUser',
    password: 'dJPSyqqftSaZ5gmq',
    server: 'localhost',
    database: 'bd_melodyFriend',
    port: 1433,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export async function getConnection() {

    try{
        const pool = await sql.connect(dbsettings);  
        return pool;
    }catch(error){console.log(error)}
    
}


