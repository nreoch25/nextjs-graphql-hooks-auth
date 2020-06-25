const bcrypt = require("bcrypt");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("../middleware");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, passwordResetEmail } = require("../../utils/mail");
const createToken = require("../../utils/createToken");

const Mutation = {
  signupUser: async (root, { username, email, password, passwordConfirm }, { User, res }) => {
    const user = await User.findOne({ username });
    email = email.toLowerCase();
    if (user) {
      throw new Error("User already exists");
    }
    // check if passwords match
    if (password !== passwordConfirm) {
      throw new Error("Your passwords don't match");
    }
    const newUser = await new User({
      username,
      email,
      password,
    }).save();

    const token = createToken(newUser, process.env.JWT_SECRET);
    // set the jwt as a cookie on the response
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
    });

    return { token };
  },
  signinUser: async (root, { email, password }, { User, res }) => {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No user found for email ${email}`);
    }
    // validate password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    const token = createToken(user, process.env.JWT_SECRET);
    // set the jwt as a cookie on the response
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
    });
    return {
      token,
    };
  },
  signoutUser: async (root, args, { res }) => {
    res.clearCookie("token", { domain: process.env.DOMAIN });
    return { message: "Come back soon" };
  },
  requestReset: async (root, { email }, { User, res }) => {
    // check if there is a user with that email
    email = email.toLowerCase();
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // set a reset token and expiry on that user
    const randomBytesPromise = promisify(randomBytes);
    const resetToken = (await randomBytesPromise(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 36000000; // 1 hour from now
    // update user with resetToken and resetTokenExpiry
    await User.updateOne(
      { email },
      {
        resetToken,
        resetTokenExpiry,
      }
    );

    const passwordResetUrl =
      process.env.NODE_ENV === "development"
        ? `http://${process.env.CLIENT_URI}/reset?resetToken=${resetToken}`
        : `https://${process.env.CLIENT_URI}/reset?resetToken=${resetToken}`;
    // send an email with the reset token
    await transport.sendMail({
      from: "nreoch15@icloud.com",
      to: user.email,
      subject: "Your Password Reset Token",
      html: passwordResetEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${passwordResetUrl}">Click Here to Reset</a>`),
    });
    return { message: "Thanks" };
  },
  resetPassword: async (root, { password, passwordConfirm, resetToken }, { User, res }) => {
    // check if passwords match
    if (password !== passwordConfirm) {
      throw new Error("Your passwords don't match");
    }
    // check if the reset token is legit
    // check if it is expired
    const expiryCheck = Date.now() - 3600000;
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: expiryCheck },
    });
    if (!user) {
      throw new Error("This token is either invalid or expired");
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the new password to the user and remove old reset token
    // findOneAndUpdate will return the user to be returned
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    );
    // generate a JWT
    const token = createToken(updatedUser, process.env.JWT_SECRET);
    // set the JWT cookie
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
    });
    return updatedUser;
  },
  postMessage: combineResolvers(
    isAuthenticated,
    async (parent, { text }, { Message, req, pubsub }) => {
      const newMessage = new Message({
        text,
        sender: req.userId,
      });
      const message = await newMessage.save();
      const populatedMessage = await message.populate("sender").execPopulate();
      pubsub.publish("message-added", { newMessage: populatedMessage });
      return populatedMessage;
    }
  ),
};

module.exports = Mutation;
