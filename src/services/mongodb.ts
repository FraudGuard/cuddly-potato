import { Db, MongoClient } from 'mongodb';

export let connection: Db;

export const init = (env: any) =>
  new Promise((resolve) => {
    if (connection) {
      return resolve(connection);
    }
    const url = env.MONGO_URL ?? '-';
    console.log('startInit:', url);
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
      if (err) {
        console.log('init Error');
        throw err;
      }
      connection = db.db('mydb');
      console.log('connected');
      resolve(connection);
    });
  });

export const dropAndCreateCollection = (name: string) =>
  new Promise(async (resolve) => {
    await connection?.dropCollection(name);
    connection?.createCollection(name, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Collection created!');
      resolve(res);
    });
  });

export const insertOrUpdateAd = (object: any) =>
  connection
    .collection('ads')
    .updateOne(
      { _id: object.id },
      { $set: { ...object, _id: object.id } },
      { upsert: true }
    );

export const insertOrUpdateAccount = (object: any) =>
  connection
    .collection('accounts')
    .updateOne(
      { _id: object.id },
      { $set: { ...object, _id: object.id } },
      { upsert: true }
    );
