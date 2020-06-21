import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import config from "../config";

const endpoint = process.browser ? config.clientEndpoint : config.serverEndpoint;

const wsEndpoint = config.wsEndpoint;

export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState, headers }) => {
    const authLink = new ApolloLink((operation, forward) => {
      const token = process.browser ? localStorage.getItem("token") : null;
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return forward(operation);
    });

    const httpLink = createHttpLink({
      uri: endpoint,
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

    const cache = new InMemoryCache().restore(initialState || {});

    return new ApolloClient({
      link: authLink.concat(link),
      cache,
      ssrMode: !process.browser,
      connectToDevTools: true,
    });
  }
);
