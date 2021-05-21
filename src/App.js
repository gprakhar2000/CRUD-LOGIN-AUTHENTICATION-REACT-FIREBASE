import React,{useState,useEffect} from 'react'
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Admin from './components/pages/Admin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import firebase from './components/firebase'
import AddDish from './components/dishes/AddDish'
import EditDish from './components/dishes/EditDish'
import ViewDishes from './components/dishes/ViewDishes'
import User from './components/pages/User'
import Login from './components/pages/Login'
import Privateroute from './private'
import Adminroute from './admin'
// import Navbar from './components/pages/Navbar';
// import notfound from './components/pages/notfound'
import Register from './components/pages/Register';
function App() {
  
  
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register} />
          <Privateroute path="/user" exact component={User}/>
          <Adminroute path="/admin"  exact component={Admin} sensitive/>
          <Adminroute path="/admin/AddDish" exact component={AddDish}/>
          <Adminroute path="/admin/EditDish/:id" exact component={EditDish}/>
          <Adminroute path="/admin/ViewDish/:id" exact component={ViewDishes}/>
        </Switch>
    </Router>
  );
}

export default App;
