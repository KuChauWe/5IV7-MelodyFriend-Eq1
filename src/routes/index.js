const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const spotifyApi = require('../spotify/')
const { format } = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');
const pagina = "localhost:3000"
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


                fetch("http://" + pagina + "/usuario/" + data.body.id).then(data => {
                    if (data.status == 500) {
                        res.redirect("/teriminos");
                    }
                    else {
                        res.redirect("")
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
            "id_usu_spoty": data.body,
            "rol": 1,
            "name_usu": req.query.nombre,
            "fcNac_usu": req.query.fecha,
            "desc_usu": "Hola soy" + req.query.nombre,
            "id_sex": req.query.sexo,
            "id_carr": req.query.carrera,
            "semestre": req.query.semestre
        }
        let info = JSON.stringify(usu);
        fetch("http://" + pagina + "/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "applicarion/json"

            },
            body: info
        }).then(data => {
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
                recomendaciones.push(song)
            }

            spotifyApi.getMe().then(data => {
                console.log(data);
                me = data.body
                fetch("http://" + pagina + "/filtros_porcentajes/tracks_top_batiz", {
                    method: "POST",
                }).then(data => {
                    console.log(data.JSON)

                    res.render('Usuario/index.html', { recomendaciones: recomendaciones, name: me.display_name, foto: me.images[0].url });
                })
            })


        })

    })





});
router.post('/datos', (req, res) => {
    spotifyApi.getMe().then(Data => {
        me = Data.body
        res.render('Usuario/entradaDatos.html', { name: me.display_name });
    })



});
router.get('/teriminos', (req, res) => {

    res.render('terminosyCondiciones.html');


});
router.get('/prueba', (req, res) => {
    fetch("http://" + pagina + "/usuario").then(data => {
        datos = data
        console.log(datos);
    })




});
router.get('/login', (req, res) => {
    res.redirect(spotifyApi.Login);

});


module.exports = router;