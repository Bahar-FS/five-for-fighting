import styles from '../styles/Home.module.scss';

type IndicatorType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  indicator:string;
};


const Indicator: React.FC<IndicatorType> = ({ title, onClick,indicator }) => {
  return (
    <>
      <button type="button" className={`${styles.indicator} ${styles[indicator]}`} onClick={onClick} />
      <div>{title}</div>
    </>
  );
};

export default Indicator;
