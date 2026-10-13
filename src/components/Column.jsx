import React from 'react';
import TaskCard from './TaskCard';

export default function Column({ title, tasks, onDelete, onMove, onEdit }) {
  const getHeaderColor = (t) => {
    if (t === 'To Do') return '#0052cc';
    if (t === 'In Progress') return '#ff8b00';
    return '#36b37e';
  };

  return (
    <div style={styles.column}>
      <div style={styles.headerWrapper}>
        <h3 style={styles.heading}>{title}</h3>
        <span style={{ ...styles.counterBadge, backgroundColor: getHeaderColor(title) }}>
          {tasks.length}
        </span>
      </div>

      <div style={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onMove={onMove}
            onEdit={onEdit}
          />
        ))}
        {tasks.length === 0 && (
          <div style={styles.emptyContainer}>
            <p style={styles.empty}>No tasks here yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  column: {
    backgroundColor: '#ebecf0',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    minHeight: '400px'
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    paddingBottom: '8px',
    borderBottom: '2px solid #dddfe2'
  },
  heading: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#172b4d',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  counterBadge: {
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1
  },
  emptyContainer: {
    padding: '30px 10px',
    textAlign: 'center',
    border: '2px dashed #dfe1e6',
    borderRadius: '8px',
    marginTop: '10px'
  },
  empty: {
    fontSize: '13px',
    color: '#6b778c',
    margin: 0
  }
};