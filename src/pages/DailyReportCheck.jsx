import React from 'react';
import {Header} from '../components/Header/Header.jsx';
import {ReportBox} from '../components/DailyReportTeacherComponents/ReportBox.jsx';
import {MonthList} from '../components/DailyReportTeacherComponents/MonthList.jsx';
import { Link } from "react-router-dom";
import '../styles/Dashboard.css';


export const DailyReportCheck = () => {
  return (
    <body>
        <Header Auth="Teacher" dashboardPage="/teacher-dashboard"/>
        <MonthList/>
        <Link to="/daily-report-table" className='no-underline'><ReportBox/></Link>
        <Link to="/daily-report-table" className='no-underline'><ReportBox/></Link>
        <Link to="/daily-report-table" className='no-underline'><ReportBox/></Link>
        <Link to="/daily-report-table" className='no-underline'><ReportBox/></Link>


      
    </body>
  )
}

export default DailyReportCheck;
