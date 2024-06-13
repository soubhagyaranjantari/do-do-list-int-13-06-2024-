import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NoteEditor = ({ currentNote, onSave }) => {
    const [note, setNote] = useState({ id: '', title: '', content: '', tags: [] });
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    useEffect(() => {
        if (currentNote) {
            setNote(currentNote);
        } else {
            setNote({ id: '', title: '', content: '', tags: [] });
        }
    }, [currentNote]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({ ...prevNote, [name]: value }));
    };

    const handleTagChange = (e) => {
        const { value } = e.target;
        setNote(prevNote => ({ ...prevNote, tags: value.split(',').map(tag => tag.trim()) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset previous errors
        setTitleError('');
        setContentError('');

        // Validate title and content
        if (!note.title.trim()) {
            setTitleError('Title cannot be empty.');
            return;
        }

        if (!note.content.trim()) {
            setContentError('Content cannot be empty.');
            return;
        }

        if (!note.id) {
            note.id = uuidv4();
        }
        onSave(note);
        setNote({ id: '', title: '', content: '', tags: [] });
    };

    return (
        <form className="note-editor" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    onChange={handleChange}
                    className="input-field"
                />
                {titleError && <span className="error-message">{titleError}</span>}
            </div>
            <textarea
                name="content"
                placeholder="Content"
                value={note.content}
                onChange={handleChange}
                className="textarea-field"
            />
            {contentError && <span className="error-message">{contentError}</span>}
            <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={note.tags.join(', ')}
                onChange={handleTagChange}
                className="input-field"
            />
            <button type="submit" className="save-btn">Save</button>
        </form>
    );
};

export default NoteEditor;
