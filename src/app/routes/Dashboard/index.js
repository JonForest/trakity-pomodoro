import React from 'react';
import Layout from '../../components/Layout';
import StartButton from '../../components/StartButton';
import Timer from '../../components/Timer';

export default function Comp () {
  return (
    <Layout title="Dashboard">
      <div className="inline-block">
        <Timer/>
        <StartButton/>
      </div>
    </Layout>
  );
}