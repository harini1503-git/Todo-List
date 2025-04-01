import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import '../../index.css';
import { validEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validEmail(Email)) {
      setError('Please Enter a valid email!!!');
      return;
    }

    // if (!validPassword(Password)) {
    //   setError('Please Enter your Password!!!');
    //   return;
    // }

    try {
      // API call to login
      const response = await axiosInstance.post('/login', {
        email: Email,
        password: Password,
      });
      console.log(response);

      // Successful login, navigate to the dashboard
      if (response.status === 200 && response.data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log("error", error)
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className='login-container'>
        <div className='login-card'>
          <form onSubmit={handleLogin}>
            <h2>LogIn Page</h2>


            <div className='form-group'>
              <label htmlFor='exampleInputEmail1' style={{ fontSize: '20px', display: 'flex', alignItems: 'start' }}>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id='emailHelp' className='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className='form-group'>
              <label htmlFor='exampleInputPassword1' style={{ fontSize: '20px', display: 'flex', alignItems: 'start' }}>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {Error && <p style={{ color: 'red' }}>{Error}</p>}

            <button type='submit' className='btn btn-primary'>
              Login
            </button>

            <p>
              Not Registered yet?{' '}
              <a href='/signup'>Create an Account</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
