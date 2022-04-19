import React, { useState } from "react";

import Picker from 'react-month-picker'

import "react-month-picker/css/month-picker.css";

const MonthPicker = () => {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const [isVisible, setVisibility] = useState(false);
    const [selected_month_year, setMonthYear] = useState({ month: currentMonth, year: currentYear });


    const monthsList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    const range = {
        min: { month: 1, year: currentYear - 1, },
        max: { month: currentMonth + 1, year: currentYear, }
    };
    const showMonthPicker = event => {
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
        console.log(numDays);

        let offset = 0;

        if (firstDate.getDay() === 0) offset = 1;
        else if (firstDate.getDay() === 6) offset = 2;

        let start = 1 + offset;
        let end;

        if (offset === 0) end = 5 - firstDate.getDay() + 1;
        else end = 5 - start + 1 + (offset * 2);

        while (start <= numDays) {
            weeks.push({ start: start, end: end });
            start = end + 3;
            end = end + 7;
            end = start === 1 && end === 8 ? 1 : end;
            if (end > numDays) end = numDays;
        }

        console.log(weeks)
        // return weeks;

    }

    const handleOnChange = (year, month) => {
        setMonthYear({ year, month });
        setVisibility(false);
        getWeeksInMonth(year, month)

    };

    const getMonthValue = () => {
        const month = selected_month_year && selected_month_year.month ? monthsList[selected_month_year.month - 1] : 0;
        const year = selected_month_year && selected_month_year.year ? selected_month_year.year : 0;
        return month && year ? `${month}-${year}` : "Select Month";
    };

    return (
        <div className="MonthYearPicker">
            <button onClick={showMonthPicker}>{getMonthValue()}</button>
            <Picker
                show={isVisible}
                lang={monthsList}
                years={range}
                value={selected_month_year}
                onChange={handleOnChange}
                onDismiss={handleOnDismiss}
            />
        </div>
    );

}
export default MonthPicker;