import express from 'express';
import { connectDB } from './database.js';
import router from './routes/auth_route.js';
import cookieParser from 'cookie-parser'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
connectDB();
app.use('/api/auth/', router);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});