import React, { useEffect, useState } from 'react';
import Header from './Components/header';
import Cards from './Components/cards';
import db from './db';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [userCount, setUserCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(false)
    await db.data.clear();
    try {
      const response = await fetch('https://randomuser.me/api/?results=50');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const numberOfUsers = data.results.length;
      setUserCount(numberOfUsers);
      if (numberOfUsers > 0) {
        for (let i = 0; i < numberOfUsers; i++) {
          const user = data.results[i];
          const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
          const pictureUrl = user.picture.medium;
          await db.data.add({ name: fullName, picture: pictureUrl, userCount: numberOfUsers });
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      const count = await db.data.count();
      if (count === 0) {
        try {
          await fetchData();
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    }
    fetchDocuments();
  }, []);



  const handleRefreshClick = async () => {
    try {
      await fetchData();
      setFlag(!flag);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDocumentCount = async () => {
      try {
        const count = await db.data.count();
        setUserCount(count);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data from Dexie:', error);
      }
    };
    fetchDocumentCount();
  }, [flag]);

  return (
    <div className="App">
      <Header userCount={userCount} handleRefreshClick={handleRefreshClick} />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress style={{ color: 'black' }} />
        </Box>
      )}
      <Cards flag={flag} setFlag={setFlag} />
    </div>
  );
}

export default App;
