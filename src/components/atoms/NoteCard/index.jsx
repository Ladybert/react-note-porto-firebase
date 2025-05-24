import React from 'react';
import './note.scss';
import Button from '../Button';

const NoteCard = ({ note, handleDeleteButton, loading, onClickEvent }) => {
    return (
        <>
            <div className='card-content' key={note.id}>
                <h2 className='title' onClick={() => onClickEvent(note)}>{note.title}</h2>
                <p className='date'>{note.date}</p>
                <p className='content'>{note.content}</p>
                <Button 
                    onClick={() => handleDeleteButton(note.id)} 
                    title='Delete' 
                    classNameButton='delete-note' 
                    loading={loading} 
                />
            </div>
        </>
    );
}

export default NoteCard;
