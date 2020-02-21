const GraphQL = require("graphql");

const { GraphQLString, GraphQLBoolean } = GraphQL;

module.exports = {
  addProperty: {
    type: GraphQLBoolean,
    args: {
      name: {
        type: GraphQLString
      },
      link: {
        type: GraphQLString
      },
      companyID: {
        type: GraphQLString
      }
    },
    resolve(parentValue, data) {
      const PropertyResolver = require("../resolvers/Property");
      return PropertyResolver.addProperty(data);
    }
  }
};
