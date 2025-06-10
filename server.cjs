const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
    static: './dist'
});

// Configuration CORS pour Vercel
server.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour logger les requêtes
server.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next();
});

server.use(middlewares);

// Routes personnalisées
server.use('/api', router);
server.use(router);

// Pour Vercel serverless
module.exports = server;

// Pour développement local
if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(`JSON Server is running on port ${PORT}`);
    });
}
