import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import "./Add.css";

const Add = () => {
    
    // REACT HOOK 
    const users = {
        fname: "",
        lname:"",
        email:"",
        password:""
    }
    const [user, setUser] = useState(users);

    // home pr redirect krane ke liye use krenge HOOK ka 
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value});  //user ke data ko API me pass krna h 
        // console.log(user);  

    }

    const submitForm = async(e) => {
        e.preventDefault();
        // ab api ko hit krenge 
        // Axios Api se communicate krega -> http request se handle krega 

        
        await axios.post("http://localhost:8000/api/create",user )  //data user se aa rha th
        .then((response) => {
            // console.log(response)
                toast.success(response.data.msg, {position: "top-right"})
                navigate("/")
        }).catch(error => console.log(error))
    }

    // ab kia ho rha h "localhost:8000/api/create"  ye api create krega user ke data se 


    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
            <h3>Add new user </h3>
            <form className='adduserform' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='fname'>First Name</label>
                    <input type="text" onChange={inputHandler} id="fname" name='fname' autoComplete='off' placeholder='First Name'></input>
                </div>
                <div className='inputGroup'>
                    <label htmlFor='lname'>Last Name</label>
                    <input type="text" onChange={inputHandler} id="lname" name='lname' autoComplete='off' placeholder='Last Name'></input>
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" onChange={inputHandler} id="email" name='email' autoComplete='off' placeholder='email'></input>
                </div>
                <div className='inputGroup'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" onChange={inputHandler} id="password" name='password' autoComplete='off' placeholder=' Password'></input>
                </div>
                <div className='inputGroup'>
                    <button type='submit'>ADD USER</button>
                </div>
            </form>
        </div>
    )
}

export default Add
