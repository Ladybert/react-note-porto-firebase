import React from 'react';

const NoteCard = ({ note }) => {
    return (
        <div className='card-content' key={note.id}>
            <h2 className='title'>{note.title}</h2>
            <p className='date'>{note.date}</p>
            <p className='content'>{note.content}</p>
        </div>
    );
}

export default NoteCard;
