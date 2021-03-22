import React, { useEffect } from 'react'
import InfoList from '../InfoList';
import { ConsumerFullContext } from "../../context/FullContext/index";


/*
 * Inicio
 * Add description for your component
 */ 
export const Inicio = (props) => {
const {balance,update_list}=ConsumerFullContext();
useEffect(()=>{update_list()},[])

  return (
    <div className="Inicio jumbotron">
      
  <h1 className="display-3">INFORME ACTUAL</h1>
  <h4>Ingreso total $ {balance.ingresoTotal}</h4>
  <h4>Egreso total $ {balance.egresoTotal}</h4>
  {/* <p class="lead">ULTIMOS REGISTROS</p> */}
  
  <hr className="my-4"/>
  <h6>ULTIMOS REGISTROS</h6>
  <InfoList/>
 

    </div>
  )
}



export default Inicio;

