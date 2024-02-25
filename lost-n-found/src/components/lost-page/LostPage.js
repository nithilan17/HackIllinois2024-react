import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LostPage.css';

const LostPage = () => {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');

  const filterResults = () => {
    console.log('Filtering results for:', location, item);
    // Here, you would typically make a call to your backend or Firebase to retrieve the filtered data
  };

  return (
    <div className="container">
      <h1>Check for Lost Item</h1>
      <form>
        {/* Go Back button */}
        <Link to="/" className="back-button">Go Back</Link>

        <label htmlFor="location">Location:</label>
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

        <label htmlFor="item">Item:</label>
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

        <button type="button" onClick={filterResults}>
          Filter
        </button>
      </form>
    </div>
  );
};

export default LostPage;