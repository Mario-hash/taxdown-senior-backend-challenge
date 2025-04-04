import serverless from 'serverless-http';
import { createApp } from './app';

let cachedServer: serverless.Handler | ((arg0: any, arg1: any) => any);

export const main = async (event: Object, context: Object) => {
  if (!cachedServer) {
    const app = await createApp();
    cachedServer = serverless(app);
  }
  return cachedServer(event, context);
};
