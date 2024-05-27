import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewExpense.css';
import { getMoney, postMoney } from '../redux/features/dataSlice';

export default function NewExpense() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

  const [addExpense, setAddExpense] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const addExpenseHandler = () => {
    setAddExpense(true);
  };

  const saveExpenseDataHandler = async (enteredExpenseData) => {
    try {
      await dispatch(postMoney(enteredExpenseData));
      dispatch(getMoney())
      setAddExpense(false);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: enteredDate
    };

    saveExpenseDataHandler(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <div className="new-expense">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {addExpense ? (
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input 
                type="text" 
                value={enteredTitle} 
                onChange={(e) => setEnteredTitle(e.target.value)} 
              />
            </div>
            <div className="new-expense__control">
              <label>Amount</label>
              <input 
                type="number" 
                min="0.01" 
                step="0.01" 
                value={enteredAmount} 
                onChange={(e) => setEnteredAmount(e.target.value)} 
              />
            </div>
            <div className="new-expense__control">
              <label>Date</label>
              <input 
                type="date" 
                min="2020-01-01" 
                max="2027-12-31" 
                value={enteredDate} 
                onChange={(e) => setEnteredDate(e.target.value)} 
              />
            </div>
          </div>
          <div className="new-expense__actions">
            <button type="button" onClick={() => setAddExpense(false)}>Cancel</button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      ) : (
        <button onClick={addExpenseHandler}>Add Expenses</button>
      )}
    </div>
  );
}
