const UserRouter = require('./UserRouter');

// chứa tất cả router API của app
const routes = (app) => {
    app.use('/api/user', UserRouter);
}

module.exports = routes;