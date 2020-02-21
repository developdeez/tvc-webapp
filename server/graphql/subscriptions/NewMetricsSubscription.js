// @flow
const { GraphQLList } = require("graphql");

const { pubsub } = require("../../config/pubsub");
const CompanyType = require("../types/Company");
const Company = require("../../models/Company");
const NEW_METRICS_ADDED = "NEW_METRICS_ADDED";

module.exports = {
  type: new GraphQLList(CompanyType),
  args: {},
  subscribe: () => pubsub.asyncIterator(NEW_METRICS_ADDED),
  resolve(payload) {
    return Company.find({});
  }
};
