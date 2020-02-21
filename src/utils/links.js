import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { apiUrl, webscoketUrl } from "../config";
const wsLink = new WebSocketLink({
  uri: webscoketUrl,
  options: {
    reconnect: true,
    lazy: true
  }
});

const httpLink = new HttpLink({
  uri: apiUrl
});

const httpLinkWithMiddleware = httpLink;
const splitlink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithMiddleware
);

export const cache = new InMemoryCache({
  dataIdFromObject: o => {
    if (o._id) return { [o.__typename]: o._id };
    else return null;
  },
  freezeResults: true
});

const stateLink = withClientState({
  cache
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
export const link = ApolloLink.from([stateLink, splitlink]);
//export const link = errorLink.concat(ApolloLink.from([stateLink, splitlink]));
