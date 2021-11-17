export default class CatalogueControler{

    
    
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
                console.log('conexion exitosa');
            }
        })
    }
    closeConnection(){
        this.conexion.end
    }

    /**
     *          SOBRE LOS CATALOGOS (SEMESTRE, CARRERA ,SEXO, IMGPERFIL)
     *              get*(id), getID*(String)
     */

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
    getIDSemestre(semestre){

        var id_semestre;

        this.conexion.query('Select id_semestre From cSemestre WHERE semestre = ?',[
            semestre
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                id_semestre = rows.id_semestre;
            }
        });


        return id_semestre;

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
    getIDCarrera(carrera){

        var id_carr;

        this.conexion.query('Select id_carrera From cCarrera WHERE carrera = ?',[
            carrera
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                id_carr = rows.id_carr;
            }
        });
        return id_carr;
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
    getIDSexo(sexo){
        var id_sex;
        this.conexion.query('Select id_sex From cSexo WHERE sexo = ?',[
            sexo
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                id_sex = rows.id_sex;
            }
        });
        return id_sex;
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
        return sexo;
    }
    getIDImgPerf(id_img_drive){
        var id_imgPerf;
        this.conexion.query('Select id_imgPerf From cImgPerfil WHERE id_img_drive = ?',[
            id_img_drive
        ], function (error, rows){
            if(error){
                throw error;
            }else{

                id_imgPerf = rows.id_imgPerf;
            }
        });
        return id_imgPerf;
    }
}
