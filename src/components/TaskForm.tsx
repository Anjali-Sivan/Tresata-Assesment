import React, { useState, useEffect } from 'react';
import type { Task, TaskFormData, TaskStatus } from '../types';
import StatusSelect from './StatusSelect';

interface TaskFormProps {
  mode: 'add' | 'edit';
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

const FONT = "'Jost', sans-serif";

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? 'Pending');
  const [titleError, setTitleError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    onSubmit({ title, description, status });
  };

  return (
    <div style={{ ...styles.wrapper, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(12px)' }}>
      <div style={styles.card}>

        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input
            style={{ ...styles.input, ...(titleError ? styles.inputError : {}) }}
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={e => { setTitle(e.target.value); if (titleError) setTitleError(''); }}
            autoFocus
          />
          {titleError && <span style={styles.error}>{titleError}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            style={styles.textarea}
            placeholder="Enter the description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        {mode === 'edit' && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <StatusSelect value={status} onChange={setStatus} />
          </div>
        )}

        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSubmit} style={styles.primaryBtn}>
            {mode === 'add' ? 'ADD' : 'Update'}
          </button>
        </div>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 680,
    width: '100%',
    margin: '0 auto',
    padding: '32px 24px',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    boxSizing: 'border-box',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    border: '1.5px solid #e2e8f0',
    padding: '36px 32px',
    boxShadow: '0 4px 24px rgba(26,58,173,0.09)',
  },
  formGroup: {
    marginBottom: 22,
  },
  label: {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#64748b',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontFamily: FONT,
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    fontSize: '0.95rem',
    fontFamily: FONT,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  textarea: {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    fontSize: '0.95rem',
    fontFamily: FONT,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    resize: 'vertical',
    minHeight: 120,
    transition: 'border-color 0.18s',
    boxSizing: 'border-box',
  },
  error: {
    display: 'block',
    marginTop: 5,
    fontSize: '0.79rem',
    color: '#ef4444',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 28,
  },
  cancelBtn: {
    flex: 1,
    padding: '13px',
    border: '1.5px solid #1a3aad',
    borderRadius: 10,
    fontSize: '0.95rem',
    fontWeight: 700,
    fontFamily: FONT,
    color: '#1a3aad',
    background: '#fff',
    cursor: 'pointer',
    transition: 'background 0.15s',
    letterSpacing: '0.03em',
  },
  primaryBtn: {
    flex: 1,
    padding: '13px',
    border: 'none',
    borderRadius: 10,
    fontSize: '0.95rem',
    fontWeight: 700,
    fontFamily: FONT,
    color: '#fff',
    background: '#1a3aad',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(26,58,173,0.22)',
    letterSpacing: '0.05em',
    transition: 'background 0.15s',
  },
};

export default TaskForm;