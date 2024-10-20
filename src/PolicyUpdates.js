import React from 'react';
import './PolicyUpdates.css';

const PolicyUpdates = () => {
  return (
    <div className="policy-updates">
      <h2>Policy Updates</h2>
      <iframe
        src="https://docs.google.com/document/d/1McnfePVrFnUEf5SWUo6HWFEAcxNyf9RgYsr55TkOA1o/edit?tab=t.0"
        title="Policy Document"
        className="policy-iframe"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PolicyUpdates;
