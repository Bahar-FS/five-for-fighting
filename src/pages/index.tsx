import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import MonthPicker from '../components/month-picker';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Template Generator</title>
      </Head>
      <main className={styles.main}>
        <MonthPicker />
      </main>
    </div>
  );
};

export default Home;
