const mongoose = require("mongoose");
// mongodb+srv://trello:trello@trello-demo.pkoja.mongodb.net/cards
mongoose.connect(
  "mongodb+srv://trello:trello@trello-demo.pkoja.mongodb.net/cards?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Connected..!");
    else
      console.log(
        "Error while Connecting." + JSON.stringify(err, undefined, 2)
      );
  }
);
