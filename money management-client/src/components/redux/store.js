import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './features/dataSlice';

export const store = configureStore({
    reducer: {
        data: expenseReducer,
    },
});
