const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    clientEndpoint: "http://localhost:8000/graphql",
    serverEndpoint: "http://localhost:8000/graphql",
    wsEndpoint: "ws://localhost:8000/graphql",
  },
  production: {
    clientEndpoint: "https://auth2.developal/graphql",
    serverEndpoint: "https://auth2.developal/graphql",
    wsEndpoint: "wss://auth.developal/graphql",
  },
}[env];

export default config;
