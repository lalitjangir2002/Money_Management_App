import './ExpenseDate.css';

export default function ExpenseDate({ date }) {
    const expenseDate = new Date(date);
    const formattedDate = expenseDate.toLocaleDateString('en-US', {
        day: '2-digit',
        year: 'numeric',
        month: 'short',
    });

    return (
        <div className='expense-date'>
            <div className='expense-date__formatted'>{formattedDate}</div>
        </div>
    );
}
