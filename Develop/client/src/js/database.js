import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  // opening connection
  const jateDb = await openDB('jate', 1);
  // creating transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // opening object store
  const store = tx.objectStore('jate');
  //Using .put on the store and passing the content
  const request = store.put({id: 1, value: content});

  //confirm req
  const result = await request;
  console.log('Data saved to db', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from db');
  //create connection
  const jateDb = await openDB('jate', 1);
  //create new transaction
  const tx = jateDb.transaction('contact', 'readonly');
  //Open object store
  const store = tx.objectStore('jate');
  //Get
  const request = store.getAll();
  // Confirmation
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
