import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/sidebar.css';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/categories")
      setCats(res.data);
    }
    getCat();
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">ABOUT ME</span>
        <img className="sidebar-img" src="https://images.pexels.com/photos/4589729/pexels-photo-4589729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="woman with a hat" />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Ea a voluptatem dignissimos natus.
        </p>
      </div>
      <div className="sidebar-item">
        <div className="sidebar-title">CATEGORIES</div>
        <ul className="sidebar-list">
          {cats.map(c => (
            <Link to={`/?categories=${c.name}`} key={c._id}>
              <li className="sidebar-list-item">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">FOLLOW</span>
        <div className="sidebar-social">
          <i className="sidebar-icon fab fa-facebook-square"></i>
          <i className="sidebar-icon fab fa-twitter-square"></i>
          <i className="sidebar-icon fab fa-pinterest-square"></i>
          <i className="sidebar-icon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  )
}
