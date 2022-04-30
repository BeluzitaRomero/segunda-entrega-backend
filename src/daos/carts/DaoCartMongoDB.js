const ContainerMongoDB = require("../../containers/containerMongoDB");
const cartSchema = require("../models/cart.model.js");

class DaoCartMongoDB extends ContainerMongoDB {
  constructor() {
    super("carts", cartSchema);
  }
}

module.exports = DaoCartMongoDB;
