const express = require('express');
const app = express();

const server = require('http').createServer(app);
const cors = require('cors')

const User = require('./config/model/user')
require(`dotenv`).config();

require('./config/conn');



app.use(cors());

const io = require('socket.io')(server,{
    cors: {
        origin: "*",
      }
});



const users = {};

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to Page"
    })
})

app.post("/api/signIn", async (req,res)=>{
    const user = await User.findOne({
        email:req.body.email
    })
    if(!user){
        return res.json({
            status:404,
            error:true,
            message:"Email not registered"
        })
    }
    if(req.body.password!==user.password){
        return res.json({
            status:400,
            error:true,
            message:"Wrong Credential"
        })
    }
    
    // now login

    const token = await user.getAuthToken()

    res.json({
        status:200,
        token:token,
        username:user.username,
        isVerified: user.isVerified
    })
});
app.post("/api/signUp",async (req,res)=>{
    
    try{
        
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        const result = await User.findOne({email});

        if(result){
            return res.json({
                status:400,
                error:true,
                message:"User already exist"
            })
        }
        

        const user = new User({
                email:email,
                username: username,
                password: password
            
        })

        await user.save();

        res.json({
            status:200,
            message:"User Registered, Now login"
        })
    }
    catch(e){
        console.log(e);
        res.json({
            status:500,
            error:true,
            message:"Internal server error"
        })
    }
    
});

app.listen(5000,()=>{
    console.log("server is listening in 5000..")
})


module.exports = app;