import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login/");
    }catch(err){
      console.log(err)
      setError(true);
    }
  }

  return (
    <div className="register">
      <span className="register-title">Register</span>
      <form className="register-form" onSubmit={handleSubmit}>
      <label>Username</label>
        <input type="text" placeholder="Your Username here..." onChange={e=>setUsername(e.target.value)} />
        <label>Email</label>
        <input type="text" placeholder="example.gmail.com" onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" placeholder="Your secret password..." onChange={e=>setPassword(e.target.value)} />
        <button className="register-submit" type="submit">Register</button>
      </form>
      <Link to="/login">
        <button className="register-login">Login</button>
      </Link>
      {error && <span style={{color:"red", marginTop: "10px" }}>Something went wrong !</span>}
    </div>
  )
}
