import React from 'react';
import './Box.css';
import { useNavigate } from 'react-router-dom';


export const Box = ({src,text, link}) => {

  const navigate = useNavigate();

  const handleCollectButton = () => {
    // Ganti '/halaman-tujuan' dengan path halaman tujuan
    navigate(link);
  };
  
  return (
    <div>
        <div className="assignment-box">
         <img className="icon-book" alt="icon" src={src}/>
         <h3>{text}</h3>
         <button className="text-after" onClick={handleCollectButton}>Kumpulkan</button>
        
        </div>
       
       
      
    </div>
  )
}

export default Box
