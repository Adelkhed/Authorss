const Author = require('../models/author.model')

module.exports.apiIndex = (req,res) => {
    res.json({msg: 'API working'})
}

module.exports.createAuthor = (req,res) => {
    Author.create(req.body)
        .then(newAuthor => res.json({author: newAuthor}))
        .catch(err => res.json({err: err.errors}))
}

module.exports.getAuthors = (req,res) => {
    Author.find()
        .then(allAuthors => res.json({author: allAuthors}))
        .catch(err => res.json({err: err}))
}

module.exports.updateAuthor = (req,res) => {
    Author.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(updatedAuthor => res.json({author: updatedAuthor}))
        .catch(err => res.json({err: err}))
}

module.exports.deleteAuthor = (req,res) => {
    Author.deleteOne({_id: req.params.id})
        .then(result => res.json({id: req.params.id}))
        .catch(err => res.json({err: err}))
}