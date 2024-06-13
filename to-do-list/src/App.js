import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {

    const isDuplicateTitle = notes.some(n => n.id !== note.id && n.title === note.title);

    if (isDuplicateTitle) {
      alert('Note with this title already exists. Please use a different title.');
      return;
    }

    setNotes(prevNotes => {
      const existingNote = prevNotes.find(n => n.id === note.id);
      if (existingNote) {
        return prevNotes.map(n => n.id === note.id ? note : n);
      } else {
        return [...prevNotes, note];
      }
    });
    setCurrentNote(null);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(n => n.id !== noteId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagFilterChange = (e) => {
    setFilterTag(e.target.value);
  };

  const filteredNotes = notes.filter(note =>
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterTag === '' || note.tags.includes(filterTag))
  );

  const uniqueTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  return (
    <div className="app">
      <h1>Note-Taking App</h1>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select value={filterTag} onChange={handleTagFilterChange} className="tag-filter">
          <option value="">All Tags</option>
          {uniqueTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <NoteEditor
        currentNote={currentNote}
        onSave={handleSaveNote}

      />
      <NoteList
        notes={filteredNotes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default App;
