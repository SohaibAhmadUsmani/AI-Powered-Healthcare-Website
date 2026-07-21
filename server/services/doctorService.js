const Doctor = require("../models/Doctor");


const getDoctors= async () => {
    const doctors = await Doctor.find();
    return doctors;
    
}

const getDoctorById = async (id) => {
    const doctorById = await Doctor.findById(id);
    return doctorById;
}

module.exports = {getDoctors , getDoctorById}