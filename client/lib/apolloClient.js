import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import fetch from "isomorphic-unfetch";
import config from "../config";

const endpoint = process.browser ? config.clientEndpoint : config.serverEndpoint;
const wsEndpoint = config.wsEndpoint;

export default function createApolloClient(initialState, headers) {
  console.log("HEADERS", headers);
  const authLink = new ApolloLink((operation, forward) => {
    const token = process.browser ? localStorage.getItem("token") : null;
    operation.setContext({
      fetchOptions: {
        credentials: "include",
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        cookie: headers && headers.cookie,
      },
    });
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: endpoint,
    fetch,
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: wsEndpoint,
        options: {
          reconnect: true,
          connectionParams: () => {
            const token = localStorage.getItem("token");
            if (token) {
              return { authToken: token };
            }
            return {};
          },
        },
      })
    : () => {
        console.log("SSR");
      };

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription" && process.browser;
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache().restore(initialState),
    ssrMode: !process.browser,
    connectToDevTools: true,
  });
}
