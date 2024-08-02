const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.post('/submit-form', (req, res) => {
    const { firstName, middleName, lastName, email, feedback } = req.body;
    const responseMessage = `Thank you, ${firstName} ${middleName} ${lastName}! We have received your feedback.`;

    // For simplicity, we'll just log the feedback to the console
    console.log(`First Name: ${firstName}, Middle Name: ${middleName}, Last Name: ${lastName}, Email: ${email}, Feedback: ${feedback}`);

    // Send response
    res.send(`<script>alert("${responseMessage}"); window.location.href="/";</script>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
