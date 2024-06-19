import React, { useState } from 'react';
import './MonthList.css';

export const MonthList = () => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleSelectMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className='dropdown'>
      <select className='btn-month-list' value={selectedMonth} onChange={handleSelectMonth}>
        <option value="">Select a month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
    </div>
  );
};

export default MonthList;
