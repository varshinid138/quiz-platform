import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizTakePage() {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes = 120 seconds
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch quiz data from the server
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:3001/get-quizzes');
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuizzes();

        // Start the timer
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval);
                    handleTimeout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const handleTimeout = () => {
        navigate('/score', {
            state: {
                score,
                total: quizzes[0]?.questions.length,
                answered: answeredQuestions
            }
        });
    };

    const handleAnswer = (selectedOption) => {
        const currentQuestion = quizzes[0].questions[currentQuestionIndex];

        if (selectedOption === currentQuestion.correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }

        setAnsweredQuestions((prevAnswered) => prevAnswered + 1);

        if (currentQuestionIndex < quizzes[0]?.questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            navigate('/score', {
                state: {
                    score: score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0),
                    total: quizzes[0]?.questions.length,
                    answered: answeredQuestions + 1
                }
            });
        }
    };

    const showScore = () => {
        navigate('/score', {
            state: {
                score,
                total: quizzes[0]?.questions.length,
                answered: answeredQuestions
            }
        });
    };

    if (isLoading) {
        return <p>Loading quiz...</p>;
    }

    if (quizzes.length === 0) {
        return <p>No quizzes available.</p>;
    }

    const currentQuestion = quizzes[0].questions[currentQuestionIndex];

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>{quizzes[0].topic}</h2>
            <div style={{ marginTop: '20px' }}>
                <h3>Question {currentQuestionIndex + 1}</h3>
                <p>{currentQuestion.question}</p>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {currentQuestion.options.map((option, index) => (
                        <li key={index} style={{ margin: '10px 0' }}>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                }}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <p>Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
            <button
                onClick={showScore}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '20px',
                }}
            >
                Show Score
            </button>
        </div>
    );
}

export default QuizTakePage;
 