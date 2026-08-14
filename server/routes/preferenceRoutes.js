const express = require("express");

const {

getPreferences,

updatePreference

}=require("../controllers/preferenceController");

const router=express.Router();

router.get("/",getPreferences);

router.put("/:id",updatePreference);

module.exports=router;