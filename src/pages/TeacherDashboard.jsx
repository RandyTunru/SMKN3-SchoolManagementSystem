import React from 'react';
import {Header} from '../components/Header/Header.jsx';
import DashboardBox from "../components/Dashboard/DashboardBox.jsx";
import Photo from "../components/Assets/schoolpict.png";
import '../styles/Dashboard.css'
import Report from '../components/Assets/report.png';
import TeachMaterial from '../components/Assets/book.png';
import Schedule from '../components/Assets/calendar.png';
import List from '../components/Assets/list.png';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar.jsx';



export const TeacherDashboard = () => {
  return (
    <div className="dashboard-wrapper">
            <Header Auth="Teacher" />
            <div className="sidebar-and-content">
                <Sidebar />
                <div className="content">
                    <img className="school-pict" src={Photo} alt="smkn3picture" />
                    <div className="content-wrapper">
                      <Link to="/daily-report-teacher" className='no-underline'><DashboardBox className="box-menu" Text="Laporan Mengajar Harian" src={Report} imageSize="100px"/></Link>
                      <Link to="/teach-material" className='no-underline'><DashboardBox className="box-menu" Text="RPP dan Bahan Ajar" src={TeachMaterial} imageSize="100px"/></Link>
                      <Link to="/schedule" className='no-underline'><DashboardBox className="box-menu" Text="Jadwal Mengajar " src={Schedule} imageSize="100px"/></Link>         
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TeacherDashboard;