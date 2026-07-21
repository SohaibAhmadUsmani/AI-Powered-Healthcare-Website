const doctorService = require("../services/doctorService");

const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getDoctors();
        return res.status(200).json({
            success: true,
            message: "Doctors Fetched Successfully. ",
            data: doctors,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error. "
        });
    }
};


const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorById = await doctorService.getDoctorById(id);

        if (!doctorById) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found. "
            });
        }
        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully. ",
            data: doctorById
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error. "
        })

    }
};

module.exports = {
    getDoctors, getDoctorById
}