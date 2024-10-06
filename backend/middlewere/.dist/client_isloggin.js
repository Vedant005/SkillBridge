
const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const express=require("express")
const app=express()
const cookieParse=require("cookie-parser")


let islogged=(req,res,next)=>{
    
    if(!req.cookies.tokenClient)
    {
        res.status(500).json({success:true, warning:"the cookies is expire please login for continue"})
    }
    else{
       let data= jwt.verify(req.cookies.tokenClient,process.env.JWT_PRIVATE)
       req.client=data
       next()
    }
}
module.exports=islogged