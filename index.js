const express = require("express");
const app=express();

const {userRouter} =require("./routes/user");
const {connectDB}=require("./db");
const {courseRouter} =require("./routes/course");
const{adminRouter}=require("./routes/admin");

app.use(express.json());
connectDB();

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);








app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});