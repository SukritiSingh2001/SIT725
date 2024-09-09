const { MongoClient } = require('mongodb');
const databaseURI = "mongodb+srv://s224141207:Aman%407486@cluster0.5shbivq.mongodb.net/";

let contactCollection;

async function connectToDatabase() {
    const client = new MongoClient(databaseURI);
    try {
        await client.connect();
        contactCollection = client.db("test").collection('contactUs');
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
}

function getContacts(callback) {
    contactCollection.find({}).toArray((err, results) => {
        if (err) {
            console.error("Failed to retrieve contacts", err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

function insertContact(contact, callback) {
    contactCollection.insertOne(contact, (err, response) => {
        if (err) {
            console.error("Failed to add contact", err);
            callback(err, null);
        } else {
            callback(null, response);
        }
    });
}

module.exports = {
    connectToDatabase,
    getContacts,
    insertContact
};
