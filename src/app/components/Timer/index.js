import React, { useState, useEffect } from 'react';

export default function Timer({ startTime = null }) {
  const defaultDuration = 25 * 60; // 25 mins in seconds
  // const startDate = startTime ? new Date(startTime) : null;
  // const now = new Date();
  const [displayTime, setDisplayTime] = useState(secondsToDisplay(defaultDuration));

  function secondsToDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = ('' + (totalSeconds % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   }
  // });

  return <div>{displayTime}</div>;
}
