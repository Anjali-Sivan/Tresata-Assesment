import React, { useState, useMemo } from 'react';
import type { Task, FilterType, TaskStatus } from '../types';
import TaskGroup from './TaskGroup';
import { AddIcon, CloseIcon, EmptyIcon, SearchIcon } from '../assets/icons';

interface TaskListViewProps {
  tasks: Task[];
  onAddClick: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  newTaskId: string | null;
    deletingId: string | null;
}

const STATUSES: TaskStatus[] = ['In Progress', 'Pending', 'Completed'];
const FILTERS: FilterType[] = ['All', 'In Progress', 'Pending', 'Completed'];
const FONT = "'Jost', sans-serif";

const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  onAddClick,
  onEdit,
  onDelete,
  newTaskId,
  deletingId
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('All');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return tasks.filter(t => {
      const matchesFilter = filter === 'All' || t.status === filter;
      const matchesSearch =
        !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const groupedTasks = useMemo(
    () =>
      STATUSES.reduce((acc, status) => {
        acc[status] = filtered.filter(t => t.status === status);
        return acc;
      }, {} as Record<TaskStatus, Task[]>),
    [filtered]
  );

  const visibleStatuses = filter === 'All' ? STATUSES : [filter as TaskStatus];

  return (
    <div style={styles.container}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <SearchIcon />
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search To-do…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} style={styles.clearBtn} aria-label="Clear search">
           <CloseIcon/>
            </button>
          )}
        </div>
        <button onClick={onAddClick} style={styles.addBtn}>
          <AddIcon/>
          Add Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterRow}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterTab,
              background: filter === f ? '#034EA2' : '#fff',
              color: filter === f ? '#fff' : '#64748b',
              borderColor: filter === f ? '#034EA2' : '#e2e8f0',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Groups */}
      <div>
        {visibleStatuses.map(status => (
          <TaskGroup
            key={status}
            status={status}
            tasks={groupedTasks[status] ?? []}
            defaultOpen={status === 'In Progress' || filter !== 'All'}
            newTaskId={newTaskId}
            onEdit={onEdit}
            onDelete={onDelete}
            deletingId={deletingId}
          />
        ))}

        {filtered.length === 0 && (
          <div style={styles.emptyState}>
            <EmptyIcon />
            <p style={styles.emptyText}>No tasks found</p>
            <p style={styles.emptySubText}>Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
container: {
  width: '100%',
  margin: '0 auto',
  padding: '2rem',
  boxSizing: 'border-box',
},
  toolbar: {
    display: 'flex',
    gap: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchWrap: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '10px 36px 10px 38px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    fontSize: '0.92rem',
    background: '#fff',
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
    fontFamily: FONT,
    boxSizing: 'border-box',
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 2,
  },
  addBtn: {
    background: '#034EA2',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '10px 18px',
    fontSize: '0.92rem',
    fontWeight: 700,
    fontFamily: FONT,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    letterSpacing: '0.03em',
    transition: 'background 0.15s',
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  filterTab: {
    padding: '6px 16px',
    borderRadius: 999,
    fontSize: '0.82rem',
    fontWeight: 600,
    border: '1.5px solid',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: FONT,
  },
  emptyState: {
    textAlign: 'center',
    padding: '56px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: '0.96rem',
    fontWeight: 700,
    color: '#64748b',
    fontFamily: FONT,
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: '0.82rem',
    color: '#94a3b8',
  },
};

export default TaskListView;
