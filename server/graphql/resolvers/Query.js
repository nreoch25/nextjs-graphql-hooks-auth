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
    const { _id, username, email } = await User.findById(req.userId);
    return {
      _id,
      username,
      email
    };
  },
  messages: combineResolvers(
    isAuthenticated,
    async (parent, args, { Message }) => {
      return await Message.find({}).populate("sender");
    }
  )
};

module.exports = Query;
