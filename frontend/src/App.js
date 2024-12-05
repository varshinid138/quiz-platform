import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizCreationPage from './pages/QuizCreationPage';
import QuizTakerPage from './pages/QuizTakerPage';
import QuizResultsPage from './pages/QuizResultsPage';

function App() {
    return (
        <Router>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Quiz Portal</h1>
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/" style={linkStyle}>Home</Link>
                    <Link to="/create-quiz" style={linkStyle}>Create Quiz</Link>
                    <Link to="/take-quiz" style={linkStyle}>Take Quiz</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-quiz" element={<QuizCreationPage />} />
                    <Route path="/take-quiz" element={<QuizTakerPage />} />
                    <Route path="/results" element={<QuizResultsPage />} />
                    <Route path="/score" element={<QuizResultsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#007bff',
};

export default App;
