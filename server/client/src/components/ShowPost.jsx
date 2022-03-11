import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import { axiosInstance } from '../config';
import "../styles/show.css";

export default function ShowPost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PUBLIC_FOLDER = "http://localhost:5000/images/";

  const handleDelete = async () => {
    try{
      //need to send a "data" object with the username for the axios DELETE method
      //or it's a 401 error "Unauthorized" !
      await axiosInstance.delete("/posts/" + path, {data: {username: user.username}});
      window.location.replace("/");
    }catch(err){}
  }

  const handleUpdate = async () => {
    try{
      // no need the "data" object with the axios PUT method unlike DELETE...
      await axiosInstance.put("/posts/" + path, {username: user.username, title, description});
      setUpdateMode(false)
    }catch(err){}
  }

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data.post);
      setTitle(res.data.post.title);
      setDescription(res.data.post.description);
    };
    getPost();
  }, [path])

  return (
    <div className="show-post">
      <div className="show-wrapper">
        {post.photo && 
          <img
          className="show-img" 
          src={PUBLIC_FOLDER + post.photo} 
          alt="" 
          />
        }
        { updateMode ?
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="show-title-update"
            autoFocus
          />
         : (
            <h1 className="show-title">
              {title}
              {post.username === user?.username && 
                <div className="show-edit-delete">
                  <i className="show-edit far fa-edit" onClick={() => setUpdateMode(true)}></i>
                  <i className="show-delete far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              }
            </h1>
          )
        }
        <div className="show-info">
          <span className="show-info-author">
            <Link to={`/?user=${post.username}`}>
              Author: <b>{post.username}</b>
            </Link>
          </span>
          <span className="show-info-date">{new Date(post.createdAt).toDateString()}</span>
        </div>
        { updateMode ? 
          (
            <textarea 
              type="text"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="show-description-update"
            />
          ) : (
            <div className="show-description">
              {description}
            </div>
          )
        }
        {updateMode && 
          <button className="update-button" onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  )
}
