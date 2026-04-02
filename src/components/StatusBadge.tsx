import React from 'react';
import type { TaskStatus } from '../types';

interface StatusBadgeProps {
  status: TaskStatus;
  size?: 'sm' | 'md';
}

const CONFIG: Record<TaskStatus, { bg: string; color: string; dot: string }> = {
  Pending:     { bg: '#f1f5f9', color: '#6b7280', dot: '#D0D0D0' },
  'In Progress': { bg: '#fef3c7', color: '#b45309', dot: '#FFB03C' },
  Completed:   { bg: '#dcfce7', color: '#15803d', dot: '#368A04' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const cfg = CONFIG[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: cfg.bg,
        color: cfg.color,
        borderRadius: 999,
        padding: size === 'sm' ? '2px 9px' : '4px 12px',
        fontSize: size === 'sm' ? '0.72rem' : '0.82rem',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
};

export const StatusDot: React.FC<{ status: TaskStatus; size?: number }> = ({ status, size = 11 }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: CONFIG[status].dot,
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);

export default StatusBadge;
