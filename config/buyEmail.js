const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "22cs2015@rgipt.ac.in",
        pass: "oaqlbkdoypvacnio"
    }
});

module.exports.mailoptionsForAdmin = (req, res) => {
    return {
        from: {
            name: "Nitesh Saini",
            address: '22cs2015@rgipt.ac.in'
        },
        to: '22cs2015@rgipt.ac.in',
        subject: "New Merchandise Purchase Request",
        text: `You have received a new merchandise purchase request from your AIChE website.

        Name: ${req.body.name}
        Email: ${req.body.email}
        Contact: ${req.body.contact}

        Please follow up with the client to complete the purchase process.`,

        html: `<p>You have received a new merchandise purchase request from your AIChE website.</p>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Contact:</strong> ${req.body.contact}</p>
                <p>Please follow up with the client to complete the purchase process.</p>`
    };
};



module.exports.mailoptionsForClient = (req, res) => {
    return {
        from: {
            name: "Nitesh Saini",
            address: '22cs2015@rgipt.ac.in'
        },
        to: req.body.email,
        subject: "Thank You for Your Purchase Request!",
        text: `Hello ${req.body.name},

        Thank you for your interest in purchasing AIChE merchandise from RGIPT. We have received your request and will get in touch with you shortly to finalize the details.

        Here is a summary of your request:
        Contact: ${req.body.contact}

        Best regards,
        AIChE RGIPT Team`,

        html: `<p>Hello ${req.body.name},</p>
            <p>Thank you for your interest in purchasing AIChE merchandise from RGIPT. We have received your request and will get in touch with you shortly to finalize the details.</p>
            <p>Here is a summary of your request:</p>
            <p><strong>Contact:</strong> ${req.body.contact}</p>
            <p>Best regards,<br>AIChE RGIPT Team</p>`
    };
};

