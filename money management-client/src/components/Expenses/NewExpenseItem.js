import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';
import ExpensesChart from './ExpensesChart';
import './NewExpenseItem.css';
import { getMoney, deleteMoney } from '../redux/features/dataSlice';

export default function NewExpenseItem() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.data.items);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);
  const [filterYear, setFilterYear] = useState('2024');

  useEffect(() => {
    dispatch(getMoney());
  }, [dispatch]);

  const filterChangeHandler = (yearSelected) => {
    setFilterYear(yearSelected);
  };

  const deleteExpenseHandler = (id) => {
    dispatch(deleteMoney(id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getFullYear().toString() === filterYear;
  });

  return (
    <div>
      <Card className="expenses">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ExpenseFilter selected={filterYear} onFilterChange={filterChangeHandler} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpenseList items={filteredExpenses} onDeleteExpense={deleteExpenseHandler} />
      </Card>
    </div>
  );
}
