import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router';
import users_routes from './router/Users/usersRoutes';

env.config();

const app = express();
const PORT = process.env.PORT;
const corsOption = {
  origin: 'http://localhost:5173', // FE
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOption));
app.use(
  express.json({
    limit: '150mb',
  })
);

app.use(
  express.urlencoded({
    extended: 'true',
  })
);

// route
// app.use(users_routes);
router(app);

app.get('/', (req, res) => {
  res.json('Hello Dunia!');
});

app.get('*', (req, res) => {
  return res.status(404).json({
    status: false,
    message: 'Halaman tidak ditemukan',
  });
});

app
  .listen(PORT, () => {
    console.log(`

      =========================================

              COOKED IN PORT ${PORT} 😎

      =========================================
      
        `);
  })
  .on('error', (err) => {
    console.error(`Error starting server: ${err.message}`);
  });
