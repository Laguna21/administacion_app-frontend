import React, {  } from 'react';
import { ConsumerFullContext } from "../../context/FullContext/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect, Route } from "react-router-dom";

export const Register = (props) => {
  const {user,setUser}=ConsumerFullContext();
  const registerUser = async() => {
    const repass = document.querySelector("#repass").value;
    const infoUser = {
      email: document.querySelector("#email").value,
      nombre: document.querySelector("#nombre").value,
      password: document.querySelector("#password").value,
      role: document.querySelector(
        "input[type=radio][name=tipoUsuario]:checked"
      ).value,
    };
    console.log("usuario es:", infoUser);

    if (infoUser.email === "" || infoUser.password === "") {
      toast.error("Complete todos los campos!!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (infoUser.password !== repass) {
        toast.error("Las contraseñas no son iguales", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    try {
      const res = await fetch("http://localhost:9000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoUser),
      });
      const data = await res.json();
      console.log("La informacion es: ",data);
      if (data.status === 200) {
        setUser(data.data);
      } else {
        toast.error(data.data, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      
      }
    } catch (error) {
      alert("Error al intetar conectarse....",error);
    }
  };
  return(
    user ? (
      <Route exact path="/register">
        <Redirect push to="/" />
      </Route>
    ) : (
    <div className="d-flex justify-content-center">
      <div className="card border-info mb-3 ">
        <h1 className="card-header text-center">Registro</h1>
        <div className="card-body">
          <div className="form-group">
            <label className="control-label" htmlFor="nombre">
              Usuario
            </label>
            <input className="form-control" id="nombre" type="text"></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="email">
              Email
            </label>
            <input className="form-control" id="email" type="text"></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
            ></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="password">
              Repita el password
            </label>
            <input className="form-control" id="repass" type="password"></input>
          </div>
          <div className="Form-group mb-3">
            <div className="custom-control custom-radio">
              <input
                type="radio"
                id="tipoUsuario1"
                name="tipoUsuario"
                className="custom-control-input"
                defaultValue="cliente"
                defaultChecked="true"
              ></input>
              <label className="custom-control-label" htmlFor="tipoUsuario1">
                Usuario
              </label>
            </div>
            <div className="custom-control custom-radio">
              <input
                type="radio"
                id="tipoUsuario2"
                name="tipoUsuario"
                className="custom-control-input"
                defaultValue="desarrollador"
              ></input>
              <label className="custom-control-label" htmlFor="tipoUsuario2">
                Desarrollador
              </label>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end">
            <button className="btn btn-info" onClick={registerUser}>
              Enviar
            </button>
          </div>
        </div>
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
  )

}

export default Register;

