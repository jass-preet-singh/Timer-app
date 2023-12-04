// Timer.js
import React, { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

const Timer = () => {
    const [buttonTitle, setButtonTitle] = useState('Start');
    const [status, setStatus] = useState(false);
    const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('0:00:00');

    useEffect(() => {
        let interval;
        if (status) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const newSeconds = prevTimer.seconds + 1;
                    if (newSeconds === 60) {
                        const newMinutes = prevTimer.minutes + 1;
                        if (newMinutes === 60) {
                            return { hours: prevTimer.hours + 1, minutes: 0, seconds: 0 };
                        }
                        return { ...prevTimer, minutes: newMinutes, seconds: 0 };
                    }
                    return { ...prevTimer, seconds: newSeconds };
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer, status]);

    const timerHandle = () => {
        setStatus(!status);
        const title = status ? 'Resume' : 'Pause';
        setButtonTitle(title);
    };

    const resetHandle = () => {
        setStatus(false);
        setButtonTitle('Start');
        setTimer({ hours: 0, minutes: 0, seconds: 0 });
        setInputValue('0:00:00');
    };

    const inputHandle = (value) => {
        setInputValue(value);
        const [inputHours, inputMinutes, inputSeconds] = value.split(':').map(Number);
        setTimer({ hours: inputHours, minutes: inputMinutes, seconds: inputSeconds });
    };

    return (
        <>
            <div className="timer-container">
                <h2>Timer </h2>
                <div>
                    <h4>
                        Time: {timer.hours}:{timer.minutes < 10 ? '0' : ''}{timer.minutes}:{timer.seconds < 10 ? '0' : ''}{timer.seconds}
                    </h4>
                </div>
                <div className="input-container">
                    <Input
                        value={inputValue}
                        onChange={inputHandle}
                    />
                </div>
                <div className="buttons-container">
                    <Button
                        style={'primary'}
                        label={buttonTitle}
                        onClick={timerHandle}
                        isLoading={isLoading}
                    />
                    <Button
                        style={'secondary'}
                        label={'Reset'}
                        onClick={resetHandle}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    );
};

export default Timer;
