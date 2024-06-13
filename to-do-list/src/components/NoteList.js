import React from 'react';

const NoteList = ({ notes, onEdit, onDelete }) => {
    return (
        <div className="note-list">
            {notes.map(note => (
                <div key={note.id} className="note-item">
                    <div className="note-header">
                        <h3 className="note-title">{note.title}</h3>
                        <div className="note-actions">
                            <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
                            <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
                        </div>
                    </div>
                    <p className="note-content">{note.content}</p>
                    <div className="note-tags">
                        {note.tags.map(tag => (
                            <span key={tag} className="note-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
