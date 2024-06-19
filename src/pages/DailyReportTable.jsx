import React from 'react';
import ReportTable from '../components/DailyReportTeacherComponents/ReportTable.jsx';
import Header from '../components/Header/Header.jsx';
import {Link} from 'react-router-dom';
import DailyReportProfile from '../components/DailyReportTeacherComponents/DailyReportProfile.jsx';
import Line from '../components/Assets/line.png';
import Sidebar from '../components/Sidebar/Sidebar.jsx';

export const DailyReportTable = () => {
  const columns = [
    {
      Header: 'No',
      accessor: 'number' // nama kolom sesuai dengan field 'name' dalam data
    },
    {
      Header: 'Deskripsi Kegiatan',
      accessor: 'description' // nama kolom sesuai dengan field 'age' dalam data
    },
    {
      Header: 'Kelas',
      accessor: 'class' // nama kolom sesuai dengan field 'city' dalam data
    },
    {
      Header: 'Waktu Mulai',
      accessor: 'start' // nama kolom sesuai dengan field 'city' dalam data
    },
    {
      Header: 'Waktu Mulai',
      accessor: 'end' // nama kolom sesuai dengan field 'city' dalam data
    },
    {
      Header: 'Bukti Dukung',
      accessor: 'evidence' // nama kolom sesuai dengan field 'city' dalam data
    }
  ];

  const data = [
    { number: '1', description: 30, class: 'New York', start:'08.00', end:'13.00', evidence:'' },
    { number: '2', description: 30, class: 'New York', start:'08.00', end:'13.00', evidence:'' },
    { number: '3', description: 30, class: 'New York', start:'08.00', end:'13.00', evidence:'' }
  ];

  return (
    <body>
    <Sidebar/>
    <Header Auth="Teacher" dashboardPage="/teacher-dashboard"/>
    <div>
      <DailyReportProfile desc="Nama Guru" data="Julaaskina, S.Pd"/>
      <DailyReportProfile desc="NIP" data="199992899800001"/>
      <DailyReportProfile desc="Mata Pelajaran" data="Fisika"/>
      <div>
      
      <DailyReportProfile desc="Tanggal Laporan" data="13-03-2024"/>
      </div>
      
      <ReportTable columns={columns} data={data} />
    </div>
    </body>

  );
};


export default DailyReportTable
