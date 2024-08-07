import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../components/redux/features/AuthSlice';
import CustomBackDrop from '../components/UI/CustomBackDrop';
import CustomSnackBar from '../components/UI/CustomSnackBar';
import video from "../assets/form_video.mp4";
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.data.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Email validation (simple regex)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage('Invalid email format.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      await dispatch(loginUser({ email, password })).unwrap();
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      navigate('/');
    } catch (err) {
      setSnackbarMessage(authState.error || 'Invalid email or password. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="login-page-container">
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="auth-form-container">
        <h2>LOGIN</h2>
        <p>Please Enter your Email and Password!</p>

        <form className="login_form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <div>
            <button className='login_btn' type="submit">Login</button>
          </div>

          <div className="form-links">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p>Don't remember password? <Link to="/resetpassword">Reset Password</Link></p>
          </div>
        </form>

        <CustomBackDrop loading={loading} />
        
        <CustomSnackBar 
          snackbarOpen={snackbarOpen} 
          handleSnackbarClose={handleSnackbarClose} 
          snackbarSeverity={snackbarSeverity} 
          snackbarMessage={snackbarMessage} 
        />
      </div>
    </div>
  );
}

export default Login;
