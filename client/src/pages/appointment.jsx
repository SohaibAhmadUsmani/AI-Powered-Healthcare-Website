import AppointmentForm from "../components/appointment/AppointmentForm";

const Appointment = () => {
  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Book Appointment
        </h1>

        <AppointmentForm />
      </div>
    </div>
  );
};

export default Appointment;