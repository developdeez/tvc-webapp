const GraphQL = require("graphql");

const { GraphQLID, GraphQLNonNull, GraphQLList } = GraphQL;

const CompanyType = require("../types/Company");
const Company = require("../../models/Company");

// import the Company resolver we created
const { getByID, getDashboardMetrics } = require("../resolvers/Company");
module.exports = {
  getByID: {
    type: CompanyType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(parentValue, { id }) {
      return getByID(id);
    }
  },
  getMetrics: {
    type: new GraphQLList(CompanyType),
    resolve() {
      return Company.find({});
    }
  },
  testPull: {
    type: new GraphQLList(CompanyType),
    async resolve() {
      return await getDashboardMetrics();
    }
  }
};
