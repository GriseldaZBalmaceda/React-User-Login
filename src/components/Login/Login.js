import React, { useState, useReducer, useEffect, useContext, useRef} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import AuthContext from '../../store/AuthContext';


const emailReducer = (state, action) => {
if(action.type === 'USER_INPUT') {
  return {value:action.val, isValid: action.val.includes('@')}
}
if(action.type === 'INPUT_BLUR'){
  return {value:state.value, isValid: state.value.includes('@')}
}
return {value:'', isValid: false}
}

const passwordReducer = (state, action) => {
if(action.type === 'USER_INPUT') {
  return {value:action.val, isValid:action.val.trim().length > 6}
}
if(action.type === 'VALIDATE_PASSWORD'){
  return {value:state.value, isValid:state.value.trim().length > 6}
}
return {value:'', isValid:false}
}
const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid:null})
  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:'', isValid: null})
  const  {isValid:  emailIsValid} = emailState;
  const {isValid : passwordIsValid} = passwordState;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    },500);
    return () =>   {
      clearTimeout(identifier);
    }
  },[emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', val: event.target.value})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'VALIDATE_PASSWORD'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      ctxt.onLogin(emailState.value, passwordState.value);
    } else if(!emailIsValid){
        emailInputRef.current.focus()
    } else if(!passwordIsValid) {
      passwordInputRef.current.focus()
    }
  };

  const ctxt = useContext(AuthContext);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value} 
          onChange={emailChangeHandler} 
          onBlur={validateEmailHandler} />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
