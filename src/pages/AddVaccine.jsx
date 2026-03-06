
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

function AddVaccine() {
  const { id }               = useParams();     // useParams: get patient id
  const navigate             = useNavigate();   // useNavigate
  const { patients, addVaccine } = useAppContext(); // useContext
  const nameRef              = useRef(null);    // useRef: focus first field

  const [form, setForm] = useState({ name: '', date: '', doctor: '', status: 'Done' }); // useState
  const [success, setSuccess] = useState(false);
  const [error,   setError  ] = useState('');

  // useEffect: focus vaccine name input when page opens
  useEffect(() => { nameRef.current.focus(); }, []);

  const patient = patients.find(p => p.id === parseInt(id));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.doctor) {
      setError('Please fill in all fields.');
      return;
    }
    addVaccine(parseInt(id), form);
    setSuccess(true);
    setError('');
    setTimeout(() => navigate(`/patients/${id}`), 1200);
  };

  if (!patient) return <Page><p style={{ color: 'red' }}>Patient not found!</p></Page>;

  return (
    <Page>
      <BackLink onClick={() => navigate(`/patients/${id}`)}>← Back to {patient.name}</BackLink>
      <Card>
        <Title>💉 Add Vaccine</Title>
        <ForPerson>For: {patient.name}</ForPerson>

        {success && <SuccessBox>✅ Vaccine added! Redirecting...</SuccessBox>}
        {error   && <ErrorBox>⚠️ {error}</ErrorBox>}

      
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Vaccine Name</Form.Label>
            <Form.Control
              ref={nameRef}                  // useRef: auto-focus
              type="text" name="name"
              value={form.name} onChange={handleChange}
              placeholder="e.g. COVID-19, Polio, MMR"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Date Given</Form.Label>
            <Form.Control
              type="date" name="date"
              value={form.date} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Doctor Name</Form.Label>
            <Form.Control
              type="text" name="doctor"
              value={form.doctor} onChange={handleChange}
              placeholder="e.g. Dr. Priya"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: 700 }}>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="Done">Done</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Missed">Missed</option>
            </Form.Select>
          </Form.Group>

          <SaveBtn type="submit" className="w-100">Save Vaccine</SaveBtn>
        </Form>
      </Card>
    </Page>
  );
}

export default AddVaccine;
