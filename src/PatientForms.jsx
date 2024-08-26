import React, { useState } from "react";
import PatientCard from "./PatientCard";

function PatientForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [date, setDate] = useState('');
    const [pacientes, setPaciente] = useState([]);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!name) tempErrors.name = "Nombre es requerido.";
        if (!age) tempErrors.age = "Edad es requerida.";
        if (!symptoms) tempErrors.symptoms = "Síntomas son requeridos.";
        if (!date) tempErrors.date = "Fecha es requerida.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const lowGravity = ["fiebre", "tos", "congestion", "dolor de cabeza"];
    const regularGravity = ["falta de aliento", "dolor de pecho"];
    const criticalGravity = ["inconsciente", "dolor fuerte", "sangrado"];

    const determineGravityStatus = (symptoms) => {
        const lowerCaseSymptoms = symptoms.toLowerCase();
        if (criticalGravity.some(symptom => lowerCaseSymptoms.includes(symptom))) {
            return "Critica";
        } else if (regularGravity.some(symptom => lowerCaseSymptoms.includes(symptom))) {
            return "Regular";
        } else if (lowGravity.some(symptom => lowerCaseSymptoms.includes(symptom))) {
            return "Baja";
        } else {
            return "Evaluar al paciente";
        }
    };

    const addPatient = (evento) => {
        evento.preventDefault();
        if (validate()) {
            let gravityStatus = determineGravityStatus(symptoms);
            let entryPatients = { name, age, symptoms, date, gravityStatus };
            setPaciente([...pacientes, entryPatients]);
            setName('');
            setAge('');
            setSymptoms('');
            setDate('');
            setErrors({});
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <form onSubmit={addPatient} className="space-y-4">
                <h2 className="text-2xl font-bold">Registro de pacientes</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Edad</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Síntomas</label>
                    <textarea
                        value={symptoms}
                        placeholder="Describa sus síntomas"
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.symptoms && <p className="text-red-500 text-xs mt-1">{errors.symptoms}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                    Submit
                </button>
            </form>

            <div className="mt-6 space-y-4">
                {pacientes.map((patient, index) => (
                    <PatientCard key={index} patient={patient} />
                ))}
            </div>
        </div>
    );
}

export default PatientForm;
