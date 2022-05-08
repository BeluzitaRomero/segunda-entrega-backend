const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("open", () => {
  console.log("Base de datos conectada con exito!");
});
mongoose.connection.on("error", () => {
  console.log("Error en la conexion a la base de datos");
});

class ContainerMongoDB {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      let docs = await this.collection.find();
      return docs;
    } catch (err) {
      console.log(`Error al listar: ${error}`);
    }
  }

  async getById(id) {
    try {
      const doc = await this.collection.findOne({ _id: id });
      return doc;
    } catch (error) {
      console.log(`Error: el id no existe: ${error}`);
    }
  }

  async save(product) {
    try {
      const date = new Date().toLocaleString();
      const doc = await this.collection.create({ ...product, timeStamp: date });
      return doc;
    } catch (error) {
      console.log(`Error al guardar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });
      return `Elemento eliminado`;
    } catch (error) {
      console.log(`Error al borrar, no se encuentra id: ${error}`);
    }
  }

  async delete() {
    try {
      await this.collection.deleteMany({});
      return `Vacio`;
    } catch (error) {
      console.log(`Error al borrar: ${error}`);
    }
  }

  async updateById(id, param2) {
    try {
      const doc = await this.collection.updateOne({ _id: id }, param2);
      return doc;
    } catch (error) {
      console.log(`Error al actualizar: ${error}`);
    }
  }
}

module.exports = ContainerMongoDB;

// const productsSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   price: Number,
// });

// model("product", productsSchema);
