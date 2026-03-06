// ============================================================
// EditPatient.js
// Hooks: useParams, useContext, useState, useNavigate, useMemo
// UI: styled-components (80%) + React Bootstrap Form (20%)
// ============================================================
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button as BsBtn, Row, Col } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';

const Page = styled.div`max-width: 600px; margin: 0 auto; padding: 32px 20px;`;
const Card = styled.div`
  background: white; border-radius: 20px; padding: 32px;
  box-shadow: 0 4px 24px rgba(124,58,237,0.12);
`;
const Title = styled.h2`
  font-size: 1.5rem; font-weight: 800; color: #7c3aed;
  text-align: center; margin-bottom: 6px;
`;
const SubTitle = styled.p`
  text-align: center; color: #aaa; font-size: 0.9rem; margin-bottom: 24px;
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
const NotFound = styled.div`
  text-align: center; color: #db2777; font-size: 1.2rem; margin-top: 80px;
`;

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function EditPatient() {
  const { id }                     = useParams();     // useParams: get patient id
  const navigate                   = useNavigate();   // useNavigate
  const { patients, updatePatient } = useAppContext(); // useContext


  const patient = patients.find(p => p.id === parseInt(id));

  // useState: pre-fill form with existing patient data
  const [form, setForm] = useState(patient ? {
    name: patient.name, age: patient.age, gender: patient.gender,
    blood: patient.blood, phone: patient.phone, address: patient.address,
  } : {});

  const [success, setSuccess] = useState(false);
  const [error,   setError  ] = useState('');

  if (!patient) return <NotFound>❌ Patient not found!</NotFound>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone || !form.address) {
      setError('Please fill in all fields.');
      return;
    }
    updatePatient(patient.id, { ...form, age: parseInt(form.age) });
    setSuccess(true);
    setError('');
    setTimeout(() => navigate(`/patients/${patient.id}`), 1200);
  };

  return (
    <Page>
      <BackLink onClick={() => navigate(`/patients/${patient.id}`)}>← Back</BackLink>
      <Card>
        <Title>✏️ Edit Patient</Title>
        <SubTitle>Update details for <strong>{patient.name}</strong></SubTitle>

        {success && <SuccessBox>✅ Updated successfully! Redirecting...</SuccessBox>}
        {error   && <ErrorBox>⚠️ {error}</ErrorBox>}

        {/* React Bootstrap Form (20%) */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Full Name</Form.Label>
            <Form.Control
              type="text" name="name"
              value={form.name} onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label style={{ fontWeight: 700 }}>Age</Form.Label>
              <Form.Control
                type="number" name="age" min="1" max="120"
                value={form.age} onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: 700 }}>Gender</Form.Label>
              <Form.Select name="gender" value={form.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: 700 }}>Blood Group</Form.Label>
              <Form.Select name="blood" value={form.blood} onChange={handleChange}>
                {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Phone Number</Form.Label>
            <Form.Control
              type="tel" name="phone"
              value={form.phone} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: 700 }}>Address</Form.Label>
            <Form.Control
              as="textarea" rows={2} name="address"
              value={form.address} onChange={handleChange}
            />
          </Form.Group>

          <SaveBtn type="submit" className="w-100">Save Changes</SaveBtn>
        </Form>
      </Card>
    </Page>
  );
}

export default EditPatient;
