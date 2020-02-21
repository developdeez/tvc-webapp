const Property = require("../../models/Property");
const Engagement = require("../../models/Engagement");
const { fetchDetails } = require("../../puppeteer");

async function getByID(id) {
  try {
    const property = await Property.findById({
      _id: id
    });

    return property;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getAllProperties() {
  try {
    const properties = await Property.find({});

    return properties;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getMetrics() {
  try {
    const properties = await new Promise(res => {
      Property.find({}).then(propsToCheck => {
        propsToCheck.forEach(async property => {
          const engagements = await fetchDetails(property.link);
          const engagment = new Engagement({
            propertyID: property.id,
            ...engagements
          });
          engagment.save();

          res(propsToCheck);
        });
      });
    });
    return properties;
  } catch (e) {
    throw new Error(e.message);
  }
}

function addProperty(data) {
  try {
    const property = new Property(data);
    property.save();
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  getByID,
  getMetrics,
  getAllProperties,
  addProperty
};
