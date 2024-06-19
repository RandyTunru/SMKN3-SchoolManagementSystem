import './App.css';
import { LoginPage } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyReport from './pages/DailyReport';
import {DailyReportTable} from './pages/DailyReportTable';
import {HeadmasterDashboard} from './pages/HeadmasterDashboard';
import {VicePrincipalDashboard} from'./pages/VicePrincipalDashboard';
import DailyReportCheck from './pages/DailyReportCheck';
import TeachMaterial from './pages/TeachMaterial';
import DailyReportForViceView from './pages/DailyReportForViceView';
import ReportTableforViceView from './pages/ReportTableforViceView';
import DataGuru from './pages/DataGuru';
import JadwalMengajar from './pages/JadwalMengajar';
import Attendance from './pages/Attendance';
import Absensi from './pages/Absensi';
import SetJadwalMengajar from './pages/SetJadwalMengajar';
import RekapitulasiAbsen from './pages/RekapitulasiAbsen';
import PresensiMapel from './pages/PresensiMapel';
import PresensiKelas from './pages/PresensiKelas';
import DataSiswa from './pages/DataSiswa';
import DataWakasek from './pages/DataWakasek';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DataHeadmaster from './pages/DataHeadmaster';
import DailyReportTanggal from './pages/DailyReportTanggal';

const client = new ApolloClient({
  uri: 'http://localhost:1377/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="*" element={<LoginPage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
          <Route path="/daily-report-table" element={<DailyReportTable/>}/>
          <Route path="/rekap-presensi" element={<RekapitulasiAbsen/>}/>
          <Route path="/headmaster-dashboard"element={<HeadmasterDashboard/>}/>
          <Route path="/vice-principal-dashboard"element={<VicePrincipalDashboard/>}/>
          <Route path="/daily-report-checklist"element={<DailyReportCheck/>}/>
          <Route path="/teach-material"element={<TeachMaterial/>}/>
          <Route path="/daily-report-teacher-for-vice-view"element={<DailyReportForViceView/>}/>
          <Route path="/report-table-vice-view"element={<ReportTableforViceView/>}/>
          <Route path="/data-guru" element={<DataGuru/>}/>
          <Route path="/schedule" element={<JadwalMengajar/>}/>
          <Route path="/attendance/:id_attendance" element={<Attendance/>}/>
          <Route path={`/attendance/:id_attendance/absensi/:id_absensi`} element={<Absensi/>}/>
          <Route path="/set-schedule" element={<SetJadwalMengajar/>}/>
          <Route path="/presensi-mapel/:id_kelas" element={<PresensiMapel/>}/>
          <Route path="/presensi-mapel/:id_kelas/presensi-kelas/:id_jadwal" element={<PresensiKelas/>}/>
          <Route path='/data-siswa' element={<DataSiswa/>}/>
          <Route path='/data-wakasek' element={<DataWakasek/>}/>
          <Route path="/data-kepala-sekolah" element={<DataHeadmaster/>}/>
          <Route path="/daily-report-teacher" element={<DailyReport/>}/>
          <Route path='/daily-report-teacher-schedule/:id_absensi' element={<DailyReportTanggal/>}/>
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
