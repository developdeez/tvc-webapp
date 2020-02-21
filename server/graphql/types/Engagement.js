const { GraphQLDateTime } = require("graphql-iso-date");

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const { ObjectId } = require("mongoose").Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
const EngagementType = new GraphQLObjectType({
  name: "EngagementType",
  fields: {
    id: {
      type: GraphQLID
    },
    propertyID: {
      type: GraphQLID
    },
    views: {
      type: GraphQLString
    },
    retweets: {
      type: GraphQLString
    },
    likes: {
      type: GraphQLString
    },
    comments: {
      type: GraphQLString
    },
    commentPosts: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLDateTime
    }
  }
});

module.exports = EngagementType;
