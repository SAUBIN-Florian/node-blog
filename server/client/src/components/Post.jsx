import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/posts.css";

export default function Post({post}) {
  const PUBLIC_FOLDER = "https://blog-node-flo.herokuapp.com/images/";

  return (
    <div className="post">
      { post.photo && <img className="post-img" src={PUBLIC_FOLDER + post.photo}  alt="" /> }
      <div className="post-info">
        <div className="post-categories">
          {post.categories.map((cat) => (
            <span className="post-category">{cat.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="post-title">{post.title}</span>
        </Link>
        <hr />
        <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="post-description">{post.description}</p>
    </div>
  )
}
