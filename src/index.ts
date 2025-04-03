import express from 'express';
//import customerRouter from './adapters/controllers/CustomerController';
import { initCustomerRouter } from './adapters/controllers/CustomerController';
import { ErrorHandler } from './middleware/ErrorHandler';

const app = express();
const PORT = 3000;

async function main() {
  app.use(express.json());

  const customerRouter = await initCustomerRouter();
  app.use('/api', customerRouter);

  app.use(ErrorHandler);

  app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch(err => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});