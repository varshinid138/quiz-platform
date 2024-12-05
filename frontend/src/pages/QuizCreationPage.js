import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizCreationPage() {
    const [quizTopic, setQuizTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [error, setError] = useState(null);  // Error state for feedback
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        if (!questionText.trim() || options.some(option => !option.trim()) || correctAnswer === null) {
            setError('Please fill out all fields and select the correct answer.');
            return;
        }

        if (questions.length >= 5) {
            setError('You can only add up to 5 questions.');
            return;
        }

        const newQuestion = {
            question: questionText,
            options,
            correctAnswer: options[correctAnswer],
        };

        setQuestions([...questions, newQuestion]);
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectAnswer(null);
        setError(null);  // Clear error on successful question add
    };

    const handleSaveQuiz = async () => {
        if (!quizTopic.trim()) {
          alert('Please enter a quiz topic.');
          return;
        }
      
        if (questions.length === 0) {
          alert('Please add at least one question.');
          return;
        }
      
        const quizData = {
          topic: quizTopic,
          questions,
        };
      
        try {
          const response = await fetch('http://localhost:3001/save-quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData),
          });
      
          const data = await response.json();
          if (response.ok) {
            alert(data.message || 'Quiz saved successfully!');
            navigate('/');
          } else {
            alert('Error saving quiz');
          }
        } catch (error) {
          console.error('Error saving quiz:', error);
          alert('Failed to save quiz');
        }
      };
      
      
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Create Quiz</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '20px' }}>
                <label>
                    <strong>Quiz Topic:</strong>
                </label>
                <input
                    type="text"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        marginBottom: '20px',
                        fontSize: '16px',
                    }}
                />
            </div>

            <div>
                <label>
                    <strong>Question:</strong>
                </label>
                <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        marginBottom: '10px',
                        fontSize: '16px',
                    }}
                />

                <div>
                    <strong>Options:</strong>
                    {options.map((option, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                    setOptions(options.map((opt, i) => (i === index ? e.target.value : opt)))
                                }
                                style={{
                                    width: '80%',
                                    padding: '5px',
                                    fontSize: '16px',
                                }}
                            />
                            <input
                                type="radio"
                                name="correctAnswer"
                                checked={correctAnswer === index}
                                onChange={() => setCorrectAnswer(index)}
                                style={{ marginLeft: '10px' }}
                            />
                            Correct
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAddQuestion}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Add Question
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Questions:</h3>
                {questions.length > 0 ? (
                    questions.map((q, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <strong>Q{index + 1}: </strong> {q.question}
                            <ul>
                                {q.options.map((option, i) => (
                                    <li key={i} style={{ color: q.correctAnswer === option ? 'green' : 'black' }}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No questions added yet.</p>
                )}
            </div>

            <button
                onClick={handleSaveQuiz}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
            >
                Save Quiz
            </button>
        </div>
    );
}

export default QuizCreationPage;
