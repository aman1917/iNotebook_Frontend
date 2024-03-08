import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const host = "http://localhost:3001";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password & Confirm Password is must be same", "danger");
    } else {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save auth-token & redirect
        localStorage.setItem("token", json.authtoken);
        //   history.push("/");
        navigate("/");
        props.showAlert("Account Created Sucessfully", "success");
      } else {
        // alert("Invalid Credentials");
        props.showAlert("Sorry this email already exists", "danger");
      }
    }
   
  };
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter Your Name"
            onChange={handleOnChange}
            value={credentials.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleOnChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            value={credentials.password}
            autoComplete="on"
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={handleOnChange}
            value={credentials.cpassword}
            autoComplete="on"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
