const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    clientEndpoint: "http://localhost/graphql",
    serverEndpoint: "http://nginx/graphql",
    wsEndpoint: "ws://localhost/graphql",
  },
  production: {
    clientEndpoint: "https://auth.developal.ca/graphql",
    serverEndpoint: "https://auth.developal.ca/graphql",
    wsEndpoint: "wss://auth.developal.ca/graphql",
  },
}[env];

export default config;
