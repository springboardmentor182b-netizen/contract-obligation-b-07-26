const Preference = require("../models/Preference");

// Get all preferences
const getPreferences = async (req,res)=>{

    try{

        const preferences =
        await Preference.find();

        res.json(preferences);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Update preference

const updatePreference = async(req,res)=>{

    try{

        const preference =
        await Preference.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.json(preference);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports={

getPreferences,

updatePreference

};