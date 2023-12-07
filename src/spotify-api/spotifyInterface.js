/*import spotifyKeys from './secret-keys.js';

var client_id = spotifyKeys.clientID;
var redirect_uri = 'http://localhost:3000/';


class SpotifyInterface {
    constructor() {
        this.state = this.generateRandomString(16);
    }


    generateRandomString = (length) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
        for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };


    authenticate = () => {
        localStorage.setItem('stateKey', this.state);
        var scope = 'user-read-private user-read-email';
        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(this.state);


    }
}

export default new SpotifyInterface();
*/