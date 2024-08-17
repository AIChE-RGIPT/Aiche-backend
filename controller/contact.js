const contact = require("../model/contact.js");
const {mailoptionsForClient,mailoptionsForAdmin, transporter } = require("../config/contactEmail.js");

const contactInfo = (req, res) => {
    let { name, email, subject, message } = req.body;
    let newContact = new contact({
        name: name,
        email: email,
        subject: subject,
        message: message
    });

    newContact.save()
        .then(() => {
            console.log("Contact information saved successfully");
            res.status(200).send("Contact information saved successfully");
            const clientMailOptions = mailoptionsForClient(req, res);
            const adminMailOptions = mailoptionsForAdmin(req, res);

            const sendMail = (mailOptions) => {
                return transporter.sendMail(mailOptions)
                    .then(() => {
                        console.log("Email sent successfully");
                    })
                    .catch((error) => {
                        console.error("Error sending email:", error);
                    });
            };

            return Promise.all([
                sendMail(clientMailOptions),
                sendMail(adminMailOptions)
            ]);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error saving contact information");
        });
};

module.exports = contactInfo;
