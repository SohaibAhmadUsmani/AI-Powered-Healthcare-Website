import { useState } from "react";
import SearchBar from "../../components/doctors/SearchBar";
import doctors from "../../assets/data/doctors"
import DoctorCard from "../../components/doctors/DoctorCard"

function DoctorsList() {
    const [searchTerm, setSearchTerm] = useState("")
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredDoctors = doctors.filter((doctor) => {
        return doctor.name.toLowerCase().includes(lowerCaseSearchTerm) || doctor.specialization.toLowerCase().includes(lowerCaseSearchTerm)
    })
    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div>
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                        />
                    ))
                ) : (
                    <p>No doctors found</p>
                )}
            </div></div>
    );
}

export default DoctorsList