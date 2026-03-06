
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tag, Table } from 'antd';
import { useAppContext } from '../context/AppContext';

const Page = styled.div`
  max-width: 860px; margin: 0 auto; padding: 32px 20px;
  @media (max-width: 768px) { padding: 16px 12px; }
  @media (max-width: 360px) { padding: 12px 8px; }
`;
const BackBtn = styled.button`
  background: none; border: 2px solid #7c3aed; color: #7c3aed;
  padding: 7px 18px; border-radius: 20px; cursor: pointer;
  font-weight: 700; font-family: 'Nunito', sans-serif; margin-bottom: 22px;
  &:hover { background: #7c3aed; color: white; }
  @media (max-width: 768px) { padding: 6px 14px; font-size: 0.85rem; margin-bottom: 16px; }
  @media (max-width: 360px) { padding: 5px 12px; font-size: 0.8rem; }
`;
const ProfileCard = styled.div`
  background: white; border-radius: 18px; padding: 28px; margin-bottom: 22px;
  box-shadow: 0 2px 14px rgba(124,58,237,0.1);
  display: flex; justify-content: space-between;
  align-items: flex-start; flex-wrap: wrap; gap: 16px;
  @media (max-width: 768px) { padding: 18px; flex-direction: column; gap: 14px; }
  @media (max-width: 480px) { padding: 14px; border-radius: 14px; }
  @media (max-width: 360px) { padding: 12px; gap: 12px; }
`;
const ProfileLeft = styled.div`
  display: flex; gap: 20px; align-items: center;
  @media (max-width: 480px) { gap: 12px; }
  @media (max-width: 360px) { gap: 10px; }
`;
const Avatar = styled.div`
  width: 70px; height: 70px; border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; flex-shrink: 0;
  @media (max-width: 480px) { width: 52px; height: 52px; font-size: 1.5rem; }
  @media (max-width: 360px) { width: 44px; height: 44px; font-size: 1.3rem; }
`;
const PatientName = styled.h2`
  font-size: 1.5rem; font-weight: 800; color: #222; margin: 0 0 4px;
  @media (max-width: 768px) { font-size: 1.3rem; }
  @media (max-width: 480px) { font-size: 1.1rem; }
  @media (max-width: 360px) { font-size: 1rem; }
`;
const InfoText = styled.p`
  color: #888; font-size: 0.88rem; margin: 2px 0;
  @media (max-width: 480px) { font-size: 0.82rem; }
  @media (max-width: 360px) { font-size: 0.78rem; }
`;
const ProfileRight = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap;
  @media (max-width: 768px) { width: 100%; justify-content: flex-start; gap: 8px; }
  @media (max-width: 360px) { gap: 6px; }
`;

// ✅ $variant — transient prop (no DOM warning)
const ActionBtn = styled.button`
  background: ${p => p.$variant === 'danger' ? '#fee2e2' : p.$variant === 'green' ? '#d1fae5' : '#ede9fe'};
  color:       ${p => p.$variant === 'danger' ? '#b91c1c' : p.$variant === 'green' ? '#065f46' : '#7c3aed'};
  border: none; padding: 9px 18px; border-radius: 20px;
  cursor: pointer; font-weight: 700; font-size: 0.88rem;
  font-family: 'Nunito', sans-serif;
  &:hover { opacity: 0.8; }
  @media (max-width: 768px) { padding: 8px 14px; font-size: 0.85rem; }
  @media (max-width: 480px) { padding: 7px 12px; font-size: 0.8rem; border-radius: 14px; }
  @media (max-width: 360px) { padding: 6px 10px; font-size: 0.76rem; }
`;
const Section = styled.div`
  background: white; border-radius: 18px; padding: 24px;
  margin-bottom: 22px; box-shadow: 0 2px 14px rgba(124,58,237,0.07);
  @media (max-width: 768px) { padding: 16px 12px; border-radius: 14px; margin-bottom: 16px; }
  @media (max-width: 480px) { padding: 14px 10px; border-radius: 12px; }
  @media (max-width: 360px) { padding: 12px 8px; }
`;
const SectionHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #f3f0ff;
  @media (max-width: 480px) { flex-direction: column; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
  @media (max-width: 360px) { gap: 8px; padding-bottom: 8px; }
`;
const SectionTitle = styled.h3`
  font-size: 1.05rem; font-weight: 800; color: #7c3aed; margin: 0;
  @media (max-width: 768px) { font-size: 1rem; }
  @media (max-width: 480px) { font-size: 0.95rem; }
  @media (max-width: 360px) { font-size: 0.9rem; }
`;
const AddSmallBtn = styled.button`
  background: linear-gradient(90deg, #7c3aed, #db2777);
  border: none; color: white; padding: 6px 16px; border-radius: 18px;
  cursor: pointer; font-weight: 800; font-size: 0.82rem;
  font-family: 'Nunito', sans-serif; white-space: nowrap;
  &:hover { opacity: 0.88; }
  @media (max-width: 480px) { width: 100%; padding: 9px; text-align: center; border-radius: 12px; }
  @media (max-width: 360px) { padding: 8px; font-size: 0.78rem; }
`;
const NotFound = styled.div`
  text-align: center; color: #db2777; margin-top: 80px; font-size: 1.2rem;
  @media (max-width: 480px) { font-size: 1rem; margin-top: 50px; }
`;

const vaccineColumns = [
  { title: 'Vaccine', dataIndex: 'name',   key: 'name',   render: t => <strong>{t}</strong> },
  { title: 'Date',    dataIndex: 'date',   key: 'date'    },
  { title: 'Doctor',  dataIndex: 'doctor', key: 'doctor', responsive: ['md'] },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: s => (
      <Tag color={s === 'Done' ? 'green' : s === 'Upcoming' ? 'blue' : 'red'}>{s}</Tag>
    ),
  },
];

const rxColumns = [
  { title: 'Medicine', dataIndex: 'medicine', key: 'medicine', render: t => <strong>{t}</strong> },
  { title: 'Dosage',   dataIndex: 'dosage',   key: 'dosage'   },
  { title: 'Duration', dataIndex: 'duration', key: 'duration', responsive: ['md'] },
];

function PatientDetail() {
  const { id }                      = useParams();      // useParams
  const navigate                    = useNavigate();    // useNavigate
  const { patients, deletePatient } = useAppContext();  // useContext

  // ✅ useMemo: find patient only when patients or id changes
  const patient = useMemo(
    () => patients.find(p => p.id === parseInt(id)),
    [patients, id]
  );

  // ✅ Guard: no patient found → show error
  if (!patient) return <NotFound>❌ Patient not found!</NotFound>;

  const handleDelete = () => {
    if (window.confirm(`Delete ${patient.name}? This cannot be undone.`)) {
      deletePatient(patient.id);
      navigate('/patients');
    }
  };

  return (
    <Page>
      <BackBtn onClick={() => navigate('/patients')}>← Back</BackBtn>

      <ProfileCard>
        <ProfileLeft>
          <Avatar>{patient.gender === 'Male' ? '👨' : '👩'}</Avatar>
          <div>
            <PatientName>{patient.name}</PatientName>
            <InfoText>Age: {patient.age} · {patient.gender} · Blood: <strong>{patient.blood}</strong></InfoText>
            <InfoText>📞 {patient.phone}</InfoText>
            <InfoText>📍 {patient.address}</InfoText>
          </div>
        </ProfileLeft>
        <ProfileRight>
          {/* ✅ $variant — no DOM warning */}
          <ActionBtn onClick={() => navigate(`/edit-patient/${patient.id}`)}>✏️ Edit</ActionBtn>
          <ActionBtn $variant="green"  onClick={() => navigate(`/add-vaccine/${patient.id}`)}>+ Vaccine</ActionBtn>
          <ActionBtn $variant="green"  onClick={() => navigate(`/add-prescription/${patient.id}`)}>+ Prescription</ActionBtn>
          <ActionBtn $variant="danger" onClick={handleDelete}>🗑 Delete</ActionBtn>
        </ProfileRight>
      </ProfileCard>

      <Section>
        <SectionHeader>
          <SectionTitle>💉 Vaccine Records ({patient.vaccines.length})</SectionTitle>
          <AddSmallBtn onClick={() => navigate(`/add-vaccine/${patient.id}`)}>+ Add Vaccine</AddSmallBtn>
        </SectionHeader>
        <Table
          dataSource={patient.vaccines}
          columns={vaccineColumns}
          rowKey="id"
          pagination={false}
          size="small"
          scroll={{ x: true }}
          locale={{ emptyText: 'No vaccine records yet.' }}
        />
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>📋 Prescriptions ({patient.prescriptions.length})</SectionTitle>
          <AddSmallBtn onClick={() => navigate(`/add-prescription/${patient.id}`)}>+ Add Prescription</AddSmallBtn>
        </SectionHeader>
        <Table
          dataSource={patient.prescriptions}
          columns={rxColumns}
          rowKey="id"
          pagination={false}
          size="small"
          scroll={{ x: true }}
          locale={{ emptyText: 'No prescriptions yet.' }}
        />
      </Section>
    </Page>
  );
}

export default PatientDetail;