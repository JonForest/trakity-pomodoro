import React, { useState, useEffect } from 'react';

export default function Timer({ startTime = null }) {
  const defaultTime = '25:00';
  const defaultDuration = 25 * 60; // 25 mins in seconds
  const [displayTime, setDisplayTime] = useState(defaultTime);


  useEffect(() => {
    if (!startTime) {
      setDisplayTime(defaultTime);
      return
    };

    function getRemainingSeconds(initialDate) {
      if (!initialDate) return 0;

      const now = new Date();
      const remainingDuration = defaultDuration - (now.getTime() - initialDate.getTime()) / 1000; // remaining time in seconds
      return remainingDuration > 0 ? remainingDuration : 0;
    }

    function secondsToDisplay(totalSeconds) {
      const minutes = ('' + Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = (totalSeconds % 60).toFixed(0).padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    const interval = setInterval(() => {
      setDisplayTime(secondsToDisplay(getRemainingSeconds(startTime)));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [startTime, setDisplayTime, defaultDuration]);

  return <div>{displayTime}</div>;
}
