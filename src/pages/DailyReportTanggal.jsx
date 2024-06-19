import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { useParams, generatePath, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function DailyReportTanggal() {
    const { id_absensi } = useParams();
    const navigate = useNavigate();
    const baseUrl = generatePath("/daily-report-teacher/:id_absensi", { id_absensi });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingAbsence, setIsAddingAbsence] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);
    const [absencyId, setAbsencyId] = useState(null);

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
                              teaching_report {
                                data {
                                  id
                                  attributes {
                                    Report {
                                      data {
                                        id
                                        attributes {
                                          url
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
                        id: id_absensi,
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
    }, [id_absensi]);

    const goBack = () => {
        navigate(`/daily-report-teacher`);
    };

    const handleAddAbsence = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/absencies', {
                data: {
                    tanggal: newDate,
                    schedule: id_absensi,
                },
            });
            setIsAddingAbsence(false);
            refreshData(); // Refresh data after adding absence
        } catch (err) {
            setError(err);
        }
    };

    const refreshData = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:1337/graphql', {
                query: `
                query getAbsenciesForSchedule($id: ID!) {
                    absencies(filters: { schedule: { id: { eq: $id } } }) {
                      data {
                        id
                        attributes {
                          tanggal
                          teaching_report {
                            data {
                              id
                              attributes {
                                Report {
                                  data {
                                    id
                                    attributes {
                                      url
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
                    id: id_absensi,
                },
            });

            const sortedData = response.data.data.absencies.data.sort((a, b) => {
                const dateA = new Date(a.attributes.tanggal.split('-').reverse().join('-'));
                const dateB = new Date(b.attributes.tanggal.split('-').reverse().join('-'));
                return dateA - dateB;
            });
            setEditData(null);
            setData(sortedData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
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

    const handleEditReport = (item, id) => {
        setIsEditing(true);
        if (item) {
            setEditData(item);
        }
        setAbsencyId(id);
    }

    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <MainLayout>
            <div className='static'>
                {isEditing ? (
                    <div
                        className="fixed top-0 left-0 z-40 bg-black/50 w-[100vw] h-[100vh] flex justify-center items-center"
                        onClick={() => setIsEditing(false)}
                    >
                        <div className='bg-white rounded-md w-[50%] h-[50%] px-5 py-2 flex justify-center items-center' onClick={handleStopPropagation}>
                            <form
                                className="bg-white rounded px-8 pt-6 pb-8 mb-4"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (editData) {
                                        var teacherReport = null;

                                        try {
                                            const createTeachingReport = async () => {
                                                const response = await axios.post('http://localhost:1337/graphql', {
                                                    query: `
                                                    query getAbsenciesForSchedule($id: ID!) {
                                                        teachingReports(filters: { absency: { id: { eq: $id } } }) {
                                                          data {
                                                            id
                                                          }
                                                        }
                                                      }
                                                      
                                                    `,
                                                    variables: {
                                                        id: editData.id,
                                                    },
                                                });
                                                console.log(response)
                                                return response.data.data;
                                            }

                                            teacherReport = await createTeachingReport();
                                            console.log(teacherReport);
                                        } catch (err) {
                                            console.log(err);
                                        }

                                        const form = e.target;
                                        const formData = new FormData(form);
                                        formData.append("refId", teacherReport.teachingReports.data[0].id)
                                        console.log(formData.get('refId'));
                                        const response = await axios.post(`http://localhost:1337/api/upload?id=${editData.attributes.teaching_report.data.attributes.Report.data.id}`, formData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        });
                                        setEditData(null);
                                        console.log(response);
                                        refreshData(); // Refresh data after adding report
                                        
                                    } else {
                                        teacherReport = null;
                                        try {
                                            const createTeachingReport = async () => {
                                                const response = await axios.post('http://localhost:1337/api/teaching-reports', {
                                                    data: {
                                                        absency: absencyId
                                                    },
                                                });
                                                console.log(response)
                                                return response.data.data;
                                            }

                                            teacherReport = await createTeachingReport();
                                            console.log(teacherReport);
                                        } catch (err) {
                                            console.log(err);
                                        }
                                        const form = e.target;
                                        const formData = new FormData(form);
                                        console.log(teacherReport.id);
                                        formData.append("refId", teacherReport.id)
                                        console.log(formData.get('refId'));
                                        const response = await axios.post('http://localhost:1337/api/upload', formData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        });

                                        console.log(response);
                                        refreshData(); // Refresh data after adding report
                                    }
                                    setEditData(null);
                                    setIsEditing(false);
                                }}
                            >
                                <input type='hidden' name='ref' value="api::teaching-report.teaching-report"></input>
                                <input type='hidden' name='refId'></input>
                                <input type='hidden' name='field' value="Report"></input>
                                <input type='file' name='files' onClick={handleStopPropagation}></input>
                                <input type="submit"></input>
                            </form>
                        </div>
                    </div>
                ) : (
                    null
                )}
                <h1 className="text-xl font-bold">Pilih Tanggal Kelas</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200 rounded-md mt-5">
                        <thead className='bg-orange-500 text-white'>
                            <tr>
                                <th className="px-4 py-2 border-b text-center w-[60%]">Tanggal</th>
                                <th className="px-4 py-2 border-b text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                console.log(item);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{item.attributes.tanggal}</td>
                                        {item.attributes.teaching_report.data ? (
                                            <td className="px-4 py-2 border-b text-center">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[40%]"
                                                    onClick={() => handleEditReport(item, item.id)}
                                                >
                                                    Edit laporan
                                                </button>
                                                <Link to={`http://localhost:1337${item.attributes.teaching_report.data.attributes.Report.data.attributes.url}`}>
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[10%] w-[50%]"
                                                    >
                                                        Download Laporan
                                                    </button>
                                                </Link>
                                            </td>
                                        ) : (
                                            <td className="px-4 py-2 border-b text-center">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100%]"
                                                    onClick={() => handleEditReport(null, item.id)}
                                                >
                                                    Input laporan
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                )
                            }
                            )}
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
            </div>
        </MainLayout>
    );
}
