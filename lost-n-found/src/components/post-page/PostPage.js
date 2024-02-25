

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
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
        if (!db || !storage || !lostItem || !lostLocation) return;

        // Query Firestore to get lost items based on item and location
        const q = query(
          collection(db, 'Lost Items'),
          where('item', '==', lostItem),
          where('location', '==', lostLocation)
        );

        const querySnapshot = await getDocs(q);

        const lostItemsList = [];

        // Iterate through the documents and fetch additional details
        for (const doc of querySnapshot.docs) {
          const data = doc.data();

          // Fetch image URL from Storage
          const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));

          // Create a lost item object with all details
          const lostItem = {
            id: doc.id,
            item: data.item,
            location: data.location,
            comments: data.comments,
            imageUrl,
          };

          lostItemsList.push(lostItem);
        }

        setLostItems(lostItemsList);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchLostItems();
  }, [db, storage, lostItem, lostLocation]);

  return (
    <div className="container">
      <h1>Lost Items</h1>
      <div className="lost-items-container">
        {lostItems.map((lostItem) => (
          <div key={lostItem.id} className="lost-item">
            <img src={lostItem.imageUrl} alt={lostItem.item} />
            <h3>{lostItem.item}</h3>
            <p>{lostItem.location}</p>
            <p>{lostItem.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;