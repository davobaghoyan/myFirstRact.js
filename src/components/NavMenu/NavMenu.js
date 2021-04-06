import React from 'react';
import { Container, Row, Col,Button} from "react-bootstrap";
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';
import {logout} from '../../helpers/storage'




 
function NavMenu(props){
  console.log(props.isAuthenticated)
    return(
      <Container>
      <Row>
      <Navbar bg="light" variant="dark">
      <Nav>
      {props.isAuthenticated && 
        <Col xs = {4}>
        <NavLink 
        to='/' 
        activeClassName={styles.active}
        exact
        >
        Home
        </NavLink>
        </Col>
      }
    
        
        <Col xs = {4}>
        <NavLink
         to='/about'
         activeClassName={styles.active}
         exact
          >
          About us
          </NavLink>
        </Col>
          
        <Col xs = {4}>
        <NavLink
         to='/contact'
         activeClassName={styles.active}
         exact
         >
         Contact us
         </NavLink>
       </Col>
       
       {props.isAuthenticated &&
        <Col xs = {4}>
       <h3>{props.user.name}</h3>
       <h3>{props.user.surname}</h3>
        </Col>
       }
       {!props.isAuthenticated &&
       <Col xs = {4}>
       <NavLink
       to='/login'
       activeClassName={styles.active}
       exact
       >
       Login
       </NavLink>
       </Col>
       }

       {!props.isAuthenticated &&
       <Col xs = {4}>
       <NavLink
       to='/register'
       activeClassName={styles.active}
       exact
       >
       Register
       </NavLink>
       </Col>
      }

      {props.isAuthenticated &&
        <Col xs = {4}>
        <Button onClick = {logout}>
        Log Out
        </Button>
        </Col>
       }

       </Nav>
      </Navbar>
      </Row>
      </Container>
    );
};

const mapStateToProps = (state) => {
return {
  isAuthenticated:state.isauthenticated,
  user:state.user
}
}

export default connect(mapStateToProps)(NavMenu)