import './App.css';
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Switch, Redirect,Route} from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import {history} from './helpers/history'
import Spinner from './components/Spinner/Spinner'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import AuthRoute from './components/AuthRoute'



function App({loading, successMessage,errorMessage,isAuthenticated}) {

  useEffect(()=>{ 
    if(successMessage) 
    toast.success(successMessage,{
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

    if(errorMessage) 
    toast.error(errorMessage,{
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
  },[successMessage,errorMessage])
  
  return (
    <div className="App">
   
    <Router history = {history}>
    <NavMenu />

    <Switch>
      <AuthRoute 
       path='/'
       component = {ToDo}
       type = 'private'
       exact = {true}
      />
      <AuthRoute 
      path='/home'
      type = 'private'
      component = {ToDo}
      exact = {true}
      />
      <Route 
      path='/about'
      component = {About}
      exact = {true}
      />
      <Route 
      path='/contact'
      component = {Contact}
      exact
      />
      <AuthRoute 
      path='/task/:taskId'
      type = 'private'
      component = {SingleTask}
      exact
      />
      <AuthRoute 
       path='/register'
       type = 'public'
       component = {Register}
       exact = {true}
      />
      <AuthRoute 
       path='/login'
       type = 'public'
       component = {Login}
       exact = {true}
      />
      <Route 
      path='/not-found'
      component = {NotFound}
      exact
      />

      <Redirect to='/not-found'/>
      </Switch>


    </Router>

    { loading && <Spinner />}
    <ToastContainer/>
    <footer>
  <p>Author: Davit Baghoyan</p>
  <p><a href="https://github.com/davobaghoyan">GitHub</a></p>
</footer>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage,
      isAuthenticated:state.isauthenticated
  };
};

export default connect(mapStateToProps)(App);
