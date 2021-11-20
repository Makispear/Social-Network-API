// EXPRESS 
    const express = require('express')
    const app = express()
    const PORT = process.env.PORT || 3001
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

// MONGOOSE 
    const mongoose = require('mongoose')

    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Network-Api', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () =>
    console.log('Connected to MongoDB Endpoint')
    );

    mongoose.connection.on('error', (err) =>
    console.log(`MONGOOSE DISCONNECTED ERROR: ${err}`)
    );

    mongoose.set('debug', true)

// FILES
app.use(require('./routes'));


// Server Listen 
app.listen(PORT, () => {
    console.log((`Connected on localhost:${PORT}`))
})