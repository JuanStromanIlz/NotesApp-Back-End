module.exports = mongoose => {
    const Cumpleaños = mongoose.model(
      "cumpleaños",
     new mongoose.Schema(
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
    })
    );
    Cumpleaños.createIndexes();
  
    return Cumpleaños;
  };