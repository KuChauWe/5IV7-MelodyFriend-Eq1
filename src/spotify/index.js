var SpotifyWebApi = require('spotify-web-api-node');
var access_token;
var refresh_token;
var expires_in;
const  clientId= '45a021d73c2949abbf7926a87c1a4221';
const clientSecret='13e5e661875540ec8f87f1d60665938d';

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
    redirectUri: 'http://localhost:3000/entrada'
  });
  
 Login= spotifyApi.createAuthorizeURL(scopes);


module.exports=spotifyApi
 module.exports.Login=Login
 

