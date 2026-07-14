function DoctorCard({doctor}){
    return(
   <div>
      <img src={doctor.image || "https://placehold.co/300x300" }  alt={doctor.name} />
      <h2>{doctor.name}</h2>
      <p>  {doctor.specialization} </p>
      <p> {doctor.qualification}  </p>
      <p>{ doctor.experience} Years Experience.</p>
      <p> {doctor.rating} </p>
      <p> {doctor.hospital} </p>
      <button>View Details</button>
   </div>
    );
} 

export default DoctorCard