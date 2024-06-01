import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./User.css";
import { Link } from 'react-router-dom'
import toast from "react-hot-toast"

const User = () => {
    // state bnali h
        const [users, setUsers] = useState([]);
// data fetch krne ke liye USEEFFECT HooK ka use krenge
    useEffect(() => {

        const fetchData = async() => {
            const response = await axios.get("http://localhost:8000/api/getall")
            setUsers(response.data);
        }
        fetchData();
// useEffect me empty array daaldete h : Reason : jab jab array data change tab tab hmara useEffect render krega iss Api ko 
    },[])

    const deleteUser = async(userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
        .then((response) => {
            // console.log(response);
            setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
            toast.success(response.data.msg, {position: 'top-right'});
        }).catch((error)=> {
            console.log(error);
        })
    }

  return (
    <div className='userTable'>
        <Link to = {"/add"} className='addButton'>Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.NO.</th>
                    <th>user name</th>
                    <th>user email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                //using map method of javascript
                users.map((user, index) => {
                    return(
                    <tr key={user._id}>
                        {/* <td>1.</td>
                        <td>santosh kumar</td>
                        <td>santosh@gmail.com</td> */}
                        <td>{index + 1}</td>
                        <td>{user.fname} {user.lname}</td>
                        <td>{user.email}</td>
                        <td className='actionButtons'><button onClick={() => deleteUser(user._id) }>Delete</button><Link to={'/edit/' + user._id}>Edit</Link></td>
                </tr>
                    )
                })
            }
               
            </tbody>
        </table>
    </div>
  )
}

export default User
