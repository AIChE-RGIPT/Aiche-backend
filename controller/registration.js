const registration = require("../model/registration.js");
const { mailoptionsForClient, mailoptionsForAdmin, transporter } = require("../config/registrationEmail.js");


const registrationInfo = (req, res) => {
    let { name, email, abstract } = req.body;
    let CV = req.file ? req.file.filename : '';

    let newRegistration = new registration({
        name: name,
        email: email,
        abstract: abstract,
        CV: CV,
    });

    newRegistration.save()
        .then(() => {
            console.log("Registration information saved successfully");
            res.status(200).send("Registration information saved successfully");
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
            res.status(500).send("Error saving registration information");
        });
};

module.exports = registrationInfo;
