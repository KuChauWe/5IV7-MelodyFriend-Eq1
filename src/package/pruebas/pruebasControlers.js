import {getCarr,getSexo,getSemestre, getImgPerfil, getIDSexo, getIDCarr, getIDSemestre, getIDImgPerf} from '../controlador/CatalogueController.js';
import {getUserByID,updateUser} from '../controlador/UserController.js';
import User from '../modelo/User.mjs';
import { createUserInBD } from "../modelo/User.mjs";
import { getConnection } from "../controlador/Connection.js";
import { deleteIDPlaylist, deleteIDTrack, deleteUser_IDPlay, deleteUser_IDTrack, insertIDPlaylist, insertIDTrack, insertUser_IDPlay, insertUser_IDTrack } from '../controlador/PlayTrackControler.js';


/*
   ************Pruebas sobre CatalogueController********
 *
    var result = null;
    result = await getIDSexo('Masculino');

    if(result == null){}
    else{
        console.log(result);
    }
 
*/

/*
 ********* Pruebas sobre UserController ++ UPDATE Y GET
  *  

    const id_usu_spoty = 'ajcoviajisd';
    var user = await getUserByID(id_usu_spoty);
    console.log(typeof user.desc_usu, user);


    const result = await updateUser(id_usu_spoty, 'id_sex', 1);
    console.log(result);


*/

/*
 ********* Pruebas sobre UserController ++ INSERT
  *

 var user = new User();

 const id_usu_spoty = 'azcvbvc';
 const nickname_usu_spoti = 'Tilin';
 const fullName_usu = 'Fernandez Garcia Gael';
 const sexo_usu = 'Femenino';
 const fcNaci_usu = new Date('11/12/2010');
 const semestre_usu = 3;
 const carrera_usu = 'Técnico en Sistemas Digitales';

  const result = await createUserInBD(id_usu_spoty, nickname_usu_spoti, 
                        fullName_usu, sexo_usu, fcNaci_usu, 
                        semestre_usu, carrera_usu);

  console.log(result);



  const usa = getUserByID(id_usu_spoty);
  console.log(usa);



*/

/*
 ********* Pruebas sobre PlayTrackController
  */

    //PLAYLIST

//  const id_playlist_spoty = '75wlqiEzb6V0PbWyU66Va8';
//  const id_usu_spoty = 'azcvbvc';

// console.log(await insertIDPlay(id_playlist_spoty));
//   console.log(await insertUser_IDPlay(id_usu_spoty, id_playlist_spoty));
//   console.log(await deleteUser_IDPlay(id_usu_spoty, id_playlist_spoty));
// console.log(await deleteIDPlaylist( id_playlist_spoty));


      // TRACKS

  // const id_trac_spoty = '6PSBdwyrcpSAIikYqaW2LB';
  // const id_usu_spoty = 'azcvbvc';

  // console.log(await insertIDTrack(id_trac_spoty));
  // console.log(await insertUser_IDTrack(id_usu_spoty, id_trac_spoty));
  // console.log(await deleteUser_IDTrack(id_usu_spoty, id_trac_spoty));
  // console.log(await deleteIDTrack( id_trac_spoty));
 

// */



