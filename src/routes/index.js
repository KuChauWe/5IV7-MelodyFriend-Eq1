const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();
const spotifyApi = require('../spotify/')
const base = require("../package/controlador/UserController.js");
const { createUserInBD } = require('../package/modelo/User')
const track = require("../package/controlador/PlayTrackControler");
const { format } = require('morgan');
const e = require('connect-flash');
const Playtrack = require('../package/modelo/Playtrack');
const { on } = require('nodemon');
const User = require('../package/modelo/User');

router.get('/', (req, res) => {

  res.render('iniciarSesion.html');


});
router.get('/login', (req, res) => {
  res.redirect(spotifyApi.Login);
});
router.get('/editperfil', (req, res) => {
  spotifyApi.getMe().then((data) => {
    usuario = data.body
    id = usuario.id
    foto = usuario.images[0].url
    base.getUserByID(id).then((data) => {
      Usu = data
      console.log(data);
      let perfil = {
        id: id,
        sexo: Usu.sexo_usu,
        carrera: Usu.carrera_usu,
        semestre: Usu.semestre_usu,
        twitter: (Usu.twitter == null) ? "no hay twitter" : Usu.twitter,
        instagram: (Usu.instagram == null) ? "no hay instagram" : Usu.instagram,
        nombre: Usu.nickname_usu_spoti,
        descripcion: Usu.desc_usu,
        foto: foto
      }

      res.render("editPerfilUsu.html", { perfil: perfil })
    })

  }
  )
});
router.post('/editperfil', (req, res) => {
  spotifyApi.refreshAccessToken
  spotifyApi.getMe().then((data) => {
    cambios = req.body
    console.log(cambios);

    id = data.body.id
    base.updateUser(id, 'twitter', (cambios.twitter == '') ? "No hay twiter" : cambios.twitter)

    base.updateUser(id, 'instagram', (cambios.instagram == '') ? "No hay instagram" : cambios.instagram)
    base.updateUser(id, 'id_sex', cambios.sexo)
    base.updateUser(id, 'id_semestre', cambios.semestre)
    base.updateUser(id, 'id_carr', cambios.carrera)
    base.updateUser(id, 'desc_usu', cambios.Descripcion)
    console.log("esto pasa antes o despues ");
    res.redirect("/Home")
  })
})
router.get('/personas', (req, res) => {
  res.render('encontrarPersonas.html');

});
router.get('/musica', (req, res) => {
  res.render('encuentraMusica.html', { busqueda: null });
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
      res.render('encuentraMusica.html', { busqueda: lista })
    }, function (err) {
      console.error(err);
    });
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
      const expires_in = data.body['expires_in'];
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      // console.log(data);
      (async () => {
        const me = await spotifyApi.getMe();

        req.flash('access_token', access_token);
        req.flash('refresh_token', refresh_token)
        req.flash('id_spotify', me.body.id)
        req.flash('name_spotify', me.body.display_name)
        spotifyApi.getUser(me.body.id)
          .then(function (data) {
            // console.log(me.body.images);
          }, function (err) {
            console.log('Something went wrong!', err);
          });

        //Revisa formulario por me.body.id
        //  console.log(me.body.id);
        const usairo = await base.getUserByID(me.body.id)
        //console.log(usairo);
        if (usairo == null) {
          //  console.log("ahdhidaasd");
          res.render('entradaDatos.html', { name: me.body.display_name });
        }
        res.redirect('/home')

        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];


          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })().catch(e => {
        console.error(e);
      });
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.render('errores.html', { Fallo: error });
    });



});
router.get('/Home', (req, res) => {
  // console.log(spotifyApi);

  const access_token = req.flash('access_token')
  spotifyApi.refreshAccessToken().then(
    function (data) {
      console.log('The access token has been refreshed!');

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.getMe().then(
        function (data) {
          me = data.body
          //   console.log(me);
          spotifyApi.getMyTopTracks().then(
            function (data) {
              Top = data.body.items
              /*opSong = [];
              for (var i = 0; i < Top.length; i++) {
                TopSong.push(Top[i].id)
                console.log(Top[i].id);
              }
              console.log(TopSong);
              Playtrack.updateETrack(me, TopSong)
              */
              track.getAllIDTrack().then(
                function (data) {
                  Todo = data
                  id_Todo = []
                  // console.log(Todo);
                  track.getAllIDTrack_User(me.id).then(
                    function (data) {
                      Encabezado = data
                      id_Encabezado = []

                      /*  console.log("antes de borrar", Encabezado);
                      for (var i = 0; i < id_Encabezado.length; i++) {
                        track.deleteUser_IDTrack(me, Encabezado[i].id_trac_spoty)
                      }
                      console.log("Despues de borrar", Encabezado);
                       for (var i = 0; i < Todo.length; i++) {
                         track.deleteIDTrack(Todo[i].id_trac_spoty)
                       }*/
                      // console.log(Encabezado);
                      //console.log(Todo);
                      //console.log(Encabezado);
                      /*   for (var i = 0; i < Encabezado.length; i++) {
                           id_Encabezado.push(Encabezado[i].id_trac_spoty)
                         }
                         for (var i = 0; i < Todo.length; i++) {
                           id_Todo.push(Todo[i].id_trac_spoty)
                         }
                         for (var i = 0; i < Top.length; i++) {
                           if (Top[i].id in id_Todo) {
                             if (Top[i].id in id_Todo) {
                               console.log("si esta");
                             } else {
                               track.insertUser_IDTrack(me, Top[i].id)
                             }
                           } else {
                             // track.deleteIDTrack(Top[i].id)
                             track.insertIDTrack(Top[i].id)
                             track.insertUser_IDTrack(me, Top[i].id)
                           }
                         }*/
                    }
                  )
                }
              )
              /*  */
            })




          //console.log("aqui esta las recomentaciones");
          spotifyApi.getRecommendations({
            min_energy: 0.4,
            seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
            min_popularity: 50
          })
            .then(function (data) {


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
                //console.log(song.id);
                //track.insertIDTrack(id)
                recomendaciones.push(song)
              }

              res.render('index.html', { recomendaciones: recomendaciones, nombre: me.display_name, foto: me.images[0].url });
            })
        }, function (err) {
          console.log("Something went wrong!", err);
          res.render('errores.html', { Fallo: err });
        });

    },
    function (err) {
      console.log('Could not refresh access token', err);
    }
  )
});
router.get('/foto', (req, res) => {

  res.render('seleccionarFoto.html');
});
router.get('/terminos', (req, res) => {
  //http://localhost:3000/terminos?nombre=Solis+alvarado+eduwigsh+fernando&semestre=5&carrera=2&fecha=2004-03-02&sexo=1
  const id = req.flash('id_spotify')[0]
  const namecom = req.flash('name_spotify')[0]
  nombre = req.query.nombre;
  fecha = req.query.fecha;
  carrera = req.query.carrera;
  sexo = req.query.sexo;
  semestre = req.query.semestre;

  if (carrera == 1) {
    carrera = "Tronco Común"
  }
  else if (carrera == 2) {
    carrera = "Técnico en Programación"
  }
  else if (carrera == 3) {
    carrera = "Técnico en Máquinas con Sistemas Automatizados"
  }
  else if (carrera == 4) {
    carrera = "Técnico en Sistemas Digitales"
  }
  if (sexo == 1) {
    sexo = "Masculino"
  }
  else if (carrera == 2) {
    sexo = "Femenino"
  }
  else if (carrera == 3) {
    sexo = "No Binario"
  }
  //console.log(id,namecom);

  //console.log(nombre, fecha,carrera,sexo,semestre);
  createUserInBD(id, namecom,
    nombre, sexo, fecha,
    semestre, carrera)

  res.render('terminosyCondiciones.html');

});
router.get('/terminos(aceptados)', (req, res) => {
  res.render('terminosyCondiciones(Aceptados).html');
});
router.get('/estadisticas', (req, res) => {
  res.render('verEstadisticas.html');
});
router.get('/verperfil', (req, res) => {

  id = req.query.id

  //Nombre, Descripcion Sexo,ID,carrera,semestre,red social

  base.getUserByID(id).then((Data) => {
    usuario = Data
    spotifyApi.getUser(usuario.id_usu_spoty).then((data) => {
      foto = data.body.images[0].url
      // console.log(usuario);
      let usu = {
        id: id,
        sexo: usuario.sexo_usu,
        carrera: usuario.carrera_usu,
        semestre: usuario.semestre_usu,
        twitter: (usuario.twitter == null) ? "no hay twitter" : usuario.twitter,
        instagram: (usuario.instagram == null) ? "no hay instagram" : usuario.twitter,
        nombre: usuario.nickname_usu_spoti,
        descripcion: usuario.desc_usu,
        foto: foto
      }
      //console.log(usu);
      res.render('verPerfilUsu.html', { usuario: usu });
    })
  })
});
router.get('/verplaylist', (req, res) => {
  id = "6kl9wh5F5yb2bKlOV7toWH" //req.query.id
  personas = [];
  track.getAllUser_IDTrack(id).then(
    function (data) {
      if (data[0].length == 0) {
        cero = []
        res.render('vistaPlaylist.html', { usario: cero });
      }
      // todos los id de las personas 
      //console.log(data[0]);
      ids_usuarios = data[0]
      usuarios = []
      ids_usuarios.forEach((element, index) => {

        base.getUserByID(element.id_usu_spoty).then(
          (data) => {
            usu = data
            spotifyApi.getUser(element.id_usu_spoty).then(
              (data) => {
                foto = data.body.images[0].url
                //console.log(foto);
                //console.log(usu);
                let usuario = {
                  id: usu.id_usu_spoti,
                  nombre: usu.nickname_usu_spoti,
                  descripcion: usu.desc_usu,
                  foto: foto
                }
                usuarios.push(usuario)
                if (index == (ids_usuarios.length - 1)) {
                  // console.log(usuarios);
                  res.render('vistaPlaylist.html', { usario: usuarios });
                }
              }
            )
          })
      });

    })

});
router.get('/perfil', (req, res) => {

  spotifyApi.getMe().then((data) => {
    usuario = data.body
    id = usuario.id
    foto = usuario.images[0].url
    base.getUserByID(id).then((data) => {
      Usu = data
      let perfil = {
        id: id,
        sexo: Usu.sexo_usu,
        carrera: Usu.carrera_usu,
        semestre: Usu.semestre_usu,
        twitter: (Usu.twitter == null) ? "no hay twitter" : Usu.twitter,
        instagram: (Usu.instagram == null) ? "no hay instagram" : Usu.instagram,
        nombre: Usu.nickname_usu_spoti,
        descripcion: Usu.desc_usu,
        foto: foto
      }
      res.render("perfilUsu.html", { perfil: perfil })
    })

  }
  )

})



module.exports = router;