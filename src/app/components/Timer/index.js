import React, { useState, useEffect } from 'react';
import { secondsToDisplay, getRemainingSeconds } from '../../utils';

export default function Timer({ startTime = null, onFinish }) {
  const defaultDuration = 10; // 25 mins in seconds
  const defaultTime = secondsToDisplay(defaultDuration);
  const [displayTime, setDisplayTime] = useState(defaultTime);

  // Check if the timer has completed, and if so, notify the parent
  if (startTime && getRemainingSeconds(defaultDuration, startTime) <= 0) {
    onFinish();
  }

  useEffect(() => {
    if (!startTime) {
      setDisplayTime(defaultTime);
      return
    };

    const interval = setInterval(() => {
      setDisplayTime(secondsToDisplay(getRemainingSeconds(defaultDuration, startTime)));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [startTime, setDisplayTime, defaultDuration, defaultTime]);



  return <div>{displayTime}</div>;
}
