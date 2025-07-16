const {Router} = require("express");
const adminRouter=Router();
const {adminModel, couseModel, courseModel, userModel}=require("../db")
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET || "admin12334";
const {auth}=require("../middleware/admin");

// Zod validation schemas
const adminSignupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required")
});

const adminSigninSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    image: z.string().url("Image must be a valid URL")
});

adminRouter.post("/signup",async function(req,res){
    console.log('Request Body:', req.body);
    
    try {
        // Validate input with Zod
        const validatedData = adminSignupSchema.parse(req.body);
        const { email, password, firstName, lastName } = validatedData;
        
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "signed up"
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors
            });
        }
        res.status(500).json({
            message: "Error creating admin",
            error: error.message
        });
    }
})

adminRouter.post("/signin",async function(req,res){
    try {
        // Validate input with Zod
        const validatedData = adminSigninSchema.parse(req.body);
        const { email, password } = validatedData;
        
        const admin = await adminModel.findOne({
            email: email
        });
        
        if (admin) {
            // Compare the provided password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            
            if (isPasswordValid) {
                const token = jwt.sign({
                    id: admin._id
                }, JWT_ADMIN_SECRET);
                res.json({
                    token: token
                });
            } else {
                res.status(403).json({
                    message: "invalid credentials"
                });
            }
        } else {
            res.status(403).json({
                message: "invalid credentials"
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors
            });
        }
        res.status(500).json({
            message: "Error during signin",
            error: error.message
        });
    }
})


adminRouter.post("/course",auth,async function(req,res){
    const adminId=req.userId;
    
    try {
        // Validate input with Zod
        const validatedData = courseSchema.parse(req.body);
        const { title, description, price, image } = validatedData;
        
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            image: image,
            creatorId: adminId
        });
        res.json({
            message: "Course Created",
            course: course._id
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors
            });
        }
        res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
})

adminRouter.get("/courses",auth,async function(req,res){
    const courses=await courseModel.find({
        creatorId:req.userId
    })
    res.json({
        courses:courses
    })
})

module.exports={
    adminRouter:adminRouter
}