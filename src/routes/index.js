const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const router = express.Router();
const Login = require('../spotify');


router.get('/', (req, res) => {
  res.render('iniciarSesion.html');
  
});
router.get('/login', (req, res) => {
    res.redirect(Login);
  });
router.get('/editperfil', (req, res) => {
    res.render('editPerfilUsu.html');
});
router.get('/personas', (req, res) => {
    res.render('encontrarPersonas.html');
});
router.get('/musica', (req, res) => {
    res.render('encuentraMusica.html');
});
router.get('/datos', (req, res) => { 
    var spotifyApi = new SpotifyWebApi({
        clientId: '36a2678ae1f6460e87cb0d9615962790',
        clientSecret: '904a3c001af9434f8c63992cdb27098b',
        redirectUri: 'http://localhost:3000/Datos'
      });
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
     
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
        (async () => {
          const me = await spotifyApi.getMe();
          console.log(me);
        
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.render('entradaDatos.html',{name:me.body.display_name});
     
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
     
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
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
    res.render('index.html');
  });
router.get('/foto', (req, res) => {
    res.render('seleccionarFoto.html');
});
router.get('/terminos', (req, res) => {
    res.render('terminosyCondiciones.html');
});
router.get('/terminos(aceptados)', (req, res) => {
    res.render('terminosyCondiciones(Aceptados).html');
});
router.get('/estadisticas', (req, res) => {
    res.render('verEstadisticas.html');
});
router.get('/verperfil', (req, res) => {
    res.render('verPerfilUsu.html');
});
  router.get('/verplaylist', (req, res) => {
    res.render('vistaPlaylist.html');
});
 



module.exports = router;