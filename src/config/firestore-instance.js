import {admin} from './firebase-config-admin' // Ajusta la ruta según sea necesario

export class FirestoreInstance {
  constructor(name, converter) {
    if (!admin) {
      throw new Error("Firebase admin no ha sido inicializado");
    }
    this.firestore = admin.firestore();
    this.collection = this.firestore.collection(name).withConverter(converter);
  }

  async create(path, document) {
    if (path === null) {
      const docRef = await this.collection.add(document);
      document.id = docRef.id;
    } else {
      const docRef = this.collection.doc(path);
      await docRef.set(document);
      document.id = docRef.id;
    }
    return document;
  }

  async update(path, document) {
    const docRef = this.collection.doc(path);
    await docRef.update(document);
  }

  async read(path) {
    const docRef = this.collection.doc(path);
    const docSnap = await docRef.get();
    if (!docSnap.exists) throw new Error(`Document ${path} does not exist`);
    return docSnap.data();
  }

  async readMany(...constraints) {
    const q = query(this.collection, ...constraints);
    const querySnapshot = await q.get();
    return querySnapshot.docs.map(doc => doc.data());
  }

  async delete(path) {
    const docRef = this.collection.doc(path);
    await docRef.delete();
  }
}
