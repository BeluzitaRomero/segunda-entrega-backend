const ContainerMongoDB = require("../../containers/containerMongoDB");
const cartSchema = require("../models/cart.model");

class DaoCartMongoDB extends ContainerMongoDB {
  constructor() {
    super("carts", cartSchema);
  }
}

module.exports = DaoCartMongoDB;
