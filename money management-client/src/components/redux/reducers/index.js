import { combineReducers } from 'redux';
import authReducer from '../features/AuthSlice';
import expenseReducer from '../features/dataSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  data: expenseReducer,
});

export default rootReducer;
