const ContainerMongoDB = require("../../containers/containerMongoDB");

class DaoProductsMongoDB extends ContainerMongoDB {
  constructor() {
    super("products", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
    });
  }
}

module.exports = DaoProductsMongoDB;
