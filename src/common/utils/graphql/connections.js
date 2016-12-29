import { connectionDefinitions } from 'graphql-relay';

export const connections = ({ name, nodeType }) => {
  const { connectionType: connection, edgeType: edge } =
    connectionDefinitions({ name, nodeType });
  return { connection, edge };
};
