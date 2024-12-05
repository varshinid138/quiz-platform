import React from 'react';
import { useLocation } from 'react-router-dom';

function QuizResultsPage() {
    const location = useLocation();
    const { score, total, answered } = location.state || { score: 0, total: 0, answered: 0 };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Quiz Completed!</h2>
            <p>Your Score: <strong>{score}</strong> / {total}</p>
            <p>Questions Answered: <strong>{answered}</strong> / {total}</p>
            <p>Correct Answers: <strong>{score}</strong></p>
        </div>
    );
}

export default QuizResultsPage;
