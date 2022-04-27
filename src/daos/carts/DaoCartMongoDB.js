const ContainerMongoDB = require("../../containers/containerMongoDB");

class DaoCartMongoDB extends ContainerMongoDB {
  constructor() {
    super("carts", {
      products: { type: [], required: true },
    });
  }
}

module.exports = DaoCartMongoDB;
