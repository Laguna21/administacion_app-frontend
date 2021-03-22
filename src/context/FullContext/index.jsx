import React, { createContext, useContext,useEffect,useMemo,useState } from 'react'

const MainContext = createContext();

export const FullContextProvider = (props) => {
  
  const [productList, setProductList] = useState([]);
  const [productItem, setProductItem] = useState(null);
  const [balance, setBalance] = useState({ingresoTotal:0,
    egresoTotal:0});
  const [user, setUser] = useState(null);
  const [itemsFlag, setItemFlag] = useState({
    concepto:false,
    fecha:false,
    monto:false,
    tipo:false,
  });

  //USE EFFECT
  useEffect(()=>{balanceTotal()},[productList]);

  const balanceTotal = ()=>{
    
    
    const ingresos = productList.reduce((prev,current)=>{
      if (current.tipo ==="ingreso") {
        return prev+current.monto;
      }else{return prev}
    },0)
    const egresos = productList.reduce((prev,current)=>{
      if (current.tipo ==="egreso") {
        return prev+current.monto;
      }else{return prev}
    },0)
    
    setBalance(prev =>({...prev,ingresoTotal:ingresos}))
    setBalance(prev =>({...prev,egresoTotal:egresos}))
  }
  const itemListRemove = (id,list)=>{
    
    
    const newList = list.filter((element)=>{ return element._id !== id? element:""})
    return newList;
  }

 const value = useMemo(
  () => {
    const add_item = async(item)=>{
      try {
        const res = await fetch("http://localhost:9000/api/add-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const data = await res.json();
        console.log("la informacion del login es ",data.data);
        if (data.status === 200) {
          await setProductList([...productList,data.data]);
          alert(`el item ${data.data.concepto} pudo agregarse correctamente`);
        } else {
          alert(data.data);
        }
      } catch (error) {
        alert("Error al cargar item....");
      }
      
    }
    const update_list = async()=>{
      setItemFlag({...itemsFlag,fecha:true});
      try {
        const res = await fetch("http://localhost:9000/api/item-list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        
        if (data.status === 200) {
          orderList("fecha")
          let indexList = [];
            indexList= data.data.map((i,pos)=> pos <10? i:"");
        setProductList(indexList);

        } else {
          console.log("error al cargar la lista",data.data);
        }
      } catch (error) {
        alert("Error al cargar item....");
      }
      
    }

    const deleteItem =  async(id)=>{
      try {
        console.log("la data id es :",id)
        const res = await fetch("http://localhost:9000/api/item/"+id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
        const data = await res.json();
        
        if (data.status === 200) {
         const newList = itemListRemove(id,productList);
         setProductList(newList);
        } else {
          console.log("error al borrar lista el item",id)
        }
      } catch (error) {
        console.log("Error al intar borrar item ....",error);
      }
    }
    const update_item =  async(id,item)=>{
      try {
        console.log("la data id es :",id)
        const res = await fetch("http://localhost:9000/api/item-update/"+id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify(item)
          
        });
        const data = await res.json();
        
        if (data.status === 200) {
         update_list()
         return 200;
        } else {
          console.log("error al actualizar item",id)
          return 400;
        }
      } catch (error) {
        console.log("Error al intar borrar item ....",error);
      }
    }
    
    
   
    const orderList = (item)=>{
      
      productList.sort((a,b)=> {
        let fa,fb;
        if (item === "fecha") {
          if (itemsFlag.fecha) {
            fa = b.fecha;
            fb = a.fecha;
            setItemFlag({...itemsFlag,fecha:false})
          } else {
            fa = a.fecha;
            fb = b.fecha;
            setItemFlag({...itemsFlag,fecha:true})
          }
         
        }
        if (item === "concepto") {
          if (itemsFlag.concepto) {
            fa = b.concepto;
            fb = a.concepto;
            setItemFlag({...itemsFlag,concepto:false})
          } else {
            fa = a.concepto;
            fb = b.concepto;
            setItemFlag({...itemsFlag,concepto:true})
          }
        }
        if (item === "monto") {
          if (itemsFlag.monto) {
            fa = b.monto;
            fb = a.monto;
            setItemFlag({...itemsFlag,monto:false})
          } else {
            fa = a.monto;
            fb = b.monto;
            setItemFlag({...itemsFlag,monto:true})
          }
        }
        if (item === "tipo") {
          if (itemsFlag.tipo) {
            fa = b.tipo;
            fb = a.tipo;
            setItemFlag({...itemsFlag,tipo:false})
          } else {
            fa = a.tipo;
            fb = b.tipo;
            setItemFlag({...itemsFlag,tipo:true})
          }
        }
        
    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
      } );
      let nuevaLista = productList.map(e=>e);
      setProductList(nuevaLista);
    }
   
  return ({ productList,
    setProductList,
    productItem,
    user,
    balance,
    itemsFlag,
    setItemFlag,
    setUser,
    setProductItem,
    orderList,
    add_item,
    itemListRemove,
    deleteItem,
    update_item,
    update_list
   })
  },
  [productList, productItem,setProductItem, user,balance,itemsFlag]

);

return <MainContext.Provider value={value} {...props}/>
  
}


export function ConsumerFullContext(){
  
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("No se encuentra dentro de fullContext...")
  }
  return context;
}

