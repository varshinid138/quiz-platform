// src/components/QuizResults.js
import React from 'react';

function QuizResults({ quiz, answers }) {
    const calculateScore = () => {
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score += 1;
            }
        });
        return score;
    };

    const score = calculateScore();

    return (
        <div>
            <h2>Quiz Results</h2>
            <p>Your Score: {score} / {quiz.questions.length}</p>
            <ul>
                {quiz.questions.map((question, index) => (
                    <li key={index}>
                        <strong>{question.text}</strong>
                        <br />
                        Your Answer: {answers[index] || 'No Answer'}
                        <br />
                        Correct Answer: {question.correctAnswer}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizResults;
