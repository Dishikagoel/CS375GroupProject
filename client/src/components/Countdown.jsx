import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const CountdownTimer = ({ timeMessage, countdown, setCountdown, trigger, setTrigger }) => {
    
     useEffect(() => {
        let newtime = countdown;
        const interval = setInterval(() => {
            if (newtime > 0) {
                newtime = newtime - 1;
                setCountdown(newtime);
            } else {
                clearInterval(interval);
                setCountdown(0);
                setTrigger(!trigger); // Trigger a function to be called
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
     }, countdown);

     const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 3600) / 60);
        const seconds = Math.floor(time - hours * 3600 - minutes * 60); // Remove milliseconds

        const newTimeFormat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return newTimeFormat;
     }

     return (
        <Typography variant="h4" component="h4" gutterBottom>
            {timeMessage}: {formatTime(countdown)}
        </Typography>
     )
}

export default CountdownTimer;