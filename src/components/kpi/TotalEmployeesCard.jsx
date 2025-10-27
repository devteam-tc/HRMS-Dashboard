import React from 'react';
import { Users } from 'lucide-react';
import './kpi.css';

export const TotalEmployeesCard = ({ value = 0, title = 'Total Employees' }) => {
  return (
    <div className="kpiCard" style={{ ['--tone']: '#05A7CC' }}>
      <div className="kpiHeader">
        <div className="iconWrap" aria-hidden>
          <Users className="icon" />
        </div>
        <div className="value" aria-label={title}>{value?.toLocaleString?.() ?? value}</div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};
