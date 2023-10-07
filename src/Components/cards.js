import React, { useState, useEffect } from 'react';
import db, { deleteCard, logUserData } from '../db';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import '../App.css';


export default function Cards({flag, setFlag}) {
  const [userData, setUserData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  
  useEffect(() => {
    const fetchDataFromDexie = async () => {
      try {
        const data = await db.data.toArray();
       console.log(data, "33333333333333")
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data from Dexie:', error);
      }
    };
    fetchDataFromDexie();
  }, [flag]);

  const fetchDocumentCount = async () => {
    try {
      const count = await db.data.count();
      setUserCount(count)
    } catch (error) {
      console.error('Error fetching document count:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      await logUserData();
      await fetchDocumentCount();
      setFlag(!flag)
      setUserData((prevUserData) => prevUserData.filter((user) => user.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="cards-container">
      <div className="cards-wrapper">
        {userData.map((user, index) => (
          <Card key={index} sx={{ maxWidth: 345 }} className="card">
            <CardActionArea>
              <CardMedia
                className="card-media"
                component="img"
                height="140"
                image={user.picture || '/defaultimage.jpg'}
                alt="User's Picture"
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name || 'Lizard'}
                </Typography>
                <CardActions>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteCard(user.id)}>
                    Delete
                  </Button>
                </CardActions>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
