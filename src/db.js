import Dexie from 'dexie';

const db = new Dexie('RandomUser');
db.version(2).stores({
  data: '++id, name, picture'
});

const deleteCard = async (cardId) => {
  try {
    console.log('Deleting card with ID:', cardId);
    const existingCard = await db.data.get(cardId);
    console.log(existingCard, "222222222");
    if (!existingCard) {
      console.log('Card not found in the database.');
      return;
    }
    await db.data.delete(cardId);
    let totalDocuments = await db.data.count();
    console.log('Total Documents after Deletion:', totalDocuments);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};



// Create a function to log the data
const logUserData = async () => {
  try {
    // Fetch all user data from the database
    const allUserData = await db.data.toArray();
    console.log('All User Data:', allUserData);
  } catch (error) {
    console.error('Error logging user data:', error);
  }
};

export { deleteCard , logUserData};

export default db;
