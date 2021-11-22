import mysql from 'mysql';

export default class Pool{

    constructor(){
        this.pool = null;
        this.results = null;
    }

    crearPool = async () => {
        try{
            var pool = await mysql.createPool({
                /**
                 * ~~~~~~Debería ser la del servicio heroki 
                    host: 'en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
                    database: 'v3tbxk5c4nip9j08',
                    user: 'cu6q3kic7stwiigd',
                    password: 'r2dik2g1qyvt8vsq'
                 * 
                    Puerto: 3306
                 */
      
                connectionLimit: 10,
                host: 'localhost',
                database: 'bd_melodyfriend',
                user: 'root',
                password: 'gallinaAtomica'
                
      
            });
            console.log('Pool exitoso');
            this.pool =  pool;
        }catch(error){
            console.log('Error al conectar UserControler', error);
        }
    
    }

    getConnection = async (error, connection) => {


    }

    getAllSexo =  async (callback) => {

        this.pool.getConnection(async (error, connection) => {
            if(error) throw error;
            connection.query('SELECT * FROM csexo', async (error, results) => {
                if (error) await callback(error, null);
                
                console.log("En los resultados, ", results);
                
                connection.release();

                await callback(null, results);
                return;
              });

        });
        
    }   

}
