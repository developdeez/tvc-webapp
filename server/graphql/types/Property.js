const { GraphQLDateTime } = require("graphql-iso-date");

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const EngagementType = require("./Engagement");
const Engagement = require("../../models/Engagement");
const { ObjectId } = require("mongoose").Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
const PropertyType = new GraphQLObjectType({
  name: "PropertyType",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    link: {
      type: GraphQLString
    },
    engagements: {
      type: new GraphQLList(EngagementType),
      resolve(parentValue) {
        return Engagement.find({
          propertyID: parentValue.id
        }).then(data => {
          return data;
        });
      }
    },
    lastEngagement: {
      type: EngagementType,
      resolve(parentValue) {
        return Engagement.find({
          propertyID: parentValue.id
        }).then(data => {
          return data[data.length - 1];
        });
      }
    },
    createdAt: {
      type: GraphQLDateTime
    }
  }
});

module.exports = PropertyType;
