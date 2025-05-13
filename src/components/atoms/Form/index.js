import React from 'react';
import Button from '../Button';

const Form = ({ 
    onClose, 
    handleSubmitFunction, 
    setTitleValue, 
    setContentValue, 
    onChangeTitleInput,
    onChangeContentInput,
    loading }) => {

    return (
        <>
            <input 
                placeholder='Title' 
                value={setTitleValue} 
                onChange={onChangeTitleInput} 
            />
            <textarea 
                placeholder='Write your idea here' 
                value={setContentValue} 
                onChange={onChangeContentInput}
            ></textarea>
            <Button 
                onClick={handleSubmitFunction} 
                title='Save Idea' 
                classNameButton='save-modal' 
                loading={loading} 
            />
            <Button 
                onClick={onClose} 
                title='Close' 
                classNameButton='close-modal' 
            />
        </>
    );
}

export default Form;

