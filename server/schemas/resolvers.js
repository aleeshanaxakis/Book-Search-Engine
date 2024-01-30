const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get a single user by either their id or their username
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({_id: context.user._id})
        return user
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Create a user, sign a token, and send it back
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password});
      const token = signToken(user);
      return { token, user };
    },

    // Login a user, sign a token, and send it back
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    // Save a book to a user's `savedBooks` field
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id },
          { $addToSet: { savedBooks: input}},
          { new: trye, runValidators: true }
        );
        return updatedUser
      }
      throw AuthenticationError;

    }, 
      removeBook: async ( parent, { bookId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            {_id: context.user.id},
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          )
        }
    },
  },
};

module.exports = resolvers;