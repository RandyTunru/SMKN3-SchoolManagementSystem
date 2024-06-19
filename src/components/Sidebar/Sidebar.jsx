import React from 'react';
import './Sidebar.css';
import smkn3makassarLogo from '../Assets/smkn3makassar.png';

export const Sidebar = () => {
  const role = localStorage.getItem('role');

  var content;

  switch (role) {
    case 'teacher':
      content = (
        <div className="flex flex-col items-center w-[250px] fixed mt-[80px] shadow-md h-full z-20">
          <div className="sidebar-brand mt-5">
            <img className="logo" src={smkn3makassarLogo} alt="logo"/>
          </div>
          <div className="mt-3 px-5">
            <ul className="sidebar-nav flex flex-col justify-between w-full">
              <li className="border-b border-t border-gray-300 w-full">
                <a href="/daily-report-teacher" className="block py-2 px-4 hover:bg-gray-100">
                  Laporan Mengajar Harian
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/teach-material" className="block py-2 px-4 hover:bg-gray-100">
                  RPP dan Bahan Ajar
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/schedule" className="block py-2 px-4 hover:bg-gray-100">
                  Jadwal Mengajar
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
      break;
    case 'headmaster':
      content = (
        <div className="flex flex-col items-center w-[250px] fixed mt-[80px] shadow-md h-full z-20">
          <div className="sidebar-brand mt-5">
            <img className="logo" src={smkn3makassarLogo} alt="logo"/>
          </div>
          <div className="mt-3 px-5">
            <ul className="sidebar-nav flex flex-col justify-between w-full">
              <li className="border-b border-t border-gray-300 w-full">
                <a href="/daily-report-teacher" className="block py-2 px-4 hover:bg-gray-100">
                  Laporan Mengajar Harian
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/teach-material" className="block py-2 px-4 hover:bg-gray-100">
                  RPP dan Bahan Ajar
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
      break;
    case 'viceprincipal':
      content = (
        <div className="flex flex-col items-center w-[250px] fixed mt-[80px] shadow-md h-full z-20">
          <div className="sidebar-brand mt-5">
            <img className="logo" src={smkn3makassarLogo} alt="logo"/>
          </div>
          <div className="mt-3 px-5">
            <ul className="sidebar-nav flex flex-col justify-between w-full">
              <li className="border-b border-t border-gray-300 w-full">
                <a href="/teach-material" className="block py-2 px-4 hover:bg-gray-100">
                  RPP dan Bahan Ajar
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/daily-report-teacher-for-vice-view" className="block py-2 px-4 hover:bg-gray-100">
                  Laporan Mengajar Harian
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/set-schedule" className="block py-2 px-4 hover:bg-gray-100">
                  Atur Jadwal Mengajar
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/data-wakasek" className="block py-2 px-4 hover:bg-gray-100">
                  Data Wakasek Kurikulum
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/rekap-presensi" className="block py-2 px-4 hover:bg-gray-100">
                  Rekapitulasi Absen
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
      break;
    default:
      content = (
        <div className="flex flex-col items-center w-[250px] fixed mt-[80px] shadow-md h-full z-20">
          <div className="sidebar-brand mt-5">
            <img className="logo" src={smkn3makassarLogo} alt="logo"/>
          </div>
          <div className="mt-3 px-5">
            <ul className="sidebar-nav flex flex-col justify-between w-full">
              <li className="border-b border-t border-gray-300 w-full">
                <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/data-guru" className="block py-2 px-4 hover:bg-gray-100">
                  Data Guru
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/data-siswa" className="block py-2 px-4 hover:bg-gray-100">
                  Data Siswa
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/data-wakasek" className="block py-2 px-4 hover:bg-gray-100">
                  Data Kepala Sekolah
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/data-wakasek" className="block py-2 px-4 hover:bg-gray-100">
                  Data Wakasek Kurikulum
                </a>
              </li>
              <li className="border-b border-gray-300 w-full">
                <a href="/rekap-presensi" className="block py-2 px-4 hover:bg-gray-100">
                  Rekapitulasi Absen
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
  }



  return (
      content
    )
};

export default Sidebar;