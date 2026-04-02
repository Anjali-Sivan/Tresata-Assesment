import React, { useEffect, useState, useCallback } from 'react';
import { CheckIcon } from '../assets/icons';

export type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => (
  <div style={styles.container}>
    {toasts.map(toast => (
      <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
    ))}
  </div>
);

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: number) => void }> = ({ toast, onRemove }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 2200);
    return () => clearTimeout(t);
  }, [toast.id, onRemove]);

  const bg: Record<ToastType, string> = {
    success: '#0f172a',
    error: '#ef4444',
    info: '#1a3aad',
  };

  return (
    <div
      style={{
        ...styles.toast,
        background: bg[toast.type],
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
      }}
    >
      {toast.type === 'success' && (
        <CheckIcon />
      )}
      {toast.message}
    </div>
  );
};

let _id = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const show = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, show, remove };
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    bottom: 28,
    right: 20,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    pointerEvents: 'none',
  },
  toast: {
    padding: '11px 18px',
    borderRadius: 10,
    color: '#fff',
    fontSize: '0.88rem',
    fontWeight: 600,
    fontFamily: "'Jost', sans-serif",
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    letterSpacing: '0.02em',
  },
};