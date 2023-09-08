import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Assuming this is where your styling is defined

function Profiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await axios.get('http://localhost:5678/profiles'); // Adjust the URL as needed
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    }
    fetchProfiles();
  }, []);

  const Delete = async (profile) => {
    try {
      const response = await axios.post("http://localhost:5678/delete", profile);
      console.log(response);
      // Assuming you want to refresh the profiles after successful deletion
      const updatedProfiles = profiles.filter(p => p._id !== profile._id);
      setProfiles(updatedProfiles);
    } catch (error) {
      console.error("Error deleting user data:", error); 
    }
  };

  return (
    <div className='scroll'>
      <h1>DeBudgie Profiles</h1>
      <h2>Profiles Database</h2>
      <div className='profile-container'>
        {profiles.map((profile) => (
          <div key={profile._id} className='profile-card'>
            <p className='profile-item'>First Name: {profile.FirstName}</p>
            <p className='profile-item'>Last Name: {profile.LastName}</p>
            <p className='profile-item'>Occupation: {profile.Occupation}</p>
            <p className='profile-item'>Age: {profile.Age}</p>
            <p className='profile-item'>Income: {profile.Income}</p>
            <p className='profile-item'>Username: {profile.UserName}</p>
            <p className='profile-item' style={{marginBottom:'25px' }}>Password: {profile.Password}</p>
            {/* You might not want to display the password */}
            <div className='row'>
              <button className="control-button">Edit Profile</button>
              <button className="control-button" onClick={() => Delete(profile)}>Delete Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profiles;