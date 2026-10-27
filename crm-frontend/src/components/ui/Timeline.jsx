import React from 'react';

export const Timeline = ({ items = [] }) => {
  return (
    <div className="timeline">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="timeline-item">
            <div className="timeline-node" style={{ backgroundColor: item.color || 'var(--primary)' }} />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">{item.title}</span>
                <span className="text-tertiary">{item.time}</span>
              </div>
              <p className="text-xs text-secondary margin-0">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
