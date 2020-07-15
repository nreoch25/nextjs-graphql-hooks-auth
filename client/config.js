const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    clientEndpoint: "http://localhost/graphql",
    serverEndpoint: "http://nginx/graphql",
    wsEndpoint: "ws://localhost/graphql",
  },
  production: {
    clientEndpoint: "https://auth2.developal.ca/graphql",
    serverEndpoint: "https://auth2.developal.ca/graphql",
    wsEndpoint: "wss://auth2.developal.ca/graphql",
  },
}[env];

export default config;
