const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const updateVersioningPlugin = require("mongoose-update-versioning");
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const PropertySchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    minlength: 2
  },
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  }
});

PropertySchema.plugin(timestamps);
PropertySchema.plugin(updateVersioningPlugin);

const Property = mongoose.model("property", PropertySchema);

module.exports = Property;
