import { expect } from "chai";
import axios from 'axios';

describe("Contact API Tests", function () {
    const url = "http://localhost:3000/api/contacts"; // Changed URL to match standard

    // Test case for successful contact creation
    it("should respond with status 201 when a contact is successfully created", async function () {
        const contact = {
            name: "Aman Madaan",
            email: "aman.madaan@example.com",
            phone: "1234567890",
            message: "Testing contact creation"
        };

        const response = await axios.post(url, contact);
        expect(response.status).to.equal(201);
        expect(response.data.message).to.equal("Contact has been successfully added!");
    });

    // Test case for missing data (bad request)
    it("should return status 400 if required fields are missing", async function () {
        const contactWithoutEmail = {
            name: "Aman Madaan",
            phone: "1234567890",
            message: "Testing missing email"
        };

        try {
            await axios.post(url, contactWithoutEmail);
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.errors).to.include('Email is required and cannot be empty.');
        }
    });

    // Test case for verifying inserted data
    it("should return the correct data for a newly added contact", async function () {
        const contact = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "0987654321",
            message: "Test message for validation"
        };

        const response = await axios.post(url, contact);
        const responseData = response.data;

        expect(responseData.data.name).to.equal("Jane Doe");
        expect(responseData.data.email).to.equal("jane.doe@example.com");
        expect(responseData.data.phone).to.equal("0987654321");
        expect(responseData.data.message).to.equal("Test message for validation");
    });

    // New Test Case: Verify invalid email format returns a validation error
    it("should return status 400 for an invalid email format", async function () {
        const invalidEmailContact = {
            name: "John Doe",
            email: "not-an-email",
            phone: "1111111111",
            message: "Invalid email format test"
        };

        try {
            await axios.post(url, invalidEmailContact);
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.errors).to.include('Invalid email format.');
        }
    });

    // New Test Case: Verify correct handling of empty POST request body
    it("should return status 400 when POST request body is empty", async function () {
        try {
            await axios.post(url, {});
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.errors).to.include('Name is required and cannot be empty.');
            expect(error.response.data.errors).to.include('Email is required and cannot be empty.');
            expect(error.response.data.errors).to.include('Phone number is required and cannot be empty.');
            expect(error.response.data.errors).to.include('Message is required and cannot be empty.');
        }
    });
});

describe("Contact Retrieval API Tests", function () {
    const url = "http://localhost:3000/api/contacts";

    // Test case for empty contact list
    it("should return an empty array if no contacts exist", async function () {
        const response = await axios.get(url);
        const responseBody = response.data;

        expect(response.status).to.equal(200);
        expect(responseBody.data).to.be.an('array').that.is.empty;
    });

    // Test case for correct content type
    it("should have the content-type header as application/json", async function () {
        const response = await axios.get(url);

        expect(response.headers['content-type']).to.include('application/json');
    });

    // New Test Case: Verify that contacts are returned in the correct format
    it("should return contacts with correct properties if any exist", async function () {
        // Adding a dummy contact to the database to test retrieval
        const contact = {
            name: "Alice Smith",
            email: "alice.smith@example.com",
            phone: "5551234567",
            message: "Checking contact format"
        };

        await axios.post(url, contact);

        const response = await axios.get(url);
        const contacts = response.data.data;

        if (contacts.length > 0) {
            contacts.forEach(contact => {
                expect(contact).to.have.property('name');
                expect(contact).to.have.property('email');
                expect(contact).to.have.property('phone');
                expect(contact).to.have.property('message');
            });
        }
    });
});
