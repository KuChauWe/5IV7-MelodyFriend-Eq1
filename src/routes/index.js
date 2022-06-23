const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const spotifyApi = require('../spotify/')
const { format } = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');
const { json, append } = require('express/lib/response');
const res = require('express/lib/response');
const { on } = require('nodemon');
const { token } = require('morgan');
const pagina = "https://api-rest-melodyfriend.herokuapp.com"

router.get('/', (req, res) => {
    res.render('iniciarSesion.html');
});

router.get('/terminosyCondiciones', (req, res) => {
    res.render("Usuario/terminosyCondiciones(Aceptados).html")
})

router.get('/editPerfil', (req, res) => {
    spotifyApi.refreshAccessToken()
    id = req.flash('id_spotify')[0]
    req.flash('id_spotify', id)
    req.flash('id_usu', id)
    console.log(id);
    fetch(pagina + "/usuario/" + id).then(res => res.json()).then(
        data => {
            info = data
            spotifyApi.getUser(id).then(data => {

                img = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                usu = {
                    id: id,
                    sexo: info.id_sex,
                    id_carr: info.id_carr,
                    semestre: (info.semestre == "mayor de 6° Semestre") ? "7" : info.semestre.slice(0, 1),
                    twitter: (info.twitter == null) ? "no hay twitter" : info.twitter.trimEnd(),
                    instagram: (info.instagram == null) ? "no hay instagram" : info.instagram.trimEnd(),
                    facebook: (info.facebook == null) ? "no hay facebook" : info.facebook.trimEnd(),
                    nombre: info.name_usu,
                    descripcion: info.desc_usu.trimEnd(),
                    foto: img
                }
                res.render('Usuario/editPerfilUsu(actualizado).html', { usuario: usu })
            })
        }
    )
})

router.post('/editPerfil', (req, res) => {
    spotifyApi.refreshAccessToken()
    id = req.flash('id_usu')
    fetch(pagina + "/usuario/" + id).then(res => res.json()).then(
        data => {
            info = data
            nombre = data.name_usu
            fecha = data.fcNac_usu
            rol = info.rol

            if (req.body.carrera == 1) {
                carr = "Tronco Comun"
            }
            if (req.body.carrera == 2) {
                carr = "Maquinas con sistemas automatizados "
            }
            if (req.body.carrera == 3) {
                carr = "Mecatronica"
            }
            if (req.body.carrera == 4) {
                carr = "programacion"
            }
            if (req.body.carrera == 5) {
                carr = "sistema digitales"
            }
            console.log(pagina + "/usuario/" + id);
            usu = {
                "id_usu_spoty": id,
                "rol": rol,
                "name_usu": nombre,
                "fcNac_usu": fecha,
                "desc_usu": req.body.decripcion,
                "facebook": req.body.facebook,
                "twitter": req.body.twitter,
                "instagram": req.body.instagram,
                "id_sex": req.body.sexo,
                "id_carr": req.body.carrera,
                "semestre": req.body.semestre,
                "sexo": (req.id_sex == 1) ? "Mujer" : "Hombre",
                "carrera": carr
            }
            console.log(usu);
            fetch(pagina + "/usuario/" + id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usu)

            }).then(res => res.json()).then(
                data => res.redirect('/homeU')
            )
        }
    )
})

router.get('/verplaylist', (req, res) => {
    spotifyApi.refreshAccessToken()
    id = req.query.id
    id_usu = req.flash('id_spotify')[0]
    req.flash('id_spotify', id_usu)
    nombre = req.query.nombre
    fetch(pagina + "/filtros_porcentajes/filtrar_track/" + id).then(res => res.json()).then(data => {
        let id = []
        let img = []
        let por = []
        usu = data
        usu.forEach((Element, index) => {
            id.push(Element.id_usu_spoty)
            fetch(pagina + "/filtros_porcentajes/porComp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "id_usu1": id_usu,
                        "id_usu2": Element.id_usu_spoty
                    }
                )
            }).then(res => res.json()).then(
                data => {
                    por.push(data)
                    if (index == (usu.length - 1)) {
                        id.forEach((Element, index) => {
                            c = Element.trim()
                            spotifyApi.getUser(c).then(data => {
                                foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                                img.push(foto)
                                if (index == (id.length - 1)) {

                                    res.render('Usuario/vistaPlaylist.html', { busqueda: usu, img: img, por: por, name: nombre });
                                }
                            })

                        })
                    }
                }
            )
        })
    })
})

router.get('/verperfil', (req, res) => {
    spotifyApi.refreshAccessToken()
    id = req.query.id
    fetch(pagina + "/usuario/" + id).then(res => res.json()).then(
        data => {
            info = data
            if (info.id_carr == 1) {
                carr = "Tronco Comun"
            }
            if (info.id_carr == 2) {
                carr = "Maquinas con sistemas automatizados "
            }
            if (info.id_carr == 3) {
                carr = "Mecatronica"
            }
            if (info.id_carr == 4) {
                carr = "programacion"
            }
            if (info.id_carr == 5) {
                carr = "sistema digitales"
            }
            spotifyApi.getUser(id).then(data => {
                img = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                usu = {
                    id: id,
                    sexo: (info.id_sex == 1) ? "Hombre" : "mujer",
                    carrera: carr,
                    semestre: info.semestre,
                    twitter: (info.twitter == null) ? "no hay twitter" : usuario.twitter,
                    instagram: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    facebook: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    nombre: info.name_usu,
                    descripcion: info.desc_usu,
                    foto: img

                }
                res.render('Usuario/perfilUsu(actualizado).html', { usuario: usu })
            })

        })
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
                console.log(data.body.id);
                req.flash('id_spotify', data.body.id)

                fetch(pagina + "/usuario/" + data.body.id).then(data => {
                    if (data.status != 500) {


                        return data.json()
                    }
                    else {
                        res.redirect("/teriminos")
                    }
                }).then(data => {
                    if (data != null) {
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
            "name_usu": req.body.nombre,
            "fcNac_usu": req.body.fecha,
            "desc_usu": "Hola soy" + req.body.nombre,
            "id_sex": req.body.sexo,
            "id_carr": req.body.carrera,
            "semestre": req.body.semestre
        }
        let info = JSON.stringify(usu);
        fetch(pagina + "/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: info
        }).then(res => res.json()).then(data => {
            res.redirect('/HomeU')
        })
    })
});

router.get('/homeU', (req, res) => {
    spotifyApi.refreshAccessToken()
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
        console.log(JSON.stringify(ids_tracK));
        spotifyApi.getMe().then(data => {

            me = data.body
            fetch(pagina + "/track/" + me.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "ids_trac_spoty": ids_tracK
                    })
            })
            fetch(pagina + "/filtros_porcentajes/tracks_top_batiz", {
            }).then(res => res.json()).then(data => {
                lista = data
                lista.forEach((element, index) => {

                    lista[index] = element[0].trim()
                });


                spotifyApi.getTracks(lista).then(data => {
                    songs = []
                    canciones = data.body.tracks
                    // console.log(canciones[0].album);
                    //console.log(canciones[0].artists);
                    canciones.forEach(Element => {
                        music = {
                            nombre: Element.name,
                            id: Element.id,
                            artista: Element.artists[0].name,
                            img: Element.album.images[0].url,
                        }
                        songs.push(music)
                    })
                    foto = (me.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : me.images[0].url
                    res.render('Usuario/index.html', { recomendaciones: recomendaciones, name: me.display_name, foto: foto, canciones: songs });
                })

            })
        })
    })

});


router.get('/musica', (req, res) => {
    spotifyApi.refreshAccessToken()
    res.render('Usuario/encuentraMusica.html', { busqueda: null });
});

router.post('/musica', (req, res) => {
    buscar = req.body.busqueda
    console.log(buscar);

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
});

router.get('/teriminos', (req, res) => {
    spotifyApi.refreshAccessToken()
    res.render('terminosyCondiciones.html');
});

router.get('/encotrarp', (req, res) => {
    spotifyApi.refreshAccessToken()
    res.render('Usuario/encontrarPersonas.html', { busqueda: null });
});

router.post('/encotrarp', (req, res) => {
    data = req.body
    id = req.body.id
    semestre = data.semestre
    id_usu = req.flash('id_spotify')[0]
    req.flash('id_spotify', id_usu)

    carrera = data.carrera

    if (id != "") {
        fetch(pagina + "/usuario/" + id).then(res => res.json()).then(data => {
            lista = []
            lista.push(data)
            let img = []
            let por = []
            fetch(pagina + "/filtros_porcentajes/porComp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "id_usu1": id_usu,
                        "id_usu2": id
                    }
                )
            }).then(res => res.json()).then(
                data => {
                    por.push(data)

                    spotifyApi.getUser(id).then(data => {
                        foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                        img.push(foto)

                        res.render('Usuario/encontrarPersonas.html', { busqueda: lista, img: img, por: por });
                    })
                }
            )

        }
        )
    } else {
        if (carrera == "on" && semestre == null) {
            console.log(id);
            fetch(pagina + "/usuario/" + id_usu).then(res => res.json()).then(data => {
                carr = data.id_carr
                fetch(pagina + "/filtros_porcentajes/filtrar_carrera/" + carr).then(res => res.json()).then(data => {
                    let id = []
                    let img = []
                    let por = []
                    usu = data
                    usu.forEach((Element, index) => {
                        id.push(Element.id_usu_spoty)
                        fetch(pagina + "/filtros_porcentajes/porComp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    "id_usu1": id_usu,
                                    "id_usu2": Element.id_usu_spoty
                                }
                            )
                        }).then(res => res.json()).then(
                            data => {
                                por.push(data)
                                if (index == (usu.length - 1)) {
                                    id.forEach((Element, index) => {
                                        c = Element.trim()
                                        spotifyApi.getUser(c).then(data => {
                                            foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                                            img.push(foto)
                                            if (index == (id.length - 1)) {
                                                res.render('Usuario/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                                            }
                                        })

                                    })
                                }
                            }
                        )
                    })
                })
            }
            )
        }
        if (semestre == "on" && carrera == null) {
            fetch(pagina + "/usuario/" + id_usu).then(res => res.json()).then(data => {
                semestre = (data.semestre == "mayor de 6° Semestre") ? "7" : data.semestre.slice(0, 1)
                fetch(pagina + "/filtros_porcentajes/filtrar_semestre/" + semestre).then(res => res.json()).then(data => {
                    let id = []
                    let img = []
                    let por = []
                    usu = data
                    usu.forEach((Element, index) => {
                        id.push(Element.id_usu_spoty)
                        fetch(pagina + "/filtros_porcentajes/porComp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    "id_usu1": id_usu,
                                    "id_usu2": Element.id_usu_spoty
                                }
                            )
                        }).then(res => res.json()).then(
                            data => {
                                por.push(data)
                                if (index == (usu.length - 1)) {
                                    id.forEach((Element, index) => {
                                        c = Element.trim()

                                        spotifyApi.getUser(c).then(data => {
                                            foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                                            img.push(foto)
                                            if (index == (id.length - 1)) {

                                                res.render('Usuario/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                                            }
                                        })

                                    })
                                }
                            }
                        )
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

router.get('/homeA', (req, res) => {
    spotifyApi.refreshAccessToken()
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
        console.log(JSON.stringify(ids_tracK));
        spotifyApi.getMe().then(data => {

            me = data.body
            fetch(pagina + "/track/" + me.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "ids_trac_spoty": ids_tracK
                    })
            })
            fetch(pagina + "/filtros_porcentajes/tracks_top_batiz", {
            }).then(res => res.json()).then(data => {
                lista = data
                lista.forEach((element, index) => {

                    lista[index] = element[0].trim()
                });


                spotifyApi.getTracks(lista).then(data => {
                    songs = []
                    canciones = data.body.tracks
                    // console.log(canciones[0].album);
                    //console.log(canciones[0].artists);
                    canciones.forEach(Element => {
                        music = {
                            nombre: Element.name,
                            id: Element.id,
                            artista: Element.artists[0].name,
                            img: Element.album.images[0].url,
                        }
                        songs.push(music)
                    })
                    foto = (me.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : me.images[0].url
                    res.render('Administrador/index.html', { recomendaciones: recomendaciones, name: me.display_name, foto: foto, canciones: songs });
                })
            })
        })
    })
});

router.get('/encotrarpA', (req, res) => {
    res.render('Administrador/encontrarPersonas.html', { busqueda: null });
});

router.post('/encotrarpA', (req, res) => {
    data = req.body
    id = req.body.id
    semestre = data.semestre
    id_usu = req.flash('id_spotify')[0]
    req.flash('id_spotify', id_usu)
    carrera = data.carrera

    if (id != "") {
        fetch(pagina + "/usuario/" + id).then(res => res.json()).then(data => {
            lista = []
            lista.push(data)
            let img = []
            let por = []
            fetch(pagina + "/filtros_porcentajes/porComp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "id_usu1": id_usu,
                        "id_usu2": id
                    }
                )
            }).then(res => res.json()).then(
                data => {
                    por.push(data)

                    spotifyApi.getUser(id).then(data => {
                        foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                        img.push(foto)

                        res.render('Administrador/encontrarPersonas.html', { busqueda: lista, img: img, por: por });
                    })
                }
            )

        }
        )
    } else {
        if (carrera == "on" && semestre == null) {

            fetch(pagina + "/usuario/" + id_usu).then(res => res.json()).then(data => {
                carr = data.id_carr
                fetch(pagina + "/filtros_porcentajes/filtrar_carrera/" + carr).then(res => res.json()).then(data => {
                    let id = []
                    let img = []
                    let por = []
                    usu = data
                    usu.forEach((Element, index) => {
                        id.push(Element.id_usu_spoty)
                        fetch(pagina + "/filtros_porcentajes/porComp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    "id_usu1": id_usu,
                                    "id_usu2": Element.id_usu_spoty
                                }
                            )
                        }).then(res => res.json()).then(
                            data => {
                                por.push(data)
                                if (index == (usu.length - 1)) {
                                    id.forEach((Element, index) => {
                                        c = Element.trim()
                                        spotifyApi.getUser(c).then(data => {
                                            foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                                            img.push(foto)
                                            if (index == (id.length - 1)) {
                                                res.render('Administrador/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                                            }
                                        })

                                    })
                                }
                            }
                        )
                    })
                })
            }
            )
        }
        if (semestre == "on" && carrera == null) {
            fetch(pagina + "/usuario/" + id_usu).then(res => res.json()).then(data => {
                semestre = (data.semestre == "mayor de 6° Semestre") ? "7" : data.semestre.slice(0, 1)
                fetch(pagina + "/filtros_porcentajes/filtrar_semestre/" + semestre).then(res => res.json()).then(data => {
                    let id = []
                    let img = []
                    let por = []
                    usu = data
                    usu.forEach((Element, index) => {
                        id.push(Element.id_usu_spoty)
                        fetch(pagina + "/filtros_porcentajes/porComp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    "id_usu1": id_usu,
                                    "id_usu2": Element.id_usu_spoty
                                }
                            )
                        }).then(res => res.json()).then(
                            data => {
                                por.push(data)
                                if (index == (usu.length - 1)) {
                                    id.forEach((Element, index) => {
                                        c = Element.trim()

                                        spotifyApi.getUser(c).then(data => {
                                            foto = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                                            img.push(foto)
                                            if (index == (id.length - 1)) {

                                                res.render('Administrador/encontrarPersonas.html', { busqueda: usu, img: img, por: por });
                                            }
                                        })

                                    })
                                }
                            }
                        )
                    })
                })
            }
            )
        }
        if (semestre == "on" && carrera == "on") {
            res.render('Administrador/encontrarPersonas.html', { busqueda: null })
        }
    }
});

router.get('/rolesA', (req, res) => {
    res.render('iniciarSesion.html');
});
router.get('/stasA', (req, res) => {
    res.render('iniciarSesion.html');
});
router.get('/verperfilA', (req, res) => {
    spotifyApi.refreshAccessToken()
    id = req.query.id
    fetch(pagina + "/usuario/" + id).then(res => res.json()).then(
        data => {
            info = data
            if (info.id_carr == 1) {
                carr = "Tronco Comun"
            }
            if (info.id_carr == 2) {
                carr = "Maquinas con sistemas automatizados "
            }
            if (info.id_carr == 3) {
                carr = "Mecatronica"
            }
            if (info.id_carr == 4) {
                carr = "programacion"
            }
            if (info.id_carr == 5) {
                carr = "sistema digitales"
            }
            spotifyApi.getUser(id).then(data => {
                img = (data.body.images[0] == undefined) ? "https://scontent.fcvj4-1.fna.fbcdn.net/v/t1.15752-9/287976094_328312559496970_4537234010685697075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHcpYvcZoD9xYxJik7reXQxAm8DAnMF5QcCbwMCcwXlB5N872OG1OvW_FAVS1J3v-QKGbA3KDvi5kFNANLc2YzN&_nc_ohc=BSuG87dQrxYAX_3MlWS&_nc_ht=scontent.fcvj4-1.fna&oh=03_AVL31l6Lm4io00k4Pel2CQPxTzSYreCQ_0t4OszUIw3j6A&oe=62D8AF5C" : data.body.images[0].url
                usu = {
                    id: id,
                    sexo: (info.id_sex == 1) ? "Hombre" : "mujer",
                    carrera: carr,
                    semestre: info.semestre,
                    twitter: (info.twitter == null) ? "no hay twitter" : usuario.twitter,
                    instagram: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    facebook: (info.instagram == null) ? "no hay instagram" : usuario.twitter,
                    nombre: info.name_usu,
                    descripcion: info.desc_usu,
                    foto: img

                }
                res.render('Usuario/perfilUsu(actualizado).html', { usuario: usu })
            })

        })
})

module.exports = router;