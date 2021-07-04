const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const mailer = require('./../libraries/mailer')
const { emailTemplate } = require('./../views/templates/contact')

//mailer route
router.post('/sendmail', async (req, res) => {
 
        var error = []
        if(!req.body.name)error.push('Provide Name')
        if(!req.body.email)error.push('Provide Email')
        if(!req.body.subject)error.push('Subject cannot be empty')
        if(!req.body.message)error.push('Leave a message')

        if (error.length == 0) {
            mailOption = {name:req.body.name,email:req.body.email,subject:req.body.subject, message:req.body.message}
            mailer.sendMail(mailOption, (msg) => {
                if (msg) return res.status(200).json({ type: 'successs'})
                else return res.status(500).json({ type: 'error'})
            })
        }

})

module.exports = router