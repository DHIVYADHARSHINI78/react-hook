
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';

const Nav = styled.nav`
  background: linear-gradient(90deg, #7c3aed, #db2777);
  padding: 0 32px;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 16px rgba(124,58,237,0.25);
  position: sticky;
  top: 0;
  z-index: 100;
`;
const Logo = styled.div`
  color: white; font-size: 1.35rem; font-weight: 800;
  cursor: pointer; letter-spacing: 0.5px;
`;
const Links = styled.div`
  display: flex; gap: 10px; align-items: center;
`;
const NavBtn = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.6);
  color: white; padding: 6px 16px; border-radius: 20px;
  cursor: pointer; font-weight: 700; font-size: 0.85rem;
  font-family: 'Nunito', sans-serif; transition: all 0.2s;
  &:hover { background: white; color: #7c3aed; border-color: white; }
`;
const LogoutBtn = styled.button`
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.4);
  color: white; padding: 6px 16px; border-radius: 20px;
  cursor: pointer; font-weight: 700; font-size: 0.85rem;
  font-family: 'Nunito', sans-serif; transition: all 0.2s;
  &:hover { background: #fee2e2; color: #b91c1c; border-color: #fee2e2; }
`;
const DoctorName = styled.span`
  color: rgba(255,255,255,0.9);
  font-size: 0.85rem;
  font-weight: 700;
`;

function Navbar() {
  const navigate          = useNavigate();         // useNavigate
  const { doctor, logout } = useAppContext();      // useContext

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Don't show navbar on login page (when not logged in)
  if (!doctor) return null;

  return (
    <Nav>
      <Logo onClick={() => navigate('/')}>💉 VacciTrack</Logo>
      <Links>
        <NavBtn onClick={() => navigate('/')}>Dashboard</NavBtn>
        <NavBtn onClick={() => navigate('/patients')}>Patients</NavBtn>
        <NavBtn onClick={() => navigate('/add-patient')}>+ Add Patient</NavBtn>

        {/* React Bootstrap Badge (20%) — shows doctor name */}
        <Badge bg="light" text="dark" style={{ fontSize: '0.82rem', padding: '7px 13px', borderRadius: 20 }}>
          👨‍⚕️ {doctor.name}
        </Badge>

        <DoctorName>{doctor.speciality}</DoctorName>
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </Links>
    </Nav>
  );
}

export default Navbar;
