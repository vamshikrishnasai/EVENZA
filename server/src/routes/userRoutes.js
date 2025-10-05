const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router=express.Router();
const authRoles=require("../middleware/roleMiddleware");

const {getAllEvents,getEventById}=require("../controllers/userController");

router.get("/events", verifyToken, authRoles("user", "admin"), getAllEvents);
router.get("/events/:id", verifyToken, authRoles("user", "admin"), getEventById);



module.exports=router;