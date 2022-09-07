import "../components/Homepage.css";
import React, { useState, useEffect , Component} from "react";
import io from "socket.io-client";
import Register from "./Register";

import 'react-canvas-paint/dist/index.css'
import Fabric from './Fabric'
// import {nanoid} from "nanoid";

const socket = io.connect("https://fabric-paint-mern.vercel.app/");
// const userName = nanoid(4);

export default function Homepage() {
    const [user, setUser] = useState(null);
    
   

    useEffect(() => {
        

        // socket.on("user-joined", (payload) => {
        //     console.log(JSON.stringify(payload.userName) + "has joined");
        //     setChat([...chat,{ message:`${payload.userName} has joined the chat`,username: payload.userName}]);
        // });
    });

    useEffect(() => {
        const myUser = JSON.parse(sessionStorage.getItem("Username"));
        if (myUser) {
            setUser(myUser);
        }
        console.log(myUser);
    });


    if (!user) {
        return <Register user={user} setUser={setUser} />;
    }


    


    return (
        <div className="homepage">
            <h3>Lets Draw! {user.toUpperCase()}</h3>
       
            <div>
                <Fabric/>
            </div>
        </div>
    );
}
