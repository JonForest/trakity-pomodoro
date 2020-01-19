import React, { useState, useEffect } from 'react';

export default function Timer({ startTime = null }) {
  const defaultDuration = 25 * 60; // 25 mins in seconds
  const startDate = startTime ? new Date(startTime) : null;
  const remainingDuration = getRemainingSeconds(startDate);
  const [displayTime, setDisplayTime] = useState(secondsToDisplay(startDate ? remainingDuration : defaultDuration));

  function getRemainingSeconds(initialDate) {
    if (!initialDate) return 0;

    const now = new Date();
    const remainingDuration = defaultDuration - ((now.getTime() - initialDate.getTime()) / 1000); // remaining time in seconds
    return remainingDuration > 0 ? remainingDuration : 0;
  }

  function secondsToDisplay(totalSeconds) {
    const minutes = ('' + Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = (totalSeconds % 60).toFixed(0).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setDisplayTime(secondsToDisplay(getRemainingSeconds(startTime)));
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  });

  return <div>{displayTime}</div>;
}
