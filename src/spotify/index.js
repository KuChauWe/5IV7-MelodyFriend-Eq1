var SpotifyWebApi = require('spotify-web-api-node');
var access_token;
var refresh_token;
var expires_in;
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
    clientId: '705f7d21e32c4d809fa00b8ae36268da',
    clientSecret: 'd8aed96335e04ff199bbd8bb3971575c',
    redirectUri: 'http://localhost:3000/Datos'
  });
 Login= spotifyApi.createAuthorizeURL(scopes)
 module.exports =Login;
  