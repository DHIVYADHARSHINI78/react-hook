import React, { useState } from 'react';
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

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 56px;
  }
`;

const Logo = styled.div`
  color: white; font-size: 1.35rem; font-weight: 800;
  cursor: pointer; letter-spacing: 0.5px;
  @media (max-width: 768px) { font-size: 1.1rem; }
`;

const Links = styled.div`
  display: flex; gap: 10px; align-items: center;
  @media (max-width: 768px) { display: none; }
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
  font-size: 0.85rem; font-weight: 700;
  @media (max-width: 1024px) { display: none; }
`;

// ── Hamburger button — visible only on mobile ────────────────
const HamburgerBtn = styled.button`
  display: none;
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.6);
  color: white; border-radius: 8px;
  padding: 6px 10px; cursor: pointer;
  font-size: 1.2rem; line-height: 1;
  @media (max-width: 768px) { display: block; }
`;

// ── Mobile dropdown menu ─────────────────────────────────────
const MobileMenu = styled.div`
  display: ${p => p.$open ? 'flex' : 'none'};
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 56px;
  left: 0; right: 0;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  padding: 16px;
  z-index: 99;
  box-shadow: 0 8px 24px rgba(124,58,237,0.3);
`;

const MobileBtn = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.5);
  color: white; padding: 10px 16px; border-radius: 12px;
  cursor: pointer; font-weight: 700; font-size: 0.9rem;
  font-family: 'Nunito', sans-serif; text-align: left;
  transition: all 0.2s;
  &:hover { background: white; color: #7c3aed; }
`;

const MobileLogoutBtn = styled(MobileBtn)`
  &:hover { background: #fee2e2; color: #b91c1c; border-color: #fee2e2; }
`;

const DoctorBadgeRow = styled.div`
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  color: white; font-size: 0.85rem; font-weight: 700;
`;

function Navbar() {
  const navigate           = useNavigate();        // useNavigate
  const { doctor, logout } = useAppContext();      // useContext
  const [menuOpen, setMenuOpen] = useState(false); // useState: mobile menu toggle

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu after navigation
  };

  if (!doctor) return null;

  return (
    <>
      <Nav>
        <Logo onClick={() => goTo('/')}> VacciTrack</Logo>

        {/* Desktop links — hidden on mobile */}
        <Links>
          <NavBtn onClick={() => goTo('/')}>Dashboard</NavBtn>
          <NavBtn onClick={() => goTo('/patients')}>Patients</NavBtn>
          <NavBtn onClick={() => goTo('/add-patient')}>+ Add Patient</NavBtn>

         
          <Badge bg="light" text="dark"
            style={{ fontSize: '0.82rem', padding: '7px 13px', borderRadius: 20 }}>
            👨‍⚕️ {doctor.name}
          </Badge>

          <DoctorName>{doctor.speciality}</DoctorName>
          <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
        </Links>

        {/* Hamburger — visible only on mobile */}
        <HamburgerBtn onClick={() => setMenuOpen(prev => !prev)}>
          {menuOpen ? '✕' : '☰'}
        </HamburgerBtn>
      </Nav>

      {/* Mobile dropdown menu */}
      <MobileMenu $open={menuOpen}>
        <DoctorBadgeRow>
           {doctor.name}
          <span style={{ opacity: 0.75, fontWeight: 400 }}>· {doctor.speciality}</span>
        </DoctorBadgeRow>
        <MobileBtn onClick={() => goTo('/')}> Dashboard</MobileBtn>
        <MobileBtn onClick={() => goTo('/patients')}> Patients</MobileBtn>
        <MobileBtn onClick={() => goTo('/add-patient')}> Add Patient</MobileBtn>
        <MobileLogoutBtn onClick={handleLogout}> Logout</MobileLogoutBtn>
      </MobileMenu>
    </>
  );
}

export default Navbar;