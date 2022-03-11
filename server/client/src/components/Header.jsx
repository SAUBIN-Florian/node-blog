import React from 'react';
import '../styles/header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="header-title">
        <span className="header-sm">React & Node</span>
        <span className="header-lg">CRUD BLOG</span>
      </div>
      <img className="header-img" src="https://images.pexels.com/photos/4091975/pexels-photo-4091975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
    </div>
  )
}

