import React, { useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Link, useParams, generatePath, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const periodToJadwal = {
    1: '07.00 - 08.30',
    2: '08.40 - 10.10',
    3: '10.20 - 11.50',
    4: '12.30 - 14.00',
    5: '14.10 - 15.40',
}

const PresensiMapel = () => {
    const { id_kelas } = useParams();
    const navigate = useNavigate();

    const baseUrl = generatePath("/presensi-mapel/:id_kelas", { id_kelas });

    const [DataJadwal, setData] = useState([]);

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                        query getSchedulebyClassId($id: ID!){
                            schedules(filters:{ class: { id : {eq : $id } } }){
                            data{
                                id
                                attributes{
                                hari
                                jadwal
                                teaching{
                                    data{
                                    attributes{
                                        subject{
                                        data{
                                            attributes{
                                            nama
                                            }
                                        }
                                        }
                                        users_permissions_user{
                                        data{
                                            attributes{
                                            nama
                                            }
                                        }
                                        }
                                    }
                                    }
                                }
                                }
                            }
                            }
                        }
                    `,
                    variables: {
                        id: id_kelas,
                    },
                });

                console.log(response);
                setData(response.data.data.schedules.data);
            }

            fetchData();
        }catch(err){
            console.log(err);
        }
    }, []);


    const goBack = () => {
        navigate(`/rekap-presensi`);
    };

    return (
        <MainLayout>
            <div>
            <div className="flex items-center mb-4 justify-between">
                    <h1 className="ml-4">Rekapitulasi Absen</h1>
                    <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back
                    </button>
                </div>
                <div className='mt-5'>
                    <table className='min-w-full bg-white border'>
                        <thead>
                            <tr>
                                <th className="py-2 border">No</th>
                                <th className="py-2 border">Mata Pelajaran</th>
                                <th className="py-2 border">Guru</th>
                                <th className='py-2 border'>Jadwal</th>
                                <th className="py-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataJadwal.map((jadwal, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2 border">{index + 1}</td>
                                    <td className="py-2 border">{jadwal.attributes.teaching.data.attributes.subject.data.attributes.nama}</td>
                                    <td className="py-2 border">{jadwal.attributes.teaching.data.attributes.users_permissions_user.data.attributes.nama}</td>
                                    <td className="py-2 border">{jadwal.attributes.hari + ', ' + periodToJadwal[jadwal.attributes.jadwal]}</td>
                                    <td className="py-2 border">
                                        <Link to={`${baseUrl}/presensi-kelas/${jadwal.id}`}>
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

export default PresensiMapel;