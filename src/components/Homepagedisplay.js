import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import Expenses from "./Expences";

export default function UserHomePage() {
  const [editing, setEditing] = useState(false);
  const [User, setUser] = useState({
    _id:"",
    UserName: "",
    FirstName: "",
    LastName: "",
    Occupation: "",
    Email:"",
    Age: "",
    Income: "",
    Password: "",
    admin: false,
  });

  useEffect(() => {
    const userProfileJSON = localStorage.getItem("userProfile");
    if (userProfileJSON) {
      const userProfile = JSON.parse(userProfileJSON);
      setUser(userProfile); // Update the User state with retrieved user profile
    }console.log(User)
  }, []); // Empty dependency array to run this effect only once
  

  const SaveEdit = async (event) => {
    event.preventDefault();

  
    try {
      const response = await axios.post("http://localhost:5678/update", User);
      console.log(response);
      // Disable editing mode after successful update
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  

  const Edit = (event) => {
    setEditing(true);
  };

  const Delete2 = async () => {
    try {
      const response = await axios.post("http://localhost:5678/delete", User);
      console.log(response);
      window.location.href = "/"; // Redirect to a desired page
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (User) {
    
    return (
      <div className="App">
       
          <div className="profile-container" >
            <div className="profile-card">
             
              <div className="row">
                <p className='profile-item'> First Name: {editing ? <input className="profile-item input"  name="FirstName" value={User.FirstName} onChange={handleEditChange} /> : User.FirstName}</p>
                <p className='profile-item'> Last Name: {editing ? <input className="profile-item input " name="LastName" value={User.LastName} onChange={handleEditChange} /> : User.LastName}</p>
              </div>
              <div className="row">
                <p className='profile-item'> Occupation: {editing ? <input className="profile-item input " name="Ocupation" value={User.Occupation} onChange={handleEditChange} /> : User.Occupation}</p>
                <p className='profile-item'> Age: {editing ? <input className="profile-item input " name="Age" value={User.Age} onChange={handleEditChange} /> : User.Age}</p>
              </div>
              <div className="row"> 
                <p className='profile-item'> Income: {editing ? <input className="profile-item input " name="Income" value={User.Income} onChange={handleEditChange} /> : User.Income}</p>
                <p className='profile-item'> Username: {User.UserName} </p>
              </div>
              <div className="row">
                <p className='profile-item'>  Password: {User.Password}</p>
              </div>

              <p>{editing ? (<button className="control-button" style={{ width: '95%' }} onClick={SaveEdit}>Save</button>):""}</p>
              <div className='row'>
                <button className="control-button"  onClick={Edit}>Edit</button>
                <button className="control-button" onClick={() => Delete2(User)}>Delete </button>
              </div>  

            </div>
          </div>

        <Expenses User={(User)}/>
        </div>
   
    );
  } else {
    return <p>User profile data not available. Please Try Again.</p>;
  }
}
