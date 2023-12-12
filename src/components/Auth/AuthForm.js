import { useState,useRef } from 'react';
import { UseContext } from '../../Context/ContextProvider';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [_,dispatch]  = UseContext();
  


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;

    // optional: Add validation

     const handleRequest = async (url) => {
       const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
       });
       console.log(response);
       if(!response.ok){
          console.log(response);
          throw new Error('Authentication failed');
       }

       const data = await response.json();
       console.log(data);
       setLoading(false);
        return data;
     };

    setLoading(true);
    if(!isLogin){
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbwLTVIvQdv6McC4BGXTzfRozc7AoAw3g";
    }
    else{
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbwLTVIvQdv6McC4BGXTzfRozc7AoAw3g";
    }
    // log user in

     try{
      
        const data = await handleRequest(url);
        if(data.registered){
          console.log(data);
          dispatch({type:'LOGIN',payload: data.idToken});
        }
        else{
          console.log(data);
          alert("Account created successfully");
        }
     }
     catch (error) {
        alert(error.message);
        setLoading(false);
      };
     
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
         {!loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {loading && <button><p>Loading....</p></button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
