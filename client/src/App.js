//Components
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Write from "./pages/Write";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from "./context/Context";

//CSS
import "./styles/main.css";

function App() {
  const {user} = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/write">
          {user ? <Write /> : <Register />}
        </Route>
        <Route path="/settings">
          {user ? <Settings /> : <Register />}
        </Route>
        <Route path="/post/:postId">
          <Show />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
