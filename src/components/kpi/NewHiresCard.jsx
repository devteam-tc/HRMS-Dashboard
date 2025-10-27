import React from 'react';
import { Plus } from 'lucide-react';
import './kpi.css';

export const NewHiresCard = ({ value = 0, title = 'New Hires This Month' }) => {
  return (
    <div className="kpiCard" style={{ ['--tone']: '#EF5226' }}>
      <div className="kpiHeader">
        <div className="iconWrap" aria-hidden>
          <Plus className="icon" />
        </div>
        <div className="value" aria-label={title}>{value?.toLocaleString?.() ?? value}</div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};
