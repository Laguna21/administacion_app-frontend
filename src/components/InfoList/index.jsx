import React, { } from 'react';

import { ConsumerFullContext } from "../../context/FullContext/index";
import { InfoItem } from "../InfoItem";
import "./style.css";

export const InfoList = ({userList}) => {
  const {productList, orderList} = ConsumerFullContext();
 const order= (e)=>{
  const item= e.target.textContent.toLocaleLowerCase();
 orderList(item);
 }
 
  return (
    <div className="InfoList">
      <table className="table table-hover">
  <thead>
    <tr>
      
      <th scope="col" onClick={order}>CONCEPTO</th>
      <th scope="col" onClick={order}>MONTO</th>
      <th scope="col" onClick={order}>FECHA</th>
      <th scope="col">TIPO</th>
    </tr>
  </thead>
  <tbody>
   
  
    
    {userList !== undefined ? 
    userList.map(element => {  
      return<InfoItem data={element}concepto={element.concepto} monto={element.monto}
       fecha={element.fecha} tipo={element.tipo} key={element._id}/>
    }):
    productList.map(element => {  
      return<InfoItem data={element}concepto={element.concepto} monto={element.monto}
       fecha={element.fecha} tipo={element.tipo} key={element._id}/>
    })
  }
   
  </tbody>
  
</table>


    </div>
  )
}


export default InfoList;

