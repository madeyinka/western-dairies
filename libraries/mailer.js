const nodemailer = require('nodemailer')
const _config = require('./../config/app.json')
require('dotenv').config()

exports.sendMail = async (options) => {
    //set up transporter options
    const transporter = nodemailer.createTransport(_config.transport_options)
    const mailOptions = {
        from: `${options.name} <${options.email}>`,
        to: process.env.ADMIN_EMAIL,
        subject:`MESSAGE SUBJECT - ${options.subject}`,
        html: options.message
    }
    await transporter.sendMail(mailOptions)
}
