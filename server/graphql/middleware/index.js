const { skip } = require("graphql-resolvers");

const isAuthenticated = async (root, args, { req }, info) => {
  if (req.userId) {
    return skip;
  } else {
    throw new Error("Access Denied! Please login to continue");
  }
};

module.exports = {
  isAuthenticated
};
