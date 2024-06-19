import React from 'react';
import MonthList from '../components/DailyReportTeacherComponents/MonthList';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import ReportBoxforViceView from '../components/DailyReportTeacherComponents/ReportBoxforViceView';
import {Link} from 'react-router-dom';


function DailyReportForViceView() {
  return (
    <div>
        <Header Auth="Wakasek Kurikulum"/>
        <Sidebar/>
        <MonthList className="month-list"/>
        <Link to="/report-table-vice-view" className="no-underline"><ReportBoxforViceView date="7 Januari 2024"/></Link>
        <Link to="/report-table-vice-view" className="no-underline"><ReportBoxforViceView date="8 Januari 2024"/></Link>
        <Link to="/report-table-vice-view" className="no-underline"><ReportBoxforViceView date="9 Januari 2024"/></Link>
        <Link to="/report-table-vice-view" className="no-underline"><ReportBoxforViceView date="10 Januari 2024"/></Link>
        <Link to="/report-table-vice-view" className="no-underline"><ReportBoxforViceView date= "11 Januari 2024"/></Link>
        


      
    </div>
  )
}

export default DailyReportForViceView
