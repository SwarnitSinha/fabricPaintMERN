import React from 'react'
import {useState} from 'react';
import './Register.css'
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import firebase from '../firebase';



const socket = io.connect("http://localhost:5000");

function Register({user,setUser}) {

    const [userName,setUsername] = useState("");
    const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [login,setLogin] = useState(true);

    const Navigate = useNavigate();

    

	const logHandler = async(e)=>{
		e.preventDefault();
		// const email = email;
		if(!email || !password) return;
		if(login){
			const result = await axios.post("http://localhost:5000/api/signIn",{email,password})
			if(!result.data.error){

				const token = result.data.token;
				sessionStorage.setItem("Token",JSON.stringify(token));
				sessionStorage.setItem("Username",JSON.stringify(result.data.username));

				setUser(result.data.username)


			}
			else{
				alert(result.data.message);
			}
			console.log(result.data);
		}
		else{
			if(!userName) return;
			const result = await axios.post("http://localhost:5000/api/signUp",{username:userName,email,password})
			console.log(result.data);
			if(result.data.error){
				alert(result.data.message);
			}
			else{
				alert("You have successfully registerd. Now Sign In and verify email")
				setLogin(true);
			}
		}
	}

  return (

    <div className='registerContainer'>
		<h1>{login?"Login":"SignUp"}</h1>
		<div className='nameForm'>
			{!login && <input
				type="text"
				value={userName}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			
		}
			

			<input
				type="email"

				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>

			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button className='btn btn-primary my-2' type="submit" onClick={logHandler}>{(login)?"Sign In":"Sign Up"}</button>
			
			<button className='btn btn-primary my-2' onClick={()=>setLogin(!login)}>{login?"New User? Register here":"Already have an account?"}</button>
			
		</div>
		
    </div>
  )
}

export default Register