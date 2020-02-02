import React from 'react';
import styles from './StartButton.module.css'

export default function StartButton({onClick, started}) {
  const buttonClass = `${started ? 'bg-red-400' : 'bg-purple-300'} ${styles['button-shadow']}`
  return (
    <>
      <div className={`${buttonClass} w-48 h-48 rounded-full text-center text-4xl mt-12`} onClick={onClick}>
        <button className="focus:outline-none">{started ? 'Reset' : 'Start'}</button>
      </div>
    </>
  );
}
