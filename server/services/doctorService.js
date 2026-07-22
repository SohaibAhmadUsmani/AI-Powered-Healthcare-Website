const Doctor = require("../models/Doctor");

const getDoctor = async (id) => {
    const doctor = await Doctor.findById(id);
    return doctor;
}

 const getDoctors = async ({search , specialization , rating, experience}) => {
    const query={};
    if(specialization){
      query.specialization = specialization;
    }
    if(rating){
        query.rating = {$gte: parseFloat(rating)};
    }
    if(experience){
        query.experience = { $gte: parseInt(experience)};
    }
    if(search && search.trim()){
        const regex = new RegExp(search , "i");
      query.$or = [
            { name: regex },
            { specialization: regex },
            { hospital: regex },
            { description: regex }
        ];
    }
    const doctors = await Doctor.find(query);
    return doctors;
 };

 
module.exports = {getDoctors , getDoctor  }