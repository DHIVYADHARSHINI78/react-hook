
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button as BsBtn } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';

// ---------- Styled Components (80%) ----------
const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf4ff 0%, #f0f4ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 44px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(124,58,237,0.15);
`;

const Logo = styled.div`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  color: #7c3aed;
  margin-bottom: 4px;
`;

const SubTitle = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 28px;
`;

const ErrorBox = styled.div`
  background: #fee2e2;
  color: #991b1b;
  border-radius: 10px;
  padding: 11px 16px;
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
`;

const HintBox = styled.div`
  background: #f3f0ff;
  border-radius: 12px;
  padding: 14px 18px;
  margin-top: 22px;
`;

const HintTitle = styled.p`
  font-weight: 800;
  color: #7c3aed;
  font-size: 0.85rem;
  margin-bottom: 8px;
`;

const HintRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: #555;
  padding: 3px 0;
  border-bottom: 1px solid #ede9fe;
  &:last-child { border-bottom: none; }
`;

const SaveBtn = styled(BsBtn)`
  background: linear-gradient(90deg, #7c3aed, #db2777) !important;
  border: none !important;
  border-radius: 24px !important;
  font-weight: 800 !important;
  font-size: 1rem !important;
  padding: 11px !important;
  font-family: 'Nunito', sans-serif !important;
  margin-top: 4px;
`;
// ---------- End Styled Components ----------

function Login() {
  const navigate       = useNavigate();          // useNavigate: go to dashboard on success
  const { login }      = useAppContext();         // useContext: login function

  const [form, setForm]   = useState({ email: '', password: '' }); // useState: form fields
  const [error, setError] = useState('');                           // useState: error message

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter email and password.');
      return;
    }
    const success = login(form.email, form.password);
    if (success) {
      navigate('/');       // useNavigate: redirect to dashboard
    } else {
      setError('Wrong email or password. Check the hints below.');
    }
  };

  return (
    <Page>
      <Card>
        <Logo>💉</Logo>
        <Title>VacciTrack</Title>
        <SubTitle>Doctor Login — Clinic Management</SubTitle>

        {error && <ErrorBox>⚠️ {error}</ErrorBox>}

        {/* React Bootstrap Form (20%) */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 700 }}>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. priya@clinic.com"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: 700 }}>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </Form.Group>

          <SaveBtn type="submit" className="w-100">Login →</SaveBtn>
        </Form>

        {/* Dummy credentials hint for beginners */}
        <HintBox>
          <HintTitle>🔑 Test Accounts</HintTitle>
          <HintRow><span>priya@clinic.com</span>  <span>priya123</span></HintRow>
          <HintRow><span>raj@clinic.com</span>    <span>raj123</span></HintRow>
          <HintRow><span>anjali@clinic.com</span> <span>anjali123</span></HintRow>
        </HintBox>
      </Card>
    </Page>
  );
}

export default Login;
