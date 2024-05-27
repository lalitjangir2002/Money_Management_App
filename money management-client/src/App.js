import React from "react";
import NewExpenseItem from './components/Expenses/NewExpenseItem'
import NewExpense from "./components/NewExpense/NewExpense";

function App() {
  return (
  <div>
  <NewExpense/>
  <NewExpenseItem  />
    </div>
  );
}

export default App;
