const express=require("express");
const dotenv=require("dotenv").config();
const connectdb=require("./config/connectDb");
const cors=require("cors");
const cookieParser = require('cookie-parser');
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");

const app=express();


connectdb();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));
app.use(express.urlencoded({extended:true}));
app.use("/api/auth",authRoutes);
app.use("/api/access/user",userRoutes);
app.use("/api/access/admin",adminRoutes);



app.listen(process.env.PORT||8080,()=>{
console.log(`Server is running on port ${process.env.PORT||8080}`);
});