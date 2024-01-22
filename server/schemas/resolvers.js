const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get a single user by either their id or their username
    getUser: async (_, { id, username }) => {
      const foundUser = await User.findOne({
        $or: [{ _id: id }, { username: username }],
      });

      if (!foundUser) {
        throw new Error('Cannot find a user with this id or username!');
      }

      return foundUser;
    },
  },

  Mutation: {
    // Create a user, sign a token, and send it back
    createUser: async (_, { input }) => {
      const user = await User.create(input);

      if (!user) {
        throw new Error('Something went wrong during user creation!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Login a user, sign a token, and send it back
    loginUser: async (_, { input }) => {
      const user = await User.findOne({
        $or: [{ username: input.username }, { email: input.email }],
      });

      if (!user) {
        throw new Error("Can't find this user!");
      }

      const correctPw = await user.isCorrectPassword(input.password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Save a book to a user's `savedBooks` field
    saveBook: async (_, { input }, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },

    // Remove a book from `savedBooks`
    deleteBook: async (_, { bookId }, { user }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;