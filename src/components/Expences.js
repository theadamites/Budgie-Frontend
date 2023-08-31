import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function Expenses(props) {
  const [curentExpenses, setcurentExpenses] = useState([])
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [user, setUser] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    Occupation: "",
    Email: "",
    Expenses: [], // Initialize as an empty array
    BudgetAllocations: [],
    SavingsGoal: "",
    Age: "",
    Income: "",
    Password: "",
    admin: false,
  });

  useEffect(() => {
    setUser(props.User);
  }, [props.User]);

  useEffect(() => {
    setcurentExpenses(user.Expenses);
  }, [user]);

  async function addExpense(event) {
    event.preventDefault();
    if (expenseName && expenseAmount) {
      const newExpense = { Expense_Name: expenseName, Amount: expenseAmount };

      // Update the user's expenses
      const updatedExpenses = [...user.Expenses, newExpense]; // Create a new array with the new expense
      setUser((prevUser) => ({
        ...prevUser,
        Expenses: updatedExpenses,
      }));

      try {
        const response = await axios.post("http://localhost:5678/update", {
          ...user,
          Expenses: updatedExpenses
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
         console.error("Error updating user data:", error);
      }

      // Clear input fields after adding expense
      setExpenseName("");
      setExpenseAmount("");
    }
  }


  if (user) {
    return (
      <div  className="profile-container">
 
        <div className="profile-card">
          <h2>Expenses List</h2>
          <form className="form-container" onSubmit={addExpense}>
            <div className="row">
            <input
              type="text"
              placeholder="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="input-field"
            />
            </div>

          </form>
                      <button  className="submit-button" style={{maxWidth:'1000px', marginTop:'5px'}} onClick={addExpense} type='submit' >
              Add Expense
            </button>

          
            <h3>View Expenses</h3>
            <div className="scroll">
            {curentExpenses && curentExpenses.map((expense, index) => (
                <div className='scrollable-expenses' key={index} >

                  <div className='profile-item2'> 
                  {expense.Expense_Name}
                  </div>
                    
                  <div className='profile-item2'>
                  ${expense.Amount}
                  </div>
                </div>
               ))}
         </div>
        </div>
      </div>
    );
  } else {
    return <p>User profile data not available. Please Try Again.</p>;
  }
}
