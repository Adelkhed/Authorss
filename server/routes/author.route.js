const AuthorController = require('../controllers/author.controller');

module.exports = (app) => {
    app.get('/api', AuthorController.apiIndex);
    app.post('/authors', AuthorController.createAuthor);
    app.get('/authors', AuthorController.getAuthors);
    app.put('/authors/:id', AuthorController.updateAuthor);
    app.delete('/authors/:id', AuthorController.deleteAuthor);
}