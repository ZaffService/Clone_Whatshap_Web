const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Créer le serveur
const server = jsonServer.create();

// Chemin vers db.json
const dbPath = path.join(__dirname, 'db.json');

// Vérifier si db.json existe, sinon le créer
if (!fs.existsSync(dbPath)) {
    const defaultDb = {
      chats: [
        {
          id: 1,
          name: "Zafe",
          phone: "777867740",
          avatar: "https://i.pravatar.cc/150?img=1",
          lastSeen: "en ligne",
          isOnline: true,
          messages: [
            {
              id: 1,
              text: "Salut ! Comment ça va ?",
              timestamp: new Date().toISOString(),
              sender: "Zafe",
              type: "received"
            }
          ],
          unreadCount: 1
        },
        {
          id: 2,
          name: "Abdallah",
          phone: "778123456",
          avatar: "https://i.pravatar.cc/150?img=2",
          lastSeen: "il y a 5 min",
          isOnline: false,
          messages: [
            {
              id: 1,
              text: "Hey ! Tu es là ?",
              timestamp: new Date(Date.now() - 300000).toISOString(),
              sender: "Abdallah",
              type: "received"
            }
          ],
          unreadCount: 1
        }
      ],
      notifications: [],
      calls: [],
      status: []
    };
  
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2));
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Configuration CORS
server.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware pour logger les requêtes
server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

server.use(middlewares);
server.use('/api', router);

// Route de test
server.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionne !', timestamp: new Date().toISOString() });
});

// Pour Vercel
module.exports = server;

// Pour développement local
if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(`JSON Server is running on port ${PORT}`);
    });
}
