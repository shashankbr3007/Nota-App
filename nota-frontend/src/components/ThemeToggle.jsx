import React, { useState, useEffect } from 'react';

export function ThemeToggle() {
    const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        if (dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [dark]);

    return (
        <button onClick={() => setDark(!dark)}>
            {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
