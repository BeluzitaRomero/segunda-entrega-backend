const ContainerMongoDB = require("../../containers/containerMongoDB");
const productSchema = require("../models/product.model.js");

class DaoProductsMongoDB extends ContainerMongoDB {
  constructor() {
    super("products", productSchema);
  }
}

module.exports = DaoProductsMongoDB;
