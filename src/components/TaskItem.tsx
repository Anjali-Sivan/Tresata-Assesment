import React, { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import StatusBadge from './StatusBadge';
import { formatDate, getInitials } from '../utils';
import { EditIcon, TrashIcon } from '../assets/icons';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  animateIn?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, animateIn = false }) => {
  const [visible, setVisible] = useState(!animateIn);
  const [exiting, setExiting] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (animateIn) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [animateIn]);

  const handleDelete = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDelete(task.id), 320);
  }, [onDelete, task.id]);

  const handleEdit = useCallback(() => onEdit(task), [onEdit, task]);

  const isCompleted = task.status === 'Completed';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        opacity: visible && !exiting ? 1 : 0,
        transform: exiting
          ? 'translateX(40px) scaleY(0.8)'
          : visible
          ? 'translateX(0) scaleY(1)'
          : 'translateX(-20px) scaleY(0.95)',
        maxHeight: exiting ? 0 : 200,
        marginBottom: exiting ? 0 : 1,
        background: hovered ? '#f0f4ff' : '#fff',
      }}
    >
      {/* Avatar */}
      <div style={styles.avatar}>{getInitials(task.title)}</div>

      {/* Body */}
      <div style={styles.body}>
        <div style={styles.titleRow}>
          <span
            style={{
              ...styles.title,
              textDecoration: isCompleted ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </span>
          <StatusBadge status={task.status} />
        </div>

        {task.description && <p style={styles.desc}>{task.description}</p>}

        <span style={styles.date}>{formatDate(task.createdAt)}</span>
      </div>

      {/* Actions */}
      <div
        style={{
          ...styles.actions,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
        }}
      >
        <button
          onClick={handleEdit}
          style={styles.editBtn}
          className="task-edit-btn"
          aria-label="Edit task"
        >
          <EditIcon /> Edit
        </button>

        <button
          onClick={handleDelete}
          style={styles.deleteBtn}
          className="task-delete-btn"
          aria-label="Delete task"
        >
          <TrashIcon /> Delete
        </button>
      </div>
    </div>
  );
};

const FONT = "'Jost', sans-serif";

const styles: Record<string, React.CSSProperties> = {
 card: {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 14,
  padding: '1rem',
  borderBottom: '1px solid #e2e8f0',
  position: 'relative',
  transition:
    'opacity 0.28s ease, transform 0.28s ease, max-height 0.32s ease, background 0.12s, padding 0.28s, margin 0.28s',
  overflow: 'hidden',
},
  avatar: {
    width: 30,
    height: 30,
    border: '1px solid #034EA2',
    borderRadius: '50%',
    background: '#fff',
    color: '#034EA2',
    fontWeight: 700,
    fontSize: '1rem',
    fontFamily: FONT,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    letterSpacing: '0.05em',
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  title: {
    fontSize: '0.93rem',
    fontWeight: 600,
    wordBreak: 'break-word',
    transition: 'color 0.2s',
    color: '#034EA2',
  },
  desc: {
    fontSize: '0.81rem',
    color: '#64748b',
    marginBottom: 5,
    lineHeight: 1.45,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  date: {
    fontSize: '0.73rem',
    color: '#94a3b8',
    fontFamily: 'monospace',
    letterSpacing: '0.02em',
  },
  actions: {
    display: 'flex',
    gap: 6,
    flexShrink: 0,
    position: 'absolute',
    bottom: 12,
    right: 16,
    transition: 'opacity 0.18s, transform 0.18s',
  },
  editBtn: {
    background: 'none',
    border: '1.5px solid #e2e8f0',
    borderRadius: 7,
    padding: '5px 9px',
    color: '#64748b',
    fontSize: '0.78rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    transition: 'all 0.15s',
    cursor: 'pointer',
    fontFamily: FONT,
  },
  deleteBtn: {
    background: 'none',
    border: '1.5px solid #e2e8f0',
    borderRadius: 7,
    padding: '5px 9px',
    color: '#64748b',
    fontSize: '0.78rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    transition: 'all 0.15s',
    cursor: 'pointer',
    fontFamily: FONT,
  },
};

export default TaskItem;