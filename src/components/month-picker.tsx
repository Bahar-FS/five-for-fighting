import { useRef, useState } from 'react';
import Picker from 'react-month-picker';
import Roadmap from './roadmap';
import Indicator from './indicator';
import 'react-month-picker/css/month-picker.css';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import indicator1 from '../../public/google-maps.png';
import indicator2 from '../../public/indicator.png';
import indicator3 from '../../public/maps-and-flags.png';


const MonthPicker = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [weeks, setWeeks] = useState([]);
  const [isVisible, setVisibility] = useState(false);
  const [selected_month_year, setMonthYear] = useState({
    month: currentMonth,
    year: currentYear,
  });

  const monthsList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const range = {
    min: { month: 1, year: currentYear - 1 },
    max: { month: currentMonth + 1, year: currentYear },
  };
  const showMonthPicker = (event) => {
    setVisibility(true);
    event.preventDefault();
  };

  const handleOnDismiss = () => {
    setVisibility(false);
  };
  const getWeeksInMonth = (year, month) => {
    const weeks = [];
    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);
    const numDays = lastDate.getDate();

    let offset = 0;

    if (firstDate.getDay() === 0) offset = 1;
    else if (firstDate.getDay() === 6) offset = 2;

    let start = 1 + offset;
    let end;

    if (offset === 0) end = 5 - firstDate.getDay() + 1;
    else end = 5 - start + 1 + offset * 2;

    while (start <= numDays) {
      weeks.push({ start: start, end: end });
      start = end + 3;
      end = end + 7;
      end = start === 1 && end === 8 ? 1 : end;
      if (end > numDays) end = numDays;
    }

    setWeeks(weeks);
  };


  const [indicator, setIndicator] = useState('');

  const handleOnChange = (year, month) => {
    setMonthYear({ year, month });
    setVisibility(false);
    getWeeksInMonth(year, month);
  };

  const getMonthValue = () => {
    const month =
      selected_month_year && selected_month_year.month
        ? monthsList[selected_month_year.month - 1]
        : 0;
    const year =
      selected_month_year && selected_month_year.year
        ? selected_month_year.year
        : 0;
    return month && year ? `${month}-${year}` : 'Select Month';
  };

  const ref = useRef<HTMLDivElement>(null);
const imageChange =(indicator) => {
  setIndicator(indicator);
};
  return (
    <><div className="MonthYearPicker">
      <h1>RoadMap Template Generator</h1>
      <h3>Please select the month</h3>
      <button className={styles.monthbtn} onClick={showMonthPicker}>{getMonthValue()}</button>
      <Picker
        show={isVisible}
        lang={monthsList}
        years={range}
        value={selected_month_year}
        onChange={handleOnChange}
        onDismiss={handleOnDismiss}
      />
      <div className={styles.box}>  
        <span><h4>Choose the color indicator</h4></span>
        <div >
          <Image src={indicator1} alt="indicator1" id="indicator1" width={50} height={50} className='indicator1' onClick={() => imageChange('indicator-map')} />
          {/* <Indicator
            title=""
            onClick={imageChange}
            imagebg={styles.indicator}/> */}
          <Image src={indicator2} alt="indicator2" id="indicator2" width={50} height={50} className='indicator2' onClick={() => imageChange('indicator-red')} />
          <Image src={indicator3} alt="indicator3" id="indicator2"  width={50} height={50} className={styles.image_indicator} onClick={() =>imageChange('indicator-black')}  />
        </div>
      </div>

      
    </div>
    <Roadmap weeks={weeks} indicator={indicator} />
    </>
  );
};
export default MonthPicker;
