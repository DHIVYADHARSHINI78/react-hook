
import React from 'react';
import styled from 'styled-components';

const ActionBtn = styled.button`
  background: ${p => p.$variant === 'danger' ? '#fee2e2' : '#ede9fe'};
  color:       ${p => p.$variant === 'danger' ? '#b91c1c' : '#7c3aed'};
  border: none; padding: 5px 13px; border-radius: 12px;
  cursor: pointer; font-weight: 700; font-size: 0.82rem;
  font-family: 'Nunito', sans-serif; margin-left: 6px;
  &:hover { opacity: 0.8; }
  @media (max-width: 360px) { padding: 4px 10px; font-size: 0.78rem; }
`;
const Tr = styled.tr`
  border-bottom: 1px solid #f3f0ff;
  &:hover { background: #faf7ff; }
`;
const Td = styled.td`
  padding: 11px 14px; font-size: 0.88rem; color: #374151;
`;
const GenderBadge = styled.span`
  padding: 3px 12px; border-radius: 12px;
  font-size: 0.78rem; font-weight: 700;
  background: ${p => p.$g === 'Male' ? '#dbeafe' : '#fce7f3'};
  color:      ${p => p.$g === 'Male' ? '#1e40af' : '#9d174d'};
`;

const PatientRow = React.memo(({ p, i, onDelete, onNavigate }) => (
  <Tr style={{ cursor: 'pointer' }}>
    <Td>{i + 1}</Td>
    <Td
      onClick={() => onNavigate(`/patients/${p.id}`)}
      style={{ color: '#7c3aed', fontWeight: 700 }}
    >
      {p.name}
    </Td>
    <Td>{p.age}</Td>
    <Td><GenderBadge $g={p.gender}>{p.gender}</GenderBadge></Td>
    <Td>{p.blood}</Td>
    <Td>{p.phone}</Td>
    <Td>{p.vaccines.length}</Td>
    <Td>{p.prescriptions.length}</Td>
    <Td>
      <ActionBtn onClick={() => onNavigate(`/patients/${p.id}`)}>View</ActionBtn>
      <ActionBtn onClick={() => onNavigate(`/edit-patient/${p.id}`)}>Edit</ActionBtn>
      <ActionBtn $variant="danger" onClick={e => onDelete(e, p.id, p.name)}>Delete</ActionBtn>
    </Td>
  </Tr>
));

export default PatientRow;
