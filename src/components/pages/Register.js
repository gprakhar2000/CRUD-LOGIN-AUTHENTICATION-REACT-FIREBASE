import React from 'react'
import { Link, Redirect,useHistory } from 'react-router-dom';
import firebase from '../firebase'
import { useState ,useEffect} from 'react'
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
import './Register.css'
const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
  }
};

const Register = () => {
    let history=useHistory()
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

    const handleSignup = () => {
        clearErrors()
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              setLocalStorage('user', res.user);
              console.log(res.user)
              history.push('/login')
            })
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message)
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message)
                        break;
                }
            }) 
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

    const [showPassword,setShowPassword]=useState(false)
    return (

        <div className="container d-flex flex-wrap py-5 mt-5">

            {Userlogin ? <Redirect to="/login" /> : null}

            <div className="w-50 mx-auto my-auto shadow p-5">
  
                <h2 className="text-center mb-4">Hi! Register</h2>
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
                        type={showPassword ? "text":"password"}
                        autoFocus required
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        name="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div class="" id="toggler-icon"><button class="btn btn-light py-2" id="toggle-button" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</button></div>
                    <p className="errorMsg">{passwordError}</p>
                </div>

                <div className="btnContainer">
                            <button class="btn btn-primary btn-lg btn-block mt-2 mb-2" onClick={handleSignup}>Register</button>
                            <p class="m-4 text-right">Have an account ?
                                <Link to="/login"><button class="btn btn-secondary btn-sm ml-2">Login</button></Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register;