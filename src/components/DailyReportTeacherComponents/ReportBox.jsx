import React from 'react';
import './ReportBox.css';
import {AddReportButton} from '../Buttons/AddReportButton.jsx';
import { FaPen } from "react-icons/fa";

export const ReportBox = () => {
  return (
    <div>
      <div className="report-box">
        <div className="report-status">
        <FaPen className="pen-icon"/>
        <h2>Belum dibuat</h2>

        </div>
        
        <AddReportButton/>



      </div>
      
      
    </div>
    
  )
}

export default ReportBox;
