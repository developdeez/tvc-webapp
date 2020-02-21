const GraphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = GraphQL;

const CompanyQuery = require("./queries/Company");
const PropertyQuery = require("./queries/Property");

const CompanyMutation = require("./mutations/Company");
const PropertyMutation = require("./mutations/Property");

// import subscriptions
const NewMetricsSubscription = require("./subscriptions/NewMetricsSubscription");

// lets define our root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This is the default root query provided by the backend",
  fields: {
    //Company
    getCompanyByID: CompanyQuery.getByID,
    getDashboardMetrics: CompanyQuery.getMetrics,
    testPull: CompanyQuery.testPull,
    getMetrics: PropertyQuery.getMetrics
    //Property
    //getPropertyByID: PropertyQuery.getPropertyByID
  }
});

// lets define our root mutation
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Default mutation provided by the backend APIs",
  fields: {
    //Company
    addCompany: CompanyMutation.addCompany,
    // removeCompany: CompanyMutation.removeCompany,
    // updateCompany: CompanyMutation.updateCompany,
    // Property
    addProperty: PropertyMutation.addProperty
    // removeProperty: PropertyMutation.adminCreate,
    // updateProperty: PropertyMutation.setVerification
  }
});

const RootSubscription = new GraphQLObjectType({
  name: "RootSubscription",
  description: "Root Subscription",
  fields: {
    newMetricsSubsubscribe: NewMetricsSubscription
  }
});

// export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
});
