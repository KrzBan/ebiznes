import { Link, useNavigate } from "react-router-dom";
import {useJwt } from "react-jwt"
import {getToken, setToken} from "./Api"
import './App.css'

function App() {
  const navigate = useNavigate();
  const {decodedToken } = useJwt(getToken());

  const logout = (event) => {
    event.preventDefault();
    setToken("");
    navigate("/", {replace: true});
  }

  return (
    <>
      <div>
        
      </div>
      <h1>Main Page</h1>

      {decodedToken ? (
        <div className="card flex flex-col items-center text-center">
          <h2>You are logged in as:</h2>
          <h2>Username: {decodedToken?.username}</h2>
          <h2>E-mail: {decodedToken?.email}</h2>

          <button onClick={logout}>Logout</button>
        </div>
        
      ) : 
      <div className="card flex flex-col items-center text-center">
        <Link to="login">Login</Link>
        <Link to="register">Sign-up</Link>
      </div>
      }

      
    </>
  )
}

export default App
