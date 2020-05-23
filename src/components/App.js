import React, {useContext} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import { AuthContext } from '../context/auth-context';

import Content from './Content'
import NavBar from './NavBar'
import Login from './Login'
import Home from './Home';

const App = _ => {
  const authContext = useContext(AuthContext)

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={authContext.isAuth ? Content : Home}/>
      </Switch>
    </>
  );
}

export default withRouter(App);
