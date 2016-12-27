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

// import { connections } from 'utils/graphql';

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


// FIXME: Babel can't find utils/graphql'
export const connections = (name, nodeType) => {
  const { connectionType: connection, edgeType: edge } =
    connectionDefinitions({ name, nodeType });
  return { connection, edge };
};

// Connections Definitions for the whole schema
const connectionTypes = {};

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
    if (type === 'Track') {
      return getTrack(id);
    } else if (type === 'Playlist') {
      return getPlaylist(id);
    }
    return '';
  },
  (obj) => {
    if (obj instanceof Track) {
      return TrackType;
    } else if (obj instanceof Playlist) {
      return PlaylistType;
    }
    return '1';
  }
);

const TrackType = new GraphQLObjectType({
  name: 'Track',
  description: 'Single Track from Playlist',
  fields: () => ({
    id: globalIdField('Track'),
    index: {
      type: GraphQLString,
    },
    song: {
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
  }),
  interfaces: [nodeInterface],
});

Object.assign(connectionTypes, {
  track: connections('Track', TrackType),
});

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
  }),
  interfaces: [nodeInterface],
});

const addTrackMutation = mutationWithClientMutationId({
  name: 'AddTrack',
  inputFields: {
    song: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Track Name string',
    },
    artist: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Track Artist string',
    },
    genre: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Track Genre string',
    },
    year: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Track Year int',
    },
  },
  outputFields: {
    trackEdge: {
      type: connectionTypes.track.edge,
      resolve: (node) => {
        const cursor = cursorForObjectInConnection(getTracks(), node);
        return { node, cursor };
      },
    },
  },
  mutateAndGetPayload: (track) => addTrack(track),
});

/**
 * @relay-fullstack skeleton doc
 *
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    track: {
      type: TrackType,
      resolve: () => getTracks().slice(0, 1),
    },
    playlist: {
      type: PlaylistType,
      resolve: () => getTracks().slice(0, 1),
    },
  }),
});

/**
 * @relay-fullstack skeleton doc
 *
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTrack: addTrackMutation,
    // Add your own mutations here
  }),
});

/**
 * @relay-fullstack skeleton doc
 *
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
