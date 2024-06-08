import React from 'react';
import { useDispatch} from 'react-redux';
import { logout } from '../components/redux/features/AuthSlice';
import { useNavigate } from 'react-router-dom';
import './logout.css';

const Logout = () => {
  const dispatch = useDispatch();
  // const email = useSelector(state => state.data.auth.email)
  // console.log(email)
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="logout-container">
        {/* <h2>{email}</h2> */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
