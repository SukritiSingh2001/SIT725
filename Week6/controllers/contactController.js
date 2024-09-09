const Contact = require('../models/contactModel');

const retrieveContacts = (req, res) => {
    Contact.getAllContacts((err, contactList) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                code: 500,
                error: 'Unable to retrieve contacts from the database.',
            });
        }
        return res.status(200).json({
            status: 'success',
            code: 200,
            contacts: contactList,
            message: 'Contacts retrieved successfully.',
        });
    });
};

const addContact = (req, res) => {
    const contactData = req.body;
    Contact.postContact(contactData, (err, createdContact) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                code: 500,
                error: 'Failed to save contact to the database.',
            });
        }
        return res.status(201).json({
            status: 'success',
            code: 201,
            contact: createdContact,
            message: 'Contact added successfully.',
        });
    });
};

module.exports = {
    retrieveContacts,
    addContact,
};
