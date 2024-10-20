import React from 'react';
import './House.css'; // 引入样式

function House() {
  return (
    <div className="house-container">
      <header className="main-header">
        <div className="overlay"></div>
        <img src="/heart.png" alt="Helping the Homeless" className="header-image" />
        <div className="header-text">
          <h1> Solving the housing crisis</h1>
          <p>Stay up to date on the latest news and learn how our work is bringing hope to the homeless.</p>
        </div>
      </header>
    </div>
  );
}

export default House;
