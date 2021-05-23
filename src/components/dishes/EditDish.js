
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useHistory,useParams} from 'react-router-dom'
import firebase from '../firebase'
const ref =firebase.firestore().collection("dishes")
const EditDish = () => {
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
    const onSubmit=async(e)=>{                            //executing on submit button , passing event as parameter
        e.preventDefault()                              
        ref.doc(dish.id).update({Dishname:Dishname,ProteinValue:ProteinValue,Carbohydrates:Carbohydrates,Fats:Fats,id:id})
        .then(res=>console.log("success"))
        history.push("/admin");                                         // re routing home page using useHistory
    }
    
    useEffect(()=>{
        ref.doc(dish.id).get().then(snapshot=>setDish({...snapshot,Dishname:snapshot.data().Dishname,
            ProteinValue:snapshot.data().ProteinValue,Carbohydrates:snapshot.data().Carbohydrates,
            Fats:snapshot.data().Fats,id:snapshot.id
        }));
    },[])
    return (
        <div className="container mt-4">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit A Dish</h2>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Dish Name"
                            name="Dishname"
                            value={Dishname}
                            onChange={onInputChange("Dishname")}   //calling onChange and passing event as parameter 
                            
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Dish Protein Value"
                            name="ProteinValue"
                            value={ProteinValue}
                            onChange={onInputChange("ProteinValue")}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Dish Carbohydrate Value"
                            name="Carbohydrates"
                            value={Carbohydrates}
                            onChange={onInputChange("Carbohydrates")}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Dish Fats Value"
                            name="Fats"
                            value={Fats}
                            onChange={onInputChange("Fats")}
                        />
                    </div>
                    <button className="btn btn-warning">Update Dish</button>
                </form>
            </div>
        </div>
    )
}
export default EditDish