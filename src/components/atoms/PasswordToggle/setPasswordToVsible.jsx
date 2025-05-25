import React, { useState } from 'react';

const SetPasswordToVisible = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleType = showPassword ? "text" : "password";

    return (
        <>
            <input type={toggleType} />
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
}

export default SetPasswordToVisible