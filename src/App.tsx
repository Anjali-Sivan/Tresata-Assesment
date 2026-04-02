import React, { useState, useCallback } from 'react';
import AppHeader from './components/AppHeader';
import TaskListView from './components/TaskListView';
import TaskForm from './components/TaskForm';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import { ToastContainer, useToast } from './components/Toast';
import { useTasks } from './hooks/useTasks';
import type { Task, TaskFormData, ViewType } from './types';

const VIEW_TITLES: Record<ViewType, string> = {
  list: 'TO-DO APP',
  add: 'Add Task',
  edit: 'Edit Task',
};

const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { toasts, show: showToast, remove: removeToast } = useToast();

  const [view, setView] = useState<ViewType>('list');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newTaskId, setNewTaskId] = useState<string | null>(null);

  const goBack = useCallback(() => {
    setView('list');
    setEditingTask(null);
  }, []);

  const handleAddSubmit = useCallback((data: TaskFormData) => {
    const task = addTask({ title: data.title, description: data.description });
    setNewTaskId(task.id);
    setTimeout(() => setNewTaskId(null), 1000);
    showToast('Task added!');
    setView('list');
  }, [addTask, showToast]);

  const handleEditSubmit = useCallback((data: TaskFormData) => {
    if (!editingTask) return;
    updateTask(editingTask.id, data);
    showToast('Task updated!');
    setView('list');
    setEditingTask(null);
  }, [editingTask, updateTask, showToast]);

  const handleEditClick = useCallback((task: Task) => {
    setEditingTask(task);
    setView('edit');
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    setDeletingId(id);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!deletingId) return;
    deleteTask(deletingId);
    setDeletingId(null);
    showToast('Task deleted', 'info');
  }, [deletingId, deleteTask, showToast]);

  return (
    <>
      <AppHeader
        title={VIEW_TITLES[view]}
        showBack={view !== 'list'}
        onBack={goBack}
      />

      {view === 'list' && (
        <TaskListView
          tasks={tasks}
          onAddClick={() => setView('add')}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          newTaskId={newTaskId}
        />
      )}

      {view === 'add' && (
        <TaskForm
          mode="add"
          onSubmit={handleAddSubmit}
          onCancel={goBack}
        />
      )}

      {view === 'edit' && editingTask && (
        <TaskForm
          mode="edit"
          initialData={editingTask}
          onSubmit={handleEditSubmit}
          onCancel={goBack}
        />
      )}

      <DeleteConfirmDialog
        open={!!deletingId}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

export default App;