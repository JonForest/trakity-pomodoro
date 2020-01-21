import React, { useState } from 'react';
import Layout from '../../components/Layout';
import StartButton from '../../components/StartButton';
import Timer from '../../components/Timer';

export default function Comp() {
  const [startTime, setStartTime] = useState(false);
  // todo: find a better notification sound
  const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');

  function buttonClicked(e) {
    e.preventDefault();
    if (startTime) setStartTime(null);
    else setStartTime(new Date());
  }

  function timerCompleted() {
    setStartTime(null);
    // todo: this throws an error. Need to google to figure out how to play an alert sound on timeout
    audio.play();
    console.log('finished')
  }

  console.log('rendering with startTime', startTime);
  return (
    <Layout title="Dashboard">
      <div className="inline-block">
        <Timer startTime={startTime} onFinish={timerCompleted} />
        <StartButton onClick={buttonClicked} started={!!startTime} />
      </div>
    </Layout>
  );
}
