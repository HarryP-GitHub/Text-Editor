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

// putDb to update the text editor with new content
export const putDb = async (content) => {
  console.log('Content updated on database');
  //Creates connection to Jate database
  const jateDb = await openDB('jate', 1);
  // creates transaction in the jate database and sets the priviledges to readwrite
  const tx = jateDb.transaction('jate', 'readwrite');
  // opens the jate bject store
  const store = tx.objectStore('jate');
  // sends request to put the data matching the id 1 and with the content from the text editor
  let request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to database', result);

};

// getting the Content from the database, as there is only 1 text editor page, it will only get the 1 from the db
export const getDb = async () => {
  console.log('Getting data from database');
  //creates connection to db
  const jateDb = await openDB('jate', 1);
  // creates transaction with jate database and sets priviledges to readonly
  const tx = jateDb.transaction('jate', 'readonly');
  // opens jate object store
  const store = tx.objectStore('jate');
  // gets the data matching 1 id
  const request = store.get(1);
  const result = await request;
  console.log('Data:', result);
  return result?.value;
};

initdb();
