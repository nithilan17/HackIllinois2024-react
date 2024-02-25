import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import './PostPage.css';
import firebaseConfig from '../../firebase.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const PostPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lostItem = queryParams.get('item');
  const lostLocation = queryParams.get('location');

  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        if (!db) return; // Ensure db is initialized before using it

        // Query the Firestore for items matching the specified item and location
        const querySnapshot = await getDocs(collection(db, 'Lost Items'));
        const items = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.item === lostItem && data.location === lostLocation) {
            items.push({
              id: doc.id,
              ...data,
            });
          }
        });

        // Retrieve image URLs from Firebase Storage
        const itemsWithImages = await Promise.all(
          items.map(async (item) => {
            if (item.imageUrl) {
              const imageUrl = await getDownloadURL(ref(storage, item.imageUrl));
              return {
                ...item,
                imageUrl,
              };
            }
            return item;
          })
        );

        setLostItems(itemsWithImages);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchLostItems();
  }, [db, storage, lostItem, lostLocation]);

  return (
    <div className="container">
      <h1>Lost Items</h1>
      {/* ... (other code) */}
    </div>
  );
};

export default PostPage;
