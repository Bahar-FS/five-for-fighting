import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
// import styles from '../styles/email.scss'
import {EmailTemplate} from '../components/_email-template-form'
const Home: NextPage = () => {
  return (
    <div >
      {/* <Head>
        <title>FE updates</title>
      </Head>

      <main className={styles.main}>
    
      </main> */}
      <EmailTemplate/> 
    </div>
  
   
  )
}

export default Home
