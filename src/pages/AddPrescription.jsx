import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button as BsBtn } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';

const Page = styled.div`max-width: 520px; margin: 0 auto; padding: 32px 20px;`;
const Card = styled.div`
  background: white; border-radius: 20px; padding: 32px;
  box-shadow: 0 4px 24px rgba(124,58,237,0.12);
`;
const Title = styled.h2`
  font-size: 1.5rem; font-weight: 800; color: #7c3aed;
  text-align: center; margin-bottom: 6px;
`;
const ForPerson = styled.p`
  text-align: center; color: #db2777; font-weight: 700;
  margin-bottom: 24px; font-size: 0.95rem;
`;
const SuccessBox = styled.div`
  background: #d1fae5; color: #065f46; border-radius: 10px;
  padding: 12px 18px; text-align: center; font-weight: 700; margin-bottom: 18px;
`;
const ErrorBox = styled.div`
  background: #fee2e2; color: #991b1b; border-radius: 10px;
  padding: 12px 18px; margin-bottom: 18px; font-weight: 600;
`;
const BackLink = styled.button`
  background: none; border: none; color: #7c3aed;
  font-weight: 700; cursor: pointer; margin-bottom: 20px;
  font-family: 'Nunito', sans-serif; font-size: 0.95rem; padding: 0;
  &:hover { text-decoration: underline; }
`;
const SaveBtn = styled(BsBtn)`
  background: linear-gradient(90deg, #7c3aed, #db2777) !important;
  border: none !important; border-radius: 24px !important;
  font-weight: 800 !important; font-size: 1rem !important;
  padding: 11px !important; font-family: 'Nunito', sans-serif !important;
`;

function AddPrescription() {
  const { id }                    = useParams();     // useParams: patient id from URL
  const navigate                  = useNavigate();   // useNavigate
  const { patients, addPrescription } = useAppContext(); // useContext
  const medicineRef               = useRef(null);    // useRef: focus first field

  const [form, setForm] = useState({ medicine: '', dosage: '', duration: '' }); // useState
  const [success, setSuccess] = useState(false);
  const [error,   setError  ] = useState('');

  // useEffect: auto-focus medicine input when page opens
  useEffect(() => { medicineRef.current.focus(); }, []);

  const patient = patients.find(p => p.id === parseInt(id));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.medicine || !form.dosage || !form.duration) {
      setError('Please fill in all fields.');
      return;
    }
    addPrescription(parseInt(id), form);
    setSuccess(true);
    setError('');
    setTimeout(() => navigate(`/patients/${id}`), 1200);
  };

  if (!patient) return <Page><p style={{ color: 'red' }}>Patient not found!</p></Page>;

  return (
    <Page>
      <BackLink onClick={() => navigate(`/patients/${id}`)}>← Back to {patient.name}</BackLink>
      <Card>
        <Title>📋 Add Prescription</Title>
        <ForPerson>For: {patient.name}</ForPerson>

        {success && <SuccessBox>✅ Prescription added! Redirecting...</SuccessBox>}
        {error   && <ErrorBox>⚠️ {error}</ErrorBox>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Medicine Name</Form.Label>
            <Form.Control
              ref={medicineRef}              // useRef: auto-focus
              type="text" name="medicine"
              value={form.medicine} onChange={handleChange}
              placeholder="e.g. Paracetamol, Metformin"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Dosage</Form.Label>
            <Form.Control
              type="text" name="dosage"
              value={form.dosage} onChange={handleChange}
              placeholder="e.g. 500mg, 10ml"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: 700 }}>Duration</Form.Label>
            <Form.Control
              type="text" name="duration"
              value={form.duration} onChange={handleChange}
              placeholder="e.g. 7 days, 1 month"
            />
          </Form.Group>

          <SaveBtn type="submit" className="w-100">Save Prescription</SaveBtn>
        </Form>
      </Card>
    </Page>
  );
}

export default AddPrescription;
