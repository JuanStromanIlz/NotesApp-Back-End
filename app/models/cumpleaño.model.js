const mongoose = require("mongoose");

module.exports.cumpleañosSchema = new mongoose.Schema(
  {
    date: String,
    schedule: String,
    // buyer: user._id,
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

module.exports.cumpleañoModel =  mongoose.model("cumpleaños", this.cumpleañosSchema);
