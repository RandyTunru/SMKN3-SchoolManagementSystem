import { Header } from '../components/Header/Header.jsx';
import DashboardBox from "../components/Dashboard/DashboardBox.jsx";
import Photo from "../components/Assets/schoolpict.png";
import '../styles/Dashboard.css';
import Teacher from '../components/Assets/teacher.png';
import Student from '../components/Assets/student.png';
import Headmaster from '../components/Assets/headmaster.png';
import File from '../components/Assets/files.png';
import Wakasek from '../components/Assets/wakasek.png';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar.jsx';

export const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <Header Auth="Admin" />
            <div className="sidebar-and-content">
                <Sidebar />
                <div className="content">
                    <img className="school-pict" src={Photo} alt="smkn3picture" />
                    <div className="content-wrapper">
                        <Link to="/data-guru" className='no-underline'><DashboardBox className="box-menu" Text="Data Guru" src={Teacher} imageSize="100px" /></Link>
                        <Link to="/data-siswa" className='no-underline'><DashboardBox className="box-menu" Text="Data Siswa" src={Student} imageSize="100px" /></Link>
                        <Link to="/data-kepala-sekolah" className='no-underline'><DashboardBox className="box-menu" Text="Data Kepala Sekolah " src={Headmaster} imageSize="100px" /></Link>
                        <Link to="/data-wakasek" className='no-underline'><DashboardBox className="box-menu" Text="Data Wakasek Kurikulum" src={Wakasek} imageSize="100px" /></Link>
                        <Link to="/rekap-presensi" className='no-underline'><DashboardBox className="box-menu" Text="Rekapitulasi Absen" src={File} imageSize="100px" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
