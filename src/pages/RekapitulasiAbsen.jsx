import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RekapitulasiAbsen = () => {
    const grades = [10, 11, 12];
    const [selectedGrade, setSelectedGrade] = useState(10);
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                        query getClasses {
                            classes {
                                data {
                                    id
                                    attributes {
                                        grade
                                        nama
                                    }
                                }
                            }
                        }
                    `
                });
                const data = response.data.data.classes.data;
                if (data) {
                    setClassList(data);
                } else {
                    console.log('Data not found');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleGradeChange = (e) => {
        const grade = parseInt(e.target.value, 10);
        setSelectedGrade(grade);
    };

    const filteredClassList = classList.filter((kelas) => kelas.attributes.grade === selectedGrade);

    return (
        <MainLayout>
            <div>
                <h1>Rekapitulasi Absen</h1>
                <div className='flex items-center gap-5 mt-5'>
                    <label className="block">Pilih Kelas:</label>
                    <select
                        value={selectedGrade}
                        onChange={handleGradeChange}
                        className="p-2 cursor-pointer"
                    >
                        {grades.map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mt-5'>
                    <table className='min-w-full bg-white border'>
                        <thead>
                            <tr>
                                <th className="py-2 border">No</th>
                                <th className="py-2 border">Nama Kelas</th>
                                <th className="py-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClassList.map((kelas, index) => (
                                <tr key={kelas.id} className="text-center">
                                    <td className="py-2 border">{index + 1}</td>
                                    <td className="py-2 border">{kelas.attributes.nama}</td>
                                    <td className="py-2 border">
                                        <Link to={`/presensi-mapel/${kelas.id}`}>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lihat Detail</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default RekapitulasiAbsen;
