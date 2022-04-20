import { useState } from 'react';
import styles from '../styles/Home.module.scss';

type AccordionType = {
  children: React.ReactElement[];
  title: string;
};

const Accordion: React.FC<AccordionType> = ({ children, title }) => {
  const [is_visible, setIsVisible] = useState<boolean>(true);

  const toggle = () => {
    setIsVisible(!is_visible);
  };

  return (
    <div className={styles.accordion}>
      <button
        className={styles['accordion-btn']}
        onClick={toggle}
        type="button"
      >
        {title}
      </button>
      <div style={{ display: is_visible ? 'block' : 'none', padding: '5px' }}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
