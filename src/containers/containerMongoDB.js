const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

mongoose.connect(
  "mongodb+srv://belen:chiste@clustercoder.cqdn9.mongodb.net/ecommerceAtlas?retryWrites=true&w=majority"
);

class ContainerMongoDB {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      let docs = await this.collection.find();
      return docs;
    } catch (err) {
      throw new Error(`Error al listar: ${error}`);
    }
  }

  async getById(id) {
    try {
      const doc = await this.collection.findOne({ _id: id });
      return doc;
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async save(product) {
    try {
      const doc = await this.collection.create(product);
      return doc;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });
      return `Elemento eliminado`;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async delete() {
    try {
      await this.collection.deleteMany({});
      return `Vacio`;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async updateById(id, param2) {
    try {
      const doc = await this.collection.updateOne({ _id: id }, param2);
      return doc;
    } catch (err) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }
}

module.exports = ContainerMongoDB;

// mongoose.connection.on("open", () => {
//   console.log("Base de datos conectada con exito!");
// });
// mongoose.connection.on("error", () => {
//   console.log("Error en la conexion a la base de datos");
// });

// const productsSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   price: Number,
// });

// model("product", productsSchema);
