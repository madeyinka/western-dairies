const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const mailer = require('./../libraries/mailer')
const { emailTemplate } = require('./../views/templates/contact')

//mailer route
router.post('/sendmail', (req, res) => {
    try {
        //get form values for mailing...
        var error = []
        if(!req.body.name)error.push('Provide Name')
        if(!req.body.email)error.push('Provide Email')
        if(!req.body.subject)error.push('Subject cannot be empty')
        if(!req.body.message)error.push('Leave a message')

        if (error.length == 0) {
            //Initiates email sending...
            const { name, email, subject, message } = req.body
            mailer.sendMail({
                name,
                email,
                subject,
                message: await emailTemplate(name, email, subject, message)
            }, (msg) => {
                if (msg)
                    return res.status(200).json({ type: 'successs'})
            })
        } else {
            return res.status(500).json({ type: 'error'})
        }
    } catch (err) {
        //console.log(err)
        return res.status(400).json({ type: err})
    }
})

module.exports = router