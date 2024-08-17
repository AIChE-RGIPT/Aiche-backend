const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "aiche@rgipt.ac.in",
        pass: "wycasbakiulukztv"
    }
});

module.exports.mailoptionsForAdmin = (req, res) => {
    return {
        from: {
            name: "AIChE-RGIPT",
            address: "aiche@rgipt.ac.in",
        },
        to: "aiche@rgipt.ac.in",
        subject: "New Contact Form Submission",
        text: `You have received a new contact form submission from your AICHE website.

        Name: ${req.body.name}
        Email: ${req.body.email}
        Subject: ${req.body.subject}
        Message: ${req.body.message}`,

        html: `<p>You have received a new contact form submission from your AICHE website.</p>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Subject:</strong> ${req.body.subject}</p>
                <p><strong>Message:</strong> ${req.body.message}</p>`
    };
};


module.exports.mailoptionsForClient = (req, res) => {
    return {
        from: {
            name: "AIChE-RGIPT",
            address: "aiche@rgipt.ac.in",
        },
        to: req.body.email,
        subject: "Thank You for Reaching Out!",
        text: `Hello ${req.body.name},
        Thank you for reaching out us through our website. We have received your message and will get back to you as soon as possible.
        Here is a copy of your message:
        Subject: ${req.body.subject}
        Message: ${req.body.message}
        Best regards,
        AICHE Team`,

        html: `<p>Hello ${req.body.name},</p>
            <p>Thank you for reaching out us through our website. We have received your message and will get back to you as soon as possible.</p>
            <p>Here is a copy of your message:</p>
            <p><strong>Subject:</strong> ${req.body.subject}</p>
            <p><strong>Message:</strong> ${req.body.message}</p>
            <p>Best regards,<br>AICHE Team</p>`
    };
};
