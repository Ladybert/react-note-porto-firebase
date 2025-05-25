// SetPasswordToVisible.jsx
import React, { useState } from 'react';

const SetPasswordToVisible = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPassword ? "text" : "password";

    return (
        <>
            <label htmlFor="password">Password</label>
            <input
                id='password'
                type={inputType}
                value={value}
                onChange={onChange}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                <input
                    type='checkbox'
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
            </label>
        </>
    );
};

export default SetPasswordToVisible;
