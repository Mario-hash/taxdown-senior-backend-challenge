import express from 'express';
import customerRouter from './adapters/controllers/CustomerController';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', customerRouter);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});