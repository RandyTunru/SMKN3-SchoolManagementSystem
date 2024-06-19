import React from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import {AiOutlineFile, AiOutlineLike} from 'react-icons/ai';
import ReportTableForVice from '../components/DailyReportTeacherComponents/ReportTableForVice';
import '../styles/ReportTableforViceView.css';

export const ReportTableforViceView = () =>{
    const data = React.useMemo(
        () => [
          { no: 1, nip: '12345', nama: 'John Doe', status: 'Aktif' },
          { no: 2, nip: '67890', nama: 'Jane Doe', status: 'Nonaktif' },
        ],
        []
      );
    
      const columns = React.useMemo(
        () => [
          { Header: 'No', accessor: 'no' },
          { Header: 'NIP', accessor: 'nip' },
          { Header: 'Nama', accessor: 'nama' },
          { Header: 'Status', accessor: 'status' },
          {
            Header: 'Aksi',
            Cell: row => (
              <>
                <AiOutlineFile style={{ marginRight: 5, cursor: 'pointer' }} />
                <AiOutlineLike style={{ cursor: 'pointer' }} />
              </>
            ),
          },
        ],
        []
      );
  return (
    <div>
    <Header Auth="Wakasek Kurikulum"/>
    <Sidebar/>
    <h4 className="title-page">Laporan Mengajar Harian</h4>
    <ReportTableForVice columns={columns} data={data}/>
    


      
    </div>
  )
}

export default ReportTableforViceView;
