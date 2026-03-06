
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import PatientRow from './PatientRow';

const Page = styled.div`
  max-width: 1000px; margin: 0 auto; padding: 32px 20px;
  @media (max-width: 768px) { padding: 16px 12px; }
  @media (max-width: 360px) { padding: 12px 8px; }
`;
const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  @media (max-width: 480px) { gap: 10px; margin-bottom: 16px; }
`;
const Title = styled.h2`
  font-size: 1.7rem; font-weight: 800; color: #7c3aed; margin: 0;
  @media (max-width: 768px) { font-size: 1.4rem; }
  @media (max-width: 480px) { font-size: 1.2rem; }
`;
const Right = styled.div`
  display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  @media (max-width: 480px) { width: 100%; }
`;
const SearchBox = styled.input`
  padding: 9px 18px; border: 2px solid #e5d7ff;
  border-radius: 24px; font-size: 0.9rem; width: 220px;
  outline: none; font-family: 'Nunito', sans-serif;
  &:focus { border-color: #7c3aed; }
  @media (max-width: 480px) { width: 100%; }
  @media (max-width: 360px) { font-size: 0.85rem; padding: 8px 14px; }
`;
const AddBtn = styled.button`
  background: linear-gradient(90deg, #7c3aed, #db2777);
  border: none; color: white; padding: 9px 22px;
  border-radius: 24px; cursor: pointer; font-weight: 800;
  font-size: 0.88rem; font-family: 'Nunito', sans-serif;
  &:hover { opacity: 0.88; }
  @media (max-width: 480px) { width: 100%; padding: 10px; text-align: center; }
`;
const Empty = styled.p`
  text-align: center; color: #bbb; margin: 40px 0;
  font-size: 1rem;
`;
const TableWrapper = styled.div`
  width: 100%; overflow-x: auto;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
`;
const StyledTable = styled.table`
  width: 100%; border-collapse: collapse; min-width: 600px;
`;
const Thead = styled.thead`
  background: linear-gradient(90deg, #7c3aed, #db2777);
  color: white;
`;
const Th = styled.th`
  padding: 12px 14px; font-size: 0.85rem;
  font-weight: 700; text-align: left; white-space: nowrap;
`;

// ── PatientList — parent component ───────────────────────────
function PatientList() {
  const { patients, deletePatient } = useAppContext();  // useContext
  const navigate  = useNavigate();                       // useNavigate
  const [query, setQuery] = useState('');                // useState
  const searchRef = useRef(null);                        // useRef

  // useEffect: auto-focus search on page open
  useEffect(() => { searchRef.current.focus(); }, []);

  // useMemo: filter patients
  const filtered = useMemo(() =>
    patients.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query)
    ),
  [patients, query]);

  // useCallback: stable ref — passed as prop to React.memo PatientRow
  const handleDelete = useCallback((e, id, name) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${name}? This cannot be undone.`)) {
      deletePatient(id);
    }
  }, [deletePatient]);

  // useCallback: stable navigate — passed as prop to React.memo PatientRow
  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <Page>
      <Header>
        <Title>🧑‍⚕️ All Patients</Title>
        <Right>
          <SearchBox
            ref={searchRef}
            placeholder="Search name / phone..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <AddBtn onClick={() => navigate('/add-patient')}>+ Add Patient</AddBtn>
        </Right>
      </Header>

      {filtered.length === 0
        ? <Empty>No patients found.</Empty>
        : (
          <TableWrapper>
            <StyledTable>
              <Thead>
                <tr>
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Age</Th>
                  <Th>Gender</Th>
                  <Th>Blood</Th>
                  <Th>Phone</Th>
                  <Th>💉 Vaccines</Th>
                  <Th>📋 Rx</Th>
                  <Th>Actions</Th>
                </tr>
              </Thead>
              <tbody>
                {filtered.map((p, i) => (
                  <PatientRow
                    key={p.id}
                    p={p}
                    i={i}
                    onDelete={handleDelete}
                    onNavigate={handleNavigate}
                  />
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        )
      }
    </Page>
  );
}

export default PatientList;
