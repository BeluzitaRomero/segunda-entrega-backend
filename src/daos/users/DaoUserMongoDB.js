const ContainerMongoDB = require("../../containers/containerMongoDB");
const userSchema = require("../models/user.model.js");

class DaoUserMongoDB extends ContainerMongoDB {
  constructor() {
    super("users", userSchema);
  }
}

module.exports = DaoUserMongoDB;
