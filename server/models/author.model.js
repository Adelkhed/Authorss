const mongoose = require('mongoose');

const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be longer than 3 characters']
    }
},{timestamps:true});

const Author = mongoose.model('Authors', AuthorsSchema);
module.exports = Author;