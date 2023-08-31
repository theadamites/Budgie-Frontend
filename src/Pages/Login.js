import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Import your custom styles

export default function Login() {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [User, setUser] = useState({ 
    _id:" ",
    UserName: " ",
    FirstName: " ",
    LastName: " ",
    Ocupation :" ",
    Email:" ",
    Expenses:[],
    BudgetAllocations:[],
    SavingsGoal:" ",
    Age: " ",
    Income: " ",
    Password: " ",
    admin: false,
  });

  
  useEffect(() => {
    console.log("Updated User:", User);
    if (credentials.username === User.UserName){
    if (User.admin === true) {
      localStorage.setItem('userProfile', JSON.stringify(User));
      window.location.href = "/DeBudgieMan";
    } else if (User.admin === false) {
      localStorage.setItem('userProfile', JSON.stringify(User));
      window.location.href = "/userprofile";
    }}
  }, [User]);




  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5678/login", credentials);
      // Set user data from response
      console.log("User data received:", response.data);

      setUser(response.data);
      localStorage.setItem('userProfile',JSON.stringify (User));
      alert(User.FirstName)

      // Do something with the response data, such as updating user state or redirecting
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
    
  };

  return (
    <div className="App">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          style={{marginBottom:'25px' }}
        />
        <button type="submit" className="submit-button" >
          Login
        </button>
        <button className="submit-button" onClick={()=>{window.location.href='/'}}> 
          Create An Account
        </button>
      </form>
    </div>
  );
}