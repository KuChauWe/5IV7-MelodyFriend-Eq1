
import CatalogueControler from './CatalogueControler.mjs';


export default class UserControler{
    
    constructor(){
        this.conexion = null;
    }

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
                console.log('conexion exitosa en UserControler');
            }
        })
    }
    closeConnection(){
        this.conexion.end(function (error){
            if(error)throw error;
            else{
                console.log("se ha cerrado correctamente la conexion en UserControler")
            }

        });
    }


    /**
     *          SOBRE LOS USUARIOS
     *              getUser, updateUserInBD, insertUserToBD
     */

    /**
     * 
     * @param {String} id_usu_spoti 
     */

    //CORREGIR
    getUser(id_usu_spoti){
         
        var user = new User.constructor();

        this.conexion.query('Select * From mUser WHERE id_usu_spoti = ?',[
            id_usu_spoti
        ], function (error, rows){
            if(error){
                throw error;
            }else{
                /**
                 * Necesito obtener los valores de los cátalogos y detalles
                 * dRedSocial, cSexo, cCarrera, cSemestre, cImgPerfil
                 * 
                 * ¿Podré hacer una consulta dentro de otra consulta?
                 * 
                 * Si, si creo otro objeto UserControler ψ(._. )>
                 * 
                 * 
                 */

                user.id_usu_spoti = rows.id_usu_spoti;
                user.nickname_usu_spoti  = rows.nickname_usu_spoti;
                user.fullName_usu = rows.name_usu;
                user.fcNaci_usu = rows.fcNaci_usu;
                user.desc_usu = rows.desc_usu;
                user.facebook = rows.facebook;
                user.twitter = rows.twitter;
                user.instagram = rows.instagram;
                //Consultas a otras tablas
                try{
                    
                    CatalogueControler.createConnection();
                    user.id_img_drive = CatalogueControler.getImgPerfil(rows.id_imgPerf);
                    user.sexo_usu = CatalogueControler.getSexo(rows.id_sex);
                    user.semestre_usu = CatalogueControler.getSemestre(rows.id_semestre);
                    user.carrera_usu = CatalogueControler.getCarrera(rows.id_carr);
                    
                    CatalogueControler.closeConnection();   

                }catch{
                    console.log("Ocurio un error en la consulta de Ids de otras tablas")
                }

            }
        });
        


        return user;
    }

    /**
     * 
     * @param {String} id_usu_spoti 
     * @param {String} atributo
     * @param {Object} nuevo_valor
     * 
     * Si es un catálogo deberas colocar el id del nuevo valor
     * 
     * 
     * TODOS las columnas del usuario son:
     * 
     * nickname_usu
     * name_usu
     * fcNaci_usu
     * desc_usu
     * 
     * id_sex
     * id_carr
     * id_semestre
     * id_imgPerf
     * 
     * facebook
     * twitter
     * instagram
     */
    updateUserInBD(id_usu_spoti, atributo, nuevo_valor){
        this.conexion.query("UPDATE MUsuario SET ?? = ? WHERE id_usu_spoty = ?",[
            atributo, nuevo_valor, id_usu_spoti
        ], function (error, rows){

            this.conexion.release();
            if(error)throw error;
            else{
                console.log("Actualización de los datos correcta")
            }
        })
    }

    //CORREGIRS
    /**
     * 
     * @param {Usuario lleno} user 
     * Debe de estar completo el usuario excepto por las redes sociales
     * y la descripción
     * 
     * Para las redes Sociales se creara una tabla vacía; la id_imgPerf y desc_usu sera predeterminada
     * 
     */
    insertUserToBD(user){
        
        var id_sex_var = null;
        var id_semestre_var = null;
        var id_carr_var = null;
        var id_imgPerf_var = null;

        var CataCon = new CatalogueControler();


        function executeQuery(){

            let query = "INSERT INTO MUsuario (id_usu_spoty, nickname_usu_spoti, name_usu, fcNaci_usu, "
                    + "desc_usu, id_sex, id_carr, id_semestre, id_imgPerf, facebook, twitter, instagram)"
                        + "VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)";

            let arrg = [
                user.id_usu_spoti, user.nickname_usu_spoti, user.fullName_usu,
                user.fcNaci_usu, user.desc_usu, id_sex_var, id_carr_var, id_semestre_var, id_imgPerf_var,
                user.facebook, user.twitter, user.instagram
            ]

            let fn = function (error, rows){

                if(error)throw error;
                else{
                    console.log("Registro exitoso");
                }
                
            }

            //  console.log(arrg);
            this.conexion.query( query, arrg, fn );

        }


        CataCon.createConnection();

        try{
            CataCon.getIDSexo(user.sexo_usu, (error, id_sex) => {
                if(error) throw error;
                else{
                    id_sex_var = id_sex;
                    CataCon.getIDSemestre(user.semestre_usu,(error, id_semestre) => {
                        if(error) throw error;
                        else{
                            id_semestre_var = id_semestre;
                        }
                        CataCon.getIDCarrera(user.carrera_usu,(error, id_carr) => {
                            if(error) throw error;
                            else{
                                id_carr_var = id_carr;
                            }
                            CataCon.getIDImgPerf(user.id_img_drive,(error, id_imgPerf) => {
                                if(error) throw error;
                                else{
                                    id_imgPerf_var = id_imgPerf;
                                }

                                this.createConnection();
                                executeQuery();
                                CataCon.closeConnection();
                                this.closeConnection();
                            });
                        });
                    });
                }
            });
        }catch(error){
            CataCon.closeConnection();
            this.closeConnection();
            throw error;
        }
        

        
        

    }


    
   
}


