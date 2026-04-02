import React, { useState, useRef, useEffect } from 'react';
import type { TaskStatus } from '../types';
import { StatusDot } from './StatusBadge';

interface StatusSelectProps {
  value: TaskStatus;
  onChange: (val: TaskStatus) => void;
}

const STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (s: TaskStatus) => {
    onChange(s);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          ...styles.btn,
          borderColor: open ? '#1a3aad' : '#e2e8f0',
          boxShadow: open ? '0 0 0 3px rgba(26,58,173,0.1)' : 'none',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <StatusDot status={value} />
        <span style={{ flex: 1 }}>{value}</span>
        <svg
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', color: '#1a3aad' }}
          width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={styles.dropdown} role="listbox">
          {STATUSES.map(s => (
            <button
              key={s}
              role="option"
              aria-selected={s === value}
              onClick={() => select(s)}
              style={{
                ...styles.option,
                background: s === value ? '#e8edf8' : 'transparent',
                fontWeight: s === value ? 600 : 400,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f0f4ff')}
              onMouseLeave={e => (e.currentTarget.style.background = s === value ? '#e8edf8' : 'transparent')}
            >
              <StatusDot status={s} />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  btn: {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid',
    borderRadius: 10,
    fontSize: '0.93rem',
    fontFamily: 'var(--font-body)',
    color: '#0f172a',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    transition: 'border-color 0.18s, box-shadow 0.18s',
    textAlign: 'left',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    background: '#fff',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    boxShadow: '0 4px 20px rgba(26,58,173,0.12)',
    zIndex: 50,
    overflow: 'hidden',
    animation: 'fadeIn 0.15s ease',
  },
  option: {
    width: '100%',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    fontSize: '0.93rem',
    border: 'none',
    fontFamily: 'var(--font-body)',
    color: '#0f172a',
    transition: 'background 0.12s',
    textAlign: 'left',
  },
};

export default StatusSelect;
