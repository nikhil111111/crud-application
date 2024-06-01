import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import "../adduser/Add.css";
import toast from 'react-hot-toast';

const Editt = () => {

    const users = {
        fname: "",
        lname: "",
        email:"",
    } 


    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputchangeHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user,[name]:value});
        console.log(user);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
        .then((Response) => {
            // console.log(Response)
            // response me jo data aa rha h usko hm setUser me set krlete h
            setUser(Response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    },[id])

    const submitForm = async(e) => {
        e.preventDefault();
        // ab api ko hit krenge 
        // Axios Api se communicate krega -> http request se handle krega 

        
        await axios.put(`http://localhost:8000/api/update/${id}`,user )  //data user se aa rha th
        .then((response) => {
            // console.log(response)
                toast.success(response.data.msg, {position: "top-right"})
                navigate("/")
        }).catch(error => console.log(error))
    }


  return (
        <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>update existing  user </h3>
        <form className='adduserform' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='fname'>First Name</label>
                <input type="text" value={user.fname}  onChange={inputchangeHandler} id="fname" name='fname' autoComplete='off' placeholder='First Name'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='lname'>Last Name</label>
                <input type="text" value={user.lname}  onChange={inputchangeHandler} id="lname" name='lname' autoComplete='off' placeholder='Last Name'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>Email</label>
                <input type="email" value={user.email}  onChange={inputchangeHandler} id="email" name='email' autoComplete='off' placeholder='email'></input>
            </div>
            <div className='inputGroup'>
                <button type='submit'>UPDATE USER</button>
            </div>
        </form>
    </div>
  )
}

export default Editt
