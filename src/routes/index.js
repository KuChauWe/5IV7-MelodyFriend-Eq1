const express = require('express');
const router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

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
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    spotifyApi = new SpotifyWebApi
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
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
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