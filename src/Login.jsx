import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useProvider } from './context/provideContext';

function Login() {
  const { setId } = useProvider()
  // const [userLoggedIn,setUserLoggedIn] = useState(null)
  const {storeToken,setUser } = useProvider();
  const [username,setUsername] = useState({
    email:"",
    password:""
  })

  const handleInput = (e) => {
    setUsername({
      ...username,
      [e.target.name] : e.target.value
    })
  };
const navigate = useNavigate();

useEffect(() => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    setId(userId);
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3005/api/auth/login',{
        method: "POST",
        headers:
        {"Content-Type": "application/json"},
        body: JSON.stringify(username),
      });
      if(res.ok){
        const user = await res.json();
        // setUserLoggedIn(user.username)
        storeToken(user.token);
        setUser(user.username)
        setId(user.userId);
        localStorage.setItem("userId", user.userId); // Store userId in localStorage

        // localStorage.setItem("token",user.token);
        console.log("user data =>",user);
        alert("u are logged in")
        navigate("/")
      }
      else {
        alert("u are not logged in")
      }
    } catch (error) {
      console.log(error,"error in login");
    }
  }
  return (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={username.email}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={username.password}
          onChange={handleInput}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Login