import React from 'react';
import Post from "./Post";
import "../styles/posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  )
}
