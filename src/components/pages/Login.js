import React from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import firebase from '../firebase'
import { useState, useEffect } from 'react'
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
import './Register.css'
const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const Login = () => {
    let history = useHistory()
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false)
    const [Userlogin, setUserLogin] = useState('')
    const [Admin, setAdmin] = useState('')
    const clearInputs = () => {
        setEmail('')
        setPasswordError('')
    }
    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }
    const handleLogin = () => {
        if (document.getElementById("User").checked) {
            clearErrors()
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    if (window !== 'undefined') {
                        if (localStorage.getItem('user') !== null) {
                            localStorage.removeItem('user');
                        } else {
                            localStorage.removeItem('admin');
                        }
                    }
                    setLocalStorage('user', res.user);
                    console.log(res.user);
                    history.push('/user')
                })
                .catch(err => {
                    switch (err.code) {
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                        case "auth/user-not-found":
                            setEmailError(err.message);
                            break;
                        case "auth/wrong-password":
                            setPasswordError(err.message)
                            break;
                    }
                })
        }
        else if (document.getElementById("Admin").checked) {
            if (email === "admin@example.com" && password === "admin123") {
                if (window !== 'undefined') {
                    if (localStorage.getItem('user') !== null) {
                        localStorage.removeItem('user');
                    } else {
                        localStorage.removeItem('admin');
                    }
                }
                setLocalStorage('admin', { email: "admin@example.com", password: "admin123" });
                history.push('/admin')
            } else {
                window.alert("unauthorized admin access !");
            }
        }
        else {
            window.alert("Please enter all fields");
        }
    }


    const authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs()
                setUser(user);
            }
            else {
                setUser("");
            }
        })
    }
    useEffect(() => {
        authListener();
    }, [])
    const [showPassword, setShowPassword] = useState(false)
    return (

        <div className="container d-flex flex-wrap py-5 mt-5">
            {Userlogin ? <Redirect to="/user"></Redirect> : null}
            {Admin ? <Redirect to="/pages/admin"></Redirect> : null}
            <div className="w-50 mx-auto my-auto shadow p-5">

                <h2 className="text-center mb-4">Hi! Login</h2>
                <div className="form-group">
                    <input
                        type="email"
                        autoFocus required
                        className="form-control form-control-lg"
                        placeholder="Enter Your E-mail"
                        name="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className="errorMsg">{emailError}</p>
                </div>
                <div className="form-group position-relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        autoFocus required
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        name="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div class="text-right" id="toggler-icon">
                        <button class="btn btn-light py-2" id="toggle-button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </button>
                    </div>
                    <p className="errorMsg">{passwordError}</p>
                </div>

                <div className="btnContainer">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="Usertype" id="Admin" value="Admin" />
                        <label className="form-check-label" for="Admin">Admin</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="Usertype" id="User" value="User" />
                        <label className="form-check-label" for="User">User</label>
                    </div>
                    <button class="btn btn-primary btn-lg btn-block mt-2 mb-2" onClick={handleLogin}>Login</button>
                    <p class="m-4 text-right">Don't have an account?
                                <Link to='/register'><button class="btn btn-secondary btn-sm ml-2">Register</button></Link></p>

                </div>
            </div>
        </div>
    )
}
export default Login;