const registration = require("../model/registration.js");
const { mailoptionsForClient, mailoptionsForAdmin, transporter } = require("../config/registrationEmail.js");

const registrationInfo = async (req, res) => {
    try {
        const { name, email, abstract } = req.body;
        const CV = req.file ? req.file.filename : '';

        // Validate required fields
        if (!name || !email || !abstract) {
            return res.status(400).send("Missing required fields");
        }

        // Create a new registration instance
        const newRegistration = new registration({
            name,
            email,
            abstract,
            CV,
        });

        // Save registration data to MongoDB
        await newRegistration.save();
        console.log("Registration information saved successfully");

        // Prepare email options
        const clientMailOptions = mailoptionsForClient(req, res);
        const adminMailOptions = mailoptionsForAdmin(req, res);

        // Function to send email
        const sendMail = async (mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully");
            } catch (error) {
                console.error("Error sending email:", error);
                throw error; // Rethrow the error to handle it in the main catch block
            }
        };

        // Send emails in parallel
        await Promise.all([
            sendMail(clientMailOptions),
            sendMail(adminMailOptions)
        ]);

        // Send response to frontend after all tasks are completed
        res.status(200).send("Registration information saved and emails sent successfully");
    } catch (error) {
        console.error("Error in registration process:", error);
        res.status(500).send(`Error in registration process: ${error.message}`);
    }
};

module.exports = registrationInfo;
