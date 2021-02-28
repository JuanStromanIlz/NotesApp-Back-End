const mongoose = require("mongoose");

module.exports.eventsSchema = new mongoose.Schema(
  {
    date: String,
    schedule: String,
    buyer: String,
    sonNames: String,
    amount: Number,
    obs: String
  },
  { timestamps: true }
)
.index({
  date: "text",
  schedule: "text",
  buyer: "text",
  sonNames: "text"
});

module.exports.eventModel =  mongoose.model("events", this.eventsSchema);
