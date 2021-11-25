var SpotifyWebApi = require('spotify-web-api-node');
var access_token;
var refresh_token;
var expires_in;
const clientId = '82eb501181b642be87bd95102510eb44';
const clientSecret = '0fc89338b2cf40c18d7a6b562f4746f5';

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
  redirectUri: 'https://melodyfriend.azurewebsites.net/entrada'
});

Login = spotifyApi.createAuthorizeURL(scopes);


module.exports = spotifyApi
module.exports.Login = Login


