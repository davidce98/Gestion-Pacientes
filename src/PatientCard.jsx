import React from "react";

function PatientCard({ patient }) {
    const gravityStyles = {
        Baja: "bg-green-100 border-green-500 text-green-700",
        Regular: "bg-yellow-100 border-yellow-500 text-yellow-700",
        Critica: "bg-red-100 border-red-500 text-red-700",
    };

    return (
        <div className={`p-4 border-l-4 rounded-lg mb-4 ${gravityStyles[patient.gravityStatus]}`}>
            <h3 className="text-xl font-bold">{patient.name}</h3>
            <p className="text-gray-700">Edad: {patient.age}</p>
            <p className="text-gray-700">Síntomas: {patient.symptoms}</p>
            <p className="text-gray-700">Fecha: {patient.date}</p>
            <p className={`font-semibold ${gravityStyles[patient.gravityStatus]}`}>
                Gravedad: {patient.gravityStatus}
            </p>
        </div>
    );
}

export default PatientCard;
