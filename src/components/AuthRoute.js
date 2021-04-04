import { connect } from 'react-redux';
import {Route,Redirect} from 'react-router-dom';



 function AuthRoute({path,type,isAuthenticated, component:Component}){
    return (
      <Route 
      path={path}
      render={(props)=>{
        if(isAuthenticated && type==='public'){
          return <Redirect to='/'/>;
        }

        if(!isAuthenticated && type==='private'){
          return <Redirect to='/login'/>;
        }

        return <Component  {...props}/>;
      }}
     />
    );
  
  
  }

  const mapStateToProps = (state) => {
    return {
        isAuthenticated:state.isauthenticated
    };
  };


  export default connect(mapStateToProps)(AuthRoute);
