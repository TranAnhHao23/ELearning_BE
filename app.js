const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const bodyParse = require('body-parser')
const cors = require('cors')
const e = require("express");

app.use(cors());
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

app.post('/send-email', (req, res) => {
    const {name, email, subject, body} = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'trananhhaonuce@gmail.com',
            pass: 'srmaujczlxhbvtpr'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOption = {
        from: `${name} <${email}>`,
        to: 'neu.elearningvn@gmail.com',
        subject: subject,
        text: body
    }

    transporter.sendMail(mailOption, (error, info) => {
        console.log("email sending")
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email')
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Chúng tôi đã tiếp nhận thông tin. Chúng tôi sẽ liên lạc với bạn trong giây lát')
        }
    })
})

app.get('/healthcheck', (req, res) => {
    res.send('Successfully')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})


