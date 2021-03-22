import React, {  } from 'react';
import { ConsumerFullContext } from "../../context/FullContext/index"
import { useLocation,useHistory} from 'react-router-dom';


export const InfoItem = ({concepto,monto,fecha,tipo,data,props}) => {
  const {user, deleteItem,setProductItem} = ConsumerFullContext();
  const location = useLocation();
  const history = useHistory();
 
  const removeItem = ()=>
  {
    deleteItem(data._id);
  }
  const editItem = ()=>
  {
    setProductItem(data);
  if (location.pathname !== "/add-item") {
    history.push("/add-item");
  }
   
     
  }
  return (
    <tr className="InfoItem">
      
      <td className="table-info">{concepto}</td>
      <td className="table-info">{monto}</td>
      <td className="table-info">{fecha}</td>
      <td className="table-info">{tipo}</td>
      {user && user._id ===data.admin_id?(<td>
      <span className="btn btn-warning" onClick={editItem}>EDITAR</span>
      <span className="btn btn-danger" onClick={removeItem}> BORRAR</span>
      </td>):<td className="table-info"></td>}
      
    </tr>
  )
}


export default InfoItem;

