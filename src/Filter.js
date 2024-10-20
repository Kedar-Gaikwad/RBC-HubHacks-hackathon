import React from 'react';

const Filter = ({ programs, statuses, filter, setFilter }) => {
  return (
    <div className="filter-container">
      <label>
        Filter by Program:
        <select
          value={filter.program}
          onChange={(e) => setFilter({ ...filter, program: e.target.value })}
        >
          <option value="">All Programs</option>
          {programs.map((program, index) => (
            <option key={index} value={program}>
              {program}
            </option>
          ))}
        </select>
      </label>
      <label>
        Filter by Construction Status:
        <select
          value={filter.constructionStatus}
          onChange={(e) => setFilter({ ...filter, constructionStatus: e.target.value })}
        >
          <option value="">All Statuses</option>
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;
