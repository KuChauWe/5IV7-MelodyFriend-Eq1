const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const spotifyApi = require('../spotify/')
const { format } = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const { on } = require('nodemon');
const pagina = "https://api-rest-melodyfriend.herokuapp.com"

router.get('/edit', (req, res) => {
    id = req.flash('id_spotify')
    fetch(pagina + "/usuario" + id).then(res => res.json()).then(
        data => {
            info = data
            spotifyApi.getUser(id).then(data => {

                img = data.body.images[0].url
                usu = {
                    id: id,
                    sexo: info.id_sex,
                    carrera: info.id_carr,
                    semestre: (info.semestre == "mayor de 6° Semestre") ? "7" : data.semestre,
                    twitter: (info.twitter == null) ? "no hay twitter" : usuario.twitter,
                    instagram: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    facebook: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    nombre: info.name_usu,
                    descripcion: info.desc_usu,
                    foto: img

                }
                res.render('Usuario/perfilUsu(actualizado).html', { usuario: usu })
            })
        }
    )
})
router.post('/edit', (req, res) => {
    id = req.flash('id_spotify')
    fetch(pagina + "/usuario/" + id).then(res => res.json()).then(
        data => {
            nombre = data.name_usu
            fecha = data.fcNac_usu
            rol = info.rol
            if (info.id_carr = 1) {
                carr = "Tronco Comun"
            }
            if (info.id_carr = 2) {
                carr = "Maquinas con sistemas automatizados "
            }
            if (info.id_carr = 3) {
                carr = "Mecatronica"
            }
            if (info.id_carr = 4) {
                carr = "programacion"
            }
            if (info.id_carr = 5) {
                carr = "sistema digitales"
            }
            fetch(pagina + "/usuario", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "id_usu_spoty": id,
                        "rol": rol,
                        "name_usu": nombre,
                        "fcNac_usu": fecha,
                        "desc_usu": req.query.decripcion,
                        "facebook": req.query.facebook,
                        "twitter": req.query.twitter,
                        "instagram": req.query.instagram,
                        "id_sex": req.query.sexo,
                        "id_carr": req.query.carrera,
                        "semestre": req.query,
                        "sexo": (req.id_sex == 1) ? "Hombre" : "Mujer",
                        "carrera": carr
                    })

            }).then(res => res.json()).then(
                data => console.log(data)
            )
        }
    )



})
router.get('/', (req, res) => {

    res.render('iniciarSesion.html');


});
router.get('/verperfil', (req, res) => {
    id = req.query.id
    fetch(pagina + "/usuario" + id).then(res => res.json()).then(
        data => {
            info = data
            if (info.id_carr = 1) {
                carr = "Tronco Comun"
            }
            if (info.id_carr = 2) {
                carr = "Maquinas con sistemas automatizados "
            }
            if (info.id_carr = 3) {
                carr = "Mecatronica"
            }
            if (info.id_carr = 4) {
                carr = "programacion"
            }
            if (info.id_carr = 5) {
                carr = "sistema digitales"
            }

            spotifyApi.getUser(id).then(data => {
                img = data.body.images[0].url
                usu = {
                    id: id,
                    sexo: (info.id_sex == 1) ? "Hombre" : "mujer",
                    carrera: carr,
                    semestre: info.semestre_usu,
                    twitter: (info.twitter == null) ? "no hay twitter" : usuario.twitter,
                    instagram: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    facebook: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    nombre: info.name_usu,
                    descripcion: info.desc_usu,
                    foto: img

                }
                res.render('Usuario/perfilUsu(actualizado).html', { usuario: usu })
            })
        }
    )
})

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
            req.flash('access_token', access_token);
            req.flash('refresh_token', refresh_token)

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);
            spotifyApi.getMe().then(data => {
                req.flash('id_spotify', data.body.id)

                fetch(pagina + "/usuario/" + data.body.id).then(data => {

                    if (res.status != 500) {
                        return data.json()
                    }
                    else {
                        res.redirect("/teriminos")
                    }
                }).then(data => {
                    console.log(data);

                    if (data.rol == 1) {
                        res.redirect("/homeU")
                    }
                    if (data.rol == 2) {
                        res.redirect("/homeM")
                    }
                    if (data.rol == 3) {
                        res.redirect("/homeA")
                    }



                }
                )
            })
        })
});
router.get('/login', (req, res) => {
    res.redirect(spotifyApi.Login);

});

router.get('/datos', (req, res) => {
    spotifyApi.getMe().then(Data => {
        me = Data.body
        res.render('Usuario/entradaDatos.html', { name: me.display_name });
    })
});
router.post('/datos', (req, res) => {
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
                "Content-Type": "application/json"
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

            me = data.body
            let ids = JSON.stringify(ids_tracK)
            fetch(pagina + "/track/" + me.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: ids
            })
            fetch(pagina + "/filtros_porcentajes/tracks_top_batiz", {
            }).then(res => res.json).then(data => {
                lista = []
                for (i = 0; i < data.length; i++) {
                    lista.push(data[i][0])
                }
                spotifyApi.getTracks(lista).then(data => {
                    canciones = data.body
                    res.render('Usuario/index.html', { recomendaciones: recomendaciones, name: me.display_name, foto: me.images[0].url, canciones: canciones });
                })

            })
        })
    })

})
router.get('/musica', (req, res) => {
    res.render('Usuario/encuentraMusica.html', { busqueda: null });
});
router.post('/musica', (req, res) => {
    buscar = req.body.busqueda
    spotifyApi.searchTracks(buscar)
        .then(function (data) {
            songs = data.body.tracks.items
            lista = []
            for (var i = 0; i < 10; i++) {
                let id = songs[i].id
                let imagen = songs[i].album.images[0].url
                let nombre = songs[i].name
                let artista = songs[i].artists[0].name
                var song = {
                    id: id,
                    nombre: nombre,
                    imagen: imagen,
                    artista: artista
                }
                lista.push(song)
            }
            res.render('Usuario/encuentraMusica.html', { busqueda: lista })
        }, function (err) {
            console.error(err);
        });
})
router.get('/teriminos', (req, res) => {
    res.render('terminosyCondiciones.html');
});
router.get('/encotrarp', (req, res) => {
    res.render('Usuario/encontrarPersonas.html', { busqueda: null });
});

router.get('/gustosSimilares', (res, req) => {
    id_usu = req.flash('id_spotify')
    fetch(pagina + "/users_top_trac/" + id_usu).then(res => res.json()).then(
        data => {
            ids = data
            por = []
            usus = []
            ids.forEach(element => {
                fetch(pagina + "/usuario/" + element[0]).then(res => res.json()).then(data => {
                    id = data.id_usu_spoty
                    usu = {
                        id: data.id_usu_spoty,
                        name: data.name_usu,
                        desc: data.desc_usu
                    }
                    usus.push(usu)
                    fetch(pagina + "/filtros_porcentajes/porComp", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(
                            {
                                "id_usu1": id_usu,
                                "id_usu2": lista[i].id_usu_spoty
                            }
                        )
                    }).then(res => res.json()).then(
                        data => {
                            por.push(data)
                            spotifyApi.getUser(Element[0]).then(data => {
                                img.push(data.body.images[0].url)
                                if (element[0] == ids[ids.length - 1][0]) {
                                    res.render('Usuario/encontrarPersonas.html', { busqueda: usus, img: img, por: por });
                                }
                            })
                        }
                    )

                })
            })
        }
    )

})
router.post('/encotrarp', (req, res) => {
    data = req.query
    id = data.id
    semestre = data.semestre
    id_usu = req.flash('id_spotify')
    carrera = data.carrera

    if (id != null) {
        fetch(pagina + "/usuario/" + id).then(res => res.json()).then(data => {
            lista = []
            lista.push(data)
            let id = []

            let img = []
            let por = []
            for (i = 0; i < lista.length; i++) {
                id.push(lista[i].id_usu_spoty)
                fetch(pagina + "/filtros_porcentajes/porComp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            "id_usu1": id_usu,
                            "id_usu2": lista[i].id_usu_spoty
                        }
                    )
                }).then(res => res.json()).then(
                    data => {
                        por.push(data)
                    }
                )
                spotifyApi.getUser(Element).then(data => {
                    img.push(data.body.images[0].url)
                    if (element == id[id.length - 1]) {
                        res.render('Usuario/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                    }
                })
            }
            id.forEach(Element => {
                spotifyApi.getUser(Element).then(data => {
                    img.push(data.body.images[0].url)
                    if (element == id[id.length - 1]) {
                        res.render('Usuario/encontrarPersonas.html', { busqueda: lista, img: img, por: por });
                    }
                })

            })

        }
        )
    } else {
        if (semestre == null && carrera == "on") {
            fetch(pagina + "/usuario/" + id_usu).then(res => res.json()).then(data => {
                carr = data.id_carr
                fetch(pagina + "/filtros_porcentajes/filtrar_carrera/" + carr).then(res => res.json()).then(data => {
                    let id = []
                    let img = []
                    let por = []
                    usu = data
                    for (i = 0; i < data.length; i++) {
                        id.push(data[i].id_usu_spoty)
                        fetch(pagina + "/filtros_porcentajes/porComp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    "id_usu1": id_usu,
                                    "id_usu2": data[i].id_usu_spoty
                                }
                            )
                        }).then(res => res.json()).then(
                            data => {
                                por.push(data)
                            }
                        )

                    }
                    id.forEach(Element => {
                        spotifyApi.getUser(Element).then(data => {
                            img.push(data.body.images[0].url)
                            if (element == id[id.length - 1]) {
                                res.render('Usuario/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                            }
                        })

                    })

                })
            }
            )
        }
        if (semestre == "on" && carrera == null) {
            fetch(pagina + "/usuario/" + id_usu).then(res => res.json()).then(data => {

                semestre = (data.semestre == "mayor de 6° Semestre") ? "7" : data.semestre
                fetch(pagina + "/filtros_porcentajes/filtrar_semestre/" + semestre).then(res => res.json()).then(data => {
                    let id = []
                    let img = []
                    let por = []
                    usu = data
                    for (i = 0; i < data.length; i++) {
                        id.push(data[i].id_usu_spoty)
                        fetch(pagina + "/filtros_porcentajes/porComp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    "id_usu1": id_usu,
                                    "id_usu2": data[i].id_usu_spoty
                                }
                            )
                        }).then(res => res.json()).then(
                            data => {
                                por.push(data)
                            }
                        )

                    }
                    id.forEach(Element => {
                        spotifyApi.getUser(Element).then(data => {
                            img.push(data.body.images[0].url)
                            if (element == id[id.length - 1]) {
                                res.render('Usuario/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                            }
                        })

                    })
                })
            }
            )
        }
        if (semestre == "on" && carrera == "on") {
            res.render('Usuario/encontrarPersonas.html', { busqueda: null })
        }
    }
});


module.exports = router;