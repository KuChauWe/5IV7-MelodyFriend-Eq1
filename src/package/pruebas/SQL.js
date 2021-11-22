

import Pool from "../controlador/createConnection.mjs";


var pol = new Pool();


try{

    await pol.crearPool();
    await pol.getAllSexo((error, results) =>{
        if(error) throw error;
        else{
            pol.results = results;
        }
    });


    
    console.log(pol.results, "exitooooooo");
}catch(error){
    console.log(error);
}


