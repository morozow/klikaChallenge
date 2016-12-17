/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection,
} from 'graphql-relay';

import {
  Track,
  addTrack,
  removeTrack,
  getTrack,
  getTracks,
  Playlist,
  addPlaylist,
  removePlaylist,
  getPlaylist,
  getPlaylists,
} from './database';

/**
 * @relay-fullstack skeleton doc
 *
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Track': return getTrack(id);
      case 'Playlist': return getPlaylist(id);
      default: return null;
    }
  },
  (entity) => {
    switch (entity.constructor) {
      case Track: return TrackType;
      case Playlist: return PlaylistType;
      default: return null;
    }
  }
);

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'Playlist consists of Tracks',
  fields: () => ({
    id: globalIdField('Playlist'),
    name: {
      type: GraphQLString,
      description: 'Playlist name',
    },
    tracks: {
      type: connectionTypes.track.connection,
      description: 'Tracks in Playlist',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getTracks(), args),
    },
    interfaces: [nodeInterface],
  }),
});

const TrackType = new GraphQLObjectType({
  name: 'Track',
  description: 'Single Track from Playlist',
  fields: () => ({
    id: globalIdField('Track'),
    name: {
      type: GraphQLString,
      description: 'Name of Track',
    },
    artist: {
      type: GraphQLString,
      description: 'Artists playing Track',
    },
    genre: {
      type: GraphQLString,
      description: 'Track genre',
    },
    year: {
      type: GraphQLInt,
      description: 'Year of Track creating',
    },
    interfaces: [nodeInterface],
  }),
});

// @utils/graphql
const connections = ({ name, nodeType }) => {
  const { connectionType: connection, edgeType: edge } =
    connectionDefinitions({ name, nodeType });
  return { connection, edge };
};

// Connections Definitions for the whole schema
const connectionTypes = {
  track: connections('Track', TrackType),
};
