import React, { useEffect, useState } from 'react';
import { DeleteIcon } from '../assets/icons';

interface DeleteConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Confirm delete"
    >
      <div
        style={{
          ...styles.box,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
          transition: 'transform 0.22s ease, opacity 0.2s',
          opacity: visible ? 1 : 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={styles.iconWrap}>
          <DeleteIcon />
        </div>
        <h3 style={styles.title}>Delete Task?</h3>
        <p style={styles.desc}>This action cannot be undone.</p>
        <div style={styles.actions}>
          <button
            onClick={onCancel}
            style={styles.cancelBtn}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#e8edf8')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#fff')}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={styles.deleteBtn}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#dc2626')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#ef4444')}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const FONT = "'Jost', sans-serif";

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.38)',
    backdropFilter: 'blur(3px)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  box: {
    background: '#fff',
    borderRadius: 16,
    padding: '32px 28px 24px',
    maxWidth: 340,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  title: {
    fontFamily: FONT,
    fontSize: '1.05rem',
    fontWeight: 700,
    margin: '0 0 8px',
    color: '#0f172a',
  },
  desc: {
    fontSize: '0.88rem',
    color: '#64748b',
    marginBottom: 24,
  },
  actions: {
    display: 'flex',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: '11px',
    border: '1.5px solid #1a3aad',
    borderRadius: 10,
    fontSize: '0.93rem',
    fontWeight: 700,
    fontFamily: FONT,
    color: '#1a3aad',
    background: '#fff',
    cursor: 'pointer',
    transition: 'background 0.15s',
    letterSpacing: '0.02em',
  },
  deleteBtn: {
    flex: 1,
    padding: '11px',
    border: 'none',
    borderRadius: 10,
    fontSize: '0.93rem',
    fontWeight: 700,
    fontFamily: FONT,
    color: '#fff',
    background: '#ef4444',
    cursor: 'pointer',
    transition: 'background 0.15s',
    letterSpacing: '0.02em',
  },
};

export default DeleteConfirmDialog;