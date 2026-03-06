
import React, { createContext, useContext, useState, useEffect } from 'react'; // ✅ added useEffect

const AppContext = createContext();

const DOCTORS = [
  { id: 1, email: 'priya@clinic.com',  password: 'priya123',  name: 'Dr. Priya',  speciality: 'General Physician' },
  { id: 2, email: 'raj@clinic.com',    password: 'raj123',    name: 'Dr. Raj',    speciality: 'Pediatrician'       },
  { id: 3, email: 'anjali@clinic.com', password: 'anjali123', name: 'Dr. Anjali', speciality: 'Cardiologist'       },
];

// ── Helper: load patients from localStorage on first render ─
const loadPatients = () => {
  try {
    const stored = localStorage.getItem('vaccitrack_patients');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const AppProvider = ({ children }) => {

  // ── Auth state ───────────────────────────────────────────
  const [doctor, setDoctor] = useState(null);

  const login = (email, password) => {
    const found = DOCTORS.find(d => d.email === email && d.password === password);
    if (found) { setDoctor(found); return true; }
    return false;
  };

  const logout = () => setDoctor(null);

  // ── Patients state — loads from localStorage on first render
  const [patients, setPatients] = useState(loadPatients);

  // ✅ useEffect: auto-saves patients to localStorage whenever patients state changes
  useEffect(() => {
    localStorage.setItem('vaccitrack_patients', JSON.stringify(patients));
  }, [patients]); // ← runs every time patients array changes

  // ── CRUD — only setPatients needed, useEffect handles saving ─
  const addPatient = (data) => {
    setPatients(prev => [...prev, { ...data, id: Date.now(), vaccines: [], prescriptions: [] }]);
  };

  const updatePatient = (id, data) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePatient = (id) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const addVaccine = (patientId, vaccine) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId
        ? { ...p, vaccines: [...p.vaccines, { ...vaccine, id: Date.now() }] }
        : p
    ));
  };

  const addPrescription = (patientId, prescription) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId
        ? { ...p, prescriptions: [...p.prescriptions, { ...prescription, id: Date.now() }] }
        : p
    ));
  };

  return (
    <AppContext.Provider value={{
      doctor, login, logout,
      patients, addPatient, updatePatient, deletePatient, addVaccine, addPrescription,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);