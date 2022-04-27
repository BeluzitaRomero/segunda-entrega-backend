const ContainerFirebase = require("../../containers/ContainerFirebase");

class DaoProductsFirebase extends ContainerFirebase {
  constructor() {
    super("products");
  }
}

module.exports = DaoProductsFirebase;
