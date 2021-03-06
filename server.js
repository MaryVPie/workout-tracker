const express = require("express");
const mongoose = require("mongoose");
const routes = require( './routes' );

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use( routes );

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// app.use(express.static(path.join(__dirname, 'public')));

// routes
// app.use(require("./public/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
