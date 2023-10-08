import Dexie from 'dexie';

const db = new Dexie('RandomUser');
db.version(2).stores({
  data: '++id, name, picture'
});

const deleteCard = async (cardId) => {
  try {
    await db.data.delete(cardId);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};

export { deleteCard};
export default db;
