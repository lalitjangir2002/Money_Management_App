import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import Loader from './components/UI/Loader';
import ProtectAuthentication from './ProtectAuthentication';
import CustomSnackBar from './components/UI/CustomSnackBar';
import Particle from './components/UI/Particle';

const Login = lazy(() => import('./Auth/Login'));
const SignUp = lazy(() => import('./Auth/SignUp'));
const NewExpense = lazy(() => import('./components/NewExpense/NewExpense'));
const NewExpenseItem = lazy(() => import('./components/Expenses/NewExpenseItem'));
const Logout = lazy(() => import('./Auth/Logout'));

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const triggerSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp triggerSnackbar={triggerSnackbar} />} />
            <Route path="/" element={
              <ProtectAuthentication element={
                <>
                  <Particle/>
                  <Logout id="Logout"/>
                  <NewExpense id="New_Expense"  />
                  <NewExpenseItem id="NewExpenseItem"  />
                </>
              } />
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <CustomSnackBar 
        snackbarOpen={snackbarOpen} 
        handleSnackbarClose={handleSnackbarClose} 
        snackbarSeverity={snackbarSeverity} 
        snackbarMessage={snackbarMessage} 
      />
    </Provider>
  );
}

export default App;
