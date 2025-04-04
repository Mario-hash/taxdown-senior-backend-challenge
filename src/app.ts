import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json'; // Ajusta la ruta según tu estructura
import { initCustomerRouter } from './adapters/controllers/CustomerController';
import { ErrorHandler } from './middleware/ErrorHandler';

export async function createApp() {
  console.log('>>> [createApp] Iniciando la creación de la aplicación Express...');

  const app = express();

  // Body parser para JSON
  app.use(express.json());

  // Middleware global de logging
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('>>> [GLOBAL LOG] Incoming request:', req.method, req.url);
    next();
  });

  // Servimos el swagger.json en /swagger.json
  app.get('/swagger.json', (req: Request, res: Response) => {
    console.log('>>> [GET /swagger.json] Sirviendo swaggerDocument...');
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  // 1) Montar los assets de Swagger UI en /docs-serve
  console.log('>>> [createApp] Montando swaggerUi.serve en /docs-serve...');
  app.use('/docs-serve', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
    console.log('>>> [MIDDLEWARE /docs-serve] Sirviendo assets estáticos de Swagger UI:', req.url);
    next();
  });

  // 2) Responder con un HTML manual en /docs
  //    Este HTML referencia los assets en /docs-serve y el JSON en /swagger.json
  console.log('>>> [createApp] Definiendo GET /docs para servir HTML de Swagger...');
  app.get('/docs', (req: Request, res: Response) => {
    console.log('>>> [GET /docs] Devolviendo HTML manual para Swagger UI...');
    // Si tu stage es "/dev", cambia url: '/swagger.json' => url: '/dev/swagger.json' o algo absoluto
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Swagger Documentation</title>
    <!-- El CSS de Swagger UI (en /docs-serve) -->
    <link rel="stylesheet" type="text/css" href="/docs-serve/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <!-- Scripts de Swagger UI (también en /docs-serve) -->
    <script src="/docs-serve/swagger-ui-bundle.js"></script>
    <script src="/docs-serve/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = function() {
        window.ui = SwaggerUIBundle({
          url: '/swagger.json', // Ajusta si usas stage: /dev/swagger.json
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: "StandaloneLayout"
        });
      }
    </script>
  </body>
</html>
`;
    res.send(html);
  });

  // Rutas de negocio
  console.log('>>> [createApp] Inicializando rutas de negocio...');
  const customerRouter = await initCustomerRouter();
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    console.log('>>> [MIDDLEWARE /api] Ruta de negocio invocada:', req.method, req.url);
    next();
  }, customerRouter);

  // Manejo de errores
  console.log('>>> [createApp] Montando middleware de errores...');
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('>>> [ERROR HANDLER] Error detectado:', err);
    next(err);
  });
  app.use(ErrorHandler);

  console.log('>>> [createApp] App creada con éxito. Listo para escuchar peticiones...');
  return app;
}
