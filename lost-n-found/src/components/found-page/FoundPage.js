// FoundPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FoundPage.css';

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

  const submitForm = () => {
    console.log('Location:', location);
    console.log('Item:', item);
    console.log('Additional Comments:', comments);
    console.log('Image:', image);

    // Add any further logic or API calls here

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
  };

  return (
    <div className="container">
      <h1>Report a Lost Item</h1>

      {/* Go Back button */}
      <Link to="/" className="back-button">Go Back</Link>

      <form>
        <label htmlFor="item" className='upload-margi'>Item:</label>
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

        <label htmlFor="comments" className='upload-margin'>Additional Comments (max 100 characters):</label>
        <textarea
          id="comments"
          name="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          maxLength="100"
          placeholder="Returned to arc front desk"
        ></textarea>

        <label htmlFor="image" className='upload-margin'>Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="button" className='navigation-button2' onClick={submitForm}>
          Submit
        </button>

        {/* Thank you popup */}
        {showPopup && (
          <div className="thank-you-popup">
            <p>Thank you for submitting!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FoundPage;

