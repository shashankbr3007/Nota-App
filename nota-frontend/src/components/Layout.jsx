import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="p-4 bg-white shadow flex justify-between items-center">
                <h1 className="text-xl font-bold">Nota</h1>
                <Link to="/login" className="text-sm text-blue-600 hover:underline">Logout</Link>
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
}
