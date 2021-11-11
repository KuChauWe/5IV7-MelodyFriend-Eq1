var mysql = require('mysql')

class UserControler{
    constructor(){

        this.conexion = mysql.createConnection({
            host: 's',
            database: 'd',
            user: 'd',
            password: 'd'

        });
    }
    getUsuario(id_usu_spoti){
        
        
    }


    updateBD(id_usu_spoti, atribute, value){

    }
    insertToBD(User){

    }



}