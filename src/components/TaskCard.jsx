import React, { useState } from 'react';

export default function TaskCard({ task, onDelete, onMove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const getPriorityStyle = (p) => {
    if (p === 'High') return { bg: '#ffebe6', color: '#de350b', border: '#ffbdad' };
    if (p === 'Medium') return { bg: '#fff0b3', color: '#ff8b00', border: '#ffe380' };
    return { bg: '#e3fcef', color: '#006644', border: '#abf5d1' };
  };

  const priorityStyle = getPriorityStyle(task.priority);

  return (
    <div style={styles.card}>
      {isEditing ? (
        <div style={styles.editRow}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={styles.editInput}
            autoFocus
          />
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)} style={styles.title} title="Click to edit task">
          {task.title}
        </div>
      )}

      <div style={styles.metaRow}>
        <span style={{ 
          ...styles.badge, 
          backgroundColor: priorityStyle.bg, 
          color: priorityStyle.color,
          borderColor: priorityStyle.border 
        }}>
          {task.priority}
        </span>
        <button onClick={() => onDelete(task.id)} style={styles.deleteBtn} title="Delete task">
          ✕
        </button>
      </div>

      <div style={styles.actionRow}>
        {task.status !== 'To Do' && (
          <button
            onClick={() => onMove(task.id, task.status === 'Done' ? 'In Progress' : 'To Do')}
            style={styles.moveBtn}
          >
            ← Move
          </button>
        )}
        {task.status !== 'Done' && (
          <button
            onClick={() => onMove(task.id, task.status === 'To Do' ? 'In Progress' : 'Done')}
            style={{ ...styles.moveBtn, marginLeft: 'auto' }}
          >
            Move →
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '14px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #f0f2f5'
  },
  title: {
    cursor: 'pointer',
    fontSize: '14px',
    color: '#172b4d',
    lineHeight: '1.4',
    wordBreak: 'break-word',
    fontWeight: '500'
  },
  editRow: {
    display: 'flex',
    gap: '6px'
  },
  editInput: {
    flex: 1,
    padding: '6px 8px',
    fontSize: '14px',
    border: '1px solid #0052cc',
    borderRadius: '4px',
    outline: 'none'
  },
  saveBtn: {
    backgroundColor: '#0052cc',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },
  badge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    border: '1px solid transparent',
    letterSpacing: '0.3px',
    textTransform: 'uppercase'
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#6b778c',
    border: 'none',
    padding: '4px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  actionRow: {
    display: 'flex',
    marginTop: '10px',
    paddingTop: '8px',
    borderTop: '1px solid #f4f5f7'
  },
  moveBtn: {
    backgroundColor: '#f4f5f7',
    color: '#42526e',
    border: '1px solid #dfe1e6',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};