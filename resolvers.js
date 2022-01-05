import { quotes, users } from "./fakedb.js";
import mongoose from "mongoose";
const User = mongoose.model("User");
import bcryptjs from "bcryptjs";
export const resolvers = {
  Query: {
    users: () => users,
    user: (_, { _id }) => users.find((user) => user._id == _id),
    quotes: () => quotes,
    iquote: (_, { by }) => quotes.filter((quote) => quote.by == by),
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur.id),
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
  },
};
