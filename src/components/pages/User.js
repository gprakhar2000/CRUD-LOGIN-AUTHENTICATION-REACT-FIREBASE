import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Users.css'
import Navbar from './Navbar'
import img1 from '../images/food.jpg'
import firebase from '../firebase'
const User = (props) => {
    const [searchdish, setSearchDish] = useState([])
    const [dishes, setDish] = useState([]);
    const ref = firebase.firestore().collection("dishes")
    useEffect(() => {
        loadDishes()
    }, [])
    const loadDishes = async () => {
        ref.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setDish(items)
        })
    }
    return (
        <div id="dishes">
            <Navbar />
            <input className="ml-4 mt-3 pl-3 py-2 w-25" type="text" placeholder="Search..."
                onChange={event => { setSearchDish(event.target.value) }}
            />
            <div className=" shadow row mb-5">
                <div className="col text-center">
                    <h1 className="mt-2">My Dishes</h1>
                    <p className="mt-3">Here is a view of your own nutritious dishes</p>
                </div>
            </div>
            <div className="map">
                {dishes.filter((val) => {
                    if (searchdish == "") {
                        return val
                    }
                    else if (val.Dishname.toLowerCase().includes(searchdish.toLowerCase())) {
                        return val
                    }
                }).map((dish, index) => (
                    <section id="dishes2">
                        <div className="container ml-3 mb-5 mr-3 text-center">
                            <div className="row">
                                <div>
                                    <div className="card col">
                                        <div className="card-body">
                                            <img src={img1} className="img-fluid-rounded-circle w-75 mb-3" />
                                            <h3 className="mb-4">{dish.Dishname}</h3>
                                            <div className="text-left">
                                                <h5>Protein:<span className="ml-2">{dish.ProteinValue}</span>g</h5><hr />
                                                <h5>Carbohydrates:<span className="ml-2">{dish.Carbohydrates}</span>g</h5><hr />
                                                <h5>Fats:<span className="ml-2">{dish.Fats}</span>g</h5><hr />
                                                <h5>Calories:<span className="ml-2">{dish.ProteinValue * 4 + dish.Carbohydrates * 4 + dish.Fats * 9}</span> kCal</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                ))}
            </div>
        </div>
    )
}
export default User