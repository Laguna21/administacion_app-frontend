import React, {  } from "react";
import { Navbar,Nav } from "react-bootstrap";
import { ConsumerFullContext} from "../../context/FullContext/index";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  const {user,setUser} = ConsumerFullContext();
  const logout=()=>{
    setUser(null);
  }
  return (
    <Navbar className="Navigation" bg="light" expand="lg">
      
      <Link to="/">
      <Navbar.Brand ><h4>Laguna</h4></Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
    
      
       
    
    {!user ? (
          
          <Nav className="ml-auto">
    
      
          <Link className="nav-item nav-link" to="/">
          <h6>HOME</h6>
          </Link>
      <Link className="nav-item nav-link" to="/login">
      <h6>LOGIN</h6>
      </Link>
      <Link className="nav-item nav-link" to="/register">
      <h6>REGISTER</h6>
      </Link>
      {/* <Link className="nav-item nav-link" to="/add-item">
      <h6>ADD ITEM</h6>
      </Link> */}
      </Nav>
  
        ) : (
          <Nav className="ml-auto">
             <Link className="nav-item nav-link" to="/">
          <h6>HOME</h6>
          </Link>
          <Link className="nav-item nav-link" to="/add-item">
            <h6>ADD ITEM</h6>
            </Link>
            <Link className="nav-item nav-link" to="/">
              <h5>{user.nombre}</h5>
            </Link>
            
            <Link className="nav-item nav-link" to="/" onClick={logout}>
              <h5>
              LOGOUT
              </h5>
            </Link>
            
            </Nav>
        )}
     
    

  </Navbar.Collapse>
      
        
    
    </Navbar>
  )
}


export default Navigation;

