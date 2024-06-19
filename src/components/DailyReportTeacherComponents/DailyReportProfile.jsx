import React from 'react';
import './DailyReportProfile.css';


export const DailyReportProfile = ({desc,data}) => {
  return (
    <div className='short-profile'>
    
        <h3 className='description'>{desc}</h3>
        <h3 className='profile-box'>{data}</h3> 
    </div>
  )
}

export default DailyReportProfile
