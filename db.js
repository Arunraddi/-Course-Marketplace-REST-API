require('dotenv').config();
const mongoose=require("mongoose");

// Remove the hardcoded connection - use only the connectDB function
const Schema=mongoose.Schema;
const objectId=Schema.ObjectId;

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully ✅");
    } catch (error) {
      console.error("MongoDB connection error ❌:", error);
      process.exit(1);
    }
  };

const userSchema= new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,

});

const adminSchema= new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
});
const courseSchema= new Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    creatorId:objectId,

    
    
    
});
const purchaseSchema= new Schema({
    userId:objectId,
    courseId:objectId,
   
    
});

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports={
    connectDB:connectDB,
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}
