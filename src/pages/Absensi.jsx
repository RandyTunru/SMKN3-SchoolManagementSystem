import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Absensi() {
    const { id_attendance, id_absensi } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentsAndAttendance = async () => {
            try {
                setLoading(true);

                // Fetch students in the class associated with the schedule
                const studentsResponse = await axios.post('http://localhost:1337/graphql', {
                    query: `
                        query getStudentsInClass($id: ID!) {
                            schedules(filters: { id: { eq: $id } }) {
                                data {
                                    attributes {
                                        class {
                                            data {
                                                id
                                                attributes {
                                                    students {
                                                        data {
                                                            id
                                                            attributes {
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
                    variables: { id: id_attendance },
                });

                const studentsData = studentsResponse.data.data.schedules.data[0].attributes.class.data.attributes.students.data;

                // Fetch existing attendance data for the absency
                const attendanceResponse = await axios.post('http://localhost:1337/graphql', {
                    query: `
                        query getAbsency($id: ID!) {
                            absencies(filters: { id: { eq: $id } }) {
                                data {
                                    id
                                    attributes {
                                        presences {
                                            data {
                                                id
                                                attributes {
                                                    student {
                                                        data {
                                                            id
                                                        }
                                                    }
                                                    kehadiran
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `,
                    variables: { id: id_absensi },
                });

                const attendanceData = attendanceResponse.data.data.absencies.data[0]?.attributes.presences.data || [];

                // Map attendance data to a more accessible format
                const initialStatus = {};
                attendanceData.forEach((item) => {
                    initialStatus[item.attributes.student.data.id] = {
                        kehadiran: item.attributes.kehadiran,
                        presenceId: item.id,
                    };
                });

                setStudents(studentsData);
                setAttendanceStatus(initialStatus);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchStudentsAndAttendance();
    }, [id_attendance, id_absensi]);

    const handleChange = (studentId, event) => {
        setAttendanceStatus({
            ...attendanceStatus,
            [studentId]: {
                ...attendanceStatus[studentId],
                kehadiran: event.target.value,
            },
        });
    };

    const saveAttendance = async () => {
        try {
            // Prepare attendance data for the request
            const attendanceData = Object.keys(attendanceStatus).map((studentId) => ({
                student: studentId,
                kehadiran: attendanceStatus[studentId]?.kehadiran,
                presenceId: attendanceStatus[studentId]?.presenceId,
            }));
    
            // Send the updated attendance data to the backend
            await Promise.all(
                attendanceData.map(async ({ student, kehadiran, presenceId }) => {
                    if (presenceId) {
                        // Update existing presence record using REST API
                        await axios.put(`http://localhost:1337/api/presences/${presenceId}`, {
                            data: {
                                kehadiran: kehadiran,
                                absency: id_absensi,
                                student: student,
                                published_at: new Date().toISOString(),
                            }
                        });
                    } else {
                        // Create new presence record using REST API
                        await axios.post('http://localhost:1337/api/presences', {
                            data: {
                                kehadiran: kehadiran,
                                absency: id_absensi,
                                student: student,
                                published_at: new Date().toISOString(),
                            }
                        });
                    }
                })
            );
    
            navigate(`/attendance/${id_attendance}`);
        } catch (err) {
            console.error('Error saving attendance data:', err);
            setError(err);
        }
    };
    

    const goBack = () => {
        navigate(`/attendance/${id_attendance}`);
    };

    if (loading) return <MainLayout>Loading...</MainLayout>;
    if (error) return <MainLayout>Error: {error.message}</MainLayout>;

    return (
        <MainLayout>
            <h1>Halaman Absensi</h1>
            {students.length > 0 ? (
                <>
                    <table className="min-w-full bg-white border border-gray-200 rounded-md mt-5">
                        <thead className='bg-orange-500 text-white'>
                            <tr>
                                <th className="px-4 py-2 border-b text-center">ID Siswa</th>
                                <th className="px-4 py-2 border-b text-center">Nama Siswa</th>
                                <th className="px-4 py-2 border-b text-center">Hadir</th>
                                <th className="px-4 py-2 border-b text-center">Tidak Hadir</th>
                                <th className="px-4 py-2 border-b text-center">Izin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b text-center">{student.id}</td>
                                    <td className="px-4 py-2 border-b text-center">{student.attributes.nama}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <input
                                            type="radio"
                                            id={`hadir-${student.id}`}
                                            name={`attendanceStatus-${student.id}`}
                                            value="Hadir"
                                            checked={attendanceStatus[student.id]?.kehadiran === 'Hadir'}
                                            onChange={(event) => handleChange(student.id, event)}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <input
                                            type="radio"
                                            id={`tidak-hadir-${student.id}`}
                                            name={`attendanceStatus-${student.id}`}
                                            value="Tidak Hadir"
                                            checked={attendanceStatus[student.id]?.kehadiran === 'Tidak Hadir'}
                                            onChange={(event) => handleChange(student.id, event)}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <input
                                            type="radio"
                                            id={`izin-${student.id}`}
                                            name={`attendanceStatus-${student.id}`}
                                            value="Izin"
                                            checked={attendanceStatus[student.id]?.kehadiran === 'Izin'}
                                            onChange={(event) => handleChange(student.id, event)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4 gap-5">
                        <button 
                            onClick={goBack}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Kembali
                        </button>
                        <button 
                            onClick={saveAttendance}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Simpan
                        </button>
                    </div>
                </>
            ) : (
                <p>No data found for the given ID.</p>
            )}
        </MainLayout>
    );
}
