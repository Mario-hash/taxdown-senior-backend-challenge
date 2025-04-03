// handler.ts
import serverless from 'serverless-http';
import express, { Request, Response, NextFunction } from 'express';
import { initCustomerRouter } from './src/adapters/controllers/CustomerController';
import { ErrorHandler } from './src/middleware/ErrorHandler';

const app = express();
app.use(express.json());

// Creamos una promesa que se resuelve cuando el router está inicializado
const readyPromise = (async () => {
  const customerRouter = await initCustomerRouter();
  app.use('/api', customerRouter);
  app.use(ErrorHandler);
})();

// Middleware que espera a que readyPromise se resuelva
const ensureReady = async (req: Request, res: Response, next: NextFunction) => {
  await readyPromise;
  next();
};

// Aseguramos que todas las peticiones pasen por ensureReady
app.use(ensureReady);

// Exportamos el handler adaptado a Lambda
export const main = serverless(app);
