import React, { useState } from 'react';
import Layout from '../../components/Layout'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

const FINISHED_POMODOROS = gql`
  query GetPomodoro($time: timestamptz!, $user: Int!) {
    pomodoros(where: {start: {_gte: $time}, _and: {user_id: {_eq: $user}}, status: {_eq: "finished"}}) {
      id
      start
    }
  }
`;

const NUMB_DAYS_AVG = 20;

const dte = new Date((new Date()).setDate((new Date()).getDate() - NUMB_DAYS_AVG));
const startDate = (new Date(`${dte.getFullYear()}-${dte.getMonth() + 1}-${dte.getDate()} 00:00:00.0000`));
const formatNumber = numb => (Math.round(numb * 100) / 100).toFixed(2);

function getPomodooroCount(pomodoros) {
  if (!pomodoros?.length) return [];
  let workingDay = new Date(startDate);
  let today = new Date();
  let counts = [];
  while (workingDay < today) {
    const endOfDay = (new Date(`${workingDay.getFullYear()}-${workingDay.getMonth() + 1}-${workingDay.getDate()} 23:59:59.9999`));
    counts.push(pomodoros.filter(pom => {
      const pomDate = new Date(pom.start);
      return pomDate >= workingDay && pomDate <= endOfDay
    }).length);
    workingDay = new Date(workingDay.setDate(workingDay.getDate() + 1));
  }

  return counts;
}

export default function Metrics() {
  const { error, data } = useQuery(FINISHED_POMODOROS, {
    variables: { time: startDate.toISOString(), user: -1 },
    pollInterval: 0
  });

  const [ avg, setAvg ] = useState(0);

  if (data?.pomodoros) {
    const counts = getPomodooroCount(data.pomodoros);
    const newAvg = formatNumber(counts.reduce((acc, val) => acc + val, 0) / counts.length);
    if (newAvg !== avg) setAvg(newAvg);
  }

  // 1. Fetch the number per day for the last x days (14?) - probably want to create a view with some triggers
  return (
    <Layout title="Metrics">
      These are some metrics<br/>
      Average pomodoros per day: {avg}
    </Layout>
  );

}
