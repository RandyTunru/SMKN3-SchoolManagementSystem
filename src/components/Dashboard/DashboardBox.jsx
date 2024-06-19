import React from 'react';
import '../Dashboard/DashboardBox.css'; // Import file CSS untuk styling

export const DashboardBox = ({ className, Text, src, imageSize }) => {
    return (
        <div className={className}>
            <img className="icon" src={src} alt="icon" style={{ width: imageSize }} />
            <p className="text">{Text}</p>
        </div>
    );
}

export default DashboardBox;
