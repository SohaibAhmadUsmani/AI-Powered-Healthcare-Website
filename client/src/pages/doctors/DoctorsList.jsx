import doctors from "../../assets/data/doctors"
import DoctorCard from "../../components/doctors/DoctorCard"

function DoctorsList(){

    return(
        <div>
           {doctors.map((doctor)=>(
            <DoctorCard key={doctor.id} doctor={doctor} />
           ))}
        </div>
    );
}

export default DoctorsList