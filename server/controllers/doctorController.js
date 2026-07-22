const doctorService = require("../services/doctorService");


const getDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorService.getDoctor(id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found. "
            });
        }
        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully. ",
            data: doctor
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error. "
        })

    }
};

const getDoctors= async (req , res) => {
    try{
      const {search , specialization , experience, rating} = req.query;
      const doctors = await doctorService.getDoctors({search,specialization,rating,experience });
        
        if (doctors.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No doctors found.",
                data: [],
            });
        }
       return res.status(200).json({
            success: true,
            message: "Doctors retrieved successfully. ",
            data: doctors
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error. "
        })}  
};

module.exports = {
    getDoctors, getDoctor
}