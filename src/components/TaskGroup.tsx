import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types';
import { StatusDot } from './StatusBadge';
import TaskItem from './TaskItem';

interface TaskGroupProps {
  status: TaskStatus;
  tasks: Task[];
  defaultOpen?: boolean;
  newTaskId?: string | null;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const FONT = "'Jost', sans-serif";

const TaskGroup: React.FC<TaskGroupProps> = ({
  status,
  tasks,
  defaultOpen = false,
  newTaskId,
  onEdit,
  onDelete,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={styles.group}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          ...styles.header,
          borderBottomLeftRadius: open ? 0 : 12,
          borderBottomRightRadius: open ? 0 : 12,
          borderBottom: open ? '1px solid #e2e8f0' : '1.5px solid #e2e8f0',
        }}
        aria-expanded={open}
      >
        <StatusDot status={status} size={11} />
        
        <span style={styles.statusLabel}>{status}</span>
        {'('}
        <span style={styles.count}>{tasks.length}</span>
        {')'}
        <svg
          style={{
            ...styles.chevron,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        style={{
          ...styles.listWrap,
          maxHeight: open ? 9999 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        {tasks.length === 0 ? (
          <div style={styles.empty}>No tasks here.</div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              animateIn={task.id === newTaskId}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  group: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '13px 16px',
    background: '#F3F6F9',
    border: '1.5px solid #F3F6F9',
    borderRadius:'3px',
    cursor: 'pointer',
    transition: 'background 0.15s',
    textAlign: 'left',
    fontFamily: FONT,
  },
  statusLabel: {
    flex: 1,
    fontWeight: 400,
    fontSize: '0.92rem',
    color: '#0f172a',
    fontFamily: FONT,
    letterSpacing: '0.02em',
  },
  count: {
    fontSize: '0.79rem',
    fontWeight: 700,
  },
  chevron: {
    color: '#1a3aad',
    transition: 'transform 0.22s ease',
    flexShrink: 0,
  },
  listWrap: {
    background: '#ffffff',
    border: '1.5px solid #e2e8f0',
    borderTop: 'none',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.22s ease',
  },
  empty: {
    padding: '20px 16px',
    fontSize: '0.85rem',
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export default TaskGroup;