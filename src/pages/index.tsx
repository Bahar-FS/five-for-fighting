import type { NextPage } from 'next'
import React, { useState } from "react";
import Head from 'next/head'
import MonthPicker from '../components/month-picker'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>FE updates</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Five for fighting
        </h1>
        <MonthPicker />
      </main>
    </div>
  )
}

export default Home
