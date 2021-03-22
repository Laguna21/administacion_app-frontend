import React, {  } from 'react'
import { Redirect, Route } from "react-router-dom";
import { ConsumerFullContext } from "../../context/FullContext/index";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = (props) => {
 const {user, setUser} = ConsumerFullContext();

 const login = async (e) => {
  const us = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  try {
    const res = await fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(us),
    });
    const data = await res.json();
    console.log("la informacion del login es ",data.data);
    if (data.status === 200) {
      await setUser(data.data);
    } else {
      toast.error(data.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    alert("Error al intetar conectarse....");
  }
};
 return user ? (
    <Route exact path="/login">
      <Redirect push to="/" />
    </Route>
  ) : (
    <div className="Login d-flex justify-content-center mt-5">
    <div className="card bg-secondary mb-3">
      <h4 className="card-header">LOGIN USER</h4>
      <div className="card-body">
        <div className="form-group">
          <label className="col-form-label card-title" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="email"
          ></input>
        </div>
        <div className="form-group">
          <label className="col-form-label card-title" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
          ></input>
        </div>
      </div>
      <p className="card-footer d-flex justify-content-center">
        <button className="btn btn-info" onClick={login}>
          Ingresar
        </button>
      </p>
    </div>
    <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>)
}



export default Login;

