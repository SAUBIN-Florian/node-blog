import React from 'react';
import Sidebar from "../components/Sidebar";
import ShowPost from "../components/ShowPost";
import "../styles/show.css";

export default function Show() {
  return (
    <div className="show">
      <>
        <ShowPost />
        <Sidebar />
      </>
    </div>
  )
}
