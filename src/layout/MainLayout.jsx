import React from 'react'; 
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import './MainLayout.css';

export const MainLayout = ({children}) =>{
    return (
        <div className=''>
            <Header Auth="Admin" dashboardPage="/dashboard"/>
            <div className="sidebar-and-content">
                <Sidebar />
                <div className="layout-content">
                    <div className='content-card'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}