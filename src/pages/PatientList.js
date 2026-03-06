// ============================================================
// PatientList.js
// Hooks: useContext, useState, useMemo, useCallback, useRef, useEffect, useNavigate
// UI: styled-components (80%) + Semantic UI Table (20%)
// ============================================================
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Label } from 'semantic-ui-react';
import { useAppContext } from '../context/AppContext';

const Page = styled.div`max-width: 1000px; margin: 0 auto; padding: 32px 20px;`;
const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
`;
const Title = styled.h2`font-size: 1.7rem; font-weight: 800; color: #7c3aed; margin: 0;`;
const Right = styled.div`display: flex; gap: 10px; align-items: center; flex-wrap: wrap;`;
const SearchBox = styled.input`
  padding: 9px 18px; border: 2px solid #e5d7ff;
  border-radius: 24px; font-size: 0.9rem; width: 220px;
  outline: none; font-family: 'Nunito', sans-serif;
  &:focus { border-color: #7c3aed; }
`;
const AddBtn = styled.button`
  background: linear-gradient(90deg, #7c3aed, #db2777);
  border: none; color: white; padding: 9px 22px;
  border-radius: 24px; cursor: pointer; font-weight: 800;
  font-size: 0.88rem; font-family: 'Nunito', sans-serif;
  &:hover { opacity: 0.88; }
`;
const ActionBtn = styled.button`
  background: ${p => p.variant === 'danger' ? '#fee2e2' : '#ede9fe'};
  color:       ${p => p.variant === 'danger' ? '#b91c1c' : '#7c3aed'};
  border: none; padding: 5px 13px; border-radius: 12px;
  cursor: pointer; font-weight: 700; font-size: 0.82rem;
  font-family: 'Nunito', sans-serif; margin-left: 6px;
  &:hover { opacity: 0.8; }
`;
const Empty = styled.p`text-align: center; color: #bbb; margin: 40px 0;`;

// ============================================================
// PatientRow — child component
// React.memo: only re-renders if its own props change
// This is what makes useCallback genuinely useful here —
// onDelete and onNavigate are passed as props from parent
// ============================================================
const PatientRow = React.memo(({ p, i, onDelete, onNavigate }) => (
  <Table.Row key={p.id} style={{ cursor: 'pointer' }}>
    <Table.Cell>{i + 1}</Table.Cell>
    <Table.Cell
      onClick={() => onNavigate(`/patients/${p.id}`)}
      style={{ color: '#7c3aed', fontWeight: 700 }}
    >
      {p.name}
    </Table.Cell>
    <Table.Cell>{p.age}</Table.Cell>
    <Table.Cell>
      <Label color={p.gender === 'Male' ? 'blue' : 'pink'} size="small">
        {p.gender}
      </Label>
    </Table.Cell>
    <Table.Cell>{p.blood}</Table.Cell>
    <Table.Cell>{p.phone}</Table.Cell>
    <Table.Cell>{p.vaccines.length}</Table.Cell>
    <Table.Cell>{p.prescriptions.length}</Table.Cell>
    <Table.Cell>
      <ActionBtn onClick={() => onNavigate(`/patients/${p.id}`)}>View</ActionBtn>
      <ActionBtn onClick={() => onNavigate(`/edit-patient/${p.id}`)}>Edit</ActionBtn>
      <ActionBtn variant="danger" onClick={e => onDelete(e, p.id, p.name)}>Delete</ActionBtn>
    </Table.Cell>
  </Table.Row>
));

// ============================================================
// PatientList — parent component
// ============================================================
function PatientList() {
  const { patients, deletePatient } = useAppContext();  // useContext
  const navigate  = useNavigate();                       // useNavigate
  const [query, setQuery] = useState('');                // useState: search
  const searchRef = useRef(null);                        // useRef

  // useEffect: auto-focus search on page open
  useEffect(() => { searchRef.current.focus(); }, []);

  // useMemo: filter patients — only reruns when patients or query changes
  const filtered = useMemo(() =>
    patients.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query)
    ),
  [patients, query]);

  // useCallback: stable function — passed as prop to PatientRow child
  // without useCallback, PatientRow would re-render on every keystroke
  const handleDelete = useCallback((e, id, name) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${name}? This cannot be undone.`)) {
      deletePatient(id);
    }
  }, [deletePatient]);

  // useCallback: stable navigate function — passed as prop to PatientRow child
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
          <Table celled selectable style={{ borderRadius: 14, overflow: 'hidden' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Blood</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>💉 Vaccines</Table.HeaderCell>
                <Table.HeaderCell>📋 Rx</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* PatientRow is a child component — onDelete + onNavigate are props */}
              {filtered.map((p, i) => (
                <PatientRow
                  key={p.id}
                  p={p}
                  i={i}
                  onDelete={handleDelete}      
                  onNavigate={handleNavigate}  
                />
              ))}
            </Table.Body>
          </Table>
        )
      }
    </Page>
  );
}

export default PatientList;
