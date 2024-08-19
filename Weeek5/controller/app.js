const express = require('express');
const path = require('path');
const { insertFormData } = require('../model/model');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to serve the main view
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Route for handling form submissions
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log("Received form data:", formData);

        const insertedId = await insertFormData(formData);
        console.log("Form submitted and data inserted:", insertedId);

        res.send('Form submitted successfully!');
    } catch (err) {
        console.error("Error handling form submission", err);
        res.status(500).send('Error submitting form');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
