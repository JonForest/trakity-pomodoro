import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_TODAYS_COUNT = gql`
  query GetTodaysCount($timeStart: timestamptz!, $timeEnd: timestamptz!) {
    pomodoros_aggregate(where: 
      { _and: 
        { 
          user_id: { _eq: -1 },
          start: { _gte: $timeStart, _lte: $timeEnd},
          status: {_eq: "finished" } 
        }  
      }
    ) { 
      aggregate {
        count
      }
    }
  }
`;

const getDayStart = (today) =>
  new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:00.0000`);

const getDayEnd = (today) =>
  new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:59:59.9999`);


export default function TodaysCount() {
  // get the date once; don't want it to be recalculated for each render
  const [today] = useState(new Date());
  const { error, data, refetch } = useQuery(GET_TODAYS_COUNT, {
    variables: { timeStart: getDayStart(today).toISOString(), timeEnd: getDayEnd(today).toISOString() },
    pollInterval: 5000 // poll every five seconds
  });

  if (error) return <div className="mt-16">{error.toString()}</div>
  return <div className="mt-16">Todays Count: {data?.pomodoros_aggregate?.aggregate?.count || 0}</div>
}