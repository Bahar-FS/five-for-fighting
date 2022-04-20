import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import MonthPicker from '../components/month-picker';
import Roadmap from '../components/roadmap';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  /*TODO: Remove once date picker is merged*/
  const weeks = [
    { from: '1', to: '7' },
    { from: '8', to: '15' },
    { from: '16', to: '23' },
    { from: '24', to: '31' },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Template Generator</title>
      </Head>
      <main className={styles.main}>
        <MonthPicker />
        <Roadmap weeks={weeks} />
      </main>
    </div>
  );
};

export default Home;
