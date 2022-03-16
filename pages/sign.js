import React, { useReducer } from 'react';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

const init = {
  email_log: '', password_log: '',
  name_reg: '', email_reg: '',
  password_reg: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'email_log':
      return {...state, email_log: action.payload}
    case 'password_log':
      return {...state, password_log: action.payload}
    case 'name_reg':
      return {...state, name_reg: action.payload}
    case 'email_reg':
      return {...state, email_reg: action.payload}
    case 'password_reg':
      return {...state, password_reg: action.payload}
    case 'reset':
      return state = init
  }
}

const Sign = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const router = useRouter();
  const handleLogin = async(e) => {
    e.preventDefault();
    const input = {
      email: state.email_log,
      password: state.password_log
    }
    try {
      const res = await axios.post('http://localhost:5000/login', { input });
      res.statusText !== 'Unauthorized' && 
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({type: 'reset'});
      router.replace('/');
    } catch (error) {
      if(error.message.includes(401)){
        alert("User Not Found")
      } else {
        alert("Invalid Username or Password")
      }
    }
  }
  
  const handleSignUp = async(e) => {
    e.preventDefault();
    const input = {
      name: state.name_reg,
      email: state.email_reg,
      password: state.password_reg
    }
    const res = await axios.post('http://localhost:5000/register', { input });
    res.statusText !== 'Unauthorized' && 
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    dispatch({type: 'reset'});
    router.replace('/');
  }

  return (
    <div className='main-sign'>
        <form className='form' onSubmit={(e) => handleLogin(e)}>
          <h2>Log In</h2>
          <label className='input-label'>
            <p className='label'>Email:</p>
            <input value={state.email_log} onChange={(e) => dispatch({type: 'email_log', payload: e.target.value})}/>
          </label>
          <label className='input-label'>
            <p className='label'>Password:</p>
            <input value={state.password_log} onChange={(e) => dispatch({type: 'password_log', payload: e.target.value})}/>
          </label>
          <button type='submit'>Log In</button>
        </form>
        
        <hr color='black' style={{width: '80%'}}/>
        
        <form className='form' onSubmit={handleSignUp}>
          <h2>Sign Up</h2>
          <label className='input-label'>
            <p className='label'>Name:</p>
            <input value={state.name_reg} onChange={(e) => dispatch({type: 'name_reg', payload: e.target.value})}/>
          </label>
          <label className='input-label'>
            <p className='label'>Email:</p>
            <input value={state.email_reg} onChange={(e) => dispatch({type: 'email_reg', payload: e.target.value})}/>
          </label>
          <label className='input-label'>
            <p className='label'>Password:</p>
            <input value={state.password_reg} onChange={(e) => dispatch({type: 'password_reg', payload: e.target.value})}/>
          </label>
          <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default Sign