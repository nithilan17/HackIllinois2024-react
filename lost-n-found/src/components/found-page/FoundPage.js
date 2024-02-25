
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import './FoundPage.css';
import firebaseConfig from '../../firebase.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
var filledOut = false;

const FoundPage = () => {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');
  const [comments, setComments] = useState('');
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const [errorMessage, setErrorMessage] = useState('');


const submitForm = async () => {
  console.log('Location:', location);
  console.log('Item:', item);
  console.log('Additional Comments:', comments);
  console.log('Image:', image);

  if (item || location || image) {
    filledOut = true;
  }
  if (!item || !location || !image) {
  filledOut = false;
  // Show error pop-up
  setErrorMessage('Please fill out all fields and upload an image.');
  setShowPopup(true);

  // Hide the popup after a few seconds
  setTimeout(() => {
    setShowPopup(false);
    setErrorMessage('');
  }, 3000);
  
  return; // Do not proceed with form submission if validation fails
}

  try {
    // Upload image to Firebase Storage
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
    }

    // Add the submitted data to the "foundItems" collection
    const docRef = await addDoc(collection(db, 'Lost Items'), {
      location,
      item,
      comments,
      imageUrl: image ? `images/${image.name}` : null, // Store image URL in Firestore
      // Add more fields as needed
    });

    console.log('Document written with ID:', docRef.id);

    // Reset the form
    setLocation('');
    setItem('');
    setComments('');
    setImage(null);

    // Show the thank you popup
    setShowPopup(true);

    // Hide the popup after a few seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  } catch (error) {
    console.error('Error submitting form:', error);
      setErrorMessage('An error occurred. Please try again.'); // Set generic error message
      setShowPopup(true);

      // Hide the popup after a few seconds
      setTimeout(() => {
        setShowPopup(false);
        setErrorMessage('');
      }, 3000);
  }
};

  return (
    <div className="container">
      <h1>Report a Lost Item</h1>

      <Link to="/" className="back-button">&lt; Go Back</Link>

      <form>
        <label htmlFor="item" className='upload-margin required-field'>Item:</label>
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

        <label htmlFor="location" className='upload-margin required-field'>Location:</label>
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

        <label htmlFor="comments" className='upload-margin'>Additional Comments (max 100 characters):</label>
        <textarea
          id="comments"
          name="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          maxLength="100"
          placeholder="Returned to arc front desk"
        ></textarea>

        <label htmlFor="image" className='upload-margin required-field'>Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="button" className='navigation-button' onClick={submitForm}>
          Submit
        </button>

        {errorMessage && !filledOut && (
        <div className="error-popup">
          <p className="error-message">{errorMessage}</p>
        </div>
        )}

        {showPopup && filledOut && (
          <div className="thank-you-popup">
            <p>Thank you for submitting!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FoundPage;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes } from 'firebase/storage';
// import { initializeApp } from 'firebase/app';
// import './FoundPage.css';
// import firebaseConfig from '../../firebase.js';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// var filledOut = false;

// const FoundPage = () => {
//   const [location, setLocation] = useState('');
//   const [item, setItem] = useState('');
//   const [comments, setComments] = useState('');
//   const [image, setImage] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const [errorMessage, setErrorMessage] = useState('');


// const submitForm = async () => {
//   console.log('Location:', location);
//   console.log('Item:', item);
//   console.log('Additional Comments:', comments);
//   console.log('Image:', image);

//   if (item || location || image) {
//     filledOut = true;
//   }
//   if (!item || !location || !image) {
//   filledOut = false;
//   // Show error pop-up
//   setErrorMessage('Please fill out all fields and upload an image.');
//   setShowPopup(true);

//   // Hide the popup after a few seconds
//   setTimeout(() => {
//     setShowPopup(false);
//     setErrorMessage('');
//   }, 3000);
//   
//   return; // Do not proceed with form submission if validation fails
// }

//   try {
//     // Upload image to Firebase Storage
//     if (image) {
//       const storageRef = ref(storage, `images/${image.name}`);
//       await uploadBytes(storageRef, image);
//     }

//     // Add the submitted data to the "foundItems" collection
//     const docRef = await addDoc(collection(db, 'Lost Items'), {
//       location,
//       item,
//       comments,
//       imageUrl: image ? `images/${image.name}` : null, // Store image URL in Firestore
//       // Add more fields as needed
//     });

//     console.log('Document written with ID:', docRef.id);

//     // Reset the form
//     setLocation('');
//     setItem('');
//     setComments('');
//     setImage(null);

//     // Show the thank you popup
//     setShowPopup(true);

//     // Hide the popup after a few seconds
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 3000);
//   } catch (error) {
//     console.error('Error submitting form:', error);
//       setErrorMessage('An error occurred. Please try again.'); // Set generic error message
//       setShowPopup(true);

//       // Hide the popup after a few seconds
//       setTimeout(() => {
//         setShowPopup(false);
//         setErrorMessage('');
//       }, 3000);
//   }
// };

//   return (
//     <div className="container">
//       <h1>Report a Lost Item</h1>

//       {/* Go Back button */}
//       <Link to="/" className="back-button">&lt; Go Back</Link>

//       <form>
//         <label htmlFor="item" className='upload-margin required-field'>Item:</label>
//         <select
//           id="item"
//           name="item"
//           value={item}
//           onChange={(e) => setItem(e.target.value)}
//         >
//           <option value="">Select Item</option>
//           <option value="WalletiCard">Wallet/iCard</option>
//           <option value="Keys">Keys</option>
//           <option value="Clothing">Clothing</option>
//           <option value="Devices">Devices</option>
//           <option value="BooksAcademicMaterial">Books/Academic Material</option>
//           <option value="WaterBottle">Water Bottle</option>
//           <option value="Misc">Misc.</option>
//         </select>

//         <label htmlFor="location" className='upload-margin required-field'>Location:</label>
//         <select
//           id="location"
//           name="location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         >
//           <option value="">Select Location</option>
//           <option value="ActivitiesRecreationCenter">Activities & Recreation Center (ARC)</option>
//           <option value="BusinessInstructionalFacility">Business Instructional Facility (BIF)</option>
//           <option value="CampusInstructionalFacility">Campus Instructional Facility (CIF)</option>
//           <option value="CampusRecreationCenterEast">Campus Recreation Center East (CRCE)</option>
//           <option value="GraingerLibrary">Grainger Library</option>
//           <option value="IlliniUnion">Illini Union</option>
//           <option value="MainLibrary">Main Library</option>
//           <option value="SiebelCenterForDesign">Siebel Center for Design</option>
//           <option value="SiebelCenterForComputerScience">Siebel Center for Computer Science</option>
//           <option value="Other">Other</option>
//         </select>

//         <label htmlFor="comments" className='upload-margin'>Additional Comments (max 100 characters):</label>
//         <textarea
//           id="comments"
//           name="comments"
//           value={comments}
//           onChange={(e) => setComments(e.target.value)}
//           maxLength="100"
//           placeholder="Returned to arc front desk"
//         ></textarea>

//         <label htmlFor="image" className='upload-margin required-field'>Upload Image:</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />

//         <button type="button" className='navigation-button' onClick={submitForm}>
//           Submit
//         </button>

//         {/* Error popup */}
//         {errorMessage && !filledOut && (
//         <div className="error-popup">
//           <p className="error-message">{errorMessage}</p>
//         </div>
//         )}

//         {/* Thank you popup */}
//         {showPopup && filledOut && (
//           <div className="thank-you-popup">
//             <p>Thank you for submitting!</p>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default FoundPage;

