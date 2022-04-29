const { Schema } = require("mongoose");

const cartSchema = new Schema({
  products: { type: [], required: true },
  timeStamp: { type: String, required: true },
});

module.exports = cartSchema;
