import React, { useState ,useEffect ,useReducer} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
  const emailReducer=(state ,action)=>{
     if(action.type==='input'){
      return {value:action.val,isvalid:action.val.includes('@')};
     }
     if(action.type==='blur'){
      return {value:state.value ,isvalid:state.value.includes('@')};  
     }
    return {value:" " ,isvalid:false};
  };
  const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [collegename ,setcollegename]=useState('');
  const [collegevalid , setcollegevalid]=useState("");

  const[emailstate ,dispatchemail] =useReducer(emailReducer ,{value:" " , isvalid:null})
   
  
  // useEffect(()=>{
  //  const x=setTimeout(() => {
  //   console.log("check")
  //   setFormIsValid(
  //     emailstate.isvalid && enteredPassword.trim().length > 6 &&  collegename.trim().length>5
  //   );
  //  }, 1000);
  //   return ()=>{
  //     console.log("clean");
  //     clearTimeout(x);
  //   }
  //  },
  // [enteredEmail,enteredPassword ,collegename]);
   
  const emailChangeHandler = (event) => {
    dispatchemail({type:"input" ,val: event.target.value});
    setFormIsValid(
        event.target.value.includes('@') && enteredPassword.trim().length > 6 &&  collegename.trim().length>5
        );
    
  };
  const collegenameChangeHandler =(event)=>{
    setcollegename(event.target.value)
    setFormIsValid(
      emailstate.isvalid && enteredPassword.trim().length > 6 &&  collegename.trim().length>5
    );
  }
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      emailstate.isvalid && enteredPassword.trim().length > 6 &&  collegename.trim().length>5
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailstate.isvalid)
    dispatchemail({type:'blur'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
 const validatecollegenameHandler=()=>{
      setcollegevalid(collegename.trim() > 5);
 }
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, enteredPassword,collegename);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegevalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={collegename}
            onChange={collegenameChangeHandler}
            onBlur={validatecollegenameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
