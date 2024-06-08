import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../components/redux/features/AuthSlice';
import CustomBackDrop from '../components/UI/CustomBackDrop';
import video from "../assets/form_video.mp4";
import { SignUpFormSchema } from '../components/UI/formValidation/LoginFormSchema';
import './signup.css';

function SignUp({ triggerSnackbar }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      triggerSnackbar('Please fill in all fields.', 'error');
      return;
    }

    
    try {
      const validatedData = SignUpFormSchema.parse({
        email,
        password,
        firstName,
        lastName,
      });
      
      if (password !== confirmPassword) {
        triggerSnackbar('Passwords do not match.', 'error');
        return;
      }
      
      setLoading(true);

      await dispatch(signupUser(validatedData)).unwrap();
      triggerSnackbar('Account Created Successfully, Please Login', 'success');

      setLoading(false);
      navigate('/login');
    } catch (err) {
      if (err.errors[0]?.path[0] === 'email') {
        triggerSnackbar('Invalid email. Please enter a valid email.', 'error');
      } else if (err.errors[0]?.path[0] === 'password') {
        triggerSnackbar('Invalid password. Password must be at least 6 characters long.', 'error');
      } else if (err.errors[0]?.path[0] === 'firstName') {
        triggerSnackbar('First name is required and must be at least 2 characters long.', 'error');
      } else if (err.errors[0]?.path[0] === 'lastName') {
        triggerSnackbar('Last name is required and must be at least 2 characters long.', 'error');
      } else {
        triggerSnackbar('Signup failed. Please try again.', 'error');
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="auth-form-container">
        <h2 className="auth-form-title">SIGN UP</h2>
        <p className="auth-form-subtitle">Please Enter your Email, Password, and Confirm Password!</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="auth-input"
            />
            <label className="auth-label">FirstName</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="auth-input"
            />
            <label className="auth-label">LastName</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <label className="auth-label">Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <label className="auth-label">Password</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
            />
            <label className="auth-label">Confirm Password</label>
          </div>

          <div className="auth-button-container">
            <button type="submit" className="auth-button">Sign Up</button>
          </div>

          <div className="form-links">
            <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
          </div>
        </form>

        <CustomBackDrop loading={loading} />
      </div>
    </div>
  );
}

export default SignUp;
