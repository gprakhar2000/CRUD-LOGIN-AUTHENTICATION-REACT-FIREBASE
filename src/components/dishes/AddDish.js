
import React,{useState} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import firebase from '../firebase'
import {v4 as uuidv4} from 'uuid'
const AddDish = () => {
    let history=useHistory()
    const[dish,setDish]=useState({
        Dishname:"",
        ProteinValue:"",
        Fats:"",
        Carbohydrates:"",
        id:uuidv4()
    })
    const ref =firebase.firestore().collection("dishes")
    const {Dishname,ProteinValue,Carbohydrates,Fats}=dish; //destructure dish
    const onInputChange=(e)=>{                                //creating change input function
        setDish({...dish,[e.target.name]:e.target.value})      //using setdish to set props of state
    }
    const onSubmit=async(e)=>{                            //executing on submit button , passing event as parameter
        e.preventDefault()                      
        ref.doc(dish.id).set(dish)                    //posting dish state to fake db using async and await
        history.push("/admin");                                         // re routing home page using useHistory
    }
    return (
        <div className="container mt-4">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add A Dish</h2>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            autoFocus required
                            className="form-control form-control-lg"
                            placeholder="Enter Your Dish Name"
                            name="Dishname"
                            value={Dishname}
                            onChange={e => onInputChange(e)}   //calling onChange and passing event as parameter 
                            
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            autoFocus required
                            className="form-control form-control-lg"
                            placeholder="Enter Dish Protein Value"
                            name="ProteinValue"
                            value={ProteinValue}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            autoFocus required
                            className="form-control form-control-lg"
                            placeholder="Enter Dish Carbohydrate Value"
                            name="Carbohydrates"
                            value={Carbohydrates}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            autoFocus required
                            className="form-control form-control-lg"
                            placeholder="Enter Dish Fats Value"
                            name="Fats"
                            value={Fats}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning">Add Dish</button>
                </form>
            </div>
        </div>
    )
}
export default AddDish