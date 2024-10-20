import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav style={{ padding: '10px', background: '#007bff', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 10px', color: '#fff' }}>Dashboard</Link>
      <Link to="/housing-needs" style={{ margin: '0 10px', color: '#fff' }}>Housing Needs</Link>
      <Link to="/collaboration" style={{ margin: '0 10px', color: '#fff' }}>Collaboration</Link>
      <Link to="/funding" style={{ margin: '0 10px', color: '#fff' }}>Funding</Link>
      <Link to="/apply-housing" style={{ margin: '0 10px', color: '#fff' }}>Apply for Housing</Link>{/* 功能1 */}
      <Link to="/available-housing" style={{ margin: '0 10px', color: '#fff' }}>Available Housing</Link> {/* 功能3 */}

      <Link to="/policy-updates" style={{ margin: '0 10px', color: '#fff' }}>Policy Updates</Link>
    </nav>
  );
};

export default NavigationBar;
