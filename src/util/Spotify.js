const clientId = "50027cc8775f43fe9e658b981eee31b8";
const redirectUri = "http://localhost:3000";
let accesToken;
const Spotify = {
  getAccesToken() {
    if (accesToken) {
      return accesToken;
    }

    // check for an acces token match:
    const accesTokenMatch = window.location.href.match(/acces_token=([^&]*)/);
    const expiresInMatch = window.location.href(/expires_in=([^&]*)/);

    if (accesTokenMatch && expiresInMatch) {
      accesToken = accesTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //this clears the parameter, allowing us to grab a new acces token when it expires:
      window.setTimeout(() => (accesToken = ""), expiresIn * 1000);
      window.history.pushState("acces Token", null, "/");
      return accesToken;
    } else {
      const accesUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accesUrl;
    }
  },
  search(term) {
    const accesToken = Spotify.getAccesToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;
