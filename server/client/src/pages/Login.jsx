import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config';
import { Context } from '../context/Context';
import "../styles/login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try{
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type: "LOGIN_FAILURE"});
    }
  }

  return (
    <div className="login">
      <span className="login-title">Login</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter your username..." ref={userRef} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password..." ref={passwordRef} />
        <button className="login-submit" type="submit" disabled={isFetching}>Login</button>
      </form>
      <Link to="/register">
        <button className="login-register">Register</button>
      </Link>
    </div>
  )
}
