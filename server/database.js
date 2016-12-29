/* TODO: implement localStorage support */
import faker from 'faker';
import uuid from 'uuid';

import assign from 'lodash/assign';
import map from 'lodash/map';
import eq from 'lodash/eq';
import find from 'lodash/find';
import remove from 'lodash/remove';

export class Track {
  id;
  name;
  artist;
  genre;
  year;

  constructor(id, index, song, artist, genre, year) {
    assign(this, { id, index, song, artist, genre, year });
  }
}

export class Playlist {
  id;
  name;
  tracks;

  constructor(id, name, tracks) {
    assign(this, { id, name, tracks });
  }
}

// export class Artist {
//   id;
//   name;
//
//   constructor(id, name) {
//     assign(this, { id, name });
//   }
// }

/* Utils functions. TODO: replace to utils */
const randomYear = (min, max) => Math.floor((Math.random() * (max - min)) + min).toString();
const createArray = (size) => new Array(size);
const byId = (id) => ({ id: lookupId }) => eq(lookupId, id);

/* Initial loaded Tracks if needed */
const tracks = map(createArray(100), () => new Track(
  uuid(),
  uuid(),
  faker.name.findName(),
  faker.name.findName(),
  faker.address.city(),
  randomYear(1990, 2016)
));
console.log('tracks: ', tracks);

/* Initial loaded Tracks if needed */
const playlists = [
  new Playlist(uuid(), faker.name.findName(), tracks),
  new Playlist(uuid(), faker.name.findName(), tracks),
];


/* Database simulation for Tracks */
export const getTracks = () => tracks;
export const removeTrack = (id) => remove(tracks, byId(id));
export const getTrack = (id) => find(tracks, byId(id)) || null;
export const addTrack = ({ song, artist, genre, year }) => {
  // immutable will reduce function compexity
  const nextTrack = new Track(uuid(), uuid(), song, artist, genre, year);
  tracks.push(nextTrack);
  return nextTrack;
};

/* Database simulation for Playlists */
export const getPlaylists = () => playlists;
export const removePlaylist = (id) => remove(playlists, byId(id));
export const getPlaylist = (id) => find(playlists, byId(id)) || null;
export const addPlaylist = ({ name, tracks: playlistTracks }) => {
  const nextPlaylist = new Playlist(uuid(), name, playlistTracks);
  playlists.push(nextPlaylist);
  return nextPlaylist;
};
