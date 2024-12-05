// src/pages/QuizCreationPage.js
import React, { useState } from 'react';

function QuizCreationPage({ setQuiz }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const addQuestion = () => {
        setQuestions([...questions, { text: currentQuestion, correctAnswer }]);
        setCurrentQuestion('');
        setCorrectAnswer('');
    };

    const finalizeQuiz = () => {
        setQuiz({ questions });
        alert('Quiz Created Successfully!');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Create a Quiz</h1>
            <input
                type="text"
                placeholder="Enter question"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                style={{ width: '100%', margin: '10px 0', padding: '10px' }}
            />
            <input
                type="text"
                placeholder="Enter correct answer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                style={{ width: '100%', margin: '10px 0', padding: '10px' }}
            />
            <button onClick={addQuestion} style={{ margin: '10px', padding: '10px 20px' }}>
                Add Question
            </button>
            <button onClick={finalizeQuiz} style={{ margin: '10px', padding: '10px 20px' }}>
                Finalize Quiz
            </button>
            <ul>
                {questions.map((q, index) => (
                    <li key={index}>
                        {q.text} - <strong>{q.correctAnswer}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizCreationPage;
