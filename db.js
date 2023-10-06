import Dexie from 'dexie';

const db = new Dexie('RandomUser');
db.version(1).stores({
  data: '++id, name, message',
});

export default db;