const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("../middleware");

const Query = {
  users: combineResolvers(isAuthenticated, async (parent, args, { User }) => {
    return await User.find();
  }),
  me: async (parent, args, { User, req }) => {
    if (!req.userId) {
      return null;
    }
    console.log("ME QUERY", req.userId);
    const { _id, username, email } = await User.findById(req.userId);
    console.log("CURRENT USER", { _id, username, email });
    return {
      _id,
      username,
      email,
    };
  },
  messages: combineResolvers(isAuthenticated, async (parent, args, { Message }) => {
    return await Message.find({}).populate("sender");
  }),
};

module.exports = Query;
