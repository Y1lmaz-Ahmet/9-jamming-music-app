const clientId = "50027cc8775f43fe9e658b981eee31b8";
const redirectUri = "http://localhost:3000";
let accesToken;
const Spotify = {
  getAccesToken() {
    if (accesToken) {
      return accesToken;
    }

    // check for an acces token match:
    const accesTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

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
  async search(term) {
    const accesToken = Spotify.getAccesToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );
    const jsonResponse = await response.json();
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
  },

  savePlayList(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accesToken = Spotify.getAccesToken();
    const headers = { Authorization: `Bearer ${accesToken}` };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/{user_id}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;
