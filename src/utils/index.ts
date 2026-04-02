export const generateId = (): string =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getInitials = (title: string): string =>
  title.trim().slice(0, 1).toUpperCase() || '?';
