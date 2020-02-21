const Company = require("../../models/Company");
const { getMetrics } = require("../resolvers/Property");
async function getByID(id) {
  try {
    const company = await Company.findById({
      _id: id
    });

    return company;
  } catch (e) {
    throw new Error(e.message);
  }
}

function addCompany(name) {
  try {
    const company = new Company({
      name
    });
    company.save();
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getDashboardMetrics() {
  try {
    await getMetrics();
    return Company.find({});
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  getByID,
  addCompany,
  getDashboardMetrics
};
