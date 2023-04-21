const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    schema: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)
