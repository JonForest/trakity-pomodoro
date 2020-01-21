export function secondsToDisplay(totalSeconds) {
  const minutes = ('' + Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = (totalSeconds % 60).toFixed(0).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function getRemainingSeconds(defaultDuration, initialDate) {
  if (!initialDate) return 0;

  const now = new Date();
  const remainingDuration = defaultDuration - (now.getTime() - initialDate.getTime()) / 1000; // remaining time in seconds
  return remainingDuration > 0 ? remainingDuration : 0;
}
