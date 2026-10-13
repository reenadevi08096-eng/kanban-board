import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import Column from './components/Column';

const INITIAL_TASKS = [
  { id: '1', title: 'Setup Kanban Project Architecture', status: 'To Do', priority: 'High' },
  { id: '2', title: 'Implement React State Management', status: 'In Progress', priority: 'Medium' },
  { id: '3', title: 'Setup Vite and LocalStorage', status: 'Done', priority: 'Low' }
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban_board_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('kanban_board_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title, priority) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      status: 'To Do',
      priority
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleMoveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const handleEditTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = ['To Do', 'In Progress', 'Done'];

  return (
    <div style={styles.appContainer}>
      <header style={styles.headerContainer}>
        <h1 style={styles.appTitle}>🚀 Professional Kanban Board</h1>
        <p style={styles.appSubtitle}>Manage your workflow efficiently with Trello-style board</p>
      </header>
      
      <TaskForm
        onAddTask={handleAddTask}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div style={styles.board}>
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            tasks={filteredTasks.filter((task) => task.status === col)}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh'
  },
  headerContainer: {
    marginBottom: '25px',
    borderBottom: '2px solid #dfe1e6',
    paddingBottom: '15px'
  },
  appTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#172b4d',
    margin: '0 0 5px 0'
  },
  appSubtitle: {
    fontSize: '14px',
    color: '#5e6c84',
    margin: 0
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    alignItems: 'start'
  }
};