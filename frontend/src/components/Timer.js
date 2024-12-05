// src/components/Timer.js
import React, { useEffect, useState } from 'react';

function Timer({ initialTime, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeUp]);

    return <div>Time Left: {timeLeft}s</div>;
}

export default Timer;
