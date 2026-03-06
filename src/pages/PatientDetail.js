// ============================================================
// PatientDetail.js
// Hooks: useParams, useContext, useMemo, useNavigate
// UI: styled-components (80%) + Ant Design Tag + Table (20%)
// ============================================================
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tag, Table } from 'antd';
import { useAppContext } from '../context/AppContext';

const Page = styled.div`max-width: 860px; margin: 0 auto; padding: 32px 20px;`;
const BackBtn = styled.button`
  background: none; border: 2px solid #7c3aed; color: #7c3aed;
  padding: 7px 18px; border-radius: 20px; cursor: pointer;
  font-weight: 700; font-family: 'Nunito', sans-serif;
  margin-bottom: 22px;
  &:hover { background: #7c3aed; color: white; }
`;
const ProfileCard = styled.div`
  background: white; border-radius: 18px;
  padding: 28px; margin-bottom: 22px;
  box-shadow: 0 2px 14px rgba(124,58,237,0.1);
  display: flex; justify-content: space-between;
  align-items: flex-start; flex-wrap: wrap; gap: 16px;
`;
const ProfileLeft = styled.div`display: flex; gap: 20px; align-items: center;`;
const Avatar = styled.div`
  width: 70px; height: 70px; border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; flex-shrink: 0;
`;
const PatientName = styled.h2`font-size: 1.5rem; font-weight: 800; color: #222; margin: 0 0 4px;`;
const InfoText = styled.p`color: #888; font-size: 0.88rem; margin: 2px 0;`;

const ProfileRight = styled.div`display: flex; gap: 10px; flex-wrap: wrap;`;
const ActionBtn = styled.button`
  background: ${p => p.variant === 'danger' ? '#fee2e2' : p.variant === 'green' ? '#d1fae5' : '#ede9fe'};
  color:       ${p => p.variant === 'danger' ? '#b91c1c' : p.variant === 'green' ? '#065f46' : '#7c3aed'};
  border: none; padding: 9px 18px; border-radius: 20px;
  cursor: pointer; font-weight: 700; font-size: 0.88rem;
  font-family: 'Nunito', sans-serif;
  &:hover { opacity: 0.8; }
`;

const Section = styled.div`
  background: white; border-radius: 18px; padding: 24px;
  margin-bottom: 22px; box-shadow: 0 2px 14px rgba(124,58,237,0.07);
`;
const SectionHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #f3f0ff;
`;
const SectionTitle = styled.h3`font-size: 1.05rem; font-weight: 800; color: #7c3aed; margin: 0;`;
const AddSmallBtn = styled.button`
  background: linear-gradient(90deg, #7c3aed, #db2777);
  border: none; color: white; padding: 6px 16px; border-radius: 18px;
  cursor: pointer; font-weight: 800; font-size: 0.82rem;
  font-family: 'Nunito', sans-serif;
  &:hover { opacity: 0.88; }
`;
const NotFound = styled.div`text-align: center; color: #db2777; margin-top: 80px; font-size: 1.2rem;`;

// Ant Design table columns for vaccines
const vaccineColumns = [
  { title: 'Vaccine', dataIndex: 'name',   key: 'name', render: t => <strong>{t}</strong> },
  { title: 'Date',    dataIndex: 'date',   key: 'date'   },
  { title: 'Doctor',  dataIndex: 'doctor', key: 'doctor' },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: s => (
      <Tag color={s === 'Done' ? 'green' : s === 'Upcoming' ? 'blue' : 'red'}>{s}</Tag>
    ),
  },
];

// Ant Design table columns for prescriptions
const rxColumns = [
  { title: 'Medicine', dataIndex: 'medicine', key: 'medicine', render: t => <strong>{t}</strong> },
  { title: 'Dosage',   dataIndex: 'dosage',   key: 'dosage'   },
  { title: 'Duration', dataIndex: 'duration', key: 'duration' },
];

function PatientDetail() {
  const { id }               = useParams();     // useParams: get patient id from URL
  const navigate             = useNavigate();   // useNavigate
  const { patients, deletePatient } = useAppContext(); // useContext

  // useMemo: find patient only when id or patients changes
 const patient = patients.find(p => p.id === parseInt(id));
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

      {/* Profile Card */}
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
          <ActionBtn onClick={() => navigate(`/edit-patient/${patient.id}`)}>✏️ Edit</ActionBtn>
          <ActionBtn variant="green" onClick={() => navigate(`/add-vaccine/${patient.id}`)}>+ Vaccine</ActionBtn>
          <ActionBtn variant="green" onClick={() => navigate(`/add-prescription/${patient.id}`)}>+ Prescription</ActionBtn>
          <ActionBtn variant="danger" onClick={handleDelete}>🗑 Delete</ActionBtn>
        </ProfileRight>
      </ProfileCard>

      {/* Vaccines Section */}
      <Section>
        <SectionHeader>
          <SectionTitle>💉 Vaccine Records ({patient.vaccines.length})</SectionTitle>
          <AddSmallBtn onClick={() => navigate(`/add-vaccine/${patient.id}`)}>+ Add Vaccine</AddSmallBtn>
        </SectionHeader>
        {/* Ant Design Table (20%) */}
        <Table
          dataSource={patient.vaccines}
          columns={vaccineColumns}
          rowKey="id"
          pagination={false}
          size="small"
          locale={{ emptyText: 'No vaccine records yet.' }}
        />
      </Section>

      {/* Prescriptions Section */}
      <Section>
        <SectionHeader>
          <SectionTitle>📋 Prescriptions ({patient.prescriptions.length})</SectionTitle>
          <AddSmallBtn onClick={() => navigate(`/add-prescription/${patient.id}`)}>+ Add Prescription</AddSmallBtn>
        </SectionHeader>
        {/* Ant Design Table (20%) */}
        <Table
          dataSource={patient.prescriptions}
          columns={rxColumns}
          rowKey="id"
          pagination={false}
          size="small"
          locale={{ emptyText: 'No prescriptions yet.' }}
        />
      </Section>
    </Page>
  );
}

export default PatientDetail;
