const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sukritimann30:Sukriti%40123@cluster0.6hq6h.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Sukriti';
const collectionName = 'Suk';

async function connectDB() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    return { db, client };
}

async function insertFormData(formData) {
    const { db, client } = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(formData);
    await client.close();
    return result.insertedId;
}

module.exports = { insertFormData };
