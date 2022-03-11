import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../context/Context";
import "../styles/topbar.css";

export default function Topbar() {
  
  const {user, dispatch} = useContext(Context);
  const PUBLIC_FOLDER = "https://blog-node-flo.herokuapp.com/images/";

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }

  
  return (
    <div className="topbar">
      <div className="top-left">
        <h1 className="top-logo"><Link to="/">HOME</Link> </h1>
      </div>
      <div className="top-center">
        <ul className="topbar-list">
          <li className="list-item">
            <Link to="/about">ABOUT</Link>  
          </li>
          <li className="list-item">  
            <Link to="/contact">CONTACT</Link>
          </li>
          <li className="list-item">
            <Link to="/write">WRITE</Link>
          </li>
          <li className="list-item logout-link" onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="top-right">
        <div className="img-search">
          {
            user ? (
              <Link to="/settings">
                <img className="top-img" src={user.profilePic ? PUBLIC_FOLDER + user.profilePic : "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"} alt="" />
              </Link>
            ) : (
              <ul className="topbar-list">
                <li className="list-item"><Link to="/login">LOGIN</Link></li>
                <li className="list-item"><Link to="/register">REGISTER</Link></li>
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
}
