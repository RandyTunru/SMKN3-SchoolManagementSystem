import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { useParams, generatePath, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Attendance() {
    const { id_attendance } = useParams();
    const navigate = useNavigate();
    const baseUrl = generatePath("/attendance/:id_attendance", { id_attendance });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingAbsence, setIsAddingAbsence] = useState(false);
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                        query getAbsenciesForSchedule($id: ID!) {
                            absencies(filters: { schedule: { id: { eq: $id } } }) {
                                data {
                                    id
                                    attributes {
                                        tanggal
                                    }
                                }
                            }
                        }
                    `,
                    variables: {
                        id: id_attendance,
                    },
                });

                const sortedData = response.data.data.absencies.data.sort((a, b) => {
                    const dateA = new Date(a.attributes.tanggal.split('-').reverse().join('-'));
                    const dateB = new Date(b.attributes.tanggal.split('-').reverse().join('-'));
                    return dateA - dateB;
                });

                setData(sortedData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id_attendance]);

    const goBack = () => {
        navigate(`/schedule`);
    };

    const handleAddAbsence = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/absencies', {
                data: {
                    tanggal: newDate,
                    schedule: id_attendance,
                },
            });
            const updatedData = [...data, response.data.data].sort((a, b) => {
                const dateA = new Date(a.attributes.tanggal.split('-').reverse().join('-'));
                const dateB = new Date(b.attributes.tanggal.split('-').reverse().join('-'));
                return dateA - dateB;
            });
            setData(updatedData);
            setIsAddingAbsence(false);
        } catch (err) {
            setError(err);
        }
    };

    const formatDateToDisplay = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const formatDateToISO = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    return (
        <MainLayout>
            {isAddingAbsence ? (
                <>
                    <h1 className="mb-4">Tambah Sesi Absensi</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newDate">
                            Tanggal
                        </label>
                        <input
                            type="date"
                            id="newDate"
                            value={formatDateToISO(newDate)}
                            onChange={(e) => {
                                const formattedDate = formatDateToDisplay(e.target.value);
                                setNewDate(formattedDate);
                                console.log(formattedDate);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setIsAddingAbsence(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleAddAbsence}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Simpan
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold">Pilih Tanggal Kelas</h1>
                        <button
                            onClick={() => setIsAddingAbsence(true)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                        >
                            Tambah Sesi
                        </button>
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {data.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 rounded-md mt-5">
                            <thead className='bg-orange-500 text-white'>
                                <tr>
                                    <th className="px-4 py-2 border-b text-center">Tanggal</th>
                                    <th className="px-4 py-2 border-b text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{item.attributes.tanggal}</td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <Link to={`${baseUrl}/absensi/${item.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                    Absen
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        !loading && <p>No data found for the given ID.</p>
                    )}
                    <div className="flex justify-end mt-4 gap-5">
                        <button
                            onClick={goBack}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md"
                        >
                            Kembali
                        </button>
                    </div>
                </>
            )}
        </MainLayout>
    );
}
