/* TODO: implement localStorage support */
import faker from 'faker';
import uuid from 'uuid';

import assign from 'lodash-es/assign';
import map from 'lodash-es/map';
import eq from 'lodash-es/eq';
import find from 'lodash-es/find';
import remove from 'lodash-es/remove';

export class Track {
  id;
  name;
  artist;
  genre;
  year;

  constructor(id, name, artist, genre, year) {
    assign(this, { id, name, artist, genre, year });
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
  faker.name.findName(),
  faker.name.findName(),
  faker.address.city(),
  randomYear(1990, 2016)
));

/* Initial loaded Tracks if needed */
const playlists = [
  new Playlist(uuid(), faker.name.findName(), tracks),
  new Playlist(uuid(), faker.name.findName(), tracks.slice(0, 10)),
];

/* Database simulation for Tracks */
export const getTracks = () => tracks;
export const removeTrack = (id) => remove(tracks, byId(id));
export const getTrack = (id) => find(tracks, byId(id)) || null;
export const addTrack = ({ name, artist, genre, year }) => {
  // immutable will reduce function compexity
  const nextTrack = new Track(uuid(), name, artist, genre, year);
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