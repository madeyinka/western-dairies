const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

//express middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./routes'))
app.use('/', express.static(__dirname+'/views'))

app.listen(process.env.PORT, () => {
    console.log(`App is running at http://localhost:${process.env.PORT}`)
})