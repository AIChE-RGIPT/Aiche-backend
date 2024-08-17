const buy = require("../model/buy.js");
const { mailoptionsForClient, mailoptionsForAdmin, transporter } = require("../config/buyEmail.js");

const buyInfo = (req, res) => {
    let { name, email, contact } = req.body;
    let newBuy = new buy({
        name: name,
        email: email,
        contact: contact,
    });

    newBuy.save()
        .then(() => {
            console.log("Purchase information saved successfully");
            res.status(200).send("Purchase information saved successfully");
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

module.exports = buyInfo;
