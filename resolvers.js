import { quotes, users } from "./fakedb.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

export const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by","_id firstName"),
    iquote: async (_, { by }) => await Quote.find({ by }),
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcryptjs.hash(newUser.password, 12);
      const newUsers = new User({
        ...newUser,
        password: hashedPassword,
      });
      return await newUsers.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("user dosent exists with that email");
      }
      const doMatch = await bcryptjs.compare(
        userSignin.password,
        user.password
      );
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, process.env.jwt);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw Error("You must be logged in");
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote saved successfully";
    },
  },
};
