const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const updateVersioningPlugin = require("mongoose-update-versioning");
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

CompanySchema.plugin(timestamps);
CompanySchema.plugin(updateVersioningPlugin);

const Company = mongoose.model("company", CompanySchema);

module.exports = Company;
