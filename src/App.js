import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Dashboard from './Dashboard';
import HousingMap from './HousingMap';
import CollaborationOpportunities from './CollaborationOpportunities';
import FundingOpportunities from './FundingOpportunities';
import PolicyUpdates from './PolicyUpdates';
import './styles.css';
import HousingList from './components/HousingList';
import ApplyHousingPage from './components/ApplyHousingPage';
import HousingGapChart from './components/HousingGapChart';
import House from './components/House'; // 引入 House 组件
import LandlordForm from './components/LandlordForm';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/housing-needs" element={<HousingMap />} />
        <Route path="/collaboration" element={<CollaborationOpportunities />} />
        <Route path="/funding" element={<FundingOpportunities />} />
        <Route path="/apply-housing" element={<ApplyHousingPage/>} />
        <Route path="/policy-updates" element={<PolicyUpdates />} />
        <Route path="/house" element={<House />} /> {/* 新增的 House 路由 */}
        <Route path="/housing-gap" element={<HousingGapChart />} /> {/* 功能1 */}
        <Route path="/apply-housing" element={<ApplyHousingPage />} /> {/* 功能2 */}
        <Route path="/available-housing" element={<HousingList />} /> {/* 功能3 */}
        <Route path="/submit-house" element={<LandlordForm />} /> {/* 功能4 */}
      </Routes>
    </Router>
  );
}

export default App;
