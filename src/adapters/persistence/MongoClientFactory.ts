import { MongoClient, Db, Collection } from 'mongodb';
import { CustomerPersistence } from './dto/CustomerPersistence';

let client: MongoClient;
let mongod: any = null;

export const getMongoCollection = async (): Promise<Collection<CustomerPersistence>> => {
  if (process.env.NODE_ENV === 'test') {
    const { MongoMemoryServer } = await import('mongodb-memory-server'); 

    if (!mongod) {
      mongod = await MongoMemoryServer.create();
    }
    const uri = mongod.getUri();
    client = new MongoClient(uri);
    await client.connect();
  } else {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }
  }
  const db: Db = client.db(process.env.MONGO_DB_NAME || 'taxdown');
  return db.collection<CustomerPersistence>('customers');
};

export const closeMongoConnection = async (): Promise<void> => {
  if (client) await client.close();
  if (mongod) await mongod.stop();
};
