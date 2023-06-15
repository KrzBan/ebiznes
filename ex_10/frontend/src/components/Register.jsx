import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {api, setToken} from "../Api";
import Error from "./Error"

function Register(){

  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const { name, username, email, 
            password, passwordConfirmation } = document.forms[0];
        const data = { 
            name: name.value, 
            username: username.value, 
            email: email.value, 
            password: password.value,
            passwordConfirmation: passwordConfirmation.value,
            };

        api.post('users/auth/signup', data)
            .then(response => {
                setToken(response.data.token);
                navigate("/");
            }).catch(error =>{
              console.log(error.response.data.message);
              setError(error.response.data.message);
            })
      };

      const clearError = () =>{
        setError("");
      }

    return (
      <div>
        <h1>Register</h1>
        {error ?
        <Error msg={error} onClick={clearError} />
        :null
      }
        <div className="form">
        <form onSubmit={handleSubmit} method="POST">
          <div className="input-container">
            <label>Name </label>
            <input type="text" name="name" required />
          </div>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="username" required />
          </div>
          <div className="input-container">
            <label>E-mail </label>
            <input type="text" name="email" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required />
          </div>
          <div className="input-container">
            <label>Password Confirmation </label>
            <input type="password" name="passwordConfirmation" required />
          </div>
          <div className="button-container mt-5">
            <input type="submit" />
          </div>
        </form>
        </div>
      </div>
      );
}

export default Register;