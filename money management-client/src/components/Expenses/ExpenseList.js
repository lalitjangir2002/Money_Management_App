import React from "react";
import './ExpenseList.css';
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card';

export default function ExpenseList(props) {
    // console.log(props.items);

    if (props.items.length === 0) {
        return <h2 className="expenses-list__fallback">No Such Expenses found.</h2>;
    }
    

    return (
        <ul className="expenses-list">
            {props.items.map((expense) => (
                <li key={expense.id}>
                    <Card className='expense-item'>
                        <ExpenseDate date={expense.date} />
                        <div className='expense-item__description'>
                            <h2>{expense.title}</h2>
                            <div className="expense-item_layout">
                            <div className='expense-item__price'>₹{expense.amount}</div>
                            <button className='btn' onClick={() => props.onDeleteExpense(expense.id)}>Remove</button>   
                            </div>
                        </div>
                    </Card>
                </li>
            ))}
        </ul>
    );
}
