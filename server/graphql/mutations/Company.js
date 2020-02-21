const GraphQL = require("graphql");

const { GraphQLString, GraphQLBoolean } = GraphQL;

module.exports = {
  addCompany: {
    type: GraphQLBoolean,
    args: {
      name: {
        type: GraphQLString
      }
    },
    resolve(parentValue, { name }) {
      const CompanyResolver = require("../resolvers/Company");
      return CompanyResolver.addCompany(name);
    }
  }
};
