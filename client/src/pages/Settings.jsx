import { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from "axios";
import { Context } from '../context/Context';
import "../styles/settings.css";

export default function Settings() {
  const {user} = useContext(Context)
  
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username: username || user.username,
      email: email || user.email,
      password: password || user.password
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try{
        await axios.post("/upload", data);
      }catch(err){}
    }
    try{
      await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
    }catch(err){
    }
  }

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-update-title">Update your account</span>
          <span className="settings-delete-title">Delete your account</span>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings-profile-picture">
            <img src={file ? URL.createObjectURL(file) : "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"} alt="" />
            <label htmlFor="file-input">
            <i className="settings-icon far fa-user-circle"></i>
            </label>
            <input type="file" id="file-input" hidden={true} onChange={e => setFile(e.target.files[0])}/>
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="text" placeholder={user.email} onChange={e => setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          <button type="submit" className="settings-submit">Update</button>
          {success && <span style={{color:"green", margin:"10px auto", fontSize:"20px"}}>Profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
