import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const CountdownTimer = ({ countdown, setCountdown, trigger, setTrigger }) => {
    
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
        const seconds = time - hours * 3600 - minutes * 60;     

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     }

     return (
        <Typography variant="h4" component="h4" gutterBottom>
            Time remaining: {formatTime(countdown)}
        </Typography>
     )
}

export default CountdownTimer;