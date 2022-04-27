// let admin = require("firebase-admin");
// // const { v4: uuid4 } = require("uuid");

// var serviceAccount = require("../../db/ecommercefirebase-493fa-firebase-adminsdk-64pqq-479ff93e37.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "http//ecommerceFirebase.firebaseio.com",
// });

// const db = admin.firestore();

// class ContainerFirebase {
//   constructor(collectionName) {
//     this.collection = db.collection(collectionName);
//   }

//   async save(newElement) {
//     try {
//       //crear un documento con doc()
//       //necesitamos crear un id primero xq firebase no lo hace

//       const saved = await this.collection.add(newElement);
//       return { ...newElement, id: saved.id };
//     } catch (error) {
//       throw new Error(`Error al guardar: ${error}`);
//     }
//   }

//   async getAll() {
//     try {
//       const listResult = [];
//       const list = (await this.collection.get()).docs;
//       list.forEach((doc) => {
//         listResult.push({ id: doc.id, ...doc.data() });
//       });

//       return listResult;
//     } catch (error) {
//       throw new Error(`Error al listar todo: ${error}`);
//     }
//   }

//   async getById(id) {
//     try {
//       const doc = await this.collection.doc(id).get();
//       if (!doc.exists) {
//         throw new Error(`Error al listar producto por id: ${error}`);
//       } else {
//         const product = doc.data();
//         return { ...product, id };
//       }
//     } catch (error) {
//       throw new Error(`Error al listar producto: ${error}`);
//     }
//   }

//   async delete() {
//     const doc = await this.collection.delete();
//   }

//   async deleteById(id) {
//     try {
//       const doc = await this.collection.doc(id);
//       if (doc.exists) {
//         await doc.delete();
//         return `El producto ha sido eliminado`;
//       } else {
//         return `El producto no existe`;
//       }
//     } catch (error) {
//       throw new Error(`Error al borrar: ${error}`);
//     }
//   }
// }

// module.exports = ContainerFirebase;
