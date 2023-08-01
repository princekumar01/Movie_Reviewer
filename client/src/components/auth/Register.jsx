import React, { useState } from "react";
import api from '../../api/axiosConfig';
import { Button } from "@mui/material"
import {Link, useNavigate} from 'react-router-dom'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email,password);
        localStorage.setItem('userId',JSON.stringify(email.split('@')[0]))

        try
        {
            const response = await api.post("/auth/signUp",{firstName:name,email:email,password:password});
           // console.log(response);
            localStorage.setItem('token',JSON.stringify(response.data.token))
            navigate('/');
        }
        catch(err)
        {
            console.error(err);
        }
    }

    return (
        <div className="AppLogin">
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <Button type="submit" style={{color:'blue'}}>Register</Button>
        </form>
        
        <Link to='/login'>
            <Button style={{color:'blue'}}>Already have an account? Login here.</Button>    
            </Link>
    </div>
    </div>
    )
}
export default Register;