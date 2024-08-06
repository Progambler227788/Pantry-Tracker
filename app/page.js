'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore'; 
import { firestore } from '../firebase'; 
import { Button, TextField, Typography, Box, Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (!firestore) return; // Ensure firestore is defined
    const fetchItems = async () => {
      const itemsCollection = collection(firestore, 'Items');
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!firestore) return; // Ensure firestore is defined
    if (newItem.trim() === '') return;
    const itemsCollection = collection(firestore, 'Items');
    await addDoc(itemsCollection, { itemName: newItem, itemQuantity: 0 });
    setNewItem('');
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  const handleUpdateQuantity = async (id, delta) => {
    if (!firestore) return; // Ensure firestore is defined
    const itemDoc = doc(firestore, 'Items', id);
    const itemSnap = await getDoc(itemDoc);
    const currentQuantity = itemSnap.data().itemQuantity;
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 0) {
      alert('Quantity should be greater than 0');
      return;
    }
    await updateDoc(itemDoc, { itemQuantity: newQuantity });
    const itemsCollection = collection(firestore, 'Items');
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  const handleRemoveItem = async (id) => {
    if (!firestore) return; // Ensure firestore is defined
    await deleteDoc(doc(firestore, 'Items', id));
    const itemsCollection = collection(firestore, 'Items');
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  return (
    <Container>
      <Box textAlign="center" marginY={4}>
        <Typography variant="h4" gutterBottom>
          Pantry Tracker
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
          <TextField 
            variant="outlined" 
            label="Enter item name" 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)} 
            style={{ marginRight: '10px' }}
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white', padding: '10px' } }}
            sx={{
              marginRight: '10px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputBase-input': {
                color: 'white',
                padding: '10px',
              },
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddItem}
            startIcon={<AddIcon />}
          >
            Add Item
          </Button>
        </Box>
        <Box marginTop={4}>
          {items.map(item => (
            <Box key={item.id} marginBottom={2} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="body1" component="span" marginRight={2}>
                {item.itemName} - {item.itemQuantity}
              </Typography>
              <IconButton 
                onClick={() => handleUpdateQuantity(item.id, 1)} 
                color="primary"
                aria-label="increase quantity"
              >
                <AddIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleUpdateQuantity(item.id, -1)} 
                color="secondary"
                aria-label="decrease quantity"
              >
                <RemoveIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleRemoveItem(item.id)} 
                color="error"
                aria-label="remove item"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
