import React from 'react';
import { Clock } from 'lucide-react';
import './kpi.css';

export const AttendanceRateCard = ({ value = 0, title = 'Today Attendance Rate' }) => {
  const display = typeof value === 'number' ? `${value}%` : value;
  return (
    <div className="kpiCard" style={{ ['--tone']: '#4CAF50' }}>
      <div className="kpiHeader">
        <div className="iconWrap" aria-hidden>
          <Clock className="icon" />
        </div>
        <div className="value" aria-label={title}>{display}</div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};
