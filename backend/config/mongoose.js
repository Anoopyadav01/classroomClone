require("dotenv").config();
const mongoose = require("mongoose");
const uri = 'mongodb+srv://karan:test123@cluster0.khxpt.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(uri)
  .then(() => {
    console.log("successfully connected to db!");
  })
  .catch((e) => {
    console.log(e);
  });
