import React from 'react';

interface AppHeaderProps {
  title: string;
  showBack: boolean;
  onBack: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, showBack, onBack }) => (
  <header style={styles.header}>
    {showBack && (
      <button onClick={onBack} style={styles.backBtn} aria-label="Go back">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>
    )}
    <h1 style={styles.title}>{title}</h1>
  </header>
);

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: '#034EA2',
    color: '#fff',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '0 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'none',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 6px',
    borderRadius: 6,
    transition: 'background 0.15s',
    cursor: 'pointer',
  },
  title: {
    fontFamily: "'Jost', sans-serif",
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#fff',
    margin: 0,
  },
};

export default AppHeader;