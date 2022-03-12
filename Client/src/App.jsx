import "./App.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Simple Blog 📕 </h1>
          <Link to="/" className="LinkPosts">
            {" "}
            All Posts 📚
          </Link>
        </header>
      </div>
      <hr />
      <Switch>
        <Route path="/post/create" component={CreatePost} />
        <Route path="/post/:id" component={Post} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleTitleInput(value, setCallBack) {
    setCallBack(value.target.value);
  }

  async function handlePostSubmit() {
    if (!title || !content) {
      alert("You need to add all inputs fields");
      return;
    }

    try {
      await axios.post("http://localhost:3333/", {
        title: title,
        content: content,
        authorName: localStorage.getItem("user.name"),
      });
      props.history.push("/");
    } catch (error) {
      alert("error");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
    >
      <h3>New Post</h3>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => handleTitleInput(e, setTitle)}
      />

      <textarea
        placeholder="Content"
        cols="30"
        rows="10"
        onChange={(e) => handleTitleInput(e, setContent)}
      ></textarea>

      <button style={{ marginTop: "20px" }} onClick={handlePostSubmit}>
        Post
      </button>
    </div>
  );
}

const Posts = (props) => {
  const [postData, setPostData] = useState([]);

  function handleLogOut() {
    localStorage.clear();
    window.location.reload(false);
  }
  useEffect(() => {
    axios.get("http://localhost:3333/").then((data) => {
      setPostData(data.data.data.reverse());
    });
  }, []);

  return (
    <main>
      {localStorage.getItem("user.name") == null ? (
        <Link style={{ border: "1px solid black", padding: "7px" }} to="/login">
          Log In to Create Posts 🤩
        </Link>
      ) : (
        <Link
          style={{ border: "1px solid black", padding: "7px" }}
          to="/post/create"
        >
          Create a New Post 📝
        </Link>
      )}
      {localStorage.getItem("user.name") != null ? (
        <Link
          style={{
            border: "1px solid black",
            padding: "7px",
            marginLeft: "5px",
          }}
          to="/profile"
        >
          My Profile 😎
        </Link>
      ) : null}
      {localStorage.getItem("user.name") !== null ? (
        <button
          style={{
            border: "1px solid black",
            padding: "7px",
            right: "50px",
            position: "absolute",
          }}
          onClick={handleLogOut}
        >
          Log Out
        </button>
      ) : null}
      <ul>
        {postData.map((p, i) => {
          return (
            <li key={i} className="postItem">
              <Link
                to={{
                  pathname: "/post/" + i,
                  state: p,
                }}
              >
                <h3>{p.title}</h3>
                <br />
                <hr />
                <p>{p.content}</p>
                <br />
                <br />
                <p>
                  <strong>Author: </strong> {p.authorName}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

function Post(props) {
  let data = useLocation();
  let p = data.state;
  return (
    <div style={{ marginTop: "50px" }}>
      <h3>{p.title}</h3>
      <br />
      <hr />
      <p>{p.content}</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>
        <strong>Author: </strong> {p.authorName}
      </p>
    </div>
  );
}

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleInput(value, setCallBack) {
    setCallBack(value.target.value);
  }

  async function handleSignUpSubmit() {
    if (!name || !email || !password || !confirmPassword) {
      alert("You need to add all inputs fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords need to match");
      return;
    }

    try {
      await axios.post("http://localhost:3333/signup", {
        name: name,
        email: email,
        password: password,
      });
      props.history.push("/");
      localStorage.setItem("user.name", name);
      localStorage.setItem("user.email", email);
    } catch (error) {
      alert("Server Error");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
    >
      <h3>Sign Up</h3>
      <br />
      <br />
      <br />
      <label>Full Name</label>
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => handleInput(e, setName)}
      />
      <br />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => handleInput(e, setEmail)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          handleInput(e, setPassword);
        }}
      />
      <br />
      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => {
          handleInput(e, setConfirmPassword);
        }}
      />
      <button onClick={handleSignUpSubmit}>Confirm</button>
      <Link style={{ padding: "2px", marginTop: "10px" }} to="/login">
        Already one of us? Log In here!
      </Link>
    </div>
  );
}

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleInput(value, setCallBack) {
    setCallBack(value.target.value);
  }

  async function handleLogInSubmit() {
    if (!email || !password) {
      alert("You need to add all inputs fields");
      return;
    }

    try {
      let payload = { email: email, password: password };

      let res = await axios.post("http://localhost:3333/login", payload);

      let data = res.data;

      if (!data[0]) {
        alert("error");
        return;
      }
      localStorage.setItem("user.name", data[0].userName);
      localStorage.setItem("user.email", data[0].email);
      props.history.push("/");
    } catch (error) {
      alert("Server Error");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
    >
      <h3>Welcome Back, Log In! 🥳</h3>
      <br />
      <br />
      <br />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => handleInput(e, setEmail)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          handleInput(e, setPassword);
        }}
      />
      <button onClick={handleLogInSubmit}>Confirm</button>
      <Link style={{ padding: "2px", marginTop: "10px" }} to="/signup">
        Not one of us yet? Create an Account here!
      </Link>
    </div>
  );
}

function Profile(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  function handleInput(value, setCallBack) {
    setCallBack(value.target.value);
  }
  async function handleNameUpdate() {
    try {
      let payload = {
        email: localStorage.getItem("user.email"),
        userName: name,
      };
      let res = await axios.post("http://localhost:3333/updatename", payload);

      let data = res.data;
      if (data.changedRows !== 1) {
        alert("error");
        return;
      }
      window.location.reload(false);
      localStorage.setItem("user.name", name);
    } catch (error) {
      alert("Server Error");
    }
  }

  async function handlePasswordUpdate() {
    if (!password || !confirmPassword || !newPassword) {
      alert(
        "You need to add all inputs fields in order to change your password"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password needs to match");
      return;
    }

    try {
      let payload = {
        email: localStorage.getItem("user.email"),
        oldPassword: password,
        updatedPassword: newPassword,
      };

      let res = await axios.post(
        "http://localhost:3333/updatepassword",
        payload
      );

      let data = res.data;
      if (data.affectedRows !== 1) {
        alert("error");
        return;
      }
      window.location.reload(false);
    } catch (error) {
      alert("Server Error");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
    >
      <h3>Hi, {localStorage.getItem("user.name")}!</h3>
      <br />
      <br />
      <br />
      <label>Want to change your name?</label>
      <input
        type="text"
        placeholder="New Name"
        onChange={(e) => handleInput(e, setName)}
      />
      <button onClick={handleNameUpdate}>Confirm</button>
      <br />
      <label>Want to change your password?</label>
      <input
        type="password"
        placeholder="Current Password"
        onChange={(e) => {
          handleInput(e, setPassword);
        }}
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => {
          handleInput(e, setConfirmPassword);
        }}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        onChange={(e) => {
          handleInput(e, setNewPassword);
        }}
      />
      <button onClick={handlePasswordUpdate}>Confirm</button>
    </div>
  );
}
export default App;
