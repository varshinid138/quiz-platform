// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to the Quiz Portal</h1>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                    onClick={() => navigate('/create-quiz')}
                >
                    Create Quiz
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                    onClick={() => navigate('/take-quiz')}
                >
                    Take Test
                </button>
            </div>
        </div>
    );
}

export default HomePage;
