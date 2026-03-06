
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { AppProvider }     from './context/AppContext';
import ProtectedRoute      from './components/ProtectedRoute';
import Navbar              from './components/Navbar';
import Login               from './pages/Login';
import Dashboard           from './pages/Dashboard';
import PatientList         from './pages/PatientList';
import PatientDetail       from './pages/PatientDetail';
import AddPatient          from './pages/AddPatient';
import EditPatient         from './pages/EditPatient';
import AddVaccine          from './pages/AddVaccine';
import AddPrescription     from './pages/AddPrescription';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf4ff 0%, #f0f4ff 100%);
  font-family: 'Nunito', sans-serif;
`;

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Wrapper>
          <Navbar />
          <Routes>
            {/* Public route — no login needed */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes — must be logged in */}
            <Route path="/" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            }/>
            <Route path="/patients" element={
              <ProtectedRoute><PatientList /></ProtectedRoute>
            }/>
            <Route path="/patients/:id" element={
              <ProtectedRoute><PatientDetail /></ProtectedRoute>
            }/>
            <Route path="/add-patient" element={
              <ProtectedRoute><AddPatient /></ProtectedRoute>
            }/>
            <Route path="/edit-patient/:id" element={
              <ProtectedRoute><EditPatient /></ProtectedRoute>
            }/>
            <Route path="/add-vaccine/:id" element={
              <ProtectedRoute><AddVaccine /></ProtectedRoute>
            }/>
            <Route path="/add-prescription/:id" element={
              <ProtectedRoute><AddPrescription /></ProtectedRoute>
            }/>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
