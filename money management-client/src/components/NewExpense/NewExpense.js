import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewExpense.css';
import { getMoney, postMoney } from '../redux/features/dataSlice';
import CustomSnackBar from '../UI/CustomSnackBar';
import CustomBackDrop from '../UI/CustomBackDrop';

export default function NewExpense() {
  const dispatch = useDispatch();
  // const loadingFromRedux = useSelector((state) => state.data.data.loading);
  const error = useSelector((state) => state.data.error);

  const [addExpense, setAddExpense] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const addExpenseHandler = () => {
    setAddExpense(true);
  };



  const triggerSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const saveExpenseDataHandler = async (enteredExpenseData) => {
    setLoading(true);
    try {
      await dispatch(postMoney(enteredExpenseData));
      dispatch(getMoney());
      setAddExpense(false);
      triggerSnackbar('Expense added successfully!');
    } catch (error) {
      console.error("Error posting data: ", error);
      triggerSnackbar('Failed to add expense', 'error');
    } finally {
      setLoading(false);
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
      {/* {loadingFromRedux && <p>Loading...</p>} */}
      {error && <p>Error: {error}</p>}
      {loading && (
        <CustomBackDrop loading={loading}/>
      )}
      {addExpense ? (
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input 
                type="text" 
                value={enteredTitle} 
                onChange={(e) => setEnteredTitle(e.target.value)} 
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
          <div className="new-expense__actions">
            <button type="button" className='btn' onClick={() => setAddExpense(false)} disabled={loading}>
              Cancel
            </button>
            <button className='btn' type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      ) : (
        <button className="btn" onClick={addExpenseHandler}>Add Expenses</button>
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
}
