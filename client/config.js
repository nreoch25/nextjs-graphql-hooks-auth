const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    clientEndpoint: "http://localhost/graphql",
    serverEndpoint: "http://nginx/graphql",
    wsEndpoint: "ws://localhost/graphql"
  },
  production: {
    clientEndpoint: "http://localhost/graphql",
    serverEndpoint: "http://nginx/graphql",
    wsEndpoint: "ws://localhost/graphql"
  }
}[env];

export default config;
