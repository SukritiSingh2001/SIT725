const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;

// MongoDB connection string and details
const url = 'mongodb+srv://sukritimann30:Sukriti%40123@cluster0.6hq6h.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Sukriti';
const collectionName = 'Suk';

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for handling form submissions
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log("Received form data:", formData);

        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(formData);
        console.log("Form submitted and data inserted:", result.insertedId);

        res.send('Form submitted successfully!');
        await client.close();
    } catch (err) {
        console.error("Error handling form submission", err);
        res.status(500).send('Error submitting form');
    }
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
