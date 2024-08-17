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
            address: "22cs2015@rgipt.ac.in",
        },
        to: "22cs2015@rgipt.ac.in",
        subject: "New Contact Form Submission",
        text: `You have received a new Registration form submission from your AICHE website.

    Name: ${req.body.name}
    Email: ${req.body.email}
    Abstract: ${req.body.abstract}`,

        html: `<p>You have received a new Registration form submission from your AICHE website.</p>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Abstract:</strong> ${req.body.abstract}</p>`,

        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path,
            },
        ],
    };
};

// Mail options for client
module.exports.mailoptionsForClient = (req, res) => {
    return {
        from: {
            name: "Nitesh Saini",
            address: "22cs2015@rgipt.ac.in",
        },
        to: req.body.email,
        subject: "Thank You for Reaching Out!",
        text: `Hello ${req.body.name},
    Thank you for reaching out us through our website. We have received your message and will get back to you as soon as possible.
    Here is a copy of your message:
    Abstract: ${req.body.abstract}
    Best regards,
    AICHE Team`,

        html: `<p>Hello ${req.body.name},</p>
        <p>Thank you for reaching out us through our website. We have received your message and will get back to you as soon as possible.</p>
        <p>Here is a copy of your message:</p>
        <p><strong>Abstract:</strong> ${req.body.abstract}</p>
        <p>Best regards,<br>AICHE Team</p>`,

        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path,
            },
        ],
    };
};
