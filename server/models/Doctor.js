const mongoose = require("mongoose");
 
const doctorSchema = new mongoose.Schema(
    {
        name : {type : String , required : true , trim : true , minlength:2},
        specialization : {type : String , required : true, trim : true},
        qualification : {type : String , required : true, trim : true},
        experience : {type : Number, required : true , min :0},
        rating : {type : Number , required : true , min : 0 , max: 5},
        reviews : {type : Number , required : true , min:0},
        hospital : {type : String , required : true, trim : true},
        institute : {type : String , required : true, trim : true},
        research : {type : String , required : true, trim : true},
        availability : {type : String , required : true, trim : true},
        image : {type : String , required : true, trim : true},
        description : {type : String , required : true, trim : true , minlength:20},
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model( "Doctor", doctorSchema);