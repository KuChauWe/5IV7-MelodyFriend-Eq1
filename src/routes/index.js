const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const spotifyApi = require('../spotify/')
const { format } = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');
const { json } = require('express/lib/response');
const pagina = "https://api-rest-melodyfriend.herokuapp.com"
router.get('/entrada', (req, res) => {

    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
    if (error) {
        console.error('Callback Error:', error);
        res.render('errores.html', { Fallo: error });
        return;
    }
    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);
            spotifyApi.getMe().then(data => {


                fetch(pagina + "/usuario/" + data.body.id).then(data => {
                    if (data.status == 500) {
                        res.redirect("/teriminos");
                    }
                    if (data.body.rol == 1) {
                        res.redirect("/homeU")
                    }
                    if (data.body.rol == 2) {
                        res.redirect("/homeM")
                    }
                    if (data.body.rol == 3) {
                        res.redirect("/homeA")
                    }

                    else {

                    }

                })
            })
        })

});

router.get('/', (req, res) => {

    res.render('iniciarSesion.html');


});

router.post('/HomeU', (req, res) => {
    spotifyApi.getMe().then(data => {
        usu = {
            "id_usu_spoty": data.body.id,
            "rol": 1,
            "name_usu": req.query.nombre,
            "fcNac_usu": req.query.fecha,
            "desc_usu": "Hola soy" + req.query.nombre,
            "id_sex": req.query.sexo,
            "id_carr": req.query.carrera,
            "semestre": req.query.semestre
        }
        let info = JSON.stringify(usu);
        fetch(pagina + "/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "applicarion/json"
            },
            body: info
        })
        res.redirect('/HomeU')


    })
})
router.get('/HomeU', (req, res) => {
    spotifyApi.getRecommendations({
        min_energy: 0.4,
        seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
        min_popularity: 50
    }).then(data => {

        let recomendaciones = [];
        let ids_tracK = []

        for (var i = 0; i < 10; i++) {
            let id = data.body.tracks[i].id
            let imagen = data.body.tracks[i].album.images[0].url
            let nombre = data.body.tracks[i].name
            let artista = data.body.tracks[i].artists[0].name
            var song = {
                id: id,
                nombre: nombre,
                imagen: imagen,
                artista: artista
            }
            ids_tracK.push(id)
            recomendaciones.push(song)

        }

        spotifyApi.getMe().then(data => {
            console.log(data);
            me = data.body
            let ids = JSON.stringify(ids_tracK)
            fetch(pagina + "/track/" + me.id, {
                method: "POST",
                headers: {
                    "Content-Type": "applicarion/json"
                },
                body: ids
            })
            fetch(pagina + "/filtros_porcentajes/tracks_top_batiz", {
            }).then(data => {
                console.log(data.JSON)
                lista = []
                res.render('Usuario/index.html', { recomendaciones: recomendaciones, name: me.display_name, foto: me.images[0].url });
            })
        })


    })

})

router.post('/datos', (req, res) => {
    spotifyApi.getMe().then(Data => {
        me = Data.body
        res.render('Usuario/entradaDatos.html', { name: me.display_name });
    })



});
router.get('/teriminos', (req, res) => {

    res.render('terminosyCondiciones.html');


});
router.get('/verPlaylist'), (req, res) => {
    id = req.query.id
    spotifyApi.getMe().then(data => {
        me = data.body

        fetch(pagina + "/filtros_porcentajes/users_top_trac/" + me.id).then(data => {
            info = data.JSON.body
        })
        let lista = []

        for (i = 0; i < info.length; i++) {
            spotifyApi.getUser(info[i].id).then(data => {
                user = data.body
                fetch(pagina + "/filtros_porcentajes/porComp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "applicarion/json"
                    },
                    body:
                    {
                        "id_usu1": me.id,
                        "id_usu2": info[i].id
                    }
                }).then(data => {
                    porsenaje = data.JSON.body
                    usu = {
                        id: info[i].id,
                        foto: user.images[0].url,
                        name: info[i].id.name,
                        porsenaje: porsenaje
                    }
                    lista.push(usu)
                    if (i == info.length) {
                        res.render('Usuario/vistaPlaylist.html')
                    }
                })
            })
        }

    })
}
router.get('/prueba', (req, res) => {
    usu = {
        "id_usu_spoty": "2004",
        "rol": 1,
        "name_usu": "djaposdja",
        "fcNac_usu": "2019-12-18",
        "desc_usu": "djaposdja",
        "id_sex": 1,
        "id_carr": 3,
        "semestre": 6
    }
    fetch(pagina + "/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usu)

    }).then(res => res.json()).then(
        data => console.log(data)
    )
    console.log("cargado");
});
router.get('/login', (req, res) => {
    res.redirect(spotifyApi.Login);

});
router.post('/editU', (req, res) => {
    datos = req.query
    spotifyApi.getMe().then(data => {
        data =
            usu = {
                "id_usu_spoty": data.body.id,
                "rol": "1",
                "name_usu": data.body.display_name,
                "desc_usu": datos.descripcion,
                "facebook": datos.red_social,
                "twitter": null,
                "instagram": null,
                "id_sex": datos.sexo,
                "id_carr": datos.carrera,
                "semestre": datos.semestre
            }
        let info = JSON.stringify(usu);
        fetch(pagina + "/usuario", {
            method: "put",
            headers: {
                "Content-Type": "applicarion/json"
            },
            body: info
        })
        res.redirect('/editU')


    })
});
router.get('/editU', (req, res) => {
    res.render('Usuario/editPerfilUsu(actualizado).html')
});
router.post('/ePersonas', (req, res) => {
    res.redirect(spotifyApi.Login);

});


module.exports = router;