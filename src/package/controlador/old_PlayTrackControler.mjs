import mysql from ('mysql');

export default class PlayTrackControler{

    cconstructor(){
        this.conexion = null;
    }

    /**
     * No olvidar cerrar la conexión 
     */
    createConnection(){
        this.conexion = mysql.createConnection({
            /**
             * ~~~~~~Debería ser la del servicio heroki 
                host: 'en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
                database: 'v3tbxk5c4nip9j08',
                user: 'cu6q3kic7stwiigd',
                password: 'r2dik2g1qyvt8vsq'
             * 
                Puerto: 3306
             */

            host: 'localhost',
            database: 'bd_melodyfriend',
            user: 'root',
            password: 'gallinaAtomica'

        });

        this.conexion.connect(function(error){
            if(error){
                throw error;
            }else{
                console.log('conexion exitosa en PlayTrackControler');
            }
        })
    }
    closeConnection(){
        this.conexion.end(function (error){
            if(error)throw error;
            else{
                console.log("se ha cerrado correctamente la conexion en PlayTrackControler")
            }

        });
    }


     /** Corregir TODOS LOS MÉTODOS GET  */


    /**
     * 
     *  SOBRE LAS IDENTIDADES
     */


    insertIDPlaylist(id_playlist_spoty){

        let query = "INSERT INTO MPlaylist (id_playlist_spoty)"
            + "VALUES  (?)";

        let arrg = [ id_playlist_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Registro exitoso del id_playlist_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }
    insertIDTrack(id_trac_spoty){

        let query = "INSERT INTO MTrack (id_trac_spoty)"
            + "VALUES  (?)";

        let arrg = [ id_trac_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Registro exitoso del id_trac_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }


    deleteIDPlaylist(id_playlist_spoty){

        let query = "DELETE FROM MPlaylist WHERE id_playlist_spoty = ?";

        let arrg = [ id_playlist_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Se ha borrado del id_playlist_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }
    deleteIDTrack(id_trac_spoty){

        let query = "DELETE FROM MTrack WHERE id_trac_spoty = ?";

        let arrg = [ id_trac_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Se ha borrado del id_trac_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }


    getAllIDPlaylist(){
        var idsPlay = null;
        const query = "SELECT id_playlist_spoty FROM MPlaylist";
        function fn(error, rows) {
            if(error)throw error;
            else{
                rows.array.forEach(row => {
                    idsTrack.push(row.id_playlist_spoty);
                });

            }
        }

        this.conexion.query(query, fn )

        return idsPlay;
    }

    getAllIDTrack(){

        var idsTrack = null;
        const query = "SELECT id_track_spoty FROM MTrack";
        function fn(error, rows) {
            if(error)throw error;
            else{
                rows.array.forEach(row => {
                    idsTrack.push(row.id_trac_spoty);
                });

            }
        }

        this.conexion.query(query, fn )

        return idsTrack;
        
    }

    /**
     *  SOBRE LOS ENCABEZADOS
     */


    insertUser_IDPlay(id_usu_spoty,id_playlist_spoty){

        let query = "INSERT INTO EPlaylist (id_usu_spoty, id_playlist_spoty)"
            + "VALUES  (?, ?)";

        let arrg = [ id_usu_spoty, id_playlist_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Vinculación exitosa del id_usu_spoty y id_playlist_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }

    insertUser_IDTrack(id_usu_spoty, id_trac_spoty){

        
        let query = "INSERT INTO ETrack (id_usu_spoty, id_trac_spoty)"
            + "VALUES  (?, ?)";

        let arrg = [ id_usu_spoty, id_trac_spoty];

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Vinculación exitosa del id_usu_spoty y id_trac_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );



    }


    deleteUser_IDPlaylist(id_usu_spoty, id_playlist_spoty){

        let query = "DELETE FROM EPlaylist WHERE id_usu_spoty = ? AND id_playlist_spoty = ? ";

        let arrg = [ id_usu_spoty, id_playlist_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Se ha borrado la vinculación id_usu_spoty y id_playlist_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }

    deleteUser_IDTrack(id_usu_spoty, id_trac_spoty){

        let query = "DELETE FROM EPlaylist WHERE id_usu_spoty = ? AND id_trac_spoty = ? ";

        let arrg = [ id_usu_spoty, id_trac_spoty]

        let fn = function (error, rows){

        if(error)throw error;
        else{
            console.log("Se ha borrado la vinculación id_usu_spoty y id_playlist_spoty");
        }

        }

        // console.log(arrg);
        this.conexion.query( query, arrg, fn );


    }


    getAllIDPlay_User(id_usu_spoty){
        var idsPlay = null;
        const query = "SELECT id_playlist_spoty FROM EPlaylist WHERE id_usu_spoty = ?";
        const val = [id_usu_spoty];


        function fn(error, rows) {
            if(error)throw error;
            else{
                rows.array.forEach(row => {
                    idsPlay.push(row.id_playlist_spoty);
                });

            }
        }

        this.conexion.query(query,val,  fn );

        return idsPlay;
    }

    getAllIDTrack_User(id_usu_spoty){

        var idsTrack = null;
        const query = "SELECT id_track_spoty FROM MTrack WHERE id_usu_spoty = ?";
        const val = [id_usu_spoty];

        function fn(error, rows) {
            if(error)throw error;
            else{
                rows.array.forEach(row => {
                    idsTrack.push(row.id_trac_spoty);
                });

            }
        }

        this.conexion.query(query, val, fn )

        return idsTrack;
        
    }


    getAllUser_IDPlay(id_playlist_spoty){
        var idsUser = null;
        const query = "SELECT id_usu_spoty FROM EPlaylist WHERE id_playlist_spoty = ?";
        const val = [id_playlist_spoty];

        function fn(error, rows) {
            if(error)throw error;
            else{
                rows.array.forEach(row => {
                    idsUser.push(row.id_usu_spoty);
                });

            }
        }

        this.conexion.query(query,val,  fn );

        return idsUser;
    }

    getAllIDTrack_User(id_track_spoty){

        var idsUser = null;
        const query = "SELECT id_usu_spoty FROM MTrack WHERE id_track_spoty = ?";
        const val = [id_track_spoty];

        function fn(error, rows) {
            if(error)throw error;
            else{
                rows.array.forEach(row => {
                    idsUser.push(row.id_usu_spoty);
                });

            }
        }

        this.conexion.query(query, val, fn )

        return idsUser;
        
    }



}