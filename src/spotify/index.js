var SpotifyWebApi = require('spotify-web-api-node');
var access_token;
var refresh_token;
var expires_in;
const  clientId= '36a2678ae1f6460e87cb0d9615962790';
const clientSecret='904a3c001af9434f8c63992cdb27098b';

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: 'http://localhost:3000/Datos'
  });
  
 Login= spotifyApi.createAuthorizeURL(scopes);



 module.exports=Login
 

