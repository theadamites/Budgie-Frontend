import '../App.css';
import React, { useState } from "react";
import axios from "axios";

export default function CreateAnAccount() {
    const [user, setUser] = useState({
        UserName: "",
        FirstName: "",
        LastName: "",
        Occupation :"",
        Email:"",
        Expenses:[],
        BudgetAllocations:[],
        SavingsGoal:"",
        Age: "",
        Income: "",
        Password: "",
        admin: false
      });

function change(event){
  const { name, value } = event.target;
  setUser((prevUser) => ({
    ...prevUser,
    [name]: value
  }));
}
 
const handleLoginClick = () => {
  window.location.href = '/login';
};


const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(user)
  try {
    const response = await axios.post("http://localhost:5678/newProfile", user);
    console.log("User data sent:", response.data);

    localStorage.setItem('userProfile', JSON.stringify(user));
    console.log(JSON.stringify(user));
    alert("Account Saved");
    window.location.href = `/userprofile`;

    } catch (error) {
        console.error("Error sending user data:", error);
  }
};


  return (
   <div className='App'>
              <h1>Create a Profile</h1>
        <h2>Enter the Following Information</h2>
        <form onSubmit={handleSubmit} className="form-container">
            <input
              className="input-field"
              value={user.FirstName || ""}
              name="FirstName"
              type="String"
              onChange={change}
              required={true} 
              placeholder ='First Name'
            ></input>
            <input
              className="input-field"
              placeholder="Last Name"
              value={user.LastName || ""}
              name="LastName"
              type="String"
              onChange={change}
              required={true} 
            ></input>
            <input
              className="input-field"
              placeholder="Age"
              value={user.Age || ""}
              name="Age"
              type="number"
              onChange={change}
            ></input>
            <input
              className="input-field"
              placeholder="Ocupation"
              value={user.Occupation || ""}
              name="Occupation"
              type="String"
              onChange={change}
            ></input>
            <input
              className="input-field"
              placeholder="Yearly Income"
              value={user.Income || ""}
              name="Income"
              type='number'
              onChange={change}
              required={true} 
            ></input>
              <input
              className="input-field"
              placeholder="Email"
              value={user.Email || ""}
              name="Email"
              type="String"
              onChange={change}
            ></input>
              <input
              className = "input-field"
              placeholder = "User Name"
              value = {user.UserName || ""}
              name = "UserName"
              type = "String"
              onChange = {change}
              required = {true} 
            ></input>
            <input
              className="input-field"
              placeholder="Password"
              value={user.Password || ""}
              name="Password"
              type="String"
              onChange = {change}
              required = {true} 
              style={{marginBottom:'25px' }}
            ></input>
            <button type="submit" className="submit-button" >Create Account</button>
            <button className="submit-button" onClick={handleLoginClick}>Login Account</button>
          </form>
        <div>
      </div>
    </div>
  );
}
