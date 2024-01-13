const mongoose = require('mongoose');

const archiveSchema = mongoose.Schema({    
    role: String,
    parts: String
})

module.exports = mongoose.model('Model', archiveSchema);