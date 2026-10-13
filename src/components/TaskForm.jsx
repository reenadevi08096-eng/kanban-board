import React, { useState } from 'react';

export default function TaskForm({ onAddTask, searchQuery, setSearchQuery }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim(), priority);
    setTitle('');
  };

  return (
    <div style={styles.controlsCard}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.select}
        >
          <option value="High" style={styles.option}>🔥 High</option>
          <option value="Medium" style={styles.option}>⚡ Medium</option>
          <option value="Low" style={styles.option}>☕ Low</option>
        </select>
        <button type="submit" style={styles.addBtn}>+ Add Task</button>
      </form>

      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
    </div>
  );
}

const styles = {
  controlsCard: {
    backgroundColor: '#ffffff',
    padding: '16px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  form: {
    display: 'flex',
    gap: '12px',
    flex: 1,
    flexWrap: 'wrap'
  },
  input: {
    flex: '1 1 240px',
    padding: '10px 14px',
    border: '1px solid #dfe1e6',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#172b4d',
  },
  select: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #dfe1e6',
    backgroundColor: '#ffffff',
    color: '#172b4d',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer'
  },
  option: {
    backgroundColor: '#ffffff',
    color: '#172b4d',
    padding: '8px'
  },
  addBtn: {
    padding: '10px 18px',
    backgroundColor: '#0052cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    padding: '10px 14px',
    border: '1px solid #dfe1e6',
    borderRadius: '6px',
    fontSize: '14px',
    width: '220px',
    backgroundColor: '#ffffff',
    color: '#172b4d',
    outline: 'none'
  }
};