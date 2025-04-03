import { MongoClient, Db, Collection } from 'mongodb';
import { CustomerPersistence } from './dto/CustomerPersistence';

const uri = 'mongodb://localhost:27017'; // Cambia si lo necesitas
const dbName = 'taxdown';
let client: MongoClient;

export const getMongoCollection = async (): Promise<Collection<CustomerPersistence>> => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const db: Db = client.db(dbName);
  return db.collection<CustomerPersistence>('customers');
};
