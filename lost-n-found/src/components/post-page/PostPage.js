import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
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

        const q = query(
          collection(db, 'Lost Items'),
          where('item', '==', lostItem),
          where('location', '==', lostLocation)
        );

        const querySnapshot = await getDocs(q);

        const lostItemsList = [];

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
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

  function ParseItem(lostItem) {
    switch (lostItem.item) {
        case 'WalletiCard':
          return "Wallet / iCard";
        case 'Keys':
          return "Keys";
        case 'Clothing':
          return "Clothing";
        case 'Devices':
          return "Devices";
        case 'BooksAcademicMaterial':
            return "Books / Academic Material";
        case 'WaterBottle':
            return "Water Bottle";
        case 'Misc':
            return "Miscellaneous";
    }
}

function ParseLocation(lostItem) {
  switch (lostItem.location) {
      case 'ActivitiesRecreationCenter':
        return "Activities Recreation Center (ARC)"
        case 'BusinessInstructionalFacility':
        return "Business Instructional Facility (BIF)"
        case 'CampusInstructionalFacility':
          return "Campus Instructional Facility (CIF)"
        case 'CampusRecreationCenterEast':
          return 'Campus Recreation Center East (CRCE)'
        case 'IlliniUnion':
          return 'IlliniUnion'
        case 'MainLibrary':
          return 'Main Library'
        case 'SiebelCenterForDesign':
          return 'Siebel CenterForDesign'
        case 'SiebelCenterForComputerScience':
           return "Siebel Center for Computer Science"  
        case 'Other':
          return "Other";   
         
  }
}

return (
    <div className="container1">
      <Link to="/" className="back-button">&lt; Go Back</Link>
        <h1>Lost Items</h1>
        <div>
        <h3>There are {lostItems.length} items that match your specifications</h3>
        </div>
        {lostItems.map((lostItem) => (
          <div key={lostItem.id} className='lost-item'>
          <img src={lostItem.imageUrl} alt={lostItem.item} />
          <div>
            <h3>Item: {ParseItem(lostItem)}</h3>
            <h3>Location: {ParseLocation(lostItem)}</h3>
            <h5>Comments: {lostItem.comments}</h5>
          </div>
        </div>
        
        ))}
    </div>
  );
};

export default PostPage;
