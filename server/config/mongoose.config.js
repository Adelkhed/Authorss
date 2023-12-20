const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/authorDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Unable to connect to the database", err));
