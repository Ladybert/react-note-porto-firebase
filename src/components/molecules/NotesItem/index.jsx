import React from 'react';
import NoteCard from '../../atoms/NoteCard';

const NotesItem = ({ notes, handleDeleteButtonFromParent, loadingFromParent, onTapOrClick }) => {
  return (
    <>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} handleDeleteButton={handleDeleteButtonFromParent} loading={loadingFromParent} onClickEvent={onTapOrClick}/>
      ))}
    </>
  );
};

export default NotesItem;
