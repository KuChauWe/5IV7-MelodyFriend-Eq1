const { getAllUser_IDTrack, deleteUser_IDTrack, isInMTrack, insertUser_IDTrack, insertIDTrack } = require("../controlador/PlayTrackControler");



const updateETrack = (id_usu_spoty, array_ids_track_spoty) => {

    const array_ids_track_enca = getAllUser_IDTrack(id_usu_spoty);
    console.log(array_ids_track_enca);
    console.log(array_ids_track_spoty);
    //En este for, verifico los encabezados que voy a ELIMINAR
    for (const j in array_ids_track_enca) {
        if (array_ids_track_enca[j] in array_ids_track_spoty) {
            //Todo bien
        }
        else {
            //Lo elimino
            deleteUser_IDTrack(id_usu_spoty, array_ids_track_enca[j]);
        }


    }

    //En este for, verifico los encabezados que voy a AGREGAR
    for (const j in array_ids_track_spoty) {
        if (array_ids_track_spoty[j] in array_ids_track_enca) {
            //El id_spoti en el ENCABEZADO
        }
        else {
            //El id_spoti en el NO ESTA EN EL ENCABEZADO

            //Esta en la IDENTIDAD o no?
            if (isInMTrack(array_ids_track_spoty[j])) {
                //Nomas la agrego al encabezado
                console.log(array_ids_track_spoty[j]);
                insertUser_IDTrack(id_usu_spoty, array_ids_track_spoty[j]);
            } else {
                //La agrego a la IDENTIDAD Y AL ENCABEZADO
                insertIDTrack(array_ids_track_spoty[j]);
                insertUser_IDTrack(id_usu_spoty, array_ids_track_spoty[j]);
            }
        }
    }
}


module.exports.updateETrack = updateETrack;