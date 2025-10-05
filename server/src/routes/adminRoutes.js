const express = require('express');
const verifyToken = require('../middleware/authMiddleware.js');
const authRoles=require("../middleware/roleMiddleware.js");
const {getAllEvents,getEventById} = require("../controllers/userController.js");
const {addEvent,updateEvent,deleteEvent} = require("../controllers/adminController.js");
const router=express.Router();




router.get("/events",verifyToken,authRoles("admin"),getAllEvents);
router.get("/events/:id", verifyToken, authRoles("admin"), getEventById);
router.post("/events", verifyToken, authRoles("admin"), addEvent);
router.patch("/events/:id", verifyToken, authRoles("admin"), updateEvent);
router.delete("/events/:id", verifyToken, authRoles("admin"), deleteEvent);




module.exports=router;