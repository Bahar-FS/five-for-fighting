import styles from '../styles/Home.module.scss';

type IndicatorType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
};

const Indicator: React.FC<IndicatorType> = ({ title, onClick }) => {
  return (
    <>
      <button
        type="button"
        className={styles.indicator}
        onClick={onClick}
      ></button>
      <div>{title}</div>
    </>
  );
};

export default Indicator;
