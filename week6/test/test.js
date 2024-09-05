import { expect } from "chai";
import axios from 'axios';

describe("Contact Us Tests", function () {
    const url = "http://localhost:3000/api/contactUs";

    // Test Case 1: Error for invalid email format
    it("returns error 400 for invalid email format", async function () {
        const invalidEmailContact = {
            name: "Invalid Email",
            email: "invalid-email-format",
            phone: "1234567890",
            message: "Test message with invalid email"
        };

        try {
            await axios.post(url, invalidEmailContact);
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.error).to.include("Invalid email format");
        }
    });

    // Test Case 2: Error for duplicate contact entry
    it("returns error 409 for duplicate contact entry", async function () {
        const duplicateContact = {
            name: "Duplicate Entry",
            email: "duplicate@example.com",
            phone: "1234567890",
            message: "This is a duplicate entry"
        };

        await axios.post(url, duplicateContact);

        try {
            await axios.post(url, duplicateContact);
        } catch (error) {
            expect(error.response.status).to.equal(409);
            expect(error.response.data.error).to.include("Contact already exists");
        }
    });

    // Test Case 3: Response time check
    it("returns correct response time for the contact endpoint", async function () {
        const startTime = Date.now();
        await axios.get(url);
        const responseTime = Date.now() - startTime;

        expect(responseTime).to.be.below(2000); // Response time should be less than 2 seconds
    });
});
