import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import { DataJadwal, DataAbsensi, DataPresensi, DataSiswa } from '../MockData/mockData';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PresensiKelas = () => {
    const { id_jadwal, id_kelas } = useParams();
    const navigate = useNavigate();
    const [DataAbsensi, setDataAbsensi] = useState([]);
    const [DataSiswa, setDataSiswa] = useState([]);
    const [DataPresensi, setPresensi] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getAbsenciesBySchedule($id: ID!){
                        absencies(filters: { schedule: { id :{eq: $id}}}) {
                          data{
                            id
                            attributes{
                              tanggal
                              schedule{
                                data{
                                  id
                                }
                              }
                            }
                          }
                        }
                      }
                    `,
                    variables: {
                        id: id_jadwal,
                    },
                });
                console.log(response);
                setDataAbsensi(response.data.data.absencies.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id_jadwal]);
    
    // Filter and sort DataAbsensi by id_jadwal
    const filteredDataAbsensi = DataAbsensi.filter(item => item.attributes.schedule.data.id === id_jadwal)
    .sort((a, b) => {
        const [dayA, monthA, yearA] = a.attributes.tanggal.split('-').map(Number);
        const [dayB, monthB, yearB] = b.attributes.tanggal.split('-').map(Number);
        
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        
        return dateA - dateB;
      });

    // Create a map of absensi IDs to dates for quick access
    const absensiDateMap = filteredDataAbsensi.reduce((acc, absensi) => {
        acc[absensi.id] = absensi.attributes.tanggal;
        return acc;
    }, {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getStudentsByClassId($id: ID!){
                        students(filters: { class: { id: {eq: $id}}}){
                          data{
                            id
                            attributes{
                              nama
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
                setDataSiswa(response.data.data.students.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id_kelas]);


    // Create a nested structure to hold presence data per student per date
    const studentPresenceMap = DataSiswa.reduce((acc, student) => {
        acc[student.id] = { name: student.attributes.nama, presence: {} };
        return acc;
    }, {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getPresenceByClassAndSchedule ($id_schedule: ID!, $id_class: ID!){
                        presences(filters: {
                          absency: {
                            schedule:{
                              id : { eq: $id_schedule},
                            }
                          },
                          student: {
                            class: {
                              id : { eq: $id_class}
                            }
                          }
                        }){
                          data{
                            attributes{
                              absency{
                                data{
                                  id
                                }
                              },
                              student{
                                data{
                                  id
                                }
                              },
                              kehadiran
                            }
                          }
                        }
                      }
                    `,
                    variables: {
                        id_class: id_kelas,
                        id_schedule: id_jadwal,
                    },
                });
                console.log(response);
                setPresensi(response.data.data.presences.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id_kelas, id_jadwal])

    // Fill the presence map with data from DataPresensi
    DataPresensi.forEach(presensi => {
        if (absensiDateMap[presensi.attributes.absency.data.id]) {
            const studentId = presensi.attributes.student.data.id;
            const date = absensiDateMap[presensi.attributes.absency.data.id];
            studentPresenceMap[studentId].presence[date] = presensi.attributes.kehadiran;
        }
    });

    console.log(filteredDataAbsensi)

    console.log(studentPresenceMap)

    // Get list of student IDs for rendering
    const studentIds = Object.keys(studentPresenceMap);

    const goBack = () => {
        navigate(`/presensi-mapel/${id_kelas}`);
    };

    return (
        <MainLayout>
            <div className="max-w-full">
                <div className="flex items-center mb-4 justify-between">
                    <h1 className="ml-4">Presensi Kelas</h1>
                    <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back
                    </button>
                </div>
                <div className="mt-5 overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-5 border text-sm">No</th>
                                <th className="py-2 px-5 border text-sm">Nama Siswa</th>
                                {filteredDataAbsensi.map((absensi, index) => (
                                    <th key={index} className="py-2 px-5 border text-sm">{"Pertemuan " + (index + 1)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {studentIds.map((studentId, index) => (
                                <tr key={studentId} className="text-center">
                                    <td className="py-2 px-5 border text-sm">{index + 1}</td>
                                    <td className="py-2 px-5 border text-sm">{studentPresenceMap[studentId].name}</td>
                                    {filteredDataAbsensi.map((absensi, absIndex) => (
                                        <td key={absIndex} className="py-2 px-5 border text-sm">
                                            {studentPresenceMap[studentId].presence[absensi.attributes.tanggal] || '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}

export default PresensiKelas;
