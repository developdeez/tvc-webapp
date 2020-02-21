const { GraphQLDateTime } = require("graphql-iso-date");

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const PropertyType = require("./Property");
const Property = require("../../models/Property");
const { ObjectId } = require("mongoose").Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
const CompanyType = new GraphQLObjectType({
  name: "CompanyType",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parentValue) {
        return Property.find({
          companyID: parentValue.id
        }).then(data => {
          return data;
        });
      }
    },
    createdAt: {
      type: GraphQLDateTime
    }
  }
});

module.exports = CompanyType;
