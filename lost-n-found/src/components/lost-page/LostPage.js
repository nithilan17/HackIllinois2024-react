

/* import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase';
import './LostPage.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LostPage = () => {
    const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');

  const filterResults = async () => {
    try {
      if (!db) return;
      console.log('Filtering results for:', location, item);
      const docRef = await addDoc(collection(db, 'Looking For'), {
        location,
        item,
      });
      console.log('Document written with ID:', docRef.id);

      navigate('/posts?location=${location}&item=${item}');
    } catch (error) {
      console.error('Error filtering results:', error);
    }
  };

  return (
    <div className="container">
      <h1>Check for Lost Item</h1>
      <form>
        <Link to="/" className="back-button">&lt; Go Back</Link>

        <label htmlFor="item" className='upload-margin'>Item:</label>
        <select
          id="item"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        >
          <option value="">Select Item</option>
          <option value="WalletiCard">Wallet/iCard</option>
          <option value="Keys">Keys</option>
          <option value="Clothing">Clothing</option>
          <option value="Devices">Devices</option>
          <option value="BooksAcademicMaterial">Books/Academic Material</option>
          <option value="WaterBottle">Water Bottle</option>
          <option value="Misc">Misc.</option>
        </select>
        
        <label htmlFor="location" className='upload-margin'>Location:</label>
        <select
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="ActivitiesRecreationCenter">Activities & Recreation Center (ARC)</option>
          <option value="BusinessInstructionalFacility">Business Instructional Facility (BIF)</option>
          <option value="CampusInstructionalFacility">Campus Instructional Facility (CIF)</option>
          <option value="CampusRecreationCenterEast">Campus Recreation Center East (CRCE)</option>
          <option value="GraingerLibrary">Grainger Library</option>
          <option value="IlliniUnion">Illini Union</option>
          <option value="MainLibrary">Main Library</option>
          <option value="SiebelCenterForDesign">Siebel Center for Design</option>
          <option value="SiebelCenterForComputerScience">Siebel Center for Computer Science</option>
          <option value="Other">Other</option>
        </select>

        <button type="button" className='navigation-button' onClick={filterResults}>
          Filter Results
        </button>
      </form>
    </div>
  );
};

export default LostPage;
*/
/*
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';  // Import Redirect
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase';
import './LostPage.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LostPage = () => {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');
  const [redirectToPosts, setRedirectToPosts] = useState(false);  // New state for redirection

  const filterResults = async () => {
    try {
      if (!db) return;

      console.log('Filtering results for:', location, item);
      const docRef = await addDoc(collection(db, 'Looking For'), {
        location,
        item,
      });

      // Set the state to trigger the redirection
      setRedirectToPosts(true);
    } catch (error) {
      console.error('Error filtering results:', error);
    }
  };

  // Redirect if redirectToPosts is true
  if (redirectToPosts) {
    return <Redirect to={`/posts?location=${encodeURIComponent(location)}&item=${encodeURIComponent(item)}`} />;
  }

  return (
    <div className="container">
      <h1>Check for Lost Item</h1>
      <form>
        <Link to="/" className="back-button">&lt; Go Back</Link>

        <label htmlFor="item" className='upload-margin'>Item:</label>
        <select
          id="item"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        >
          <option value="">Select Item</option>
          <option value="WalletiCard">Wallet/iCard</option>
          <option value="Keys">Keys</option>
          <option value="Clothing">Clothing</option>
          <option value="Devices">Devices</option>
          <option value="BooksAcademicMaterial">Books/Academic Material</option>
          <option value="WaterBottle">Water Bottle</option>
          <option value="Misc">Misc.</option>
        </select>
        
        <label htmlFor="location" className='upload-margin'>Location:</label>
        <select
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="ActivitiesRecreationCenter">Activities & Recreation Center (ARC)</option>
          <option value="BusinessInstructionalFacility">Business Instructional Facility (BIF)</option>
          <option value="CampusInstructionalFacility">Campus Instructional Facility (CIF)</option>
          <option value="CampusRecreationCenterEast">Campus Recreation Center East (CRCE)</option>
          <option value="GraingerLibrary">Grainger Library</option>
          <option value="IlliniUnion">Illini Union</option>
          <option value="MainLibrary">Main Library</option>
          <option value="SiebelCenterForDesign">Siebel Center for Design</option>
          <option value="SiebelCenterForComputerScience">Siebel Center for Computer Science</option>
          <option value="Other">Other</option>
        </select>

        <button type="button" className='navigation-button' onClick={filterResults}>
          Filter Results
        </button>
      </form>
    </div>
  );
};

export default LostPage;
*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase';
import './LostPage.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LostPage = () => {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');
  const navigate = useNavigate();

  const filterResults = async () => {
    try {
      if (!db) return;

      console.log('Filtering results for:', location, item);
      const docRef = await addDoc(collection(db, 'Looking For'), {
        location,
        item,
      });

      navigate(`/posts?location=${encodeURIComponent(location)}&item=${encodeURIComponent(item)}`);
    } catch (error) {
      console.error('Error filtering results:', error);
    }
  };

  return (
    <div className="container">
      <h1>Check for Lost Item</h1>
      <form>
        <Link to="/" className="back-button">&lt; Go Back</Link>

        <label htmlFor="item" className='upload-margin'>Item:</label>
        <select
          id="item"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        >
          <option value="">Select Item</option>
          <option value="WalletiCard">Wallet/iCard</option>
          <option value="Keys">Keys</option>
          <option value="Clothing">Clothing</option>
          <option value="Devices">Devices</option>
          <option value="BooksAcademicMaterial">Books/Academic Material</option>
          <option value="WaterBottle">Water Bottle</option>
          <option value="Misc">Misc.</option>
        </select>
        
        <label htmlFor="location" className='upload-margin'>Location:</label>
        <select
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="ActivitiesRecreationCenter">Activities & Recreation Center (ARC)</option>
          <option value="BusinessInstructionalFacility">Business Instructional Facility (BIF)</option>
          <option value="CampusInstructionalFacility">Campus Instructional Facility (CIF)</option>
          <option value="CampusRecreationCenterEast">Campus Recreation Center East (CRCE)</option>
          <option value="GraingerLibrary">Grainger Library</option>
          <option value="IlliniUnion">Illini Union</option>
          <option value="MainLibrary">Main Library</option>
          <option value="SiebelCenterForDesign">Siebel Center for Design</option>
          <option value="SiebelCenterForComputerScience">Siebel Center for Computer Science</option>
          <option value="Other">Other</option>
        </select>

        <button type="button" className='navigation-button' onClick={filterResults}>
          Filter Results
        </button>
      </form>
    </div>
  );
};

export default LostPage;
