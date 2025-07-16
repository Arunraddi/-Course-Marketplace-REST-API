const express =require("express");
const {Router} = require("express");
const app=express();

const userRouter = Router();
const { userModel, courseModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "arun123445";
app.use(express.json());

// Zod validation schemas
const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required")
});

const signinSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

userRouter.post("/signup", async function(req, res) {
    console.log('Request Body:', req.body);
    
    try {
        // Validate input with Zod
        const validatedData = signupSchema.parse(req.body);
        const { email, password, firstName, lastName } = validatedData;
        
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await userModel.create({
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
            message: "Error creating user",
            error: error.message
        });
    }
});

userRouter.post("/signin", async function(req, res) {
    try {
        // Validate input with Zod
        const validatedData = signinSchema.parse(req.body);
        const { email, password } = validatedData;
        
        const user = await userModel.findOne({
            email: email
        });
        
        if (user) {
            // Compare the provided password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (isPasswordValid) {
                const token = jwt.sign({
                    id: user._id
                }, JWT_USER_SECRET);
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
});

const {auth} = require("../middleware/user");

userRouter.get("/purchases",auth,async function(req, res) {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId: userId
    });
    const coursedata=await courseModel.find({
        _id:{$in:purchases.map(p=>p.courseId)}
    })
    res.json({
        purchases: purchases,
        coursedata:coursedata
    });
});

module.exports = {
    userRouter: userRouter
};