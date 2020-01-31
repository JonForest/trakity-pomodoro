import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Layout from '../../components/Layout';
import StartButton from '../../components/StartButton';
import Timer from '../../components/Timer';
import TodaysCount from '../../components/TodaysCount'

/**
 * This is not how I wanted this to work. The state is all sync'd from the database
 * The problem with this is that I'd need a completely separate code path for offline support.
 * Ideally I wanted to handle all the state internally and just communicate the key events back to the db, though
 * that may not work from a multi-device approach?
 * Declarative versus Imperative etc
 */
const ACTIVE_POMODOROS = gql`
  query GetPomodoro($time: timestamptz!) {
    pomodoros(where: { _and: { user_id: { _eq: -1 } , start: { _gte: $time }, status: {_eq: "started" } } }, limit: 1, order_by: { start: desc }) {
      id
      start
      status
    }
  }
`;

const STOP_POMODORO = gql`
  mutation StopPomodoro($id: Int!, $status: pomodoro_status!) {
    update_pomodoros(where: {id: {_eq: $id}}, _set: {status: $status}) {
      affected_rows
    }
  }
`;

const CREATE_POMODORO = gql`
  mutation CreatePomodoro($start: timestamptz!) {
    insert_pomodoros(objects: {start: $start, user_id: -1}) {
      returning {
        id
        start
      }
    }
  }
`;

const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');

export default function Comp() {
  // Only want to fetch this on first render, so we don't need the set function
  const [timeCheck] = useState(new Date(new Date().setTime(new Date().getTime() - 10 * 1000)));

  const [pomodoro, setPomodoro] = useState(null);

  const [stopPomodoro, {loading: mutationLoading}] = useMutation(STOP_POMODORO);
  const [createPomodoro] = useMutation(CREATE_POMODORO);

  const { error, data } = useQuery(ACTIVE_POMODOROS, {
    variables: { time: timeCheck.toISOString() },
    pollInterval: 0
  });

   if (error) return <p>{error.toString()}</p>;

  if (data) {
    const { pomodoros = []} = data;

    if (pomodoros.length && (!pomodoro || (pomodoros[0].id !== pomodoro.id))) {
      // If the pomodoros query returns valid data and there is no current pomorodo then set it to the returned data
      // Need to set the startDate object here so re-renders don't change the Date object reference passed to the timer
      setPomodoro({...pomodoros[0], startDate: new Date(pomodoros[0].start)});
    } else if (!pomodoros.length && pomodoro?.id != null) {
      // if the pomodoros query returned no results, but the pomodoro is still set, then reset it to null
      setPomodoro(null);
    }
  } else {
    if (pomodoro?.id != null) {
      setPomodoro(null);
    }
  }

  function buttonClicked(e) {
    e.preventDefault();
    if (mutationLoading) return;
    if (pomodoro) {
      // The timer has been stopped, so we need to stop the in-progress pomodoro
      stopPomodoro({variables: {id: pomodoro.id, status: 'stopped'}, refetchQueries: ['GetPomodoro']});
    } else {
      const startDate = new Date();
      createPomodoro({variables: {start: startDate.toISOString()}, refetchQueries: ['GetPomodoro']});
      setPomodoro({startDate}); // Kick off counter as soon as possible
    }
  }

  async function timerCompleted() {
    if (mutationLoading) return;

    stopPomodoro({variables: {id: pomodoro.id, status: 'finished'}, refetchQueries: ['GetPomodoro']});

    // todo: this throws an error. Need to google to figure out how to play an alert sound on timeout
    audio.play();
  }
  return (
    <Layout title="Dashboard">
      <div className="inline-block">
        <Timer startTime={pomodoro ? pomodoro.startDate : null} onFinish={timerCompleted} />
        <StartButton onClick={buttonClicked} started={!!pomodoro} />
        <TodaysCount/>
      </div>
    </Layout>
  );
}
