import React, { useState,useEffect } from 'react';
import { ConsumerFullContext } from "../../context/FullContext/index";
import "./style.css";
import { Redirect, Route } from "react-router-dom";
import {InfoList} from "../InfoList";


export const Form = (props) => {
  const { user, productList, productItem, setProductItem, update_item, add_item} = ConsumerFullContext();
  const  [userList, setUserList]= useState([]);
  const  [showEdit, setShowEdit]= useState(false);
  
 useEffect(()=>{cargarListaPersonal()},[productList]);
 useEffect(()=>{mostrarEditar()},[productItem]);
 
  const enviar = async (e)=>{
    e.preventDefault()
    const info = { admin_id:user._id,
                  concepto:document.querySelector("#concepto").value,
                  monto:parseFloat(document.querySelector("#monto").value),
                  fecha:document.querySelector("#fecha").value,
                  tipo:document.querySelector(
                    "input[type=radio][name=tipo]:checked"
                  ).value}
   
      //setProductList([...productList,info]);
      add_item(info);
  }
  const editar = async (e)=>{
    e.preventDefault()
    const info = { admin_id:user._id,
                  concepto:document.querySelector("#concepto").value,
                  monto:parseFloat(document.querySelector("#monto").value),
                  fecha:document.querySelector("#fecha").value,
                  tipo:document.querySelector(
                    "input[type=radio][name=tipo]:checked"
                  ).value}
    const id = productItem._id;
      
      const status = await update_item(id,info);
      console.log("el status es de ", status)
      if (status === 200) {
        setShowEdit(false);
        alert("se acutalizo correctamente");
        info.concepto = "";
        info.monto = 0;
        info.fecha = "";
      }else{alert("hubo un problema al actualizar")}
      
      
  }

  const cargarListaPersonal = async()=>{
    try {
      const res = await fetch("http://localhost:9000/api/user-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data.data)
      
      if (data.status === 200) {
        setUserList(data.data)
      } else {
        console.log("error al cargar lista de usuario",data.data)
      }
    } catch (error) {
      console.log("Error al intetar conectarse....",error);
    }
  }
  const mostrarEditar = ()=>{
    if (productItem) {
      let info = { admin_id:productItem._id,
        concepto:document.querySelector("#concepto").value=productItem.concepto,
        monto:parseFloat(document.querySelector("#monto").value=productItem.monto),
        fecha:document.querySelector("#fecha").value,
        tipo:document.querySelector(
          "input[type=radio][name=tipo]:checked"
        ).value}
        console.log("la info a modificar es=",productItem);
        setShowEdit(true);
      }  
  }

  return  !user ? (
    <Route exact path="/add-item">
      <Redirect push to="/" />
    </Route>
  ) :  (
    <div className="d-flex justify-content-center mt-5">
    <div className="Form card border-primary mb-3 p-1">
      <form>
        <fieldset className="card-body">
        <h4 className="card-header">INGRESAR INFORMACION</h4>
        <div className="form-group">
      <label htmlFor="concepto">Concepto</label>
      <input type="text" className="form-control" id="concepto"  placeholder="Pago, deuda, cambio...."/>  
      </div>
        <div className="form-group">
      <label htmlFor="monto">Monto</label>
      <input type="number" className="form-control" id="monto"  placeholder="10000.50" step="any"/>  
      </div>
        <div className="form-group">
      <label htmlFor="fecha">fecha</label>
      <input type="date" className="form-control" id="fecha" />  
      </div>
      <div className="form-group row d-flex justify-content-center">
      <div className="custom-control custom-radio col-4">
      <input type="radio" id="ingreso" name="tipo" defaultChecked={true} className="custom-control-input" value="ingreso"/>
      <label className="custom-control-label" htmlFor="ingreso">INGRESO</label>
    </div>
    <div className="custom-control custom-radio col-4">
      <input type="radio" id="egreso" name="tipo" className="custom-control-input" value="egreso"/>
      <label className="custom-control-label" htmlFor="egreso">EGRESO</label>
    </div>
    </div>

    <div className="card-footer d-flex justify-content-end">
    
    {showEdit?
    <div>
      <button type="button" className="btn btn-warning" onClick={editar}>EDITAR</button>
      <button type="button" className="btn btn-secondary" onClick={()=>{setShowEdit(false);setProductItem(null)}}>CANCELAR</button>
    </div>:
    <button type="button" className="btn btn-primary" onClick={enviar}>CARGAR</button>}
    
    </div>
        </fieldset>
      </form>
    </div>
    {<InfoList userList={userList}/>}
    
    </div>
  )
}


export default Form;

