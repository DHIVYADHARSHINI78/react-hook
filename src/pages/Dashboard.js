// ============================================================
// Dashboard.js
// Hooks: useContext, useEffect (loading), useMemo (stats)
// UI: styled-components (80%) + Ant Design Statistic + Alert (20%)
// ============================================================
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Statistic, Alert, Spin } from 'antd';
import { useAppContext } from '../context/AppContext';

const Page = styled.div`max-width: 1000px; margin: 0 auto; padding: 32px 20px;`;

const Welcome = styled.div`
  background: linear-gradient(135deg, #7c3aed, #db2777);
  border-radius: 20px;
  padding: 32px;
  color: white;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WelcomeText = styled.div``;
const WelcomeTitle = styled.h2`font-size: 1.7rem; font-weight: 800; margin: 0 0 6px;`;
const WelcomeSub = styled.p`margin: 0; opacity: 0.85; font-size: 0.95rem;`;
const AddBtn = styled.button`
  background: white;
  color: #7c3aed;
  border: none;
  padding: 12px 26px;
  border-radius: 24px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  &:hover { opacity: 0.9; }
`;

const StatsRow = styled.div`display: flex; gap: 18px; flex-wrap: wrap; margin-bottom: 28px;`;
const StatBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 22px 28px;
  flex: 1;
  min-width: 150px;
  border-top: 4px solid ${p => p.color};
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  text-align: center;
`;

const RecentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
`;
const CardTitle = styled.h3`
  font-size: 1.05rem; font-weight: 800; color: #444;
  margin-bottom: 16px; padding-bottom: 10px;
  border-bottom: 2px solid #f3f0ff;
`;
const Row = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid #fafafa; font-size: 0.9rem;
  cursor: pointer;
  &:hover { background: #faf7ff; border-radius: 8px; padding: 10px 8px; }
`;
const Pill = styled.span`
  padding: 3px 12px; border-radius: 12px;
  font-size: 0.78rem; font-weight: 700;
  background: ${p => p.g === 'Male' ? '#dbeafe' : '#fce7f3'};
  color:      ${p => p.g === 'Male' ? '#1e40af' : '#9d174d'};
`;

function Dashboard() {
  const { patients }  = useAppContext();   // useContext
  const navigate      = useNavigate();
  const [loading, setLoading] = useState(true); // useState: spinner

  // useEffect: simulate loading on first open
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // useMemo: compute counts only when patients changes
  const stats = useMemo(() => {
    const totalVaccines     = patients.reduce((s, p) => s + p.vaccines.length, 0);
    const totalPrescriptions = patients.reduce((s, p) => s + p.prescriptions.length, 0);
    return {
      patients:      patients.length,
      vaccines:      totalVaccines,
      prescriptions: totalPrescriptions,
    };
  }, [patients]);

  if (loading) return <Spin size="large" style={{ display: 'block', marginTop: 100, textAlign: 'center' }} />;

  return (
    <Page>
      <Welcome>
        <WelcomeText>
          <WelcomeTitle>💉 VacciTrack Dashboard</WelcomeTitle>
          <WelcomeSub>Manage patient vaccination &amp; prescription records easily.</WelcomeSub>
        </WelcomeText>
        <AddBtn onClick={() => navigate('/add-patient')}>+ Add Patient</AddBtn>
      </Welcome>

      {stats.patients === 0 && (
        /* Ant Design Alert (20%) */
        <Alert message="No patients yet. Add your first patient!" type="info" showIcon style={{ marginBottom: 24, borderRadius: 10 }} />
      )}

      <StatsRow>
        {/* Ant Design Statistic (20%) */}
        <StatBox color="#7c3aed">
          <Statistic title="Total Patients"      value={stats.patients}      />
        </StatBox>
        <StatBox color="#0ea5e9">
          <Statistic title="Vaccine Records"     value={stats.vaccines}      valueStyle={{ color: '#0369a1' }} />
        </StatBox>
        <StatBox color="#10b981">
          <Statistic title="Prescriptions"       value={stats.prescriptions} valueStyle={{ color: '#065f46' }} />
        </StatBox>
      </StatsRow>

      <RecentCard>
        <CardTitle>Recent Patients</CardTitle>
        {patients.slice(0, 5).map(p => (
          <Row key={p.id} onClick={() => navigate(`/patients/${p.id}`)}>
            <div>
              <strong>{p.name}</strong>
              <span style={{ color: '#aaa', marginLeft: 10, fontSize: '0.85rem' }}>
                Age {p.age} · {p.blood}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: '#888', fontSize: '0.82rem' }}>
                💉 {p.vaccines.length}  📋 {p.prescriptions.length}
              </span>
              <Pill g={p.gender}>{p.gender}</Pill>
            </div>
          </Row>
        ))}
        {patients.length === 0 && <p style={{ color: '#ccc', textAlign: 'center', margin: '20px 0' }}>No patients added yet.</p>}
      </RecentCard>
    </Page>
  );
}

export default Dashboard;
