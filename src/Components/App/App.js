import React from "react";

import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
          id: 1,
        },
        {
          name: "Tiny Dancer V2.0",
          artist: "Tim McGraw",
          album: "Love Story",
          id: 2,
        },
        {
          name: "Tiny Dancer",
          artist: "Rockabye Baby!",
          album: "Lullaby Renditions of Elton John",
          id: 3,
        },
        {
          name: "Tiny Dancer",
          artist: "The White Raven",
          album: "Tiny Dancer",
          id: 4,
        },
        {
          name: "Tiny Dancer - Live Album Version",
          artist: "Ben Folds",
          album: "Ben Folds Live",
          id: 5,
        },
      ],
      playlistName: "MyPlaylistName",
      playlistTracks: [
        {
          name: "playlistName1",
          artist: "playlistArtist1",
          album: "playlistAlbum1",
          id: 1,
        },
        {
          name: "playlistName2",
          artist: "playlistArtist2",
          album: "playlistAlbum2",
          id: 2,
        },
        {
          name: "playlistName3",
          artist: "playlistArtist3",
          album: "playlistAlbum3",
          id: 3,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    // new track :
    tracks.push(track);
    //update playlistTracks with the added new object track :
    this.setState({ playlistTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }
  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
