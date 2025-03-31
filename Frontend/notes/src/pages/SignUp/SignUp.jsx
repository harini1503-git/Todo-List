import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import '../../index.css';
import { validEmail, validPassword } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name) {
      setError('Please Enter Your UserName!!!');
      return;
    }
    if (!validEmail(email)) {
      setError('Please Enter a valid Email!!!');
      return;
    }
    if (!validPassword(password)) {
      setError('Please Enter a Valid Password!!!');
      return;
    }

    // Sending data to backend to create an account
    try {
      const response = await axiosInstance.post('/create-account', {
        fullname: name,
        email: email,
        password: password,
      });
      console.log(response);
      // Handling response from the backend
      if (response.data && response.data.error) {
        console.log("Inside response.data")
        setError(response.data.message);
        return;
      }

      console.log(response);

      if (response.status === 200 && response.data) {
        // Redirect to dashboard after successful signup
        navigate('/dashboard');
      }
    } catch (error) {
      // Handling unexpected errors
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
          <form onSubmit={handleSignup}>
            <h2>SignUp Page</h2>

            <div className='form-group'>
              <label
                htmlFor='exampleInput1'
                style={{ fontSize: '20px', display: 'flex', alignItems: 'start' }}
              >
                UserName
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='UserName'
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label
                htmlFor='exampleInputEmail1'
                style={{ fontSize: '20px', display: 'flex', alignItems: 'start' }}
              >
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <small id='emailHelp' className='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className='form-group'>
              <label
                htmlFor='exampleInputPassword1'
                style={{ fontSize: '20px', display: 'flex', alignItems: 'start' }}
              >
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='exampleCheck1'
              />
              <label className='form-check-label' htmlFor='exampleCheck1'>
                Check me out
              </label>
            </div>

            <button type='submit' className='btn btn-primary'>
              SignUp
            </button>

            <p>
              Already Have an Account?{' '}
              <a href='/login'>Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
