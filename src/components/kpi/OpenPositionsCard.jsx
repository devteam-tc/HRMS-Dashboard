import React from 'react';
import { ClipboardList } from 'lucide-react';
import './kpi.css';

export const OpenPositionsCard = ({ value = 0, title = 'Open Positions' }) => {
  return (
    <div className="kpiCard" style={{ ['--tone']: '#F7C948' }}>
      <div className="kpiHeader">
        <div className="iconWrap" aria-hidden>
          <ClipboardList className="icon" />
        </div>
        <div className="value" aria-label={title}>{value?.toLocaleString?.() ?? value}</div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};
