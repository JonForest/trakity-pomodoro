import React, { useState } from 'react';
import Layout from '../../components/Layout';
import StartButton from '../../components/StartButton';
import Timer from '../../components/Timer';

export default function Comp() {
  const [startTime, setStartTime] = useState(false);

  function buttonClicked(e) {
    e.preventDefault();
    if (startTime) setStartTime(null);
    else setStartTime(new Date());
  }

  console.log('rendering with startTime', startTime);
  return (
    <Layout title="Dashboard">
      <div className="inline-block">
        <Timer startTime={startTime} />
        <StartButton onClick={buttonClicked} started={!!startTime} />
      </div>
    </Layout>
  );
}
