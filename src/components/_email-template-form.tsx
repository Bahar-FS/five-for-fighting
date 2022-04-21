import React, { useState } from 'react';
import styles from '../styles/email.module.scss';

export const EmailTemplate = () => {
  const [salutation, setsalutation] = useState('');
  const [message, setMessage] = useState('');
  const [closing, setClosing] = useState('');
  const [signature, setSignature] = useState('');

  return (
    <div className={styles.container}>
        <h1>Email Template Generator</h1>
        <div className={styles.email_container}>
      <textarea
        value={salutation}
        onChange={(e) => setsalutation(e.target.value)}
        placeholder="Salutation"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      {/* // image component */}
      <textarea
        value={closing}
        onChange={(e) => setClosing(e.target.value)}
        placeholder="Closing Message"
      />

      <textarea
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        placeholder="Signature Block"
      />
      </div>
    </div>
  );
};
