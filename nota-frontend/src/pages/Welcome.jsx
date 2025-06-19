import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white relative px-4 py-10 text-gray-800 font-serif">
            {/* Top Right Register Link */}
            <div className="absolute top-4 right-4">
                <Link
                    to="/register"
                    className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 text-sm font-semibold text-gray-800 text-center"
                >
                    New User? <br /> Register here
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center text-center w-full">
                <h1 className="text-5xl font-bold mb-4 text-gray-800 italic">PersoNotes...</h1>
                <p className="text-md mb-8 leading-relaxed">
                    Capture ideas.<br />
                    Stay organized.<br />
                    Access them anytime.
                </p>
                <img
                    src={require('../planning_01.png')}
                    alt="Notes planning"
                    className="w-64 mb-8"
                />
                <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-2 bg-gray-100 border border-gray-400 text-black rounded-lg shadow font-bold hover:bg-gray-200 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
