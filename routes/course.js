const {Router} = require("express");
const {auth} = require("../middleware/user");
const courseRouter = Router();
const {courseModel, purchaseModel} = require("../db");
const { z } = require("zod");

// Zod validation schema
const purchaseSchema = z.object({
    courseId: z.string().min(1, "Course ID is required")
});

courseRouter.post("/purchase",auth,async function(req, res) {
    const userId = req.userId;
    
    try {
        // Validate input with Zod
        const validatedData = purchaseSchema.parse(req.body);
        const { courseId } = validatedData;
        
        const purchase = await purchaseModel.create({
            userId: userId,
            courseId: courseId
        });
        res.json({
            message: "Course purchased successfully",
            purchaseId: purchase._id
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors
            });
        }
        res.status(500).json({
            message: "Error purchasing course",
            error: error.message
        });
    }
});
courseRouter.get("/preview",async function(req, res){
    const courses=await courseModel.find({});
    res.json({
        courses: courses
    });
    
});

module.exports = {
    courseRouter: courseRouter
};