const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const updateVersioningPlugin = require("mongoose-update-versioning");
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const EngagementSchema = new mongoose.Schema({
  propertyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  views: {
    type: String,
    default: "0"
  },
  retweets: {
    type: String,
    default: "0"
  },
  likes: {
    type: String,
    default: "0"
  },
  comments: {
    type: String,
    default: "0"
  },
  commentPosts: {
    type: String,
    default: "0"
  }
});

EngagementSchema.plugin(timestamps);
EngagementSchema.plugin(updateVersioningPlugin);

const engagement = mongoose.model("Engagement", EngagementSchema);

module.exports = engagement;
