import React from 'react';
import styles from './StartButton.module.css'

export default function StartButton({onClick, started}) {
  const buttonClass = `${started ? 'bg-red-400' : 'bg-blue-400'} ${styles['button-shadow']}`
  return (
    <>
      <div className={`${buttonClass} w-48 h-48 rounded-full text-center text-4xl`} onClick={onClick}>
        <button className="focus:outline-none">{started ? 'Reset' : 'Start'}</button>
      </div>
    </>
  );
}