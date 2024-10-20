
import React from 'react';

const CollaborationOpportunities = () => {
  const opportunities = [
    { id: 1, organization: 'Housing Help', description: 'Collaborate on emergency shelters in Halifax.' },
    { id: 2, organization: 'Youth Support', description: 'Partnership for youth housing in Toronto.' },
    { id: 3, organization: 'Senior Care', description: 'Expand senior housing options in Vancouver.' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Collaboration Opportunities</h2>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
            <h3>{opportunity.organization}</h3>
            <p>{opportunity.description}</p>
            <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '5px 10px' }}>
              Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaborationOpportunities;
