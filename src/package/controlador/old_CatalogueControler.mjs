import { query } from 'express';
import mysql from 'mysql';

export default class CatalogueControler{

    
    constructor(){
        this.conexion = null;

        //  NO SETTEAR ESTO, UNICAMENTE GET, por favor (*￣3￣)╭
        this.result = null;
    }

    createConnection(){
        this.conexion = mysql.createConnection({
            /**
             * ~~~~~~Debería ser la del servicio heroku 
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
                console.log('conexion exitosa en CatalogueControler');
            }
        })
    }
    closeConnection(){
        this.conexion.end(function (error){
            if(error)throw error;
            else{
                console.log("se ha cerrado correctamente la conexion en CatalogueControler")
            }

        });
    }

    /**
     *          SOBRE LOS CATALOGOS (SEMESTRE, CARRERA ,SEXO, IMGPERFIL)
     *              get*(id), getID*(String)
     */



    // COOREGIR TODO

    //Semestre
    getSemestre(id_semestre){

        var semestre;

        this.conexion.query('Select semestre From cSemestre WHERE id_semestre = ?',[
            id_semestre
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                semestre = rows.semestre;
            }
        });


        return semestre;

    }
    getIDSemestre(semestre, callback){

        const query = 'Select id_semestre From cSemestre WHERE semestre = ?';
        function fn(error, rows){
            if(error) callback(error, null);
            else{

                rows.forEach( row => {
                   callback(null, row.id_semestre);
                });
            }
        };

        this.conexion.query(query ,[semestre], fn);


    }

    //Carrera
    getCarrera(id_carr){

        var carrera;

        this.conexion.query('Select carrera From ccarrera WHERE id_carr = ?',[
            id_carr
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                carrera = rows.carrera;
            }
        });
        return carrera;

    }
    getIDCarrera(carrera, callback){

        const query = 'Select id_carr From cCarrera WHERE carrera = ?';
        function fn(error, rows){
            if(error) callback(error, null);
            else{

                rows.forEach( row => {
                   callback(null, row.id_carrera);
                });
            }
        }

        this.conexion.query(query,[carrera], fn);
    }

    //Sexo
    getSexo(id_sex){
        var sexo;
        this.conexion.query('Select sexo From cSexo WHERE id_sex = ?',[
            id_sex
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                sexo = rows.sexo;
            }
        });
        return sexo;
    }
    getIDSexo(sexo, callback){
        const query = 'SELECT id_sex From cSexo WHERE sexo = ?';
        function fn(error, rows) {

            if(error) callback(error, null);
            else{

                rows.forEach( row => {
                   callback(null, row.id_sex);
                });
            }
        }

        this.conexion.query( query, [sexo],  fn);
    }


    //ImgPerfil
    getImgPerfil(id_imgPerf){
        var id_img_drive;
        this.conexion.query('Select id_img_drive From cImgPerfil WHERE id_imgPerf = ?',[
            id_imgPerf
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                id_img_drive = rows.id_img_drive;
            }
        });
    }
    getIDImgPerf(id_img_drive, callback){
        const query = 'Select id_imgPerf From cImgPerfil WHERE id_img_drive = ?';
        function fn(error, rows) {

            if(error) callback(error, null);
            else{
                rows.forEach( row => {
                   callback(null, row.id_imgPerf);
                });
            }
        }

        this.conexion.query(query,[id_img_drive], fn);
    }
}
