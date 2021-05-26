import React, { useState, useEffect } from 'react'
import { Link, useParams,useHistory } from 'react-router-dom'
import './dishes.css'
import firebase from '../firebase'
const ViewDishes = () => {

    let history=useHistory()
    const ref =firebase.firestore().collection("dishes")
    const {id}=useParams();
    const[dish,setDish]=useState({
        Dishname:"",
        ProteinValue:"",
        Carbohydrates:"",
        Fats:"",
        id:id
    })
    
    
    const {Dishname,ProteinValue,Carbohydrates,Fats}=dish; //destructure dish
    const onInputChange= name =>e=>{                                //creating change input function
        setDish({...dish,[name]:e.target.value})      //using setdish to set props of state
    }
    useEffect(()=>{
        ref.doc(dish.id).get().then(snapshot=>setDish({...snapshot,Dishname:snapshot.data().Dishname,
            ProteinValue:snapshot.data().ProteinValue,Carbohydrates:snapshot.data().Carbohydrates,
            Fats:snapshot.data().Fats,id:snapshot.id
        }));
    },[])
    return (
        <div className="container">
            <Link className="btn btn-primary d-inline-flex mt-4 ml-4 p-2 d-flex justify-content-end" to="/admin">
                    Back to Home
                </Link>
            <div className="mx-auto my-auto py-4" id="viewdishes">
                
                <h2 className="text-center"><span className="badge badge-success">Your Dish</span></h2>

                <ul className="list-group ">
                    <li className="list-group-item list-group-item-action list-group-item-info font-weight-bold ">NAME: {dish.Dishname}</li>
                    <li className="list-group-item list-group-item-action list-group-item-primary">PROTEIN: <span className="badge badge-primary badge-pill ml-5">{dish.ProteinValue}</span></li>
                    <li className="list-group-item list-group-item-action list-group-item-secondary">CARBOHYDRATES:<span className="badge badge-primary badge-pill ml-5">{dish.Carbohydrates}</span></li>
                    <li className="list-group-item list-group-item-action list-group-item-danger">Fats:<span className="badge badge-primary badge-pill ml-5">{dish.Fats}</span></li>
                    <li className="list-group-item list-group-item-action list-group-item-warning">Calories:<span className="badge badge-primary badge-pill ml-5">{dish.ProteinValue*4+dish.Carbohydrates*4+dish.Fats*9}</span></li>
                </ul>
            </div>
        </div>
    );
}
export default ViewDishes