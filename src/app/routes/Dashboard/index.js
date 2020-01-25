import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Layout from '../../components/Layout';
import StartButton from '../../components/StartButton';
import Timer from '../../components/Timer';

const ACTIVE_POMODOROS = gql`
  query Pomodoro($time: timestamptz!) {
    pomodoros(where: { _and: { user_id: { _eq: -1 } }, start: { _gte: $time } }, limit: 1, order_by: { start: desc }) {
      id
      start
    }
  }
`;

const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');

export default function Comp() {
  const [startTime, setStartTime] = useState(false);
  // Only want to fetch this on first render, so we don't need the set function
  const [timeCheck] = useState(new Date(new Date().setTime(new Date().getTime() - 24 * 60 * 1000)));
  const { loading, error, data } = useQuery(ACTIVE_POMODOROS, {
    variables: { time: timeCheck.toISOString() },
    pollInterval: 0
  });

  if (error) return <p>Connection error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  console.log(data);
  // data && data.pomodoros && data.pomodoros[0] && new Date(data.pomodoros[0].start));

  function buttonClicked(e) {
    e.preventDefault();
    if (startTime) setStartTime(null);
    else setStartTime(new Date());
  }

  function timerCompleted() {
    setStartTime(null);
    // todo: this throws an error. Need to google to figure out how to play an alert sound on timeout
    audio.play();
  }

  return (
    <Layout title="Dashboard">
      <div className="inline-block">
        <Timer startTime={startTime} onFinish={timerCompleted} />
        {!loading && <StartButton onClick={buttonClicked} started={!!startTime} />}
      </div>
    </Layout>
  );
}
