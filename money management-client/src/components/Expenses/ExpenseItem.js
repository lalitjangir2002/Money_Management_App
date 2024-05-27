import React from 'react'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'
import './ExpenseItem.css'

export default function ExpenseItem({id,title,amount,date}) {
return (
    <li>
    <Card className='expense-item'>
    <ExpenseDate date={date} />
    <div className='expense-item__description'>
    <h2>{title}</h2>
    <div className='expense-item__price'>₹{amount}</div>
    <button className='btn'>Remove</button>
    </div>
</Card>
</li>
)
}
