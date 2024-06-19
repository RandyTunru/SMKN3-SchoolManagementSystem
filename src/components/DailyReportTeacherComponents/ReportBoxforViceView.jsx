import React from 'react';
import './ReportBoxforViceView.css';
import ViewReport from '../Assets/view_report.png'; 
import ViewReportButton from '../Buttons/ViewReportButton';

export const ReportBoxforViceView = ({date}) => {
  
  return (
    <div className='report-box-vice-view'> 
    <h5>{date}</h5>
    <img src={ViewReport} alt="icon" className='view-report-icon'/>
    <ViewReportButton/>
    </div>
  )
}

export default ReportBoxforViceView
