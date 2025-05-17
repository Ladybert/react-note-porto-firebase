import React from 'react';
import NoteCard from '../../atoms/NoteCard';

const NotesItem = ({ notes }) => {
  return (
    <>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </>
  );
};

export default NotesItem;
