import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import axios from 'axios';

const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const grades = [10, 11, 12];
const periods = [1, 2, 3, 4, 5];

// const classes = [
//     { nama: 'X RPL A', grade: "10" },
//     { nama: 'X RPL B', grade: "10" },
//     { nama: 'XI RPL A', grade: "11" },
//     { nama: 'XI RPL B', grade: "11" },
//     { nama: 'XII RPL A', grade: "12" },
//     { nama: 'XII RPL B', grade: "12" },
// ];
// const teachersData = [
//     { teacher: 'Budi', subject: 'Matematika' },
//     { teacher: 'Ani', subject: 'Fisika' },
//     { teacher: 'Cici', subject: 'Kimia' },
//     { teacher: 'Dodi', subject: 'Biologi' },
//     { teacher: 'Eka', subject: 'Bahasa Inggris' },
//     // Tambahkan lebih banyak data sesuai kebutuhan
// ];

var teachersData = [];


var dummyData = [];

export default function SetJadwalMengajar() {
    const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
    const [schedule, setSchedule] = useState([]);
    const [isAddingSchedule, setIsAddingSchedule] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(grades[0]);
    const [editData, setEditData] = useState(null);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getClasses{
                        classes{
                          data{
                            id
                            attributes{
                              nama
                              grade
                            }
                          }
                        }
                      }
                    `,
                });
                console.log(response);
                const classList = response.data.data.classes.data.map((data) => {
                    return { id: data.id, nama: data.attributes.nama, grade: data.attributes.grade.toString() }
                });
                setClasses(classList);
            };
            fetchData();                    
        }catch(err){
            console.log(err);
        }
    }, []);

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getTeaching{
                        teachings{
                          data{
                            id
                            attributes{
                              subject{
                                data{
                                  attributes{
                                    nama
                                  }
                                }
                              },
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
                    `,
                });
                console.log(response);
                teachersData = response.data.data.teachings.data.map((data) => {
                    return { id: data.id, teacher: data.attributes.users_permissions_user.data.attributes.nama, subject: data.attributes.subject.data.attributes.nama }
                });
            };
            fetchData();
        } catch(err){
            console.log(err);
        }
    }, []);

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getSchedule{
                        schedules{
                          data{
                            id
                            attributes{
                              class{
                                data{
                                  attributes{
                                    nama
                                    grade
                                  }
                                }
                              },
                              teaching{
                                data{
                                  attributes{
                                    subject{
                                      data{
                                        attributes{
                                          nama
                                        }
                                      }
                                    },
                                    users_permissions_user{
                                      data{
                                        attributes{
                                          nama
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              jadwal
                              hari
                            }
                          }
                        }
                      }
                    `,
                });
                console.log(response);
                dummyData = response.data.data.schedules.data.map((data) => {
                    return { id: data.id, day: data.attributes.hari, grade: data.attributes.class.data.attributes.grade, cls: data.attributes.class.data.attributes.nama, period: parseInt(data.attributes.jadwal, 10), subject: { name: data.attributes.teaching.data.attributes.subject.data.attributes.nama, teacher: data.attributes.teaching.data.attributes.users_permissions_user.data.attributes.nama } }
                });
                setSchedule(dummyData);
            };
            fetchData();
        }catch(err){
            console.log(err);
        }
    }, []);

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleSubjectChange = (event) => {
        const subject = event.target.value;
        setSelectedSubject(subject);
        setSelectedTeacher('');
    };

    const handleTeacherChange = (event) => {
        const teacher = event.target.value;
        setSelectedTeacher(teacher);
        if (teacher) {
            const subject = teachersData.find(t => t.teacher === teacher)?.subject || '';
            setSelectedSubject(subject);
        } else {
            setSelectedSubject('');
        }
    };

    const handleGradeChange = (event) => {
        setSelectedGrade(parseInt(event.target.value));
    };

    const isTeacherBusy = (day, period, teacher, currentClass) => {
        return schedule.some(item =>
            item.day === day &&
            item.period === period &&
            item.subject.teacher === teacher &&
            item.cls !== currentClass // Ensure the current class being edited isn't checked
        );
    };

    const addSchedule = (day, grade, cls, period, subject) => {
        const isSlotTaken = schedule.some(item =>
            item.day === day &&
            item.grade === grade &&
            item.cls === cls &&
            item.period === period
        );

        if (isSlotTaken) {
            alert('Slot sudah terisi untuk kelas ini.');
        } else if (isTeacherBusy(day, period, subject.teacher, cls)) {
            alert('Guru tersebut sudah mengajar di kelas lain pada waktu yang sama.');
        } else {
            // const newSchedule = [...schedule, { day, grade, cls, period, subject }];
            // setSchedule(newSchedule);
            try{
                const postData = async () => {
                    const response = await axios.post('http://localhost:1337/api/schedules', {
                        data:{
                            jadwal: period.toString(),
                            hari: day,
                            class: classes.find(c => c.nama === cls).id,
                            teaching: teachersData.find(t => t.teacher === subject.teacher && t.subject === subject.name).id
                        }
                    });

                    console.log(response);
        
                    const newScheduleItem = {
                        day,
                        grade,
                        cls,
                        period,
                        subject,
                        id: response.data.data.id.toString() // Assuming the response contains the created schedule's ID
                    };
        
                    setSchedule([...schedule, newScheduleItem]);
                    setIsAddingSchedule(false); // Close the add schedule card
                };
                postData();
            }catch(err){
                console.log(err);
            }
            setIsAddingSchedule(false); // Close the add schedule card
        }
    };

    const handleCellClick = (day, grade, cls, period) => {
        const data = schedule.find(item =>
            item.day === day &&
            item.grade === grade &&
            item.cls === cls &&
            item.period === period
        );
        if (data) {
            setEditData(data);
            setSelectedGrade(grade);
            setSelectedSubject(data?.subject?.name || '');
            setSelectedTeacher(data?.subject?.teacher || '');
            setIsAddingSchedule(true);
        }
    };

    const handleDelete = () => {
        const index = schedule.findIndex(item =>
            item.day === editData.day &&
            item.grade === editData.grade &&
            item.cls === editData.cls &&
            item.period === editData.period
        );
        if (index !== -1) {
            // const updatedSchedule = [...schedule];
            // updatedSchedule.splice(index, 1);
            // setSchedule(updatedSchedule);

            try{
                const deleteData = async () => {
                    const response = await axios.delete(`http://localhost:1337/api/schedules/${editData.id}`);
                    console.log(response);
                    const updatedSchedule = [...schedule];
                    updatedSchedule.splice(index, 1);
                    setSchedule(updatedSchedule);
                }
                deleteData();
            }catch(err){
                console.log(err);
            }
            
            setEditData(null);
            setIsAddingSchedule(false);
        }
    }

    useEffect(() => {
        console.log(schedule);
    }, [schedule]);

    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Halaman Set Jadwal Mengajar</h1>
                {isAddingSchedule ? (
                    <div className="mt-6 p-4 border rounded-md bg-gray-100">
                        <h2 className="text-lg font-semibold mb-4">{editData ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const day = e.target.day.value;
                            const grade = parseInt(e.target.grade.value);
                            const cls = e.target.cls.value;
                            const period = parseInt(e.target.period.value);
                            const subject = {
                                name: selectedSubject,
                                teacher: selectedTeacher
                            };

                            console.log(day, grade, cls, period, subject);

                            if (editData) {
                                // Edit existing schedule
                                const index = schedule.findIndex(item =>
                                    item.day === editData.day &&
                                    item.grade === editData.grade &&
                                    item.cls === editData.cls &&
                                    item.period === editData.period
                                );
                                if (index !== -1) {
                                    // Check if the teacher is busy in another class during the same period
                                    if (isTeacherBusy(day, period, subject.teacher, cls)) {
                                        alert('Guru tersebut sudah mengajar di kelas lain pada waktu yang sama.');
                                    } else {
                                        // const updatedSchedule = [...schedule];
                                        // updatedSchedule[index] = { ...editData, subject, day, grade, cls, period };
                                        // setSchedule(updatedSchedule);

                                        try{
                                            const putData = async () => {
                                                const response = await axios.put(`http://localhost:1337/api/schedules/${editData.id}`, {
                                                    data:{
                                                        jadwal: period.toString(),
                                                        hari: day,
                                                        class: classes.find(c => c.nama === cls).id,
                                                        teaching: teachersData.find(t => t.teacher === subject.teacher && t.subject === subject.name).id
                                                    }
                                                });
                                                console.log(response);

                                                const updatedScheduleItem = {
                                                    day,
                                                    grade,
                                                    cls,
                                                    period,
                                                    subject,
                                                    id: editData.id
                                                };
                                                const updatedSchedule = [...schedule];
                                                updatedSchedule[index] = updatedScheduleItem;
                                                setSchedule(updatedSchedule);
                                            };
                                            putData();
                                        }catch(err) {
                                            console.log(err);
                                        }

                                        setEditData(null);
                                        setIsAddingSchedule(false);
                                    }
                                }
                            } else {
                                // Add new schedule
                                addSchedule(day, grade, cls, period, subject);
                            }
                        }}>
                            <div className="mb-4">
                                <label className="block mb-2">Hari:</label>
                                <select
                                    name="day"
                                    defaultValue={editData ? editData.day : selectedDay}
                                    disabled={!!editData}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    {daysOfWeek.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Kelas:</label>
                                <select
                                    name="grade"
                                    value={selectedGrade}
                                    onChange={handleGradeChange}
                                    disabled={!!editData}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    {grades.map(grade => (
                                        <option key={grade} value={grade}>{grade}</option>
                                    ))}
                                </select>
                                <select
                                    name="cls"
                                    defaultValue={editData ? editData.cls : ''}
                                    disabled={!!editData}
                                    className="p-2 border border-gray-300 rounded-md ml-2"
                                >
                                    {classes
                                        .filter(cls => cls.grade === selectedGrade.toString())
                                        .map(cls => (
                                            <option key={cls.nama} value={cls.nama}>{cls.nama}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Periode:</label>
                                <select
                                    name="period"
                                    defaultValue={editData ? editData.period : ''}
                                    disabled={!!editData}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    {periods.map(period => (
                                        <option key={period} value={period}>{period}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Mata Pelajaran:</label>
                                <select
                                    name="subject"
                                    value={selectedSubject}
                                    onChange={handleSubjectChange}
                                    className="p-2 border border-gray-300 rounded-md w-full"
                                >
                                    <option value="">Pilih Mata Pelajaran</option>
                                    {Array.from(new Set(teachersData.map(t => t.subject))).map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Guru:</label>
                                <select
                                    name="teacher"
                                    value={selectedTeacher}
                                    onChange={handleTeacherChange}
                                    className="p-2 border border-gray-300 rounded-md w-full"
                                >
                                    <option value="">Pilih Guru</option>
                                    {teachersData
                                        .filter(t => !selectedSubject || t.subject === selectedSubject)
                                        .map(t => (
                                            <option key={t.teacher} value={t.teacher}>{t.teacher}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddingSchedule(false);
                                        setEditData(null);
                                    }}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md"
                                >
                                    {editData ? 'Simpan Perubahan' : 'Tambah'}
                                </button>
                                {editData && (
                                    <button
                                        type='button'
                                        onClick={handleDelete}
                                        className="px-4 py-2 ml-2 bg-red-500 text-white rounded-md"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4 flex justify-between items-center">
                            <div className='flex items-center gap-5'>
                                <label className="block">Pilih Hari:</label>
                                <select
                                    value={selectedDay}
                                    onChange={handleDayChange}
                                    className="p-2 cursor-pointer"
                                >
                                    {daysOfWeek.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={() => setIsAddingSchedule(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Tambah Jadwal Baru
                                </button>
                            </div>
                        </div>
                        <div>
                            {grades.map(grade => (
                                <div key={grade} className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">Kelas {grade}</h2>
                                    {console.log(classes)}
                                    {classes.filter(cls => cls.grade === grade.toString()).map(cls => (
                                        <div key={cls.nama} className="mb-4">
                                            <h3 className="text-lg font-medium mb-1">{cls.nama}</h3>
                                            <table className="min-w-full bg-white border">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2 border">Periode</th>
                                                        <th className="py-2 border">Mata Pelajaran</th>
                                                        <th className="py-2 border">Guru</th>
                                                        <th className="py-2 border">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {periods.map(period => {
                                                        const data = schedule.find(item =>
                                                            item.day === selectedDay &&
                                                            item.grade === grade &&
                                                            item.cls === cls.nama &&
                                                            item.period === period
                                                        );
                                                        return (
                                                            <tr key={period} className="text-center">
                                                                <td className="py-2 border">{period}</td>
                                                                <td className="py-2 border">
                                                                    {data?.subject?.name || '-'}
                                                                </td>
                                                                <td className="py-2 border">
                                                                    {data?.subject?.teacher || '-'}
                                                                </td>
                                                                <td className="py-2 border">
                                                                    {data ? (
                                                                        <button
                                                                            onClick={() => handleCellClick(selectedDay, grade, cls.nama, period)}
                                                                            className="px-2 py-1 bg-blue-500 text-white rounded-md"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            disabled
                                                                            className="px-2 py-1 bg-gray-500 text-white rounded-md cursor-not-allowed"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
