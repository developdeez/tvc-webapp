const GraphQL = require("graphql");

const { GraphQLID, GraphQLNonNull, GraphQLList } = GraphQL;

const PropertyType = require("../types/Property");

// import the Property resolver we created
const { getByID, getMetrics } = require("../resolvers/Property");
module.exports = {
  getByID: {
    type: PropertyType,
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
    type: new GraphQLList(PropertyType),
    async resolve() {
      const metrics = await getMetrics();
      return metrics;
    }
  }
};
